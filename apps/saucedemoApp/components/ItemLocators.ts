import { Page } from '@playwright/test'

export class ItemLocators {
  private page: Page;

  constructor(page: Page){
    this.page = page;
  }

  getProductTitleByName = (productName: string) =>
    this.page
      .getByRole("link", { name: productName })
      .locator("xpath=/ancestor::*[@data-test='inventory-item']");
  //? it did not work without 'xpath='. locator waits for CSS locator. Also, I saw a meaning that CSS selectors works faster than xpath selectors

  getAddToCartButtonByName = (productName: string) =>
    this.getProductTitleByName(productName).getByRole("button", {
      name: "Add to cart",
    });

  getRemoveButtonByName = (productName: string) =>
    this.getProductTitleByName(productName).getByRole("button", {
      name: "Remove",
    });

  getDescriptionLocator = (productName: string) =>
    this.getProductTitleByName(productName).locator(
      "[data-test='inventory-item-desc']"
    );

  getPriceLocator = (productName: string) =>
    this.getProductTitleByName(productName).locator(
      "[data-test='inventory-item-price']"
    );
}
