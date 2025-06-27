/* TODO 
1. Go to на https://demo.learnwebdriverio.com/
2. Create a new user and login
3. add parametrized number of articles.
4. Checks the added articles are shown in the list
*/

import { test, expect, Page, Locator } from '@playwright/test';
import { SignUpPage } from './pages/SignUpPage.po';
import { AddArticlePage } from './pages/AddArticlePage.po';
import articleData from './test-data/article.json';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com';

test.describe('register a user and add 3 articles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test(
    'Demo-1: a new article should be successfully added',
    { tag: ['@demo', '@HW-classes', '@article'] },
    async ({ page }) => {

      // preparing test data
      const timestamp = Date.now().toString();
      const neededNumberOfArticles = 2;
      const user =  {
        userName: `username${timestamp}`,
        userEmail: `userName${timestamp}@gmail1.com`,
        password: 'mypassword'
      }
      
      //create objects for needed classes
      const signUpPage = new SignUpPage(page);
      const addArticlePage = new AddArticlePage(page);

      // register a new user
      await signUpPage.createUser(user);

      // create several articles according to the parameter neededNumberOfArticles
      await addArticlePage.createNArticles(articleData, timestamp, neededNumberOfArticles);
      await page.goto(baseURL);

      //expected results - version 1
      await expect(
        addArticlePage.getCreatedArticle(timestamp).first(),
        'new added articles should be present in the list'
      ).toBeVisible();
      await expect(
        addArticlePage.getCreatedArticle(timestamp),
        'new added articles should be present in the list'
      ).toHaveCount(neededNumberOfArticles);
    }
  );
});
