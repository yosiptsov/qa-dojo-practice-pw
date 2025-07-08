/*
* Test objective: 
  - make sure it is impossible to create a user with already existing userName amd email. 
  - related to this validators should be properly displayed.
* Test result: 
  - all possible validators are covered
* Test data: 
  - I need an already existing in system user. So, I need a step that adds it with a random name.
*/
import { test, expect } from '@playwright/test';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com/register';

test.describe('Fields validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Demo-3: using already existing userName and email should be forbidden', {tag: ['@demo','@HW2', '@SignUp']}, async ({ page }) => {

    // test data
    let timestamp = Date.now();
    let userName = `username${timestamp}`;
    let userEmail = `${userName}@gmail.com`;

    // locators
    const buttonSignUp = page.locator('.btn.btn-primary');
    const textboxUsername = page.locator('input[placeholder="Username"]');
    const textboxEmail = page.locator('input[placeholder="Email"]');
    const textboxPassword = page.locator('input[placeholder="Password"]');
    const newUserHeader = page.locator(`a[href*="/@${userName}"]`);
    const logoutButton = page.locator('button[class="btn btn-outline-danger"]');
    const usernameIsAlreadyExistsMessage = page.getByText('username is already taken.');
    const emailIsAlreadyExistsMessage = page.getByText('email is already taken.');
    
    // create a new user
    await textboxUsername.fill(userName);
    await textboxEmail.fill(userEmail);
    await textboxPassword.fill('password');
    
    //TODO: BUG!!!!111 - field password is not required.
    await buttonSignUp.click();
    
    //user was successfully created
    await expect(newUserHeader, 'user should be successfully created').toBeVisible(); 
    // sign out current user
    await page.goto('https://demo.learnwebdriverio.com/settings');
    await logoutButton.click();

    // try to create  user with the same credentials
    await page.goto(baseURL);
    await textboxUsername.fill(userName);
    await textboxEmail.fill(userEmail);
    await textboxPassword.fill('password');
    await buttonSignUp.click();

    // creating a user with already existing email or user name should be forbidden
    await expect(usernameIsAlreadyExistsMessage, 'validator message user is already taken should be shown').toBeVisible();
    await expect(emailIsAlreadyExistsMessage, 'validator message email is already taken should be shown').toBeVisible();
    
    await expect(usernameIsAlreadyExistsMessage, 'userName validator should be red').toHaveCSS('color', 'rgb(184, 92, 92)');
    await expect(emailIsAlreadyExistsMessage, 'email validator should be red').toHaveCSS('color', 'rgb(184, 92, 92)');
  });
});