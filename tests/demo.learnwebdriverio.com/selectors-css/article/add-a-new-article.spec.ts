/*
* Test objective: 
 - make sure a new crated user is able to add a new article with needed tags
* Test result: 
 - processes of user signup, sign in and adding a new article work properly 
* Test data: 
 - I need to a new user with generated email and name
 - I need an article that can be take in external JSON file
*/
import { test, expect } from '@playwright/test';
import articleData from './article.json';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com/register';

test.describe('Fields validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test(
    'Demo-1: a new article should be successfully added',
    { tag: ['@demo', '@HW2', '@article'] },
    async ({ page }) => {
      
      // test data
      let timestamp = Date.now();
      let userName = `Username${timestamp}`;
      let userEmail = `${userName}@gmail1.com`;

      // locators Sign Up
      const buttonSignUp = page.locator('.btn');
      const textboxUsername = page.locator('[placeholder="Username"]');
      const textboxEmail = page.locator('[placeholder="Email"]');
      const newUserHeader = page.locator(`a[href*="/@${userName}"]`);
      
      // locators Article
      const newArticle = page.locator('a[href*="/editor"]');
      const articleTitle = page.locator('input[placeholder="Article Title"]');
      const articleDescription = page.locator('input[placeholder="What\'s this article about?"]');
      const articleContent = page.locator('[placeholder="Write your article (in markdown)"]');
      const articleTags = page.locator('[placeholder="Enter tags"]');
      const publishArticleButton = page.locator('[data-qa-id="editor-publish"]');

      const addedArticleHeader = page.getByRole('heading', {
        name: articleData.articleTitle,
      });
      
      await test.step('create a new user and sign in', async (step) => {        
        await textboxUsername.fill(userName);
        await textboxEmail.fill(userEmail);
        //TODO BUG!!11 - field password is not required.
        await buttonSignUp.click();
        await expect(newUserHeader, 'user should be successfully created').toBeHidden();
      });

      await test.step('add an article', async (step) => {
        await newArticle.click();
        await articleTitle.fill(articleData.articleTitle);
        await articleDescription.fill(articleData.articleDescription);
        await articleContent.fill(articleData.articleContent);
        await articleTags.fill(`${articleData.articleTags[0]} ${articleData.articleTags[1]}`);
        await publishArticleButton.click();
        await expect(addedArticleHeader, 'a new article should be added').toBeVisible();
      });
    }
  );
});
