// tests/Fixtures/createProject.ts
import { Page, Locator } from '@playwright/test';

export class CreateProjectPage {
    readonly page: Page;
    readonly createProjectButton: Locator;
    readonly dialog: Locator;
    readonly projectNameInput: Locator;
    readonly createButton: Locator;
    readonly closeButton: Locator;
    readonly errorMessage: Locator;
    readonly myProjectsButton: Locator;
    readonly projectList: Locator;
    readonly chatCreateProjectButton: Locator;
    readonly sectionCreateProjectButton: Locator;

    constructor(page: Page) {
        this.page = page;
        // Use unique test id for create project button
        this.createProjectButton = page.getByTestId('create-project-button');
        // Try multiple dialog selectors
        this.dialog = page.locator('[role="dialog"]').first();
        // Try multiple input selectors - placeholder, label, or test-id
        this.projectNameInput = page.getByPlaceholder(/project name|name your project|enter.*name/i)
            .or(page.getByLabel(/project name|name/i))
            .or(page.getByTestId('input-project-name'))
            .or(page.locator('[role="dialog"] input[type="text"]').first());
        // Try multiple create button selectors
        this.createButton = page.locator('[role="dialog"] button:has-text("Create")')
            .or(page.getByRole('button', { name: /^create$/i }))
            .or(page.getByTestId('btn-create-project'));
        // Close button selectors
        this.closeButton = page.locator('[role="dialog"] button[aria-label*="close" i]')
            .or(page.locator('[role="dialog"] button:has-text("×")'))
            .or(page.locator('[role="dialog"] [class*="close"]').first());
        // Error message selectors
        this.errorMessage = page.locator('[role="alert"]')
            .or(page.locator('.error, .error-message, [class*="error"]'))
            .or(page.getByText(/required|invalid|duplicate|already exists|too long/i));
        this.myProjectsButton = page.getByRole('button', { name: /my projects/i });
        this.projectList = page.locator('[class*="project"]').filter({ hasText: /checkout|project/i });
        this.chatCreateProjectButton = page.getByRole('button', { name: /create project/i });
        this.sectionCreateProjectButton = page.getByRole('button', { name: /create project/i });
    }

    async openDialog() {
        await this.createProjectButton.click();
        await this.dialog.waitFor({ state: 'visible', timeout: 10000 });
    }

    async fillProjectName(name: string) {
        await this.projectNameInput.waitFor({ state: 'visible', timeout: 5000 });
        await this.projectNameInput.fill(name);
    }

    async submit() {
        // Only click if button is enabled
        await this.createButton.waitFor({ state: 'visible', timeout: 5000 });
        if (await this.createButton.isEnabled()) {
            await this.createButton.click();
        }
    }

    async closeDialog() {
        await this.closeButton.first().click();
        await this.dialog.waitFor({ state: 'hidden', timeout: 5000 });
    }

    async openMyProjects() {
        await this.myProjectsButton.click();
        await this.projectList.waitFor({ state: 'visible' });
    }

    async isProjectInList(name: string) {
        return await this.projectList.getByText(name).isVisible();
    }

    async openDialogFromChat() {
        await this.chatCreateProjectButton.click();
        await this.dialog.waitFor({ state: 'visible' });
    }

    async openDialogFromSection() {
        await this.sectionCreateProjectButton.click();
        await this.dialog.waitFor({ state: 'visible' });
    }
}