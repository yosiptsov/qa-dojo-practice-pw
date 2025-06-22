import { test, expect } from '@playwright/test';

test.describe('oder cappuccino check it\'s price and total', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Coffee-4: cappuccino should have price $19.00', {tag: ['@coffee', '@HW1'] }, async ({ page }) => {
    await expect(page.locator('#app')).toContainText('Cappuccino $19.00');    
  });

  test('Coffee-5: total should show text Total: $19.00 after order cappuccino', {tag: ['@coffee', '@HW1'] }, async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(page.locator('[data-test="checkout"]')).toContainText(
      'Total: $19.00'
    );
  });

  test('Coffee-6: cart in main menu should show number 1 after order cappuccino', {tag: ['@coffee', '@HW1'] }, async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await expect(page.getByLabel('Cart page')).toContainText('cart (1)');
  });

  test('Coffee-7: page cart should show cappuccino, price $19.00, and total $19.00, ', {tag: ['@coffee', '@HW1'] }, async ({
    page,
  }) => {
    await page.locator('[data-test="Cappuccino"]').click();
    await page.getByRole('link', { name: 'Cart page' }).click();
    await expect(page.locator('#app')).toContainText('Cappuccino');
    await expect(page.locator('#app')).toContainText('$19.00 x 1');
    await expect(page.locator('#app')).toContainText('$19.00');
  });
});
