// File: tests/E2E/Profile/ProfileAndMoreMenu.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import { ProfilePage } from '../../Page/Profile';
import testUsers from '../../../TestData/testUsers.json';

let loginPage: LoginPage;
let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);

    // Login before each test
    await loginPage.gotoLoginPage();
    await loginPage.fillEmail(testUsers.loginCredentials.validUser.email);
    await loginPage.fillPassword(testUsers.loginCredentials.validUser.password);
    await loginPage.clickLogin();

    // Wait for successful login
    await expect(profilePage.profileIcon).toBeVisible();
});

test.describe('More Menu Functionality', () => {

    // TC-001: Verify data in More slider
    test('should display all elements in More slider', async ({ page }) => {
        await profilePage.openMoreMenu();
        await profilePage.verifyMoreSliderElements();
    });

    // TC-003: Verify Help is clickable
    test('should redirect to help documentation when Help is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.helpOption.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/ideoz\.ai.*what-is-ideoz/i);
    });

    // TC-004: Verify Share icon is clickable
    test('should show confirmation message when Share is clicked', async ({ page }) => {
        await profilePage.openMoreMenu();
        await profilePage.shareOption.click();

        // Verify confirmation message or clipboard copy
        await expect(page.getByText(/copied/i).or(page.getByText(/link copied/i))).toBeVisible();
    });

    // TC-005: Verify data under Follow us
    test('should display all social media icons under Follow us', async ({ page }) => {
        await profilePage.openMoreMenu();
        await profilePage.verifySocialMediaIcons();
    });

    // TC-006: Verify The Tiktok icon is clickable and redirect to Ideoz page in tiktok
    test('should redirect to Ideoz TikTok page when TikTok icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.tiktokIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/tiktok\.com.*ideoz/i);
    });

    // TC-007: Verify The Instagram icon is clickable and redirect to Ideoz page in Instagram
    test('should redirect to Ideoz Instagram page when Instagram icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.instagramIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/instagram\.com.*ideoz/i);
    });

    // TC-008: Verify The Youtube icon is clickable and redirect to Ideoz page in Youtube
    test('should redirect to Ideoz YouTube page when YouTube icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.youtubeIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/youtube\.com/i);
    });

    // TC-009 Verify The Facebook icon is clickable and redirect to Ideoz page in Facebook
    test('should redirect to Ideoz Facebook page when Facebook icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.facebookIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/facebook\.com.*ideoz/i);
    });

    // TC-010: Verify The X icon is clickable and redirect to Ideoz page in X
    test('should redirect to Ideoz X page when X icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.xIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/x\.com.*ideoz|twitter\.com.*ideoz/i);
    });

    // TC-011: Verify The LinkedIn icon is clickable and redirect to Ideoz page in LinkedIn
    test('should redirect to Ideoz LinkedIn page when LinkedIn icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.linkedInIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/linkedin\.com.*ideoz/i);
    });
});

test.describe('Profile Page Functionality', () => {

    // TC-012: Verify The data appear in Profile page
    test('should display all elements on Profile page', async ({ page }) => {
        await profilePage.navigateToProfile();
        await profilePage.verifyProfilePageElements();
    });

    // TC-013: Verify access to Change Password dialog from Profile page
    test('should open Change Password dialog with all elements', async ({ page }) => {
        await profilePage.openChangePasswordDialog();

        await expect(profilePage.changePasswordDialog).toBeVisible();
        await expect(profilePage.newPasswordInput).toBeVisible();
        await expect(profilePage.submitChangePasswordButton).toBeVisible();
        await expect(profilePage.cancelButton).toBeVisible();

    });

    // TC-014: Verify "New Password" field is present and labeled correctly
    test('should display New Password input field with proper label', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await expect(profilePage.newPasswordInput).toBeVisible();
    });

    // TC-015: Verify "Change" button is present and disabled
    test('should display Change button and be disabled', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        // Button is disabled until valid password is entered, which is expected behavior
        await expect(profilePage.submitChangePasswordButton).toBeVisible();
        await expect(profilePage.submitChangePasswordButton).toBeDisabled();

    });

    // TC-018: Verify "Cancel" button is present and closes the dialog
    test('should close dialog when Cancel button is clicked', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await profilePage.cancelChangePassword();

        await expect(profilePage.changePasswordDialog).not.toBeVisible();
    });

    // TC-019: Verify "Close" dialog icon/button is present and closes the dialog
    test('should close dialog when Close icon is clicked', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('btn-close-change-password').click();
        await expect(page.getByTestId('profile-name-value')).toBeVisible();
        await expect(page.getByTestId('profile-email-section')).toBeVisible();
    });

    // TC-020: Verify successful password change with valid new password
    test('should change password successfully with valid new password', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await profilePage.changePassword('NewPassw0rd!');

        // Verify success message
        await expect(page.getByText(/password changed successfully|password.*updated/i)).toBeVisible();
    });

    // TC-021: Verify "New Password" field is required (empty submission)
    test('Button should be disabled when New Password field is empty', async ({ page }) => {
        await profilePage.openChangePasswordDialog();

        // Button should be disabled when field is empty
        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();
    });

    // TC-022: Verify "New Password" does not meet minimum length requirement
    test('Change password is disabled for password less than 8 characters', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await profilePage.newPasswordInput.fill(testUsers.users[0].shortPassword);

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();

    });

    // TC-023: Verify "New Password" does not include an uppercase letter
    test('should show error for password without uppercase letter', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('password123!!');
        await page.getByText('CancelChange').click();

        // Button should be disabled when field is empty
        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
    });

    // TC-024: Verify "New Password" does not include a lowercase letter
    test('should show error for password without lowercase letter', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('PASSWORD123!!');

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();
    });

    // TC-025: Verify "New Password" does not include a number
    test('should show error for password without number', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('password!!');

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();
    });

    // TC-026: Verify "New Password" does not include a symbol
    test('should show error for password without symbol', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('password123')

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
    });

    // TC-027: Verify password field masking
    test('should mask password input', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await expect(profilePage.newPasswordInput).toHaveAttribute('type', 'password');
    });

    // TC-028: Verify log out dialog appear
    test('should show logout dialog when Logout button is clicked', async ({ page }) => {
        await profilePage.navigateToProfile();
        await profilePage.clickLogout();

        await expect(profilePage.quitButton).toBeVisible();
        await expect(profilePage.continueButton).toBeVisible();
    });

    // TC-029: Verify Quit button logs out account
    test('should logout and redirect to home page when Quit is clicked', async ({ page }) => {
        await profilePage.navigateToProfile();
        await profilePage.clickLogout();
        await profilePage.confirmLogout();

        // Verify redirected to login/home page
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    });

    // TC-030: Verify Continue button keeps user in session
    test('should close dialog and keep user logged in when Continue is clicked', async ({ page }) => {
        await profilePage.navigateToProfile();
        await profilePage.clickLogout();
        await profilePage.cancelLogout();

        await expect(profilePage.logoutDialog).not.toBeVisible();
        await expect(profilePage.profileIcon).toBeVisible();
    });
});