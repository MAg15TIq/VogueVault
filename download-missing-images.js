const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories if they don't exist
const createDirectories = () => {
  const dirs = [
    'public/images/articles/culture',
    'public/images/articles/lifestyle'
  ];

  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  });
};

// Download an image from a URL and save it to a file
const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    // Check if file already exists and has content
    if (fs.existsSync(filepath)) {
      const stats = fs.statSync(filepath);
      if (stats.size > 0) {
        console.log(`File already exists with content: ${filepath}`);
        return resolve();
      } else {
        console.log(`File exists but is empty, downloading: ${filepath}`);
      }
    }

    const file = fs.createWriteStream(filepath);

    https.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', err => {
      fs.unlink(filepath, () => {}); // Delete the file if there was an error
      reject(err);
    });
  });
};

// List of missing images to download
const imagesToDownload = [
  // Culture images
  {
    url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625',
    path: 'public/images/articles/culture/architecture.jpg'
  },
  
  // Lifestyle images
  {
    url: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828',
    path: 'public/images/articles/lifestyle/eco-travel.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e',
    path: 'public/images/articles/lifestyle/financial-wellness.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1463936575829-25148e1db1b8',
    path: 'public/images/articles/lifestyle/indoor-plants.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b',
    path: 'public/images/articles/lifestyle/productivity.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b',
    path: 'public/images/articles/lifestyle/wellness-retreat.jpg'
  }
];

// Main function
const main = async () => {
  try {
    createDirectories();

    // Download all images
    const promises = imagesToDownload.map(img => downloadImage(img.url, img.path));
    await Promise.all(promises);

    console.log('All missing images downloaded successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};

// Run the script
main();
