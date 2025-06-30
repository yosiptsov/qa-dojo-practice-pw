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
import { SAUCEDEMOUSERS } from "../../utils/sauceDemoUsers";
import { test } from "./fixtures/baseFixtureAuth"; // fixture 'test' was expanded with another fixture in file baseFixture
// pages
// pages are not needed because they came from fixture

// external libraries
import { faker } from "@faker-js/faker";

// ? How to use type that was declared in the page object file?
test.describe("Working with items list and cart. Positive cases:", () => {
  // before each was moved to fixture

  test.use({ userToLogin: SAUCEDEMOUSERS.standard_user });

  test(
    "Auth01: Login as standard_user",
    { tag: "@hw-oop" },
    async ({ page, signInPage, inventoryPage, cartPage, checkoutPage }) => {
      //list all needed pages that came from fixture.
      // login an existing user
      // user is logged in from fixture.
      //! ATTENTION this is just an example how to use login from .AUTH from different users. If a login file for a user already exists,
      //! it uses existing session. If not, logins and creates this file.
      //! BUT this side doesn't support usual login session, so this test will not work.
      //await signInPage.userSignin(user);
    }
  );

  test.use({ userToLogin: SAUCEDEMOUSERS.error_user });

  test(
    "Auth02: Login as error_user",
    { tag: "@hw-oop" },
    async ({ page, signInPage, inventoryPage, cartPage, checkoutPage }) => {

    }
  );
});
