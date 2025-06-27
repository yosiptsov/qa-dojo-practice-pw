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
    'Article - 1: a new article should be successfully added',
    { tag: ['@demo', '@HW2', '@article'] },
    async ({ page }) => {
      // test data
      let userName = `Username${Date.now()}`;
      let userEmail = `${userName}@gmail.com`;

      // locators Sign Up
      const buttonSignUp = page.getByRole('button', { name: 'Sign up' });
      const textboxUsername = page.getByRole('textbox', { name: 'Username' });
      const textboxEmail = page.getByRole('textbox', { name: 'Email' });
      const newUserHeader = page.getByText(userName);
      

      // locators Article
      const newArticle = page.getByRole('link', { name: ' New Article' });
      const articleTitle = page.getByRole('textbox', { name: 'Article Title' });
      const articleDescription = page.getByRole('textbox', {
        name: "What's this article about?",
      });
      const articleContent = page.getByRole('textbox', {
        name: 'Write your article (in markdown)',
      });
      const articleTags = page.getByRole('textbox', { name: 'Enter tags' });
      const publishArticleButton = page.getByRole('button', {
        name: 'Publish Article',
      });
      const addedArticleHeader = page.getByRole('heading', {
        name: articleData.articleTitle,
      });
      
      await test.step('create a new user and sign in', async (step) => {        
        await textboxUsername.fill(userName);
        await textboxEmail.fill(userEmail);
        //TODO BUG!!!!111 - field password is not required.
        await buttonSignUp.click();
        //user was successfully created
        await expect(newUserHeader, 'user should be successfully created').toBeHidden();
      });

      await test.step('add an article', async (step) => {
        await newArticle.click();
        await articleTitle.fill(articleData.articleTitle);
        await articleDescription.fill(articleData.articleDescription);
        await articleContent.fill(articleData.articleContent);
        await articleTags.fill(`${articleData.articleTags[0]} ${articleData.articleTags[1]}`);
        await publishArticleButton.click();
        //An article was successfully created
        await expect(addedArticleHeader, 'a new article should be added').toBeVisible();
      });
    }
  );
});
