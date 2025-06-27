/* TODO 
1. Go to на https://demo.learnwebdriverio.com/
2. Create a new user and login
3. add parametrized number of articles.
4. Checks the added articles are shown in the list
*/

import { expect } from '@playwright/test';
import { test } from './fixtures/baseFixture'
import articleData from './test-data/article.json';

test.describe('register a user and add 3 articles', () => {

  test(
    'Demo-1: a new article should be successfully added',
    { tag: ['@demo', '@HW-classes', '@article'] },
    async ({ page, signUpPage, addArticlePage, context}) => {

      // preparing test data
      const timestamp = Date.now().toString();
      const neededNumberOfArticles = 2;
      const user =  {
        userName: `username${timestamp}`,
        userEmail: `userName${timestamp}@gmail1.com`,
        password: 'mypassword'
      }
      
      // register a new user and login
      await signUpPage.createUser(user);

      //store existing user login state 
      const state = await context.storageState({ path: ".auth/storage-state.json" });

      // create several articles according to the parameter neededNumberOfArticles
      await addArticlePage.createNArticles(articleData, timestamp, neededNumberOfArticles);
      await page.goto('https://demo.learnwebdriverio.com');

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

  // here we say for the next test 'use this storageState', that was previously saved. So it should use user from the previous test
  test.use({ storageState: ".auth/storage-state.json" });

    test(
    'Demo-2: selecting a tag in section Popular tags should return articles that have this tag',
    { tag: ['@demo', '@HW-classes', '@article'] },
    async ({ signUpPage, homePage, page }) => {
        await page.goto('https://demo.learnwebdriverio.com');

      const tagName = 'demo';
  
      // it is unneeded now to create and login a user. User will be taken
      // await signUpPage.createUser(user);

      await homePage.yourFeedTabClick();
      await homePage.globalFeedTabClick();
      await homePage.getPopularTagByName(tagName).click();
      await homePage.checkIfTagIsPresentInListByTagname(tagName);
      await homePage.clickArticleByNumber(0);
      await homePage.checkIfTagIsPresentInListByTagname(tagName);
    }
  );
});
