import { BaseComponent } from "./BaseComponent";

export class HeaderComponent extends BaseComponent {
    async cartLinkClick() {
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
}
