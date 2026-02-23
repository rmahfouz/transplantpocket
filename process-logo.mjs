import fs from 'fs';
import sharp from 'sharp';

const svgPath = 'export-2026-02-23 190532.svg';
let svgContent = fs.readFileSync(svgPath, 'utf-8');

// remove the first path describing the background rect
svgContent = svgContent.replace('<path d="M0 0 C908.16 0 1816.32 0 2752 0 C2752 506.88 2752 1013.76 2752 1536 C1843.84 1536 935.68 1536 0 1536 C0 1029.12 0 522.24 0 0 Z " transform="translate(0,0)" style="fill: #FDFDFC;"/>', '');

fs.writeFileSync('public/logo.svg', svgContent);

// The viewBox width is 2752, height is 1536. When resized to a square, 
// sharp can 'contain' it within the bounds.
async function generateIcon(size, output) {
    await sharp(Buffer.from(svgContent))
        .resize(size, size, {
            fit: 'contain',
            background: { r: 255, g: 255, b: 255, alpha: 0 } // transparent
        })
        .png()
        .toFile(output);
}

await generateIcon(192, 'public/pwa-192x192.png');
await generateIcon(512, 'public/pwa-512x512.png');
await generateIcon(180, 'public/apple-touch-icon.png');
console.log("Logos generated successfully!");
