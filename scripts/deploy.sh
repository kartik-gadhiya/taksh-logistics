#!/usr/bin/env bash
# ==============================================================================
# Automated Deployment Script for Taksh Logistics (Next.js)
# ==============================================================================
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

TARGET_BRANCH="${1:-main}"
START_TIME="$(date +%s)"
LOG_DIR="${PROJECT_ROOT}/.deploy-logs"
mkdir -p "${LOG_DIR}"
LOG_FILE="${LOG_DIR}/deploy_$(date +'%Y%m%d_%H%M%S').log"
exec > >(tee -a "${LOG_FILE}") 2>&1

echo "================================================================="
echo "  Starting Automated Deployment for Taksh Logistics"
echo "  Date:       $(date)"
echo "  Target:     ${TARGET_BRANCH}"
echo "  Directory:  ${PROJECT_ROOT}"
echo "================================================================="

# Load Node.js / NVM environment
export HOME="${HOME:-/home/deploy}"
export NVM_DIR="/home/deploy/.nvm"
if [ -s "${NVM_DIR}/nvm.sh" ]; then
    source "${NVM_DIR}/nvm.sh"
    nvm use 24.22.2 --silent || true
fi
export PATH="/home/deploy/.nvm/versions/node/v24.22.2/bin:/usr/local/bin:$PATH"

echo "Node.js Version: $(node -v)"
echo "npm Version:     $(npm -v)"

git config --global --add safe.directory "${PROJECT_ROOT}" 2>/dev/null || true

echo ""
echo "[1/4] Fetching latest changes from origin/${TARGET_BRANCH}..."
git fetch origin "${TARGET_BRANCH}"
git checkout "${TARGET_BRANCH}"
git pull origin "${TARGET_BRANCH}"

CURRENT_COMMIT="$(git rev-parse --short HEAD)"
echo "Current commit: ${CURRENT_COMMIT}"
echo "Commit message: $(git log -1 --pretty=format:'%s (%an)')"

echo ""
echo "[2/4] Installing dependencies..."
if [ -f "package-lock.json" ]; then
    npm ci --no-audit --no-fund
else
    npm install --no-audit --no-fund
fi

echo ""
echo "[3/4] Building Next.js production bundle..."
npm run build

echo ""
echo "[4/4] Reloading PM2 process..."
if pm2 describe taksh-logistics >/dev/null 2>&1; then
    echo "Reloading PM2 process 'taksh-logistics'..."
    pm2 reload taksh-logistics --update-env
else
    echo "Starting PM2 process 'taksh-logistics'..."
    pm2 start ecosystem.config.cjs
fi
pm2 save

echo ""
echo "Cleaning old deployment logs..."
find "${LOG_DIR}" -maxdepth 1 -type f -name 'deploy_*.log' 2>/dev/null | sort -rn | tail -n +21 | xargs -r rm -f 2>/dev/null || true

echo "================================================================="
echo "  DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "  Commit:       ${CURRENT_COMMIT}"
echo "  Duration:     $(( $(date +%s) - START_TIME )) seconds"
echo "================================================================="
