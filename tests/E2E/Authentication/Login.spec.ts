import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import testUsers from '../../../TestData/testUsers.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    
});

    // TC 002 - Verify redirection to Login page from "Login" button
    test('should redirect to Login page from "Login" button', async ({ page }) => {        

        // Verify login page elements are visible
        await expect(loginPage.emailField).toBeVisible();
        await expect(loginPage.passwordField).toBeVisible();
        await expect(loginPage.loginButton).toBeVisible();
        await expect(loginPage.loginWithGoogleButton).toBeVisible();
        await expect(loginPage.SignUpButton).toBeVisible();
    });

    // TC 003 - Verify "Login with Google" button redirects to Google sign-in dialog
    test('should redirect to Google sign-in dialog when "Login with Google" is clicked', async ({ page, context }) => {
        
        const page1Promise = page.waitForEvent('popup');
        await page.getByTestId('btn-google-auth').click();
        const page1 = await page1Promise;
        await expect(page1.getByText('Sign in with Google')).toBeVisible();

    });


    // TC 004 - Validate Email field - Valid email address
    test('should accept valid email format and login successfully', async ({ page }) => {
        

        await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
        await loginPage.fillPassword(testUsers.loginCredentials.validUser.password);
        await loginPage.clickLogin();
    
        // Check for profile icon appears
        await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible();
        // Check for Create new Project button appears
        await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
    });


    // TC 005 - Validate Email field - Invalid email address
    test('should show error for invalid email address format', async ({ page }) => {
        
        await loginPage.fillEmail(testUsers.loginCredentials.invalidEmailFormats[0]);
        await loginPage.fillPassword(testUsers.loginCredentials.validUser.password);
        await loginPage.clickLogin();

        // Verify validation error appears
        // Check if browser's native validation is preventing submission
            const emailValidity = await loginPage.emailField.evaluate(
                (el: HTMLInputElement) => el.validity.valid
            );
            expect(emailValidity).toBe(false); // Email should be invalid
        
            // Verify the create account button is still visible (form didn't submit)
            await expect(loginPage.loginButton).toBeVisible();
    });

    // TC 006 - Validate Password field - Invalid password - Unknown email address. Check again or try your username.
    test('Validate Password field - Invalid password', async ({ page }) => {
        
        await loginPage.fillEmail(testUsers.users[0].email);
        await loginPage.fillPassword(testUsers.users[0].shortPassword);
        await loginPage.clickLogin();

        // Verify no validation error for password
        await expect(page.getByText('Unknown email address. Check again or try your username.')).not.toBeVisible();
    });


    // TC 007 - Login with empty Email field
    test('should show error when Email field is empty', async ({ page }) => {
        
        await loginPage.fillPassword(testUsers.users[0].shortPassword);
        await loginPage.clickLogin();

        // Verify error message appears
        await expect(page.getByText('Field is required')).toBeVisible();
    });

    // TC 008 - Login with empty Password field
    test('should show error when Password field is empty', async ({ page }) => {
        
        await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
        await loginPage.clickLogin();

        // Verify error message appears
        await expect(page.getByText('Field is required')).toBeVisible();
    });

    // TC 009 - Login with incorrect credentials
    test('should show error message for incorrect credentials', async ({ page }) => {
    

        await loginPage.fillEmail(testUsers.loginCredentials.invalidCredentials.email);
        await loginPage.fillPassword(testUsers.loginCredentials.invalidCredentials.password);
        await loginPage.clickLogin();

        // Verify error message for invalid credentials
        await expect(page.getByText('Unknown email address. Check again or try your username.')).toBeVisible();
    });


    // TC 010 - Verify both fields empty
    test('should show error when both Email and Password fields are empty', async ({ page }) => {
        await loginPage.clickLogin();

        // Verify error messages appear for both fields
        await expect(page.getByText('Field is required').first()).toBeVisible();
    });


    // TC 011 - Click "Sign Up" button
    test('should navigate to Create Account page when "Sign Up" button is clicked', async ({ page }) => {
        await loginPage.SignUpButton.click();

        // Verify redirection to Create Account page
        await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Create account', exact: true })).toBeVisible();
    });