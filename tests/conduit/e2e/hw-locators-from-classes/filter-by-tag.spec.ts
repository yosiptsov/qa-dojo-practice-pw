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

import { test, expect, Page } from '@playwright/test';
import { SignUpPage } from './pages/SignUpPage.po';
import { HomePage } from './pages/HomePage.po'
import { ArticleDetailsPage } from './pages/ArticleDetailsPage.po'

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com';

test.describe('filter by tag filters articles in feed properly', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test(
    'Demo-1: selecting a tag in section Popular tags should return articles that have this tag',
    { tag: ['@demo', '@HW-classes', '@article'] },
    async ({ page }) => {

      // preparing test data
      const timestamp = Date.now().toString();
      const user =  {
        userName: `username${timestamp}`,
        userEmail: `userName${timestamp}@gmail1.com`,
        password: 'mypassword'
      }
      const tagName = 'demo';

      const signUpPage = new SignUpPage(page);
      const homePage = new HomePage(page);
      const articleDetailsPage = new ArticleDetailsPage(page);
  
      // register a new user
      await signUpPage.createUser(user);

      await homePage.youFeedTabLocator.click();
      await homePage.globalFeedTabLocator.click();
      await homePage.getPopularTagByName(tagName).click();
      await expect (homePage.articleTagListLocator, `tag: ${tagName} should be present in the list`).toContainText(tagName);

      await homePage.clickArticleByNumber(0);
      await expect(articleDetailsPage.getTagByName(tagName)).toBeVisible();
    }
  );
});
