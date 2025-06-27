import { test as base, Page } from "@playwright/test";
import { SignInPage } from "../../../apps/saucedemoApp/pages/SignInPage";
import { InventoryPage } from "../../../apps/saucedemoApp/pages/InventoryPage";
import { CartPage } from "../../../apps/saucedemoApp/pages/CartPage";
import { CheckoutPage } from "../../../apps/saucedemoApp/pages/CheckoutPage";

type Pages = {
  signInPage: SignInPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<Pages>({
  page: async ({ page }, use) => {
    await page.goto("https://saucedemo.com");
    await use(page);
    console.log("fixture works!!!")
    
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
