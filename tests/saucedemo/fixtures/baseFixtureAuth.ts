import { test as base, expect, Page } from "@playwright/test";
import { SignInPage } from "../../../apps/saucedemoApp/pages/SignInPage";
import { InventoryPage } from "../../../apps/saucedemoApp/pages/InventoryPage";
import { CartPage } from "../../../apps/saucedemoApp/pages/CartPage";
import { CheckoutPage } from "../../../apps/saucedemoApp/pages/CheckoutPage";

import fs from "fs";

import { SAUCEDEMOUSERS } from "../../../utils/sauceDemoUsers";

type Pages = {
  signInPage: SignInPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  users: {
    standard_user: string;
    locked_out_user: string;
    problem_user: string;
    performance_glitch_user: string;
    error_user: string;
    visual_user: string;
  };
  userToLogin: string | undefined;
};

export const test = base.extend<Pages>({
  userToLogin: undefined,
  users: SAUCEDEMOUSERS,
  storageState: async ({ browser, userToLogin }, use) => {
    const storageStatePath = `.auth/${userToLogin}.json`;
    const isStorageStateFileExist = fs.existsSync(storageStatePath);
    if (!isStorageStateFileExist) {
      const page = await browser.newPage();
      const signInPage = new SignInPage(page);

      await page.goto("https://saucedemo.com");
      await signInPage.userSigninByUserName(userToLogin!);
      await expect(page.locator('[data-test="shopping-cart-link"]')).toBeVisible();

      await page.context().storageState({ path: storageStatePath as string });
      await page.close();
    }
    await use(storageStatePath);
  },
  page: async ({ page }, use) => {
    await page.goto("https://saucedemo.com");
    await use(page);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage); // works like return in functions...
  },
  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },
  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },
});
