import { Locator, Page , expect } from '@playwright/test';
  
type User = {
    userName: string,
    userEmail: string,
    password: string
}

export class SignUpPage {
  // class properties
  page: Page;
  buttonSignUpLocator: Locator;
  textboxUsernameLocator: Locator;
  textboxPasswordLocator: Locator;
  textboxEmailLocator: Locator;
  //newUserHeaderLocator: Locator;
  registerPage: string;
  // get locator of the created user
  private getUserProfileLocatorByUserName = (userName: string) => this.page.locator(`a[href*="/@${userName}"]`);

  constructor(page: Page) {
    this.page = page;
    this.buttonSignUpLocator = this.page.locator('.btn');
    this.textboxUsernameLocator = this.page.locator('[placeholder="Username"]');
    this.textboxPasswordLocator = this.page.locator('[placeholder="Password"]');
    this.textboxEmailLocator = this.page.locator('[placeholder="Email"]');
    this.registerPage = 'https://demo.learnwebdriverio.com/register';
  }

  // class methods
  async createUser(user: User) {
    await this.page.goto(this.registerPage);
    await this.textboxUsernameLocator.fill(user.userName);
    await this.textboxEmailLocator.fill(user.userEmail);
    await this.textboxPasswordLocator.fill(user.password);
    await this.buttonSignUpLocator.click();
    await expect(this.getUserProfileLocatorByUserName(user.userName), 'user should be successfully created').toBeVisible();
  }
}
