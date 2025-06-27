/* TODO 
1. Go to на https://demo.learnwebdriverio.com/
2. Create a new user and login
3. add parametrized number of articles.
4. Checks the added articles are shown in the list
*/

import { expect } from '@playwright/test';
// import { SignUpPage } from '../../../apps/conduitApp/pages/SignUpPage.po';
// import { AddArticlePage } from '../../../apps/conduitApp/pages/AddArticlePage.po';
import { test } from './fixtures/baseFixture'
import articleData from './test-data/article.json';

test.describe('register a user and add 3 articles', () => {

  test(
    'Demo-1: a new article should be successfully added',
    { tag: ['@demo', '@HW-classes', '@article'] },
    async ({ page, signUpPage, addArticlePage}) => {

      // preparing test data
      const timestamp = Date.now().toString();
      const neededNumberOfArticles = 2;
      const user =  {
        userName: `username${timestamp}`,
        userEmail: `userName${timestamp}@gmail1.com`,
        password: 'mypassword'
      }
      
      // register a new user
      await signUpPage.createUser(user);

      // create several articles according to the parameter neededNumberOfArticles
      await addArticlePage.createNArticles(articleData, timestamp, neededNumberOfArticles);
      await page.goto('/');

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
