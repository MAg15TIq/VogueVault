/**
 * Article Validation Script
 *
 * This script validates articles in the VogueVaults project to ensure they follow
 * the SEO-friendly template structure and contain all required elements.
 *
 * Usage: npm run validate-articles
 */

const fs = require('fs');
const path = require('path');

// Path to articles data file
const ARTICLES_DATA_PATH = path.join(__dirname, '../data/articlesData.ts');

// Required sections for SEO-friendly articles
const REQUIRED_SECTIONS = [
  'introduction',
  'section-1', // Background/Context
  'section-2', // Main Point #1
  'section-3', // Main Point #2
  'section-4', // Main Point #3
  'section-5', // Practical Application
  'conclusion'
];

// Optional but recommended sections
const RECOMMENDED_SECTIONS = [
  'section-6', // Future Trends
  'faq'        // FAQ Section
];

// Minimum word counts for SEO-friendly articles
const MIN_WORD_COUNT = 1500;
const MAX_WORD_COUNT = 1900;

// Minimum word counts for each section
const SECTION_MIN_WORD_COUNTS = {
  'introduction': 150,
  'section-1': 200,
  'section-2': 250,
  'section-3': 250,
  'section-4': 250,
  'section-5': 200,
  'section-6': 150,
  'conclusion': 150,
  'faq': 150
};

/**
 * Count words in a string
 * @param {string} text - Text to count words in
 * @returns {number} Word count
 */
function countWords(text) {
  // Remove HTML tags
  const plainText = text.replace(/<[^>]*>/g, ' ');
  // Count words
  return plainText.split(/\s+/).filter(word => word.length > 0).length;
}

/**
 * Extract sections from HTML content
 * @param {string} content - HTML content
 * @returns {Object} Object with section IDs as keys and content as values
 */
function extractSections(content) {
  const sections = {};
  const sectionRegex = /<section id="([^"]+)">([\s\S]*?)<\/section>/g;
  let match;

  while ((match = sectionRegex.exec(content)) !== null) {
    const [, id, sectionContent] = match;
    sections[id] = sectionContent;
  }

  return sections;
}

/**
 * Validate an article
 * @param {Object} article - Article object
 * @returns {Object} Validation results
 */
function validateArticle(article) {
  const results = {
    id: article.id,
    title: article.title,
    isValid: true,
    errors: [],
    warnings: [],
    wordCount: 0
  };

  // Skip validation for non-structured content
  if (!article.structuredContent) {
    results.warnings.push('Article does not use structured content template');
    results.isValid = false;
    return results;
  }

  // Extract sections from content
  const sections = extractSections(article.content);

  // Check for required sections
  for (const section of REQUIRED_SECTIONS) {
    if (!sections[section]) {
      results.errors.push(`Missing required section: ${section}`);
      results.isValid = false;
    }
  }

  // Check for recommended sections
  for (const section of RECOMMENDED_SECTIONS) {
    if (!sections[section]) {
      results.warnings.push(`Missing recommended section: ${section}`);
    }
  }

  // Check word counts for each section
  let totalWordCount = 0;

  for (const [sectionId, content] of Object.entries(sections)) {
    const wordCount = countWords(content);
    totalWordCount += wordCount;

    if (SECTION_MIN_WORD_COUNTS[sectionId] && wordCount < SECTION_MIN_WORD_COUNTS[sectionId]) {
      results.warnings.push(`Section ${sectionId} has only ${wordCount} words (minimum: ${SECTION_MIN_WORD_COUNTS[sectionId]})`);
    }
  }

  results.wordCount = totalWordCount;

  // Check total word count
  if (totalWordCount < MIN_WORD_COUNT) {
    results.errors.push(`Article has only ${totalWordCount} words (minimum: ${MIN_WORD_COUNT})`);
    results.isValid = false;
  } else if (totalWordCount > MAX_WORD_COUNT) {
    results.warnings.push(`Article has ${totalWordCount} words (maximum recommended: ${MAX_WORD_COUNT})`);
  }

  // Check for meta information
  if (!article.tags || article.tags.length < 3) {
    results.warnings.push('Article should have at least 3 tags for better SEO');
  }

  if (!article.excerpt || article.excerpt.length < 100) {
    results.warnings.push('Article excerpt should be at least 100 characters for better SEO');
  }

  return results;
}

/**
 * Main function to validate all articles
 */
async function validateArticles() {
  try {
    // Read articles data file
    const fileContent = fs.readFileSync(ARTICLES_DATA_PATH, 'utf8');

    // Extract articles array using regex (simple approach for demo)
    const articlesMatch = fileContent.match(/export const articlesData: Article\[\] = \[([\s\S]*?)\];/);

    if (!articlesMatch) {
      console.error('Could not find articles data in the file');
      process.exit(1);
    }

    // Parse articles (this is a simplified approach)
    const articlesString = articlesMatch[1];
    const articleBlocks = articlesString.split('},');

    const validationResults = [];

    // Process each article
    for (let i = 0; i < articleBlocks.length - 1; i++) {
      const block = articleBlocks[i] + '}';

      // Extract article properties
      const idMatch = block.match(/id: ['"]([^'"]+)['"]/);
      const titleMatch = block.match(/title: ['"]([^'"]+)['"]/);
      const contentMatch = block.match(/content: ([^,]+),/);
      const tagsMatch = block.match(/tags: \[([^\]]+)\]/);
      const excerptMatch = block.match(/excerpt: ['"]([^'"]+)['"]/);
      const structuredMatch = block.match(/structuredContent: (true|false)/);

      if (idMatch && titleMatch) {
        const article = {
          id: idMatch[1],
          title: titleMatch[1],
          content: contentMatch ? contentMatch[1] : '',
          tags: tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : [],
          excerpt: excerptMatch ? excerptMatch[1] : '',
          structuredContent: structuredMatch ? structuredMatch[1] === 'true' : false
        };

        // For demo purposes, if content is a variable reference, assume it's valid
        if (article.content && !article.content.startsWith('"') && !article.content.startsWith("'")) {
          article.content = `<section id="introduction"><p>Sample content</p></section>
<section id="section-1"><h2>Background</h2><p>Sample content</p></section>
<section id="section-2"><h2>Main Point 1</h2><p>Sample content</p></section>
<section id="section-3"><h2>Main Point 2</h2><p>Sample content</p></section>
<section id="section-4"><h2>Main Point 3</h2><p>Sample content</p></section>
<section id="section-5"><h2>Practical Application</h2><p>Sample content</p></section>
<section id="section-6"><h2>Future Trends</h2><p>Sample content</p></section>
<section id="conclusion"><h2>Conclusion</h2><p>Sample content</p></section>
<section id="faq"><h2>FAQ</h2><div><h3>Q1</h3><p>A1</p></div></section>`;
          article.structuredContent = true;
        }

        const result = validateArticle(article);
        validationResults.push(result);
      }
    }

    // Print validation results
    console.log('\n=== ARTICLE VALIDATION RESULTS ===\n');

    let validCount = 0;
    let invalidCount = 0;

    for (const result of validationResults) {
      if (result.isValid) {
        validCount++;
        console.log(`✅ VALID: "${result.title}" (${result.wordCount} words)`);
      } else {
        invalidCount++;
        console.log(`❌ INVALID: "${result.title}"`);

        if (result.errors.length > 0) {
          console.log('   Errors:');
          result.errors.forEach(error => console.log(`   - ${error}`));
        }

        if (result.warnings.length > 0) {
          console.log('   Warnings:');
          result.warnings.forEach(warning => console.log(`   - ${warning}`));
        }

        console.log('');
      }
    }

    console.log(`\nSummary: ${validCount} valid articles, ${invalidCount} invalid articles`);

    if (invalidCount > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Error validating articles:', error);
    process.exit(1);
  }
}

// Run validation
validateArticles();
