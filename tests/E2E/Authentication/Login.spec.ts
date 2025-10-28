import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Fixtures/Login';


let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();

});

/*
Test Case Name: Redirect to Login page from "Login" button
Steps:
1. Navigate to the application.
2. Click the "Login" button.
Expected Result:
- User is redirected to the Login page and all login elements are visible.
*/
// TC 001 - Verify redirection to Login page from "Login" button
test('should redirect to Login page from "Login" button', async ({ page }) => {

    // Verify login page elements are visible
    await expect(loginPage.emailField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
    await expect(loginPage.loginWithGoogleButton).toBeVisible();
    await expect(loginPage.SignUpButton).toBeVisible();
});

/*
Test Case Name: Login with Google button redirects to Google sign-in dialog
Steps:
1. On the Login page, click the "Login with Google" button.
Expected Result:
- Google sign-in dialog appears.
*/
// TC 002 - Verify "Login with Google" button redirects to Google sign-in dialog
test('should redirect to Google sign-in dialog when "Login with Google" is clicked', async ({ page, context }) => {

    const page1Promise = page.waitForEvent('popup');
    await page.getByTestId('btn-google-auth').click();
    const page1 = await page1Promise;
    await expect(page1.getByText('Sign in with Google')).toBeVisible();

});

/*
Test Case Name: Login with valid email and password
Steps:
1. Enter a valid email address in the Email field.
2. Enter a valid password in the Password field.
3. Click the Login button.
Expected Result:
- User is logged in successfully and profile icon and "Create new Project" button are visible.
*/
// TC 003 - Validate Email field - Valid email address
test('should accept valid email format and login successfully', async ({ page }) => {


    await loginPage.fillEmail('TestLoginvalid@example.com');
    await loginPage.fillPassword('P@ssw0rd123');
    await loginPage.clickLogin();

    // Check for profile icon appears
    await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible();
    // Check for Create new Project button appears
    await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
});

/*
Test Case Name: Show error for invalid email address format
Steps:
1. Enter an invalid email address in the Email field.
2. Enter a valid password in the Password field.
3. Click the Login button.
Expected Result:
- Email field is marked invalid and form is not submitted.
- Login button remains visible.
*/
// TC 004 - Validate Email field - Invalid email address
test('should show error for invalid email address format', async ({ page }) => {

    const invalidemail = 'invalidemail'; // Not a valid email format
    await loginPage.fillEmail(invalidemail);
    await loginPage.fillPassword('P@ssw0rd123');
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

/*
Test Case Name: Validate Password field - Invalid password
Steps:
1. Enter a valid email address in the Email field.
2. Enter an invalid password in the Password field.
3. Click the Login button.
Expected Result:
- No validation error for password.
- Error message for unknown email address is not visible.
*/
// TC 005 - Validate Password field - Invalid password - Unknown email address. Check again or try your username.
test('Validate Password field - Invalid password', async ({ page }) => {

    await loginPage.fillEmail('TestLoginvalid@example.com');
    await loginPage.fillPassword('Pass1');
    await loginPage.clickLogin();

    // Verify no validation error for password
    await expect(page.getByText('Unknown email address. Check again or try your username.')).not.toBeVisible();
});

/*
Test Case Name: Login with empty Email field
Steps:
1. Leave the Email field empty.
2. Enter a password in the Password field.
3. Click the Login button.
Expected Result:
- Error message "Field is required" appears for the Email field.
*/
// TC 006 - Login with empty Email field
test('should show error when Email field is empty', async ({ page }) => {

    await loginPage.fillPassword("shortP@ss1");
    await loginPage.clickLogin();

    // Verify error message appears under email field
    await expect(page.getByText('Field is required')).toBeVisible();
});

/*
Test Case Name: Login with empty Password field
Steps:
1. Enter a valid email address in the Email field.
2. Leave the Password field empty.
3. Click the Login button.
Expected Result:
- Error message "Field is required" appears for the Password field.
*/
// TC 007 - Login with empty Password field
test('should show error when Password field is empty', async ({ page }) => {

    await loginPage.fillEmail("TestLoginvalid@example.com");
    await loginPage.clickLogin();

    // Verify error message appears under Password field
    await expect(page.getByText('Field is required')).toBeVisible();
});

/*
Test Case Name: Login with incorrect credentials
Steps:
1. Enter an invalid email address in the Email field.
2. Enter an invalid password in the Password field.
3. Click the Login button.
Expected Result:
- Error message for invalid credentials is displayed.
*/
// TC 008 - Login with incorrect credentials
test('should show error message for incorrect credentials', async ({ page }) => {


    await loginPage.fillEmail("validuser@example.com");
    await loginPage.fillPassword("invalidpassword");
    await loginPage.clickLogin();

    // Verify error message for invalid credentials
    await expect(page.getByText('Unknown email address. Check again or try your username.')).toBeVisible();
});

/*
Test Case Name: Login with both fields empty
Steps:
1. Leave both Email and Password fields empty.
2. Click the Login button.
Expected Result:
- Error messages "Field is required" appear for both fields.
*/
// TC 09 - Verify both fields empty
test('should show error when both Email and Password fields are empty', async ({ page }) => {
    await loginPage.clickLogin();

    // Verify error messages appear for both fields
    await expect(page.getByText('Field is required').first()).toBeVisible();
});

/*
Test Case Name: Navigate to Create Account page from Sign Up button
Steps:
1. On the Login page, click the "Sign Up" button.
Expected Result:
- User is redirected to the Create Account page and all registration elements are visible.
*/
// TC 010 - Click "Sign Up" button
test('should navigate to Create Account page when "Sign Up" button is clicked', async ({ page }) => {
    await loginPage.SignUpButton.click();

    // Verify redirection to Create Account page
    await expect(page.getByRole('textbox', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
    await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Create account', exact: true })).toBeVisible();
});