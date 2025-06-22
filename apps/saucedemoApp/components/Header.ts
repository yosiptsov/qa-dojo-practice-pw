import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../saucedemoApp/pages/BasePage';

export class Header extends BasePage {
    //page: Page;
    appLogoLocator: Locator;
    shoppingCartLinkLocator: Locator;

    constructor(page: Page){
        super(page);
        this.shoppingCartLinkLocator = page.locator('[data-test="shopping-cart-link"]');
        this.appLogoLocator = page.getByText('Swag Labs');
    }
    
    async shoppingCartLinkLocatorClick() {
        await this.shoppingCartLinkLocator.click();
    }

}