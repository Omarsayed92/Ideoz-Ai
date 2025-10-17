import { expect, type Locator, type Page } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly loginWithGoogleButton: Locator;
    //readonly forgetPasswordLink: Locator;
    readonly SignUpButton: Locator;
    readonly registerForFreeButton: Locator;
    readonly logInHeaderButton: Locator;

    readonly baseURL = 'https://app-test.ideoz.ai/';

    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'Email' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login', exact: true });
        this.loginWithGoogleButton = page.getByRole('button', { name: 'Login with Google' });
        // this.forgetPasswordLink = page.getByRole('link', { name: 'Forget password?' });
        this.SignUpButton = page.getByRole('button', { name: 'Sign up' });
        this.registerForFreeButton = page.getByRole('button', { name: 'Register for free' });
        this.logInHeaderButton = page.getByRole('button', { name: 'Login' });
    }

    async gotoLoginPage() {
        await this.page.goto(this.baseURL);
        await this.logInHeaderButton.click();
    }

    async clickLogInButton() {
        await this.logInHeaderButton.click();
    }

    async verifyLoginPageElements() {
        await expect(this.emailField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginButton).toBeVisible();
        await expect(this.loginWithGoogleButton).toBeVisible();
        //await expect(this.forgetPasswordLink).toBeVisible();
        await expect(this.SignUpButton).toBeVisible();
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async clickLogin() {
        await this.loginButton.click();
    }

    async clickLoginWithGoogle() {
        await this.loginWithGoogleButton.click();
    }

    async clickForgetPassword() {
        await this.forgetPasswordLink.click();
    }

    async clickCreateAccount() {
        await this.createAccountButton.click();
    }

    async login(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    

    async verifySuccessfulLogin() {
        // Verify user is redirected to dashboard/project page
        await expect(this.page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
    }

    async verifyGoogleSignInDialog() {
        // Wait for Google sign-in popup or dialog
        const googleSignInPage = await this.page.context().waitForEvent('page');
        await expect(googleSignInPage.url()).toContain('accounts.google.com');
        await googleSignInPage.close();
    }
}
