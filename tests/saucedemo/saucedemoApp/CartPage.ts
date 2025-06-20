import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    // page is inherited from BasePage
    checkoutButtonLocator: Locator;
    getItemInCart = (itemName: string) => this.page.locator('[data-test="inventory-item-name"]', { hasText: itemName });

    constructor(page: Page){
        super(page);
        this.checkoutButtonLocator = page.locator('[data-test="checkout"]');
    }
    
}