import { test, expect } from '@playwright/test';
import { Createaccount } from '../../Page/Createaccount';
import testUsers from '../../../TestData/testUsers.json';



let createaccount: Createaccount;
test.beforeEach(async ({ page }) => {
    createaccount = new Createaccount(page);
    await createaccount.gotoCreateAccountPage();
});

//TC 001 - Verify redirection to Create Account page and presence of key elements
test('should redirect to Create Account page from Register for free button', async ({ page }) => {
    await createaccount.verifyCreateAccountPageElements();
});

//TC 002 - Form Validation  - Required Fields "Name field"   
test('should keep Create account button disabled when Name field is empty', async ({ page }) => {
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.fillPassword(testUsers.users[0].password);
    await createaccount.clickCreateAccount();

    //Error message appears under Name field
    await expect(await createaccount.getErrorMessage()).toBeVisible();
});

//TC 003 - Form Validation - Required Fields "Email field"
test('should keep Create account button disabled when Email field is empty', async ({ page }) => {
    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillPassword(testUsers.users[0].password);
    await createaccount.clickCreateAccount();

    //Error message appears under Email field
    await expect(await createaccount.getErrorMessage()).toBeVisible();
});

//TC 004 - Form Validation - Required Fields "Password field"
test('should keep Create account button disabled when Password field is empty', async ({ page }) => {
    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.clickCreateAccount();

    //Error message appears under Password field
    await expect(await createaccount.getErrorMessage()).toBeVisible();
});

//TC 005 - Form Validation - Field Format
test('should accept English characters in Name field', async ({ page }) => {

    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.fillPassword(testUsers.users[0].password);
    await createaccount.clickCreateAccount();

    // Check for profile icon appears
    await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible();
    // Check for Create new Project button appears
    await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
});


//TC 006 - Form Validation - Field Format "invalid email format"
test('should show error for invalid email format', async ({ page }) => {

    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].invalidEmail);
    await createaccount.fillPassword(testUsers.users[0].password);
    await createaccount.clickCreateAccount();

    //Error message appears under Email field
    await expect(page.locator('text=/invalid.*email/i').first()).toBeVisible({ timeout: 5000 });

});

//TC 007 - Form Validation - Password Validation (less than 8 characters)
test('Verify "Password" does not meet minimum length (less than 8 characters)', async ({ page }) => {
    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.fillPassword(testUsers.users[0].shortPassword);
    await createaccount.clickCreateAccount();

    //Error message appears under Password field    
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

//TC 008 - Form Validation - Password Validation "Password without number"

test('Verify "Password" does not include a number.', async ({ page }) => {
    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.fillPassword(testUsers.users[0].passwordWithoutNumber);
    await createaccount.clickCreateAccount();

    //Error message appears under Password field    
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

//TC 009 - Form Validation - Password Validation "Password without uppercase letter"
test('Verify "Password" does not include an uppercase letter.', async ({ page }) => {
    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.fillPassword(testUsers.users[0].passwordWithoutUppercase);
    await createaccount.clickCreateAccount();
    //Error message appears under Password field    
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

//TC 010 - Form Validation - Password Validation "Password without lowercase letter"

test('Verify "Password" does not include a lowercase letter.', async ({ page }) => {

    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.fillPassword(testUsers.users[0].passwordWithoutLowercase);
    await createaccount.clickCreateAccount();

    //Error message appears under Password field    
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

//TC 011 - Form Validation - Password Validation "Password without symbol"
test('should keep Create account button disabled for password without symbol', async ({ page }) => {

    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].email);
    await createaccount.fillPassword(testUsers.users[0].passwordWithoutSymbol);
    await createaccount.clickCreateAccount();

    //Error message appears under Password field    
    await expect(page.getByText('The password should include 8').nth(1)).toBeVisible();
});

//TC 012 - Account Registration - Existing Email
test('should show error for already registered email', async ({ page }) => {
    await createaccount.fillName(testUsers.users[0].name);
    await createaccount.fillEmail(testUsers.users[0].existingEmail);
    await createaccount.fillPassword(testUsers.users[0].existingPassword);
    await createaccount.clickCreateAccount();
    //Error message appears
    await expect(page.getByText('Oops!, this email address already registered before.')).toBeVisible();

});

//TC 013 - Navigation - Privacy Policy link
test('should open Privacy Policy in a new tab when clicked', async ({ page }) => {
    const page1Promise = page.waitForEvent('popup');
    await page.getByTestId('link-privacy-policy').click();
    const page1 = await page1Promise;
    await expect(page1.getByRole('heading', { name: 'Privacy Policy', exact: true })).toBeVisible();
});

//TC 014 - Navigation - Google Authentication
test('should open Google Authentication in a new tab when clicked', async ({ page }) => {
    const page2Promise = page.waitForEvent('popup');
    await page.getByTestId('btn-google-auth').click();
    const page2 = await page2Promise;
    await expect(page2.getByText('Sign in with Google')).toBeVisible();
});

//TC 015 - Verify "Login" CTA redirects to Login page.
test('should redirect to Login page when "Log in" button is clicked', async ({ page }) => {
    await page.getByTestId('btn-switch-mode').click();
    await expect(page.getByTestId('btn-submit-auth')).toBeVisible();
});

//TC 016 - Verify password field masking.
test('should mask password input', async ({ page }) => {
    await createaccount.fillPassword(testUsers.users[0].password);
    const passwordInput = page.getByTestId('input-password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
});








