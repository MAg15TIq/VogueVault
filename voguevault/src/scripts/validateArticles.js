// This script validates the consistency between articles.ts and articlesData.ts
// It can be run directly with: npm run validate-articles

// Since this is a .js file that needs to import TypeScript, we need to use require syntax
const path = require('path');

// Register ts-node to handle TypeScript imports
require('ts-node').register({
  transpileOnly: true,
  compilerOptions: {
    module: 'commonjs',
    target: 'es2015',
    esModuleInterop: true,
  },
});

// Register tsconfig-paths to handle path aliases
require('tsconfig-paths').register({
  baseUrl: path.join(__dirname, '..'),
  paths: {
    '@/*': ['*'],
  },
});

// Import the validation function
const { validateArticles } = require('../utils/validateArticles');

// Run the validation
const result = validateArticles();

// Output the results
console.log('\n=== Article Validation Results ===\n');

if (result.warnings.length > 0) {
  console.warn('Warnings:');
  result.warnings.forEach(warning => console.warn(`- ${warning}`));
  console.log('');
}

if (result.errors.length > 0) {
  console.error('Errors:');
  result.errors.forEach(error => console.error(`- ${error}`));
  console.log('');
}

console.log(result.summary);

// Exit with an error code if there are errors
if (!result.isValid) {
  console.error('\nValidation failed! Please fix the errors before committing or building.');
  process.exit(1);
} else {
  console.log('\nValidation passed successfully!');
}
