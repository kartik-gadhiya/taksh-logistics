#!/usr/bin/env bash
# ==============================================================================
# Automated Deployment Script for Taksh Logistics (Next.js)
#
# Usage:
#   ./scripts/deploy.sh [branch_name] [--ci]
#
# Note:
#   Email notifications are sent ONLY when executed via CI/CD (--ci or CI_CD_TRIGGERED=true).
#   Manual executions will skip email notifications.
# ==============================================================================
set -Eeuo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

TARGET_BRANCH="main"
IS_CI_CD=false

for arg in "$@"; do
    if [ "$arg" == "--ci" ] || [ "$arg" == "--cicd" ]; then
        IS_CI_CD=true
    elif [[ ! "$arg" =~ ^-- ]]; then
        TARGET_BRANCH="$arg"
    fi
done

if [ "${CI_CD_TRIGGERED:-false}" = "true" ] || [ "${GITHUB_ACTIONS:-false}" = "true" ]; then
    IS_CI_CD=true
fi

START_TIME="$(date +%s)"
HOSTNAME_NAME="$(hostname 2>/dev/null || echo "server")"
LOG_DIR="${PROJECT_ROOT}/.deploy-logs"
mkdir -p "${LOG_DIR}"
LOG_FILE="${LOG_DIR}/deploy_$(date +'%Y%m%d_%H%M%S').log"
exec > >(tee -a "${LOG_FILE}") 2>&1

echo "================================================================="
echo "  Starting Automated Deployment for Taksh Logistics"
echo "  Date:       $(date)"
echo "  Target:     ${TARGET_BRANCH}"
echo "  CI/CD Mode: ${IS_CI_CD}"
echo "  Directory:  ${PROJECT_ROOT}"
echo "  Host:       ${HOSTNAME_NAME}"
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

# Email notification helper
send_notification() {
    local status="$1"
    local err_msg="${2:-}"

    # Only send email when triggered via CI/CD
    if [ "${IS_CI_CD}" != "true" ]; then
        echo ""
        echo ">>> Manual deployment detected. Skipping email notification (configured for CI/CD only)."
        return 0
    fi

    local end_time
    local duration
    end_time="$(date +%s)"
    duration=$((end_time - START_TIME))

    local commit_hash
    local commit_author
    local commit_msg
    commit_hash="$(git rev-parse HEAD 2>/dev/null || echo "unknown")"
    commit_author="$(git log -1 --pretty=format:'%an <%ae>' 2>/dev/null || echo "Automated System")"
    commit_msg="$(git log -1 --pretty=format:'%s' 2>/dev/null || echo "Deployment triggered")"

    echo ""
    echo ">>> Triggering automated CI/CD deployment ${status} email notification..."

    if [ ! -f "${SCRIPT_DIR}/send-deployment-email.mjs" ]; then
        echo "WARNING: Notification script not found at ${SCRIPT_DIR}/send-deployment-email.mjs"
        return 0
    fi

    node "${SCRIPT_DIR}/send-deployment-email.mjs" \
        --status="${status}" \
        --branch="${TARGET_BRANCH}" \
        --commit="${commit_hash}" \
        --author="${commit_author}" \
        --message="${commit_msg}" \
        --duration="${duration}" \
        --hostname="${HOSTNAME_NAME}" \
        --error="${err_msg}" \
        --log-file="${LOG_FILE}" || {
            echo "WARNING: Email notification dispatch failed."
        }

    return 0
}

DEPLOYMENT_FINISHED=false
handle_failure() {
    local exit_code="${1:-1}"
    local line_number="${2:-unknown}"
    local failed_command="${3:-unknown}"

    if [ "${DEPLOYMENT_FINISHED}" = true ]; then
        return
    fi
    DEPLOYMENT_FINISHED=true
    trap - ERR

    echo ""
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    echo "  DEPLOYMENT FAILED"
    echo "  Exit Code:    ${exit_code}"
    echo "  Line Number:  ${line_number}"
    echo "  Command:      ${failed_command}"
    echo "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

    local err_detail
    err_detail="Command '${failed_command}' failed at line ${line_number} with exit code ${exit_code}."
    send_notification "FAILED" "${err_detail}"
    exit "${exit_code}"
}

trap 'handle_failure "$?" "$LINENO" "$BASH_COMMAND"' ERR

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

DEPLOYMENT_FINISHED=true

echo ""
echo "================================================================="
echo "  DEPLOYMENT COMPLETED SUCCESSFULLY"
echo "  Commit:       ${CURRENT_COMMIT}"
echo "  Duration:     $(( $(date +%s) - START_TIME )) seconds"
echo "================================================================="

# Send email notification only if triggered via CI/CD
send_notification "SUCCESS"

exit 0
