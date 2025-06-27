/* TODO 
1. Go to на https://demo.learnwebdriverio.com/
2. Login
3. Go to the main page
4. Click Your Feed
5. Click Global Feed
6. click on of Popular Tags
7. Select the first article from the list after filtering by a tag
8. Make sure the selected article has needed tag
*/

import { expect, Page } from '@playwright/test';
import { test } from './fixtures/baseFixture'
// import { SignUpPage } from '../../../apps/conduitApp/pages/SignUpPage.po';
// import { HomePage } from '../../../apps/conduitApp/pages/HomePage.po';
// import { ArticleDetailsPage } from '../../../apps/conduitApp/pages/ArticleDetailsPage.po'

test.describe('filter by tag filters articles in feed properly', () => {

  test(
    'Demo-1: selecting a tag in section Popular tags should return articles that have this tag',
    { tag: ['@demo', '@HW-classes', '@article'] },
    async ({ page, signUpPage, homePage, articleDetailsPage}) => {

      // preparing test data
      const timestamp = Date.now().toString();
      const user =  {
        userName: `username${timestamp}`,
        userEmail: `userName${timestamp}@gmail1.com`,
        password: 'mypassword'
      }
      const tagName = 'demo';
  
      // register a new user
      await signUpPage.createUser(user);

      await homePage.yourFeedTabClick();
      await homePage.globalFeedTabClick();
      await homePage.getPopularTagByName(tagName).click();
      await homePage.checkIfTagIsPresentInListByTagname(tagName);

      await homePage.clickArticleByNumber(0);

      // the next 2 rows are identical. In the first row expect is a part of the class method
      await homePage.checkIfTagIsPresentInListByTagname(tagName);
      //await expect(articleDetailsPage.getTagByName(tagName)).toBeVisible();
    }
  );
});
