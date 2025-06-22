import { Page, Locator } from '@playwright/test'
import { BasePage } from './BasePage';
import { CartItemComponent } from '../components/CartItemComponent';

export class CartPage extends BasePage {
    // page is inherited from BasePage
    cartItemComponent: CartItemComponent;
    checkoutButtonLocator: Locator;
    getItemInCart = (itemName: string) => this.page.locator('[data-test="inventory-item-name"]', { hasText: itemName });

    constructor(page: Page){
        super(page);
        this.checkoutButtonLocator = page.locator('[data-test="checkout"]');
        this.cartItemComponent = new CartItemComponent(this.page);
    }
    
}