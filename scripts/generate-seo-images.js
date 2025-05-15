const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const generateImages = async () => {
  const publicDir = path.join(process.cwd(), 'public');
  const iconsDir = path.join(publicDir, 'icons');

  // Create icons directory if it doesn't exist
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Generate PWA icons
  const iconSizes = [192, 512];
  for (const size of iconSizes) {
    await sharp('src/assets/logo.png') // You'll need to add your logo.png to src/assets
      .resize(size, size)
      .toFile(path.join(iconsDir, `icon-${size}x${size}.png`));
  }

  // Generate OpenGraph image
  await sharp('src/assets/logo.png')
    .resize(1200, 630, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 }
    })
    .composite([{
      input: Buffer.from(
        `<svg><text x="50%" y="50%" text-anchor="middle" font-family="Arial" font-size="60" fill="#000">Ajmeri Satta King</text></svg>`
      ),
      gravity: 'center'
    }])
    .toFile(path.join(publicDir, 'og-image.jpg'));

  // Generate Twitter image (same as OG image for consistency)
  fs.copyFileSync(
    path.join(publicDir, 'og-image.jpg'),
    path.join(publicDir, 'twitter-image.jpg')
  );

  console.log('SEO images generated successfully!');
};

generateImages().catch(console.error); 