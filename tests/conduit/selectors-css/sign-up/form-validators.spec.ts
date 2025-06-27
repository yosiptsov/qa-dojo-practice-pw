/*
* Test objective: 
 - test the validators present on 'sign up user' form.
* Test result: 
 - all possible validators are covered
* Test data: 
 - examples of not allowed strings for fields userName amd email.
*/
import { test, expect } from '@playwright/test';

// baseURL overwrite the baseURL in playwright.config.ts
const baseURL = 'https://demo.learnwebdriverio.com/register';

test.describe('Fields validations', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(baseURL);
  });

  test('Demo-4: validators should appear during submitting an empty form', {tag: ['@demo','@HW2','@SignUp']}, async ({ page }) => {
    // locators
    //const buttonSignUp = page.getByRole('button', { name: 'Sign up' });
    const buttonSignUp = page.locator('.btn');
    
    //const usernameValidatorMessage = page.locator('ul.error-messages > li:has-text("username can\'t be blank');
    //const emailValidatorMessage = page.locator('ul.error-messages > li:has-text("email can\'t be blank")');
    // const usernameValidatorMessage = page.locator('ul.error-messages > li :text("/.*username.*blank$/")');
    // const emailValidatorMessage = page.locator('ul.error-messages > li :text("email can\'t be blank")');
    const usernameValidatorMessage = page.getByText('username can\'t be blank');
    const emailValidatorMessage = page.getByText('email can\'t be blank');
    
    // validator message should be shown
    await buttonSignUp.click();
    await expect(usernameValidatorMessage, 'username validator should be shown').toBeVisible();
    await expect(emailValidatorMessage, 'email validator should be shown').toBeVisible();
    
    // validator messages should have proper style
    await expect(usernameValidatorMessage, 'username validator should be red').toHaveCSS('color', 'rgb(184, 92, 92)');
    await expect(usernameValidatorMessage, 'username validator should be bold').toHaveCSS('font-weight', '700');
    await expect(emailValidatorMessage, 'email validator should be red').toHaveCSS('color', 'rgb(184, 92, 92)');
    await expect(emailValidatorMessage, 'email validator should be bold').toHaveCSS('font-weight', '700');
  });

  test('Demo-5: special characters in fields "username"."email" should be validated', {tag: ['@demo','@HW2','@SignUp']}, async ({ page }) => {
    // locators
    const buttonSignUp = page.locator('.btn');
    
    const textboxUsername = page.locator('input[placeholder="Username"]');
    const textboxEmail = page.locator('input[placeholder="Email"]');
    const textboxPassword = page.locator('input[placeholder="Password"]');
    const usernameValidatorMessage = page.getByText('username is invalid');
    const emailValidatorMessage = page.getByText('email is invalid');
    
    await textboxUsername.fill('~!@#$%^&*()(*&^%$#@!~');
    await textboxEmail.fill('~!@#$%^&*&^%$#@!~');
    await textboxPassword.fill('password');
    await buttonSignUp.click();
    
    // validator message should be shown
    await expect(usernameValidatorMessage, 'username validator should be shown').toBeVisible();
    await expect(emailValidatorMessage, 'email validator should be show').toBeVisible();
    
    // validator messages should have proper style
    await expect(usernameValidatorMessage, 'username validator should be red').toHaveCSS('color', 'rgb(184, 92, 92)');
    await expect(usernameValidatorMessage, 'username validator should be bold').toHaveCSS('font-weight', '700');
    await expect(emailValidatorMessage, 'email validator should be red').toHaveCSS('color', 'rgb(184, 92, 92)');
    await expect(emailValidatorMessage, 'email validator should be bold').toHaveCSS('font-weight', '700');
  });
});
