// Simple script to check for missing articles
const fs = require('fs');
const path = require('path');

// Read the articles.ts file
const articlesFile = fs.readFileSync(path.join(__dirname, 'src', 'data', 'articles.ts'), 'utf8');
// Read the articlesData.ts file
const articlesDataFile = fs.readFileSync(path.join(__dirname, 'src', 'data', 'articlesData.ts'), 'utf8');

// Extract article slugs from articles.ts
const articleSlugs = [];
const articleRegex = /slug: "([^"]+)"/g;
let match;
while ((match = articleRegex.exec(articlesFile)) !== null) {
  articleSlugs.push(match[1]);
}

// Extract article data from articlesData.ts
const articlesData = [];
const articleDataRegex = /{\s*id: (\d+),\s*title: "([^"]+)",\s*excerpt: "([^"]+)",\s*category: "([^"]+)",\s*image: "([^"]+)",\s*slug: "([^"]+)",\s*publishDate: "([^"]+)",\s*author: "([^"]+)"\s*}/g;

while ((match = articleDataRegex.exec(articlesDataFile)) !== null) {
  articlesData.push({
    id: parseInt(match[1]),
    title: match[2],
    slug: match[6]
  });
}

console.log('=== Missing Articles ===');
console.log('Articles in articlesData.ts that are missing from articles.ts:');
const missingArticles = articlesData.filter(article => !articleSlugs.includes(article.slug));
missingArticles.forEach(article => {
  console.log(`- ID: ${article.id}, Title: "${article.title}", Slug: "${article.slug}"`);
});

console.log('\nTotal missing articles:', missingArticles.length);
