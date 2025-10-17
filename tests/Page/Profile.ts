// File: tests/Page/ProfilePage.ts
import { expect, type Locator, type Page } from '@playwright/test';

export class ProfilePage {
    readonly page: Page;
    readonly profileIcon: Locator;
    readonly moreSlider: Locator;
    readonly profileOption: Locator;
    readonly helpOption: Locator;
    readonly shareOption: Locator;
    readonly followUsSection: Locator;
    readonly ideozPointsSection: Locator;

    // Profile page elements
    readonly nameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly changePasswordButton: Locator;
    readonly logoutButton: Locator;

    // Change Password Dialog
    readonly changePasswordDialog: Locator;
    readonly newPasswordInput: Locator;
    readonly submitChangePasswordButton: Locator;
    readonly cancelButton: Locator;
    readonly closeDialogButton: Locator;
    readonly passwordError: Locator;

    // Logout Dialog
    readonly logoutDialog: Locator;
    readonly quitButton: Locator;
    readonly continueButton: Locator;

    // Social Media Icons
    readonly tiktokIcon: Locator;
    readonly instagramIcon: Locator;
    readonly youtubeIcon: Locator;
    readonly facebookIcon: Locator;
    readonly xIcon: Locator;
    readonly linkedInIcon: Locator;

    constructor(page: Page) {
        this.page = page;

        // More menu elements
        this.profileIcon = page.getByRole('button', { name: 'T', exact: true });
        this.moreSlider = page.locator('[data-testid="more-slider"]').or(page.locator('aside')).or(page.locator('[role="complementary"]'));
        this.profileOption = page.getByRole('button', { name: /^profile$/i });
        this.helpOption = page.getByRole('link', { name: /help/i });
        this.shareOption = page.locator('button:has-text("Share")').or(page.getByRole('button', { name: /share/i }));
        this.followUsSection = page.getByText(/follow us/i);
        this.ideozPointsSection = page.getByText(/points remaining/i).first();

        // Profile page elements - these are display fields, not inputs
        this.nameField = page.locator('text=/name/i').first().or(page.getByText(/name/i));
        this.emailField = page.locator('text=/email/i').first().or(page.getByText(/email/i));
        this.passwordField = page.getByText(/^password$/i);
        this.changePasswordButton = page.getByRole('button', { name: /change password/i });
        this.logoutButton = page.getByRole('button', { name: /logout/i });

        // Change Password Dialog
        this.changePasswordDialog = page.locator('[role="dialog"]').filter({ hasText: /change password/i });
        this.newPasswordInput = page.getByRole('textbox', { name: /password/i }).or(page.locator('input[type="password"]'));
        this.submitChangePasswordButton = page.getByTestId('btn-submit-change-password');
        this.cancelButton = page.getByRole('button', { name: /cancel/i });
        this.closeDialogButton = page.locator('[role="dialog"] button[aria-label*="close" i]').or(page.locator('[role="dialog"] button:has-text("×")'));
        this.passwordError = page.getByText(/password should include 8/i).or(page.locator('.error-message'));

        // Logout Dialog
        this.logoutDialog = page.locator('[role="dialog"]').filter({ hasText: /logout/i });
        this.quitButton = page.getByRole('button', { name: /quit/i });
        this.continueButton = page.getByRole('button', { name: /continue/i });

        // Social Media Icons - using href attributes since they don't have aria-labels
        this.tiktokIcon = page.locator('a[href*="tiktok.com"]');
        this.instagramIcon = page.locator('a[href*="instagram.com"]');
        this.youtubeIcon = page.locator('a[href*="youtube.com"]');
        this.facebookIcon = page.locator('a[href*="facebook.com"]');
        this.xIcon = page.locator('a[href*="x.com"]');
        this.linkedInIcon = page.locator('a[href*="linkedin.com"]');
    }

    async openMoreMenu() {
        await this.profileIcon.click();
    }

    async navigateToProfile() {
        await this.openMoreMenu();
        await this.profileOption.click();
    }

    async openChangePasswordDialog() {
        await this.navigateToProfile();
        await this.changePasswordButton.click();
    }

    async changePassword(newPassword: string) {
        await this.newPasswordInput.fill(newPassword);
        await this.submitChangePasswordButton.click();
    }

    async cancelChangePassword() {
        await this.cancelButton.click();
    }

    async closeChangePasswordDialog() {
        await this.closeDialogButton.click();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async confirmLogout() {
        await this.quitButton.click();
    }

    async cancelLogout() {
        await this.continueButton.click();
    }

    async verifyMoreSliderElements() {
        await expect(this.profileOption).toBeVisible();
        await expect(this.helpOption).toBeVisible();
        await expect(this.shareOption).toBeVisible();
        await expect(this.followUsSection).toBeVisible();
        await expect(this.ideozPointsSection).toBeVisible();
    }

    async verifyProfilePageElements() {
        await expect(this.nameField).toBeVisible();
        await expect(this.emailField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.changePasswordButton).toBeVisible();
        await expect(this.logoutButton).toBeVisible();
    }

    async verifySocialMediaIcons() {
        await expect(this.tiktokIcon).toBeVisible();
        await expect(this.instagramIcon).toBeVisible();
        await expect(this.youtubeIcon).toBeVisible();
        await expect(this.facebookIcon).toBeVisible();
        await expect(this.xIcon).toBeVisible();
        await expect(this.linkedInIcon).toBeVisible();
    }
}