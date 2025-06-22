import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test('Coffee-1: empty tab title should be cart (0)', {tag: ['@coffee', '@HW1'] }, async ( {page} ) => {
    await expect(page.getByRole('listitem').filter({ hasText: 'cart (0)' })).toBeVisible();
});

test('Coffee-2: click cart (0) link should open the cart', {tag: ['@coffee', '@HW1'] }, async ({ page }) => {
    await page.getByRole('listitem').filter({ hasText: 'cart (0)' }).click();
    await expect(page.url()).toEqual('https://coffee-cart.app/cart');
});

test('Coffee 3: the cart should be empty by default and show proper text', {tag: ['@coffee', '@HW1'] }, async ({ page }) => {
    await page.getByRole('listitem').filter({ hasText: 'cart (0)' }).click();
    await expect(page.getByText('No coffee, go add some.')).toBeVisible();
    await expect(page.getByRole('paragraph')).toContainText('No coffee, go add some.');
});