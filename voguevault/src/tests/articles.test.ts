import { validateArticles } from '@/utils/validateArticles';

describe('Article Data Validation', () => {
  test('articles.ts and articlesData.ts should be consistent', () => {
    const validationResult = validateArticles();
    
    // Log warnings but don't fail the test for them
    if (validationResult.warnings.length > 0) {
      console.warn('Article validation warnings:');
      validationResult.warnings.forEach(warning => console.warn(`- ${warning}`));
    }
    
    // Log errors and fail the test if there are any
    if (validationResult.errors.length > 0) {
      console.error('Article validation errors:');
      validationResult.errors.forEach(error => console.error(`- ${error}`));
    }
    
    // The test should fail if there are any errors
    expect(validationResult.isValid).toBe(true);
  });
});
