// File: tests/E2E/Profile/ProfileAndMoreMenu.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Fixtures/Login';
import { ProfilePage } from '../../Fixtures/Profile';



let loginPage: LoginPage;
let profilePage: ProfilePage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    profilePage = new ProfilePage(page);

    // Login before each test
    await loginPage.gotoLoginPage();
    await loginPage.fillEmail("testuserprofile@example.com");
    await loginPage.fillPassword("NewPassw0rd!");
    await loginPage.clickLogin();

    // Wait for successful login
    await expect(profilePage.profileIcon).toBeVisible();
});

test.describe('More Menu Functionality', () => {

    /*
    Test Case Name: Display all elements in More slider
    Steps:
    1. Open the More menu.
    2. Wait for the slider to appear.
    3. Verify all expected elements are present.
    Expected Result:
    - All elements in the More slider are visible.
    */
    // TC-001: Verify data in More slider
    test('should display all elements in More slider', async ({ page }) => {
        await profilePage.openMoreMenu();
        await page.waitForTimeout(5000);
        await profilePage.verifyMoreSliderElements();
    });

    /*
    Test Case Name: Help option redirects to documentation
    Steps:
    1. Open the More menu.
    2. Click the Help option.
    3. Wait for new page to open.
    Expected Result:
    - New page opens with Ideoz help documentation URL.
    */
    // TC-002: Verify Help is clickable
    test('should redirect to help documentation when Help is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.helpOption.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/ideoz\.ai.*what-is-ideoz/i);
    });

    /*
    Test Case Name: Share icon shows confirmation
    Steps:
    1. Open the More menu.
    2. Click the Share icon.
    3. Wait for confirmation message.
    Expected Result:
    - Confirmation message 'Website Link Copied!' is visible.
    */
    // TC-004: Verify Share icon is clickable
    test('should show confirmation message when Share is clicked', async ({ page }) => {
        await profilePage.openMoreMenu();
        await profilePage.shareOption.click();
        await page.waitForTimeout(1000);

        // Verify confirmation message or clipboard copy

        await expect(page.getByText('Website Link Copied!')).toBeVisible();
        await expect(page.locator('div').filter({ hasText: /^Website Link Copied!$/ }).nth(4)).toBeVisible();
    });

    /*
    Test Case Name: Display all social media icons under Follow us
    Steps:
    1. Open the More menu.
    2. Verify all social media icons are present.
    Expected Result:
    - All social media icons are visible under Follow us section.
    */
    // TC-005: Verify data under Follow us
    test('should display all social media icons under Follow us', async ({ page }) => {
        await profilePage.openMoreMenu();
        await profilePage.verifySocialMediaIcons();
    });

    /*
    Test Case Name: TikTok icon redirects to Ideoz TikTok page
    Steps:
    1. Open the More menu.
    2. Click the TikTok icon.
    3. Wait for new page to open.
    Expected Result:
    - New page opens with Ideoz TikTok URL.
    */
    // TC-006: Verify The Tiktok icon is clickable and redirect to Ideoz page in tiktok
    test('should redirect to Ideoz TikTok page when TikTok icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.tiktokIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/tiktok\.com.*ideoz/i);
    });

    /*
    Test Case Name: Instagram icon redirects to Ideoz Instagram page
    Steps:
    1. Open the More menu.
    2. Click the Instagram icon.
    3. Wait for new page to open.
    Expected Result:
    - New page opens with Ideoz Instagram URL.
    */
    // TC-007: Verify The Instagram icon is clickable and redirect to Ideoz page in Instagram
    test('should redirect to Ideoz Instagram page when Instagram icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.instagramIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/instagram\.com.*ideoz/i);
    });

    /*
    Test Case Name: Youtube icon redirects to Ideoz YouTube page
    Steps:
    1. Open the More menu.
    2. Click the Youtube icon.
    3. Wait for new page to open.
    Expected Result:
    - New page opens with Ideoz YouTube URL.
    */
    // TC-008: Verify The Youtube icon is clickable and redirect to Ideoz page in Youtube
    test('should redirect to Ideoz YouTube page when YouTube icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.youtubeIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/youtube\.com/i);
    });

    /*
    Test Case Name: Facebook icon redirects to Ideoz Facebook page
    Steps:
    1. Open the More menu.
    2. Click the Facebook icon.
    3. Wait for new page to open.
    Expected Result:
    - New page opens with Ideoz Facebook URL.
    */
    // TC-009 Verify The Facebook icon is clickable and redirect to Ideoz page in Facebook
    test('should redirect to Ideoz Facebook page when Facebook icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.facebookIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/facebook\.com.*ideoz/i);
    });

    /*
    Test Case Name: X icon redirects to Ideoz X page
    Steps:
    1. Open the More menu.
    2. Click the X icon.
    3. Wait for new page to open.
    Expected Result:
    - New page opens with Ideoz X URL.
    */
    // TC-010: Verify The X icon is clickable and redirect to Ideoz page in X
    test('should redirect to Ideoz X page when X icon is clicked', async ({ page, context }) => {
        await profilePage.openMoreMenu();

        const pagePromise = context.waitForEvent('page');
        await profilePage.xIcon.click();
        const newPage = await pagePromise;

        await expect(newPage).toHaveURL(/x\.com.*ideoz|twitter\.com.*ideoz/i);
    });

    /*
    Test Case Name: LinkedIn icon redirects to Ideoz LinkedIn page
    Steps:
    1. Open the More menu.
    2. Click the LinkedIn icon.
    3. Wait for new page to open.
    Expected Result:
    - New page opens with Ideoz LinkedIn URL.
    */
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

    /*
    Test Case Name: Change Password dialog access
    Steps:
    1. Open the Change Password dialog from Profile page.
    2. Verify all elements are present in the dialog.
    Expected Result:
    - Change Password dialog is visible with all expected elements.
    */
    // TC-013: Verify access to Change Password dialog from Profile page
    test('should open Change Password dialog with all elements', async ({ page }) => {
        await profilePage.openChangePasswordDialog();

        await expect(profilePage.changePasswordDialog).toBeVisible();
        await expect(profilePage.newPasswordInput).toBeVisible();
        await expect(profilePage.submitChangePasswordButton).toBeVisible();
        await expect(profilePage.cancelButton).toBeVisible();

    });

    /*
    Test Case Name: New Password field presence and label
    Steps:
    1. Open the Change Password dialog.
    2. Verify the New Password input field is present and labeled correctly.
    Expected Result:
    - New Password input field is visible with the correct label.
    */
    // TC-014: Verify "New Password" field is present and labeled correctly
    test('should display New Password input field with proper label', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await expect(profilePage.newPasswordInput).toBeVisible();
    });

    /*
    Test Case Name: Change button presence and initial state
    Steps:
    1. Open the Change Password dialog.
    2. Verify the Change button is present and initially disabled.
    Expected Result:
    - Change button is visible and disabled until a valid password is entered.
    */
    // TC-015: Verify "Change" button is present and disabled
    test('should display Change button and be disabled', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        // Button is disabled until valid password is entered, which is expected behavior
        await expect(profilePage.submitChangePasswordButton).toBeVisible();
        await expect(profilePage.submitChangePasswordButton).toBeDisabled();

    });

    /*
    Test Case Name: Cancel button functionality
    Steps:
    1. Open the Change Password dialog.
    2. Click the Cancel button.
    3. Verify the dialog closes.
    Expected Result:
    - Change Password dialog is closed.
    */
    // TC-016: Verify "Cancel" button is present and closes the dialog
    test('should close dialog when Cancel button is clicked', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await profilePage.cancelChangePassword();

        await expect(profilePage.changePasswordDialog).not.toBeVisible();
    });

    /*
    Test Case Name: Close icon/button functionality
    Steps:
    1. Open the Change Password dialog.
    2. Click the Close icon/button.
    3. Verify the dialog closes.
    Expected Result:
    - Change Password dialog is closed.
    */
    // TC-017: Verify "Close" dialog icon/button is present and closes the dialog
    test('should close dialog when Close icon is clicked', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('btn-close-change-password').click();
        await expect(page.getByTestId('profile-name-value')).toBeVisible();
        await expect(page.getByTestId('profile-email-section')).toBeVisible();
    });

    /*
    Test Case Name: Successful password change
    Steps:
    1. Open the Change Password dialog.
    2. Enter a valid new password.
    3. Submit the change.
    Expected Result:
    - Password is changed successfully and a confirmation message is displayed.
    */
    // TC-018: Verify successful password change with valid new password
    test('should change password successfully with valid new password', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await profilePage.changePassword('NewPassw0rd!');

        // Verify success message
        await expect(page.getByText(/password changed successfully|password.*updated/i)).toBeVisible();
    });

    /*
    Test Case Name: New Password field required validation
    Steps:
    1. Open the Change Password dialog.
    2. Leave the New Password field empty.
    3. Attempt to submit the form.
    Expected Result:
    - Submission is disabled until the New Password field is filled.
    */
    // TC-019: Verify "New Password" field is required (empty submission)
    test('Button should be disabled when New Password field is empty', async ({ page }) => {
        await profilePage.openChangePasswordDialog();

        // Button should be disabled when field is empty
        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();
    });

    /*
    Test Case Name: New Password minimum length validation
    Steps:
    1. Open the Change Password dialog.
    2. Enter a password shorter than 8 characters.
    3. Attempt to submit the form.
    Expected Result:
    - Submission is disabled and an error message is displayed.
    */
    // TC-020: Verify "New Password" does not meet minimum length requirement
    test('Change password is disabled for password less than 8 characters', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await profilePage.newPasswordInput.fill("P@ss1");

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();

    });

    /*
    Test Case Name: New Password uppercase letter requirement
    Steps:
    1. Open the Change Password dialog.
    2. Enter a password without an uppercase letter.
    3. Attempt to submit the form.
    Expected Result:
    - Submission is disabled and an error message is displayed.
    */
    // TC-021: Verify "New Password" does not include an uppercase letter
    test('should show error for password without uppercase letter', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('password123!!');
        await page.getByText('CancelChange').click();

        // Button should be disabled when field is empty
        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
    });

    /*
    Test Case Name: New Password lowercase letter requirement
    Steps:
    1. Open the Change Password dialog.
    2. Enter a password without a lowercase letter.
    3. Attempt to submit the form.
    Expected Result:
    - Submission is disabled and an error message is displayed.
    */
    // TC-022: Verify "New Password" does not include a lowercase letter
    test('should show error for password without lowercase letter', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('PASSWORD123!!');

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();
    });

    /*
    Test Case Name: New Password number requirement
    Steps:
    1. Open the Change Password dialog.
    2. Enter a password without a number.
    3. Attempt to submit the form.
    Expected Result:
    - Submission is disabled and an error message is displayed.
    */
    // TC-023: Verify "New Password" does not include a number
    test('should show error for password without number', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('password!!');

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
        await expect(profilePage.changePasswordDialog).toBeVisible();
    });

    /*
    Test Case Name: New Password symbol requirement
    Steps:
    1. Open the Change Password dialog.
    2. Enter a password without a symbol.
    3. Attempt to submit the form.
    Expected Result:
    - Submission is disabled and an error message is displayed.
    */
    // TC-024: Verify "New Password" does not include a symbol
    test('should show error for password without symbol', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await page.getByTestId('input-new-password').fill('password123')

        await expect(profilePage.submitChangePasswordButton).toBeDisabled();
    });

    /*
    Test Case Name: Password field masking
    Steps:
    1. Open the Change Password dialog.
    2. Verify the password input is masked.
    Expected Result:
    - Password input is not visible, ensuring confidentiality.
    */
    // TC-025: Verify password field masking
    test('should mask password input', async ({ page }) => {
        await profilePage.openChangePasswordDialog();
        await expect(profilePage.newPasswordInput).toHaveAttribute('type', 'password');
    });

    /*
    Test Case Name: Logout dialog appearance
    Steps:
    1. Navigate to Profile page.
    2. Click the Logout button.
    3. Verify the logout dialog appears.
    Expected Result:
    - Logout dialog is visible with Quit and Continue options.
    */
    // TC-026: Verify log out dialog appear
    test('should show logout dialog when Logout button is clicked', async ({ page }) => {
        await profilePage.navigateToProfile();
        await profilePage.clickLogout();

        await expect(profilePage.quitButton).toBeVisible();
        await expect(profilePage.continueButton).toBeVisible();
    });

    /*
    Test Case Name: Quit button functionality
    Steps:
    1. Navigate to Profile page.
    2. Click the Logout button.
    3. Confirm logout action.
    Expected Result:
    - User is logged out and redirected to the home page.
    */
    // TC-027: Verify Quit button logs out account
    test('should logout and redirect to home page when Quit is clicked', async ({ page }) => {
        await profilePage.navigateToProfile();
        await profilePage.clickLogout();
        await profilePage.confirmLogout();

        // Verify redirected to login/home page
        await expect(page.getByTestId('btn-login')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
    });

    /*
    Test Case Name: Continue button functionality
    Steps:
    1. Navigate to Profile page.
    2. Click the Logout button.
    3. Cancel logout action.
    Expected Result:
    - Logout dialog is closed and user remains logged in.
    */
    // TC-028: Verify Continue button keeps user in session
    test('should close dialog and keep user logged in when Continue is clicked', async ({ page }) => {
        await profilePage.navigateToProfile();
        await profilePage.clickLogout();
        await profilePage.cancelLogout();

        await expect(profilePage.logoutDialog).not.toBeVisible();
        await expect(profilePage.profileIcon).toBeVisible();
    });
});