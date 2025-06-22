import { Page, Locator, expect } from '@playwright/test'
import { BasePage } from '../pages/BasePage';

export class InventoryItemContainer extends BasePage {
    // page is inherited from BasePage

    constructor(page: Page){
        super(page);
    }

    // ? Do I need to add this locators into constructor somehow? It has parameter, and I think it is not needed.
    async clickAddToCartByItemName (itemName: string) {
        await this.page.locator(`[data-test="add-to-cart-${itemName}"]`).click();
        await expect(this.page.locator(`[data-test="remove-${itemName}"]`)).toHaveText('Remove');
    }

    async clickAddToCartByNumber (itemNumber = 0) {
        await this.page.locator('[data-test^="add-to-cart"]').nth(itemNumber).click();
        await expect(this.page.locator('[data-test^="remove-"]')).toHaveText('Remove');
    }
}