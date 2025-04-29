// Script to find missing articles between articlesData.ts and articles.ts
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
    excerpt: match[3],
    category: match[4],
    image: match[5],
    slug: match[6],
    publishDate: match[7],
    author: match[8]
  });
}

console.log('=== Missing Articles ===');
console.log('Articles in articlesData.ts that are missing from articles.ts:');
const missingArticles = articlesData.filter(article => !articleSlugs.includes(article.slug));

if (missingArticles.length === 0) {
  console.log('No missing articles found!');
} else {
  console.log(`Found ${missingArticles.length} missing articles:`);
  missingArticles.forEach(article => {
    console.log(`- ID: ${article.id}, Title: "${article.title}", Slug: "${article.slug}", Category: "${article.category}"`);
  });

  // Generate template code for missing articles
  console.log('\n=== Template Code for Missing Articles ===');
  console.log('Add the following code to articles.ts:');

  missingArticles.forEach(article => {
    const template = `
  {
    id: ${article.id},
    title: "${article.title}",
    content: \`
      <p>${article.excerpt}</p>

      <h2>Section Title</h2>
      <p>Detailed content goes here...</p>

      <h2>Another Section</h2>
      <p>More content goes here...</p>

      <h2>Conclusion</h2>
      <p>Concluding thoughts go here...</p>
    \`,
    category: "${article.category}",
    author: "${article.author}",
    publishDate: "${article.publishDate}",
    image: "${article.image}",
    slug: "${article.slug}"
  },`;

    console.log(template);
  });
}
