import { test, expect, Page } from '@playwright/test';
import { SignUpPage, AddArticlePage } from './add-3-new-articles.po';
import { createUser, createNArticles } from './add-3-new-articles.helpers';
import articleData from './article.json';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com';

test.describe('register a user and add 3 articles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test(
    'Demo-1: a new article should be successfully added',
    { tag: ['@demo', '@HW2', '@article'] },
    async ({ page }) => {
      // preparing test data
      const timestamp = Date.now().toString();
      const userName = `username${timestamp}`;
      const userEmail = `${userName}@gmail1.com`;
      const password = 'mypassword';
      const neededNumberOfArticles = 2;

      //
      const signUpPage = new SignUpPage(page, userName);
      const addArticlePage = new AddArticlePage(page, timestamp, neededNumberOfArticles);

      // register a new user
      await createUser(userName, password, userEmail, page);
      await expect(signUpPage.newUserHeaderLocator, 'user should be successfully created').toBeVisible();

      // create several articles according to the parameter neededNumberOfArticles
      await createNArticles(page, articleData, timestamp, neededNumberOfArticles);
      await page.goto(baseURL);

      //expected results - version 1
      await expect(
        addArticlePage.createdArticleLocator.first(),
        'new added articles should be present in the list'
      ).toBeVisible();
      await expect(
        addArticlePage.createdArticleLocator,
        'new added articles should be present in the list'
      ).toHaveCount(neededNumberOfArticles);

      // ? how can I refactor this part using imported locators?
      //expected results - version 2
      // for (let i = 0; i < neededNumberOfArticles - 1; i++) {
      //   await expect(
      //     addArticlePage.createdArticleByNumberLocator(page, timestamp, i),
      //     `new added article ${i} of ${neededNumberOfArticles - 1} should be visible`
      //   ).toBeVisible();
      // }
    }
  );
});
