// TODO
/*
1. Go to https://www.saucedemo.com/
2. login an existing user
3. add an item by ItemName in Cart
4. Go to cart
5. Check if added item is present in cart
6. Go to Checkout
7. fill in the checkout form with random data and click Continue
8. check if it is still an item from the cart
9. Click Finish
10. Check notification about a successful purchase
*/

import { expect } from "@playwright/test";
import { SAUCEDEMOUSERS } from '../../utils/sauceDemoUsers';
import { test } from "./fixtures/baseFixture"; // fixture 'test' was expanded with another fixture in file baseFixture
// pages
// pages are not needed because they came from fixture

// external libraries
import { faker } from "@faker-js/faker";

// ? How to use type that was declared in the page object file?
test.describe("Working with items list and cart. Positive cases:", () => {

  // before each was moved to fixture

  test(
    "OOP-1: Login, add an item to cart and purchase",
    { tag: "@hw-oop" },
    async ({ page, signInPage, inventoryPage, cartPage, checkoutPage }) => { //list all needed pages that came from fixture. 

      const user = {
        userName: SAUCEDEMOUSERS.standard_user,
        password: process.env.SAUCEDEMO_PASSWORD as string,
      };

      const checkoutUserInformation = {
        firstName: faker.internet.displayName(),
        lastName: faker.internet.displayName(),
        zipCode: faker.string.uuid(),
      };

      const itemName = "Sauce Labs Bike Light";

      // login an existing user
      await signInPage.userSignin(user);

      // add an item by ItemName
      await inventoryPage.inventoryItemComponent.addToCartByName(itemName);

      // go to the cart (first variant)
      //await page.goto('/cart.html');

      // go to the cart by clicking link in header (second variant)
      await inventoryPage.headerComponent.cartLinkClick();
      await cartPage.checkCurrentPageTitle("Your Cart");

      // check if added item is present in cart
      await expect(cartPage.getItemInCart(itemName)).toBeVisible();

      // go to checkout
      await cartPage.checkoutButtonLocator.click();
      await cartPage.checkCurrentPageTitle("Checkout: Your Information");

      // fill in the checkout form with random data and click continue
      await checkoutPage.fillInCheckoutInformation(checkoutUserInformation);
      await checkoutPage.continueButtonLocator.click();

      // check if it is still an item from the cart
      await expect(cartPage.getItemInCart(itemName)).toBeVisible();

      // click finish
      await checkoutPage.finishButtonLocator.click();

      // check notification about a successful purchase
      await checkoutPage.completeHeaderLocator.isVisible();
    }
  );
});
