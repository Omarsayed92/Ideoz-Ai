import { expect, type Locator, type Page } from '@playwright/test';

export class Createaccount {
    readonly page: Page;
    readonly namefield: Locator;
    readonly emailfield: Locator;
    readonly passwordfield: Locator;
    readonly createaccountbutton: Locator;
    readonly privacypolicylink: Locator;
    readonly loginbutton: Locator;

    readonly baseURL = 'https://app-test.ideoz.ai/';

    constructor(page: Page) {
        this.page = page;
        this.namefield = page.getByRole('textbox', { name: 'Name' });
        this.emailfield = page.getByRole('textbox', { name: 'Email' });
        this.passwordfield = page.getByRole('textbox', { name: 'Password' });
        this.createaccountbutton = page.getByRole('button', { name: 'Create account', exact: true });
        this.privacypolicylink = page.getByRole('link', { name: 'privacy policy' });
        this.loginbutton = page.getByRole('button', { name: 'Log in' });
    }

    async gotoCreateAccountPage() {
        await this.page.goto(this.baseURL);
        await this.page.getByRole('button', { name: 'Register for free' }).click();
    }

    async verifyCreateAccountPageElements() {
        await expect(this.namefield).toBeVisible();
        await expect(this.emailfield).toBeVisible();
        await expect(this.passwordfield).toBeVisible();
        await expect(this.createaccountbutton).toBeVisible();
        await expect(this.privacypolicylink).toBeVisible();
        await expect(this.loginbutton).toBeVisible();
    }

    async fillName(name: string) {
        await this.namefield.fill(name);
    }

    async fillEmail(email: string) {
        await this.emailfield.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordfield.fill(password);
    }

    async clickCreateAccount() {
        await this.createaccountbutton.click();
    }

    async getErrorMessage() {
        return this.page.getByText('Field is required');
    }

    async getErrorPasswordMessage() {
        return this.page.getByText('The password should include 8');
    }
}