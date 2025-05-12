const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Create directories if they don't exist
const createDirectories = () => {
  const dirs = [
    'public/images/articles/fashion',
    'public/images/articles/beauty',
    'public/images/articles/lifestyle',
    'public/images/articles/culture'
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

// List of images to download
const imagesToDownload = [
  // Fashion images
  {
    url: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d',
    path: 'public/images/articles/fashion/fashion-trends-2023.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1513267048331-5611cad62e41?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/fashion/color-psychology.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5',
    path: 'public/images/articles/fashion/luxury-fashion.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3',
    path: 'public/images/articles/fashion/seasonal-wardrobe.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1509631179647-0177331693ae',
    path: 'public/images/articles/fashion/accessories.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/fashion/textile-innovation.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1459156212016-c812468e2115?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/fashion/cultural-fashion.jpg'
  },

  // Beauty images
  {
    url: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348',
    path: 'public/images/articles/beauty/aromatherapy.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b',
    path: 'public/images/articles/beauty/diy-beauty.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883',
    path: 'public/images/articles/beauty/korean-beauty.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702',
    path: 'public/images/articles/beauty/glowing-skin.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f',
    path: 'public/images/articles/beauty/haircare.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/beauty/natural-makeup.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9',
    path: 'public/images/articles/beauty/seasonal-skincare.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908',
    path: 'public/images/articles/beauty/anti-aging.jpg'
  },

  // Lifestyle images
  {
    url: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
    path: 'public/images/articles/lifestyle/digital-detox.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e',
    path: 'public/images/articles/lifestyle/home-organization.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09',
    path: 'public/images/articles/lifestyle/sustainable-living.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    path: 'public/images/articles/lifestyle/work-life-balance.jpg'
  },

  // Culture images
  {
    url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773',
    path: 'public/images/articles/culture/slow-living.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/global-cinema.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1533826418470-0cef7eb8bdaa?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/literary-classics.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/music-festival.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1594794312433-05a69a98b7a0?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/contemporary-art.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/cultural-heritage.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/culinary-traditions.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/architectural-styles.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1600&q=80',
    path: 'public/images/articles/culture/photography.jpg'
  }
];

// Main function
const main = async () => {
  try {
    createDirectories();

    // Download all images
    const promises = imagesToDownload.map(img => downloadImage(img.url, img.path));
    await Promise.all(promises);

    console.log('All images downloaded successfully!');
  } catch (error) {
    console.error('Error:', error);
  }
};

// Run the script
main();
