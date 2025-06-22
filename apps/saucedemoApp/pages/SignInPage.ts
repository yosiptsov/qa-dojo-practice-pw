import { Page } from '@playwright/test'
import { BasePage } from './BasePage';

// ? How to use type that was declared in the page object file?
// type User = {
//     userName: 'standard_user' | 'locked_out_user' | 'problem_user' | 'performance_glitch_user' | 'error_user' | 'visual_user',
//     password: 'secret_sauce'
// }

type User = {
    userName: string,
    password: string
}

export class SignInPage extends BasePage {
    // attributes
    // page: Page; page is inherited from class BasePage

    constructor(page: Page) {
        super(page); // page is inherited from class BasePage
    }

    async userSignin(user: User) {
        await this.page.locator('[data-test="username"]').fill(user.userName);
        await this.page.locator('[data-test="password"]').fill(user.password);
        await this.page.locator('[data-test="login-button"]').click();
    }

}