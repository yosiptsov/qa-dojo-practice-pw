/*
* Test objective: 
 - test the validators present on 'sign in user' form.
* Test result: 
 - all possible validators are covered
* Test data: 
 - examples of not allowed strings for fields userName amd email.
*/
import { test, expect } from '@playwright/test';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com/login';

test.describe('Fields validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Sign-in - 1: validators should appear for submitting empty form', {tag: ['@demo','@HW2', '@SignIn']}, async ({ page }) => {
    // locators
    const buttonSignIn = page.getByRole('button', { name: 'Sign in' });
    const emailValidatorMessage = page.getByText('email can\'t be blank');
    
    // validator message should be shown
    await buttonSignIn.click();
    await expect(emailValidatorMessage, 'email validator should be shown').toBeVisible();
    
    // validator messages should have proper style
    await expect(emailValidatorMessage, 'email validator should be red').toHaveCSS('color', 'rgb(184, 92, 92)');
    await expect(emailValidatorMessage, 'email validator should be bold').toHaveCSS('font-weight', '700');
  });

});