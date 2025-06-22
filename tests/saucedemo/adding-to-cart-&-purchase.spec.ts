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

import { test, expect } from '@playwright/test'
// pages
import { SignInPage } from '../../apps/saucedemoApp/pages/SignInPage';
import { CartPage } from '../../apps/saucedemoApp/pages/CartPage';
import { CheckoutPage } from '../../apps/saucedemoApp/pages/CheckoutPage';

// external libraries
import { faker } from '@faker-js/faker';
import { InventoryPage } from '../../apps/saucedemoApp/pages/InventoryPage';

// ? How to use type that was declared in the page object file?
test.describe('Working with items list and cart. Positive cases:', () => {
    test.beforeEach(async ({ page }) => {
        // ? is it correct to create a class instance in each test function? beforeEach and test OOP-1;
        const signInPage = new SignInPage(page);
        await page.goto('/');
    });

    test('OOP-1: Login, add an item to cart and purchase', {tag: '@hw-oop'}, async ( {page} ) => {
        const signInPage = new SignInPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);

        const user = {
            userName: 'standard_user',
            password: 'secret_sauce'
        }

        const checkoutUserInformation = {
            firstName: faker.internet.displayName(),
            lastName: faker.internet.displayName(),
            zipCode: faker.string.uuid()
        }

        const itemName = 'Sauce Labs Bike Light';

        // login an existing user
        await signInPage.userSignin(user);

        // add an item by ItemName
        await inventoryPage.itemComponent.addToCartByName(itemName);

        // go to the cart (first variant)    
        //await page.goto('/cart.html');

        // go to the cart by clicking link in header
        await inventoryPage.headerComponent.cartLinkClick();
        await cartPage.checkCurrentPageTitle('Your Cart');

        // check if added item is present in cart
        await expect(cartPage.getItemInCart(itemName)).toBeVisible();

        // go to checkout
        await cartPage.checkoutButtonLocator.click();
        await cartPage.checkCurrentPageTitle('Checkout: Your Information');

        // fill in the checkout form with random data and click continue
        await checkoutPage.fillInCheckoutInformation(checkoutUserInformation);
        await checkoutPage.continueButtonLocator.click();

        // check if it is still an item from the cart
        await expect(cartPage.getItemInCart(itemName)).toBeVisible();

        // click finish
        await checkoutPage.finishButtonLocator.click();

        // check notification about a successful purchase
        await checkoutPage.completeHeaderLocator.isVisible();
    }); 
});