import { BaseComponent } from './BaseComponent';
import { ItemLocators } from './ItemLocators';

export class InventoryItemComponent extends BaseComponent {
  locators: ItemLocators = new ItemLocators(this.page);

  async addToCartByName(productName: string) {
    await this.locators.getAddToCartButtonByName(productName).click();
  }

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

// export class InventoryItemComponent extends BaseComponent {
//   getProductTitleByName = (productName: string) =>
//     this.page
//       .getByRole("link", { name: productName })
//       .locator("xpath=/ancestor::*[@data-test='inventory-item']");
//       //? it did not work without 'xpath='. locator waits for CSS locator. Also, I saw a meaning that CSS selectors works faster than xpath selectors

//   async addToCartByName(productName: string) {
//     await this.getProductTitleByName(productName)
//       .getByRole("button", {
//         name: "Add to cart",
//       })
//       .click();
//   }

//   async removeFromCartByName(productName: string) {
//     await this.getProductTitleByName(productName)
//       .getByRole("button", {
//         name: "Remove",
//       })
//       .click();
//   }

//   async getDescriptionByName(productName: string) {
//     return this.getProductTitleByName(productName)
//       .locator("[data-test='inventory-item-desc']")
//       .textContent();
//   }

//   async getItemPrice(productName: string) {
//     return this.getProductTitleByName(productName)
//       .locator("[data-test='inventory-item-price']")
//       .textContent();
//   }
// }
