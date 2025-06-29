import { test as base, chromium, expect } from "@playwright/test";
import { AddArticlePage } from "../../../../apps/conduitApp/pages/AddArticlePage.po";
import { ArticleDetailsPage } from "../../../../apps/conduitApp/pages/ArticleDetailsPage.po";
import { HomePage } from "../../../../apps/conduitApp/pages/HomePage.po";
import { SignUpPage } from "../../../../apps/conduitApp/pages/SignUpPage.po";

import fs from "fs";

type Pages = {
  addArticlePage: AddArticlePage;
  articleDetailsPage: ArticleDetailsPage;
  homePage: HomePage;
  signUpPage: SignUpPage;
};
export const test = base.extend<Pages>({

// this fixture do the following. Checks if a file with local storage data exists and create a new user (and login) if not.
// this local storage will be used for all tests where it will be added as a parameter for.
  storageState: async ({ browser }, use) => {
    const storageStatePath = ".auth/storage-state.json";
    const isStorageStateFileExist = fs.existsSync(storageStatePath);
    if (!isStorageStateFileExist) {
      const page = await browser.newPage();
      // preparing test data
      const timestamp = Date.now().toString();
      const user = {
        userName: `username${timestamp}`,
        userEmail: `userName${timestamp}@gmail1.com`,
        password: "mypassword",
      };
      const signUpPage = new SignUpPage(page);
      await signUpPage.createUser(user);
      await page.context().storageState({ path: storageStatePath as string });

      await page.close();
    }
    await use(storageStatePath);
  },
  page: async ({ page }, use) => {
    // here can be goto that will be executed for each test where this fixture is initiated for
    await use(page);
  },
  addArticlePage: async ({ page }, use) => {
    const addArticlePage = new AddArticlePage(page);
    await use(addArticlePage);
  },
  articleDetailsPage: async ({ page }, use) => {
    const articleDetailsPage = new ArticleDetailsPage(page);
    await use(articleDetailsPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
  signUpPage: async ({ page }, use) => {
    const signUpPage = new SignUpPage(page);
    await use(signUpPage);
  },
});
