<?php
$srcPath = 'C:\\Users\\Admin\\.gemini\\antigravity-ide\\brain\\4bd8c382-9422-4f98-ae69-0128bd6baa12\\media__1788373840649.png';
$outPath = 'c:\\xampp\\htdocs\\taksh-logistics\\public\\logo.png';
$outTransparentPath = 'c:\\xampp\\htdocs\\taksh-logistics\\public\\logo_transparent.png';

if (!file_exists($srcPath)) {
    die("Source image not found at $srcPath\n");
}

$img = imagecreatefrompng($srcPath);
if (!$img) {
    die("Failed to load PNG\n");
}

$width = imagesx($img);
$height = imagesy($img);

$out = imagecreatetruecolor($width, $height);
imagealphablending($out, false);
imagesavealpha($out, true);

$transparent = imagecolorallocatealpha($out, 0, 0, 0, 127);
imagefill($out, 0, 0, $transparent);

for ($x = 0; $x < $width; $x++) {
    for ($y = 0; $y < $height; $y++) {
        $rgb = imagecolorat($img, $x, $y);
        $r = ($rgb >> 16) & 0xFF;
        $g = ($rgb >> 8) & 0xFF;
        $b = $rgb & 0xFF;
        
        // Check lightness / near white background threshold
        // The background is pure white or very light gray (#FAFAFA - #FFFFFF)
        $minC = min($r, $g, $b);
        $maxC = max($r, $g, $b);
        $brightness = ($r * 299 + $g * 587 + $b * 114) / 1000;
        
        if ($minC > 235 && $brightness > 235) {
            // Completely transparent background
            imagesetpixel($out, $x, $y, $transparent);
        } else if ($minC > 200 && $brightness > 200) {
            // Anti-aliased transition edge
            $alphaFactor = (235 - $brightness) / (235 - 200); // 0 at 235, 1 at 200
            $alphaFactor = max(0.0, min(1.0, $alphaFactor));
            $alphaGD = (int)round((1.0 - $alphaFactor) * 127);
            
            // Adjust RGB so dark or red text doesn't wash out into white halo
            // Blend pixel toward true color relative to white
            $color = imagecolorallocatealpha($out, $r, $g, $b, $alphaGD);
            imagesetpixel($out, $x, $y, $color);
        } else {
            // Opaque logo content pixel
            $color = imagecolorallocatealpha($out, $r, $g, $b, 0);
            imagesetpixel($out, $x, $y, $color);
        }
    }
}

imagepng($out, $outPath, 9);
imagepng($out, $outTransparentPath, 9);

imagedestroy($img);
imagedestroy($out);

echo "Successfully generated transparent logo at $outPath and $outTransparentPath\n";
