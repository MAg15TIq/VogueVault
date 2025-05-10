const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://i.imgur.com/Yx9Yd9j.jpg';
const imagePath = path.join(__dirname, 'voguevault', 'public', 'images', 'team', 'malik-mohsin.jpg');

// Ensure directory exists
const dir = path.dirname(imagePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created directory: ${dir}`);
}

console.log(`Downloading image to: ${imagePath}`);

https.get(url, (res) => {
  // Check if the response is successful
  if (res.statusCode !== 200) {
    console.error(`Failed to download image: Status code ${res.statusCode}`);
    return;
  }

  const fileStream = fs.createWriteStream(imagePath);
  res.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Download completed successfully');

    // Check file size
    const stats = fs.statSync(imagePath);
    console.log(`File size: ${stats.size} bytes`);
  });
}).on('error', (err) => {
  console.error('Error downloading image:', err.message);
});
