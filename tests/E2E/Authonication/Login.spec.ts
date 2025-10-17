import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import testUsers from '../../../TestData/testUsers.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

// TC 001 - Open Ideoz landing page
test('should open Ideoz landing page successfully', async ({ page }) => {
    await expect(page).toHaveURL('https://app-test.ideoz.ai/');
    await expect(page.getByRole('button', { name: 'Register for free' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
});

// TC 002 - Verify redirection to Login page from "Log in" button
test('should redirect to Login page from "Log in" button', async ({ page }) => {
    await loginPage.clickLogInButton();

    // Verify login page elements are visible
    await expect(loginPage.emailField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginWithGoogleButton).toBeVisible();
    await expect(loginPage.forgetPasswordLink).toBeVisible();
    await expect(loginPage.createAccountButton).toBeVisible();
});

// TC 003 - Verify "Login with Google" button redirects to Google sign-in dialog
test('should redirect to Google sign-in dialog when "Login with Google" is clicked', async ({ page, context }) => {
    await loginPage.clickLogInButton();

    // Listen for new page (popup)
    const [googlePage] = await Promise.all([
        context.waitForEvent('page'),
        loginPage.clickLoginWithGoogle()
    ]);

    // Verify Google sign-in URL
    await expect(googlePage).toHaveURL(/accounts\.google\.com/);
    await googlePage.close();
});

// TC 004 - Validate Email field - Valid email address
test('should accept valid email address format', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
    await loginPage.fillPassword(testUsers.loginCredentials.validUser.password);

    // Verify no validation error appears for valid email
    await expect(page.getByText(/invalid email address/i)).not.toBeVisible();
});

// TC 005 - Validate Email field - Invalid email address
test('should show error for invalid email address format', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.invalidEmailFormats[0]);
    await loginPage.fillPassword('ValidPassword123');
    await loginPage.clickLogin();

    // Verify validation error appears
    await expect(page.getByText(/invalid email address/i)).toBeVisible();
});

// TC 006 - Validate Password field - Valid password
test('should accept valid password', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
    await loginPage.fillPassword(testUsers.loginCredentials.validUser.password);

    // Verify no validation error for password
    await expect(page.getByText('The password should include 8')).not.toBeVisible();
});

// TC 007 - Validate Password field - Invalid password (too short)
test('should show error for password that does not meet minimum length', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
    await loginPage.fillPassword(testUsers.loginCredentials.invalidPasswords[0]);
    await loginPage.clickLogin();

    // Verify validation error appears
    await expect(page.getByText('The password should include 8')).toBeVisible();
});

// TC 008 - Click "Forget password" CTA
test('should navigate to password recovery page when "Forget password?" is clicked', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.clickForgetPassword();

    // Verify redirection to password recovery page
    await expect(page.getByRole('heading', { name: /reset password|forgot password/i }).or(page.getByRole('textbox', { name: 'Email' }))).toBeVisible();
});

// TC 009 - Click "Create Account" button
test('should navigate to Create Account page when "Create account" button is clicked', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.clickCreateAccount();

    // Verify redirection to Create Account page
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create account', exact: true })).toBeVisible();
});

// TC 010 - Successful login with valid credentials
test('should login successfully with valid credentials', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
    await loginPage.fillPassword(testUsers.loginCredentials.validUser.password);
    await loginPage.clickLogin();

    // Verify successful login - check for dashboard elements
    await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
});

// TC 011 - Login with empty Email field
test('should show error when Email field is empty', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillPassword('ValidPassword123');
    await loginPage.clickLogin();

    // Verify error message appears
    await expect(page.getByText('Field is required')).toBeVisible();
});

// TC 012 - Login with empty Password field
test('should show error when Password field is empty', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
    await loginPage.clickLogin();

    // Verify error message appears
    await expect(page.getByText('Field is required')).toBeVisible();
});

// TC 013 - Login with incorrect credentials
test('should show error message for incorrect credentials', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.invalidCredentials.email);
    await loginPage.fillPassword(testUsers.loginCredentials.invalidCredentials.password);
    await loginPage.clickLogin();

    // Verify error message for invalid credentials
    await expect(page.getByText(/invalid credentials|incorrect|wrong password|authentication failed/i)).toBeVisible();
});

// TC 014 - Login with non-existent account
test('should show error message for non-existent account', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.nonExistentUser.email);
    await loginPage.fillPassword(testUsers.loginCredentials.nonExistentUser.password);
    await loginPage.clickLogin();

    // Verify error message for non-existent account
    await expect(page.getByText(/invalid credentials|user not found|account does not exist/i)).toBeVisible();
});

// TC 015 - Verify all login page elements are present
test('should display all required login page elements', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.verifyLoginPageElements();
});

// TC 016 - Verify email field validation on blur
test('should validate email field on blur', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.emailField.click();
    await loginPage.emailField.fill(testUsers.loginCredentials.invalidEmailFormats[0]);
    await loginPage.passwordField.click(); // Trigger blur

    // Verify inline validation error
    await expect(page.getByText(/invalid email address/i)).toBeVisible();
});

// TC 017 - Verify both fields empty
test('should show error when both Email and Password fields are empty', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.clickLogin();

    // Verify error messages appear for both fields
    await expect(page.getByText('Field is required').first()).toBeVisible();
});

// TC 018 - Verify email field accepts special characters in valid format
test('should accept email with special characters in valid format', async ({ page }) => {
    await loginPage.clickLogInButton();

    await loginPage.fillEmail(testUsers.loginCredentials.validEmailFormats[1]);
    await loginPage.fillPassword('ValidPassword123');

    // Verify no validation error appears
    await expect(page.getByText(/invalid email address/i)).not.toBeVisible();
});
