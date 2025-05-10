const fs = require('fs');
const https = require('https');

const url = 'https://i.imgur.com/Yx9Yd9j.jpg';
const path = './public/images/team/malik-mohsin.jpg';

console.log('Downloading image...');

https.get(url, (res) => {
  const fileStream = fs.createWriteStream(path);
  res.pipe(fileStream);

  fileStream.on('finish', () => {
    fileStream.close();
    console.log('Download completed');
  });
}).on('error', (err) => {
  console.error('Error downloading image:', err.message);
});
