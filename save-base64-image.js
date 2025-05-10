const fs = require('fs');
const path = require('path');

// Create a placeholder image for now
const imagePath = path.join(__dirname, 'voguevault', 'public', 'images', 'team', 'malik-mohsin.jpg');

// Ensure directory exists
const dir = path.dirname(imagePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
  console.log(`Created directory: ${dir}`);
}

// Create a simple placeholder image
const placeholderImagePath = path.join(__dirname, 'voguevault', 'public', 'images', 'placeholder.jpg');
if (fs.existsSync(placeholderImagePath)) {
  fs.copyFileSync(placeholderImagePath, imagePath);
  console.log(`Copied placeholder image to: ${imagePath}`);
  
  // Check file size
  const stats = fs.statSync(imagePath);
  console.log(`File size: ${stats.size} bytes`);
} else {
  console.error(`Placeholder image not found at: ${placeholderImagePath}`);
}
