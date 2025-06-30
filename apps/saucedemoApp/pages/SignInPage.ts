import { Page, Locator} from '@playwright/test'
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
    private userNameFieldLocator: Locator;
    private passwordFieldLocator: Locator;
    private loginButtonLocator: Locator;

    
    constructor(page: Page) {
        super(page); // page is inherited from class BasePage
        this.userNameFieldLocator = this.page.getByPlaceholder('Username');
        this.passwordFieldLocator = this.page.getByPlaceholder('Password');
        this.loginButtonLocator = this.page.getByRole('button', { name: 'Login' });
    }

    async userSignin(user: User) {
        await this.userNameFieldLocator.fill(user.userName);
        await this.passwordFieldLocator.fill(user.password);
        await this.loginButtonLocator.click();
    }

    async userSigninByUserName(user: string) {
        await this.userNameFieldLocator.fill(user);
        await this.passwordFieldLocator.fill(process.env.PASSWORD as string);
        await this.loginButtonLocator.click();
    }

}