// Fixtures/DeleteProject.ts
import { Page, Locator, expect } from '@playwright/test';

export class DeleteProjectPage {
    readonly page: Page;

    // Locators
    readonly projectOptionsButton: Locator;
    readonly deleteProjectOption: Locator;
    readonly deleteDialog: Locator;
    readonly projectNameInput: Locator;
    readonly confirmDeleteButton: Locator;
    readonly closeButton: Locator;
    readonly cancelButton: Locator;
    readonly successMessage: Locator;
    readonly successIcon: Locator;
    readonly dashboardHeading: Locator;

    constructor(page: Page) {
        this.page = page;

        // Initialize all locators with flexible selectors
        this.projectOptionsButton = page.getByRole('button', { name: /Project options|options|more/i })
            .or(page.getByTestId('project-options-button'))
            .or(page.locator('button[aria-label*="options" i]'));

        this.deleteProjectOption = page.getByRole('menuitem', { name: /delete/i })
            .or(page.getByTestId('delete-project-option'))
            .or(page.locator('[role="menuitem"]:has-text("Delete")'));

        this.deleteDialog = page.locator('[role="dialog"]').filter({ hasText: /delete|confirm/i })
            .or(page.getByTestId('delete-project-dialog'))
            .or(page.locator('div[class*="dialog"]:has-text("Delete")'));

        this.projectNameInput = page.getByPlaceholder(/project name|confirm|type/i)
            .or(page.getByTestId('project-name-input'))
            .or(page.locator('[role="dialog"] input[type="text"]'));

        this.confirmDeleteButton = page.getByRole('button', { name: /^delete$/i })
            .or(page.getByTestId('confirm-delete-button'))
            .or(page.getByTestId('confirm-project-button'))
            .or(page.locator('[role="dialog"] button:has-text("Delete")'));

        this.closeButton = page.locator('[role="dialog"] button[aria-label*="close" i]')
            .or(page.getByTestId('close-button'))
            .or(page.locator('[role="dialog"] button:has-text("×")'));

        this.cancelButton = page.getByRole('button', { name: /cancel/i })
            .or(page.locator('[role="dialog"] button:has-text("Cancel")'));

        this.successMessage = page.getByText(/deleted|success/i)
            .or(page.getByRole('listitem'))
            .or(page.locator('[role="alert"]'));

        this.successIcon = page.locator('svg[class*="success"], svg[class*="check"]')
            .or(page.locator('svg').first());

        this.dashboardHeading = page.getByRole('heading', { name: /What problem are you working|dashboard/i })
            .or(page.getByTestId('dashboard-heading'));
    }

    /**
     * Opens the project options menu
     * @param index - Index of the project (default: 0 for first project)
     */
    async openProjectOptions(index: number = 0) {
        await this.projectOptionsButton.nth(index).click();
    }

    /**
     * Clicks the delete option from the project menu
     */
    async clickDeleteOption() {
        await this.deleteProjectOption.click();
    }

    /**
     * Opens the delete dialog for a project
     * @param index - Index of the project (default: 0 for first project)
     */
    async openDeleteDialog(index: number = 0) {
        await this.openProjectOptions(index);
        await this.clickDeleteOption();
        // Wait for dialog to appear with a longer timeout
        await this.deleteDialog.waitFor({ state: 'visible', timeout: 10000 });
    }

    /**
     * Enters the project name in the confirmation input
     * @param projectName - Name of the project to confirm deletion
     */
    async enterProjectName(projectName: string) {
        await this.projectNameInput.click();
        await this.projectNameInput.fill(projectName);
    }

    /**
     * Clicks the confirm delete button
     */
    async confirmDelete() {
        await this.confirmDeleteButton.click();
    }

    /**
     * Closes the delete dialog using the X button
     */
    async closeDialog() {
        await this.closeButton.first().click();
        await this.deleteDialog.waitFor({ state: 'hidden', timeout: 5000 });
    }

    /**
     * Cancels the deletion using the Cancel button
     */
    async cancelDeletion() {
        await this.cancelButton.click();
        await this.deleteDialog.waitFor({ state: 'hidden', timeout: 5000 });
    }

    /**
     * Complete delete flow: opens dialog, enters name, and confirms deletion
     * @param projectName - Name of the project to delete
     * @param index - Index of the project (default: 0 for first project)
     */
    async deleteProject(projectName: string, index: number = 0) {
        await this.openDeleteDialog(index);
        await this.enterProjectName(projectName);
        await this.confirmDelete();
    }

    /**
     * Verifies the delete button is disabled
     */
    async verifyDeleteButtonDisabled() {
        await expect(this.confirmDeleteButton).toBeDisabled();
    }

    /**
     * Verifies the delete button is enabled
     */
    async verifyDeleteButtonEnabled() {
        await expect(this.confirmDeleteButton).toBeEnabled();
    }

    /**
     * Verifies the delete dialog is visible
     */
    async verifyDialogVisible() {
        await expect(this.deleteDialog).toBeVisible();
    }

    /**
     * Verifies the delete dialog is hidden
     */
    async verifyDialogHidden() {
        await expect(this.deleteDialog).toBeHidden();
    }

    /**
     * Verifies the success message after deletion
     * @param projectName - Name of the deleted project
     */
    async verifySuccessMessage(projectName: string) {
        // Wait for and verify the specific deletion success message
        const deletionMessage = this.page.getByText(`Project "${projectName}" deleted`)
            .or(this.page.getByText(new RegExp(`.*${projectName}.*deleted`, 'i')));
        await expect(deletionMessage).toBeVisible();
    }

    /**
     * Verifies user is redirected to dashboard
     */
    async verifyDashboardRedirect() {
        await expect(this.dashboardHeading).toBeVisible();
    }

    /**
     * Gets project card locator by name
     * @param projectName - Name of the project
     */
    getProjectCard(projectName: string): Locator {
        return this.page.locator('div').filter({ hasText: new RegExp(`^${projectName}$`) }).nth(1);
    }

    /**
     * Verifies project card is visible
     * @param projectName - Name of the project
     */
    async verifyProjectCardVisible(projectName: string) {
        await expect(this.getProjectCard(projectName)).toBeVisible();
    }

    /**
     * Checks if project exists in the list
     * @param projectName - Name of the project
     */
    async isProjectDeleted(projectName: string): Promise<boolean> {
        const count = await this.getProjectCard(projectName).count();
        return count === 0;
    }
}