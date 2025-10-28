// tests/Fixtures/ViewProject.ts
import { Page, Locator } from '@playwright/test';

export class ViewProjectPage {
    readonly page: Page;
    readonly projectTitle: Locator;
    readonly navigationArrow: Locator;
    readonly moreOptionsIcon: Locator;
    readonly uploadFilesMenuItem: Locator;
    readonly updateProjectContextMenuItem: Locator;
    readonly chatInput: Locator;
    readonly suggestedNudge: Locator;
    readonly uploadFilesButton: Locator;
    readonly updateContextButton: Locator;
    readonly chatHistory: Locator;

    constructor(page: Page) {
        this.page = page;
        this.projectTitle = page.getByTestId('project-title-name');
        this.navigationArrow = page.getByTestId('btn-back');
        this.moreOptionsIcon = page.getByRole('button', { name: 'Header menu' });
        this.uploadFilesMenuItem = page.getByRole('menuitem', { name: 'Upload files' });
        this.updateProjectContextMenuItem = page.getByRole('menuitem', { name: 'Update project context' });
        this.chatInput = page.getByTestId('chat-input');
        this.suggestedNudge = page.locator('.truncate.flex.items-center');
        this.uploadFilesButton = page.getByTestId('btn-upload-project-files');
        this.updateContextButton = page.getByTestId('btn-update-project-context');
        this.chatHistory = page.getByTestId('chat-history');
    }

    async goToProject(projectName: string) {
        await this.page.getByText(projectName).click();
    }
}
