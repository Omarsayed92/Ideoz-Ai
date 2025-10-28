// tests/Fixtures/UpdateProjectContext.ts
import { Page, Locator } from '@playwright/test';

export class UpdateProjectContextPage {
    readonly page: Page;
    readonly updateContextButton: Locator;
    readonly contextDialog: Locator;
    readonly projectNameInput: Locator;
    readonly scopeEditor: Locator;
    readonly boldButton: Locator;
    readonly italicButton: Locator;
    readonly underlineButton: Locator;
    readonly mainUserInput: Locator;
    readonly mainUserCharCount: Locator;
    readonly designProcessOptions: Locator;
    readonly roleInput: Locator;
    readonly roleCharCount: Locator;
    readonly Act: Locator;
    readonly ActCharCount: Locator;
    readonly updateButton: Locator;
    readonly cancelButton: Locator;
    readonly closeIcon: Locator;
    readonly successMessage: Locator;
    readonly errorMessage: Locator;
    readonly moreOptionsIcon: Locator;

    readonly updateProjectContextMenuItem: Locator;

    constructor(page: Page) {
        this.page = page;
        this.updateContextButton = page.getByTestId('btn-update-project-context');
        this.contextDialog = page.getByRole('dialog', { name: /update project context/i });
        this.projectNameInput = page.getByTestId('input-project-name');
        this.scopeEditor = page.locator('.ql-editor');
        this.boldButton = page.getByRole('button', { name: /bold/i });
        this.italicButton = page.getByRole('button', { name: /italic/i });
        this.underlineButton = page.getByRole('button', { name: /underline/i });
        this.mainUserInput = page.getByTestId('input-main-persona');
        this.mainUserCharCount = page.getByTestId('main-user-char-count');
        this.designProcessOptions = page.getByText('What is your design process');
        this.roleInput = page.getByTestId('textarea-user-role');
        this.roleCharCount = page.getByTestId('role-char-count');
        this.Act = page.getByTestId('textarea-ideoz-role');
        this.ActCharCount = page.getByTestId('ideoz-char-count');
        this.updateButton = page.getByTestId('btn-update-project-details');
        this.cancelButton = page.getByTestId('btn-cancel-project-details');
        this.closeIcon = page.getByTestId('close-button');
        this.successMessage = (page.getByRole('listitem'));
        this.errorMessage = page.getByTestId('error-message');
        this.moreOptionsIcon = page.getByRole('button', { name: 'Header menu' });
        this.updateProjectContextMenuItem = page.getByRole('menuitem', { name: 'Update project context' });
    }

    async openDialog() {
        await this.updateContextButton.click();
        await this.contextDialog.waitFor({ state: 'visible' });
    }

    async fillProjectName(name: string) {
        await this.projectNameInput.fill(name);
    }

    async fillScopeEditor(text: string) {
        await this.scopeEditor.fill(text);
    }

    async applyBold() {
        await this.boldButton.click();
    }

    async applyItalic() {
        await this.italicButton.click();
    }

    async applyUnderline() {
        await this.underlineButton.click();
    }

    async fillMainUser(text: string) {
        await this.mainUserInput.fill(text);
    }

    async selectDesignProcess(option: string) {
        await this.designProcessOptions.getByText(option).click();
    }

    async fillRole(text: string) {
        await this.roleInput.fill(text);
    }



    async clickUpdate() {
        await this.updateButton.click();
    }

    async clickCancel() {
        await this.cancelButton.click();
    }

    async clickCloseIcon() {
        await this.closeIcon.click();
    }
}