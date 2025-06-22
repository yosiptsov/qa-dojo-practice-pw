import { BaseComponent } from './BaseComponent';
import { ItemLocators } from './ItemLocators';

export class CartItemComponent extends BaseComponent {
  locators: ItemLocators = new ItemLocators(this.page);

  async removeFromCartByName(productName: string) {
    await this.locators.getRemoveButtonByName(productName).click();
  }

  async getDescriptionByName(productName: string) {
    return this.locators.getDescriptionLocator(productName).textContent();
  }

  async getItemPrice(productName: string) {
    return this.locators.getProductTitleByName(productName).textContent();
  }
}
