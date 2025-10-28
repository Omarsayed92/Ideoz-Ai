import { test, expect } from '@playwright/test';
import { Createaccount } from '../../Fixtures/Createaccount';


function generateUser(suffix = '') {
    const timestamp = Date.now();
    return {
        name: `Test User${suffix}`,
        email: `testuser_${timestamp}${suffix}@example.com`,
        password: 'P@ssw0rd123'
    };
}

let createaccount: Createaccount;

test.beforeEach(async ({ page }) => {

    createaccount = new Createaccount(page);
    await createaccount.gotoCreateAccountPage();
});

/**
 * TC 001 - Verify redirection to Create Account page and presence of key elements
 *
 * Name: Verify Create Account Page Elements
 *
 * Steps:
 * 1. Navigate to Create Account page
 * 2. Verify all key elements are present (name field, email field, password field, create account button)
 *
 * Expected Result:
 * - All page elements should be visible and accessible
 * - Create Account page should display correctly with all required fields
 */
test('should redirect to Create Account page from Register for free button', async ({ page }) => {
    await createaccount.verifyCreateAccountPageElements();
});

/**
 * TC 002 - Form Validation - Required Fields "Name field"
 *
 * Name: Verify Name field is required
 *
 * Steps:
 * 1. Leave Name field empty
 * 2. Fill Email field with valid email
 * 3. Fill Password field with valid password
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message should appear under Name field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('should keep Create account button disabled when Name field is empty', async ({ page }) => {
    const user = generateUser();

    await page.getByRole('textbox', { name: /email/i }).fill(user.email);
    await page.getByRole('textbox', { name: /password/i }).fill(user.password);
    await createaccount.clickCreateAccount();

    //Error message appears under Name field
    await expect(await createaccount.getErrorMessage()).toBeVisible();
});

/**
 * TC 003 - Form Validation - Required Fields "Email field"
 *
 * Name: Verify Email field is required
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Leave Email field empty
 * 3. Fill Password field with valid password
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message should appear under Email field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('should keep Create account button disabled when Email field is empty', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillPassword(user.password);
    await createaccount.clickCreateAccount();

    //Error message appears under Email field
    await expect(await createaccount.getErrorMessage()).toBeVisible();
});

/**
 * TC 004 - Form Validation - Required Fields "Password field"
 *
 * Name: Verify Password field is required
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with valid email
 * 3. Leave Password field empty
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message should appear under Password field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('should keep Create account button disabled when Password field is empty', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail(user.email);
    await createaccount.clickCreateAccount();

    //Error message appears under Password field
    await expect(await createaccount.getErrorMessage()).toBeVisible();
});

/**
 * TC 005 - Form Validation - Field Format
 *
 * Name: Verify successful form submission with valid data
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with valid unique email
 * 3. Fill Password field with valid password (meets all requirements)
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Account should be created successfully
 * - User should be redirected to dashboard/home page
 * - Profile icon should be visible
 * - Create new Project button should be visible
 */
test('Verify successful form submission with valid data', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail(user.email);
    await createaccount.fillPassword(user.password);
    await createaccount.clickCreateAccount();

    // Close the dialog


    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible();
    await page.getByRole('button').filter({ hasText: /^$/ }).click();

    // Check for profile icon appears
    await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible();
    // Check for Create new Project button appears
    await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
});

/**
 * TC 006 - Form Validation - Field Format "invalid email format"
 *
 * Name: Verify invalid email format is rejected
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with invalid email format (e.g., "invalid-email")
 * 3. Fill Password field with valid password
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Browser's native validation should prevent form submission
 * - Email field should be marked as invalid
 * - Create Account button should remain visible (form not submitted)
 * - Account should not be created
 */
test('should show error for invalid email format', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail('invalid-email');
    await createaccount.fillPassword(user.password);
    await createaccount.clickCreateAccount();

    // Check if browser's native validation is preventing submission
    const emailValidity = await createaccount.emailfield.evaluate(
        (el: HTMLInputElement) => el.validity.valid
    );
    expect(emailValidity).toBe(false); // Email should be invalid

    // Verify the create account button is still visible (form didn't submit)
    await expect(createaccount.createaccountbutton).toBeVisible();
});

/**
 * TC 007 - Form Validation - Password Validation (less than 8 characters)
 *
 * Name: Verify password minimum length requirement
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with valid email
 * 3. Fill Password field with password less than 8 characters (e.g., "Pwd!1")
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message "The password should include 8..." should appear under Password field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('Verify "Password" does not meet minimum length (less than 8 characters)', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail(user.email);
    await createaccount.fillPassword('Pwd!1');
    await createaccount.clickCreateAccount();

    //Error message appears under Password field
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

/**
 * TC 008 - Form Validation - Password Validation "Password without number"
 *
 * Name: Verify password requires a number
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with valid email
 * 3. Fill Password field with password without a number (e.g., "Password!!")
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message "The password should include 8..." should appear under Password field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('Verify "Password" does not include a number.', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail(user.email);
    await createaccount.fillPassword('Password!!');
    await createaccount.clickCreateAccount();

    //Error message appears under Password field
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

/**
 * TC 009 - Form Validation - Password Validation "Password without uppercase letter"
 *
 * Name: Verify password requires an uppercase letter
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with valid email
 * 3. Fill Password field with password without uppercase letter (e.g., "password123!!")
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message "The password should include 8..." should appear under Password field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('Verify "Password" does not include an uppercase letter.', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail(user.email);
    await createaccount.fillPassword('password123!!');
    await createaccount.clickCreateAccount();

    //Error message appears under Password field
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

/**
 * TC 010 - Form Validation - Password Validation "Password without lowercase letter"
 *
 * Name: Verify password requires a lowercase letter
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with valid email
 * 3. Fill Password field with password without lowercase letter (e.g., "PASSWORD123!!")
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message "The password should include 8..." should appear under Password field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('Verify "Password" does not include a lowercase letter.', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail(user.email);
    await createaccount.fillPassword('PASSWORD123!!');
    await createaccount.clickCreateAccount();

    //Error message appears under Password field
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

/**
 * TC 011 - Form Validation - Password Validation "Password without symbol"
 *
 * Name: Verify password requires a special character/symbol
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with valid email
 * 3. Fill Password field with password without symbol (e.g., "Password123")
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message "The password should include 8..." should appear under Password field
 * - Form submission should be prevented
 * - Account should not be created
 */
test('should keep Create account button disabled for password without symbol', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail(user.email);
    await createaccount.fillPassword('Password123');
    await createaccount.clickCreateAccount();

    //Error message appears under Password field
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

/**
 * TC 012 - Account Registration - Existing Email
 *
 * Name: Verify duplicate email registration is prevented
 *
 * Steps:
 * 1. Fill Name field with valid name
 * 2. Fill Email field with already registered email (e.g., "test01@example.com")
 * 3. Fill Password field with valid password
 * 4. Click Create Account button
 *
 * Expected Result:
 * - Error message "Oops!, this email address already registered before." should be visible
 * - Form submission should be prevented
 * - Duplicate account should not be created
 */
test('should show error for already registered email', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillName(user.name);
    await createaccount.fillEmail('test01@example.com');
    await createaccount.fillPassword(user.password);
    await createaccount.clickCreateAccount();

    //Error message appears
    await expect(page.getByText('Oops!, this email address already registered before.')).toBeVisible();
});

/**
 * TC 013 - Navigation - Privacy Policy link
 *
 * Name: Verify Privacy Policy link opens in new tab
 *
 * Steps:
 * 1. Click on Privacy Policy link
 * 2. Wait for new tab to open
 *
 * Expected Result:
 * - Privacy Policy should open in a new tab
 * - Privacy Policy page should display with heading "Privacy Policy"
 * - Original tab should remain on Create Account page
 */
test('should open Privacy Policy in a new tab when clicked', async ({ page }) => {
    const page1Promise = page.waitForEvent('popup');
    await page.getByTestId('link-privacy-policy').click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading', { name: 'Privacy Policy', exact: true })).toBeVisible();
});

/**
 * TC 014 - Navigation - Google Authentication
 *
 * Name: Verify Google Authentication opens in new tab
 *
 * Steps:
 * 1. Click on Google Authentication button
 * 2. Wait for new tab to open
 *
 * Expected Result:
 * - Google Authentication page should open in a new tab
 * - "Sign in with Google" text should be visible on the Google auth page
 * - Original tab should remain on Create Account page
 */
test('should open Google Authentication in a new tab when clicked', async ({ page }) => {
    const page2Promise = page.waitForEvent('popup');
    await page.getByTestId('btn-google-auth').click();
    const page2 = await page2Promise;
    await expect(page2.getByText('Sign in with Google')).toBeVisible();
});

/**
 * TC 015 - Navigation - Login CTA
 *
 * Name: Verify "Log in" button redirects to Login page
 *
 * Steps:
 * 1. Click on "Log in" button/link
 * 2. Wait for page to change
 *
 * Expected Result:
 * - User should be redirected to Login page
 * - Login page submit button should be visible
 * - URL should change to login page
 */
test('should redirect to Login page when "Log in" button is clicked', async ({ page }) => {
    await page.getByTestId('btn-switch-mode').click();
    await expect(page.getByTestId('btn-submit-auth')).toBeVisible();
});

/**
 * TC 016 - Security - Password Field Masking
 *
 * Name: Verify password field masks input
 *
 * Steps:
 * 1. Fill Password field with any password
 * 2. Check password field type attribute
 *
 * Expected Result:
 * - Password input field should have type="password"
 * - Password characters should be masked/hidden (displayed as dots or asterisks)
 * - Password value should not be visible in plain text
 */
test('should mask password input', async ({ page }) => {
    const user = generateUser();

    await createaccount.fillPassword(user.password);
    const passwordInput = page.getByTestId('input-password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
});








