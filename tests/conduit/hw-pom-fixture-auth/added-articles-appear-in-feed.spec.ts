/* TODO 
1. Go to на https://demo.learnwebdriverio.com/
2. Create a new user and login
3. add parametrized number of articles.
4. Checks the added articles are shown in the list
*/

import { expect } from "@playwright/test";
import { test } from "./fixtures/baseFixture";
import articleData from "./test-data/article.json";
// import fs from 'fs';

const storageStatePath = ".auth/storage-state.json";

test.describe("register a user and add 3 articles", () => {
  // user create/login is moved to fixture for the next tests
  // see storageState in baseFixture.ts.
  // it checks if file storage-state.json exists, than all tests will use this user state.
  // it creates and logins a new user if file doesn't exist.

  test(
    "Demo-1: a new article should be successfully added",
    { tag: ["@demo", "@HW-classes", "@article"] },
    async ({ page, signUpPage, addArticlePage, context }) => {
      const timestamp = Date.now().toString();
      const neededNumberOfArticles = 2;

      // create several articles according to the parameter neededNumberOfArticles
      await page.goto("/");
      await addArticlePage.createNArticles(
        articleData,
        timestamp,
        neededNumberOfArticles
      );
      await page.goto("/");

      await expect(
        addArticlePage.getCreatedArticle(timestamp).first(),
        "new added articles should be present in the list"
      ).toBeVisible();
      await expect(
        addArticlePage.getCreatedArticle(timestamp),
        "new added articles should be present in the list"
      ).toHaveCount(neededNumberOfArticles);
    }
  );

  // here we say for the next test 'use this storageState', that was previously saved. So it should use user from the previous test

  // test.use({ storageState: storageStatePath });

  test(
    "Demo-2: selecting a tag in section Popular tags should return articles that have this tag",
    { tag: ["@demo", "@HW-classes", "@article"] },
    async ({ homePage, page }) => {
      await page.goto("https://demo.learnwebdriverio.com");

      const tagName = "demo";

      await homePage.yourFeedTabClick();
      await homePage.globalFeedTabClick();
      await homePage.getPopularTagByName(tagName).click();
      await homePage.checkIfTagIsPresentInListByTagname(tagName);
      await homePage.clickArticleByNumber(0);
      await homePage.checkIfTagIsPresentInListByTagname(tagName);
    }
  );
});
