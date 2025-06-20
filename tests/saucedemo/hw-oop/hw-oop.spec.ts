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
import { SignInPage } from '../saucedemoApp/SignInPage';
import { Header } from '../saucedemoApp/Header';
import { InventoryItemContainer } from '../saucedemoApp/InverntoryItemContainer';
import { CartPage } from '../saucedemoApp/CartPage';
import { CheckoutPage } from '../saucedemoApp/CheckoutPage';
import { faker } from '@faker-js/faker';

// ? you said baseUrl should be moved to a config file for each application. Is it ok to move it into the BasePage class?
const baseURL = 'https://www.saucedemo.com/';

// ? How to use type that was declared in the page object file?

test.describe('Home work - working with Classes/PageObjects + OOP', () => {
    test.beforeEach(async ({ page }) => {
        // ? is it correct to create a class instance in each test function? beforeEach and test OOP-1;
        const signInPage = new SignInPage(page);
        await signInPage.navigatePage(baseURL);
    });

    test('OOP-1', {tag: '@hw-oop'}, async ( {page} ) => {
        const signInPage = new SignInPage(page);
        const header = new Header(page);
        const inventoryItemContainer = new InventoryItemContainer(page);
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
        const prepareItemNameForLocator = (itemName: string) => itemName.replace(/ /g, '-').toLowerCase();

        // login an existing user
        await signInPage.userSignin(user);
        // I would add this expect in the function signInPage.userSignin. But this expect uses class header. How to use it in class SignInPage, import class header? 
        await expect(header.appLogoLocator).toBeVisible();

        // add an item by ItemName
        await inventoryItemContainer.clickAddToCartByItemName(prepareItemNameForLocator(itemName));

        // go to the cart (first variant)
        await header.navigatePage(baseURL, 'cart.html');

        // go to the cart by clicking link in header
        await header.shoppingCartLinkLocatorClick();
        await header.checkCurrentPageTitle('Your Cart');

        // check if added item is present in cart
        await expect(cartPage.getItemInCart(itemName)).toBeVisible();

        // go to checkout
        await cartPage.checkoutButtonLocator.click();
        await cartPage.checkCurrentPageTitle('Checkout: Your Information');

        // fill in the checkout form with random data and click continue
        await checkoutPage.fillInCheckoutInformation(checkoutUserInformation);
        console.log(checkoutUserInformation);
        await checkoutPage.continueButtonLocator.click();

        // check if it is still an item from the cart
        await expect(cartPage.getItemInCart(itemName)).toBeVisible();

        // click finish
        await checkoutPage.finishButtonLocator.click();

        // check notification about a successful purchase
        await checkoutPage.completeHeaderLocator.isVisible();
    }); 
});