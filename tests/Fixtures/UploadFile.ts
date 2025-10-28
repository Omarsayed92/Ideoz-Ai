import { Page, Locator } from '@playwright/test';

export class UploadFilePage {
    readonly page: Page;

    // Main upload section locators
    readonly uploadProjectFilesButton: Locator;
    readonly uploadFilesDialog: Locator;
    readonly uploadFilesDialogTitle: Locator;
    readonly closeDialogButton: Locator;
    readonly uploadNewFilesButton: Locator;
    readonly fileInput: Locator;

    // Drag and drop locators
    readonly dropZone: Locator;
    readonly dropFilesHereText: Locator;
    readonly uploadArea: Locator;

    // File list locators
    readonly uploadedFilesList: Locator;
    readonly uploadedFileItems: Locator;
    readonly fileNameElements: Locator;
    readonly fileTypeElements: Locator;
    readonly deleteFileButtons: Locator;
    readonly loadingAnimations: Locator;

    // Error and validation locators
    readonly errorMessage: Locator;
    readonly fileTypeErrorMessage: Locator;
    readonly fileSizeErrorMessage: Locator;
    readonly networkErrorMessage: Locator;

    // Project page locators
    readonly projectName: Locator;
    readonly projectTitle: Locator;

    constructor(page: Page) {
        this.page = page;

        // Main upload section
        this.uploadProjectFilesButton = page.locator('button:has-text("Upload project files"), button:has-text("upload project files"), [data-testid="upload-files-button"]').first();
        this.uploadFilesDialog = page.locator('[role="dialog"]:has-text("Upload Files"), .upload-dialog, .modal:has-text("Upload Files")').first();
        this.uploadFilesDialogTitle = page.locator('h2:has-text("Upload Files"), h1:has-text("Upload Files"), [data-testid="dialog-title"]').first();
        this.closeDialogButton = page.locator('button[aria-label="Close"], button:has-text("×"), .close-button, [data-testid="close-dialog"]').first();
        this.uploadNewFilesButton = page.locator('button:has-text("Upload new files"), button:has-text("upload new files"), [data-testid="upload-new-files-button"]').first();
        this.fileInput = page.locator('input[type="file"]');

        // Drag and drop
        this.dropZone = page.locator('[data-testid="drop-zone"], .drop-zone, .upload-area').first();
        this.dropFilesHereText = page.locator('text="Drop files here to attach", text="Drop files here", [data-testid="drop-text"]').first();
        this.uploadArea = page.locator('.upload-area, [data-testid="upload-area"]').first();

        // File list
        this.uploadedFilesList = page.locator('.uploaded-files-list, [data-testid="uploaded-files-list"], .file-list').first();
        this.uploadedFileItems = page.locator('.file-item, [data-testid="file-item"], .uploaded-file');
        this.fileNameElements = page.locator('.file-name, [data-testid="file-name"]');
        this.fileTypeElements = page.locator('.file-type, [data-testid="file-type"]');
        this.deleteFileButtons = page.locator('button[aria-label*="Delete"], button[aria-label*="Remove"], .delete-button, [data-testid="delete-file"]');
        this.loadingAnimations = page.locator('.loading, .spinner, [data-testid="loading"]');

        // Error messages
        this.errorMessage = page.locator('.error-message, [role="alert"], .alert-error, [data-testid="error-message"]');
        this.fileTypeErrorMessage = page.locator('text=/File type.*is not supported/i, [data-testid="file-type-error"]');
        this.fileSizeErrorMessage = page.locator('text=/File.*too large/i, text=/exceeds.*limit/i, [data-testid="file-size-error"]');
        this.networkErrorMessage = page.locator('text=/network error/i, text=/upload failed/i, [data-testid="network-error"]');

        // Project page
        this.projectName = page.locator('[data-testid="project-name"], .project-name, h1').first();
        this.projectTitle = page.locator('[data-testid="project-title"], .project-title').first();
    }

    /**
     * Navigate to the application
     */
    // async navigate(url: string = 'http://localhost:3000/') {
    //   await this.page.goto(url, { waitUntil: 'networkidle' });
    //}

    /**
     * Login to the application
     */
    async login(email: string, password: string) {
        await this.page.fill('input[type="email"], input[name="email"]', email);
        await this.page.fill('input[type="password"], input[name="password"]', password);
        await this.page.click('button[type="submit"], button:has-text("Login"), button:has-text("Sign in")');
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Create a new project
     */
    async createNewProject(projectName: string) {
        // Click create new project button
        await this.page.click('button:has-text("New Project"), button:has-text("Create Project"), a:has-text("New Project")');
        await this.page.waitForTimeout(1000);

        // Fill project name
        await this.page.fill('input[name="name"], input[placeholder*="project name" i], input[placeholder*="name" i]', projectName);

        // Click create/save button
        await this.page.click('button:has-text("Create"), button:has-text("Save"), button[type="submit"]');
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(2000);
    }

    /**
     * Click upload project files button
     */
    async clickUploadProjectFiles() {
        await this.uploadProjectFilesButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.uploadProjectFilesButton.click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Check if upload files dialog is open
     */
    async isUploadDialogOpen(): Promise<boolean> {
        return await this.uploadFilesDialog.isVisible();
    }

    /**
     * Click upload new files button
     */
    async clickUploadNewFiles() {
        await this.uploadNewFilesButton.waitFor({ state: 'visible' });
        await this.uploadNewFilesButton.click();
    }

    /**
     * Upload file using file input
     */
    async uploadFileViaInput(filePath: string | string[]) {
        const paths = Array.isArray(filePath) ? filePath : [filePath];
        await this.fileInput.setInputFiles(paths);
        await this.page.waitForTimeout(2000); // Wait for upload to complete
    }

    /**
     * Upload file using drag and drop
     */
    async uploadFileViaDragDrop(filePath: string) {
        // Create a data transfer object
        const dataTransfer = await this.page.evaluateHandle((path) => {
            const dt = new DataTransfer();
            return dt;
        }, filePath);

        // Trigger drag and drop events
        await this.dropZone.dispatchEvent('dragenter', { dataTransfer });
        await this.dropZone.dispatchEvent('dragover', { dataTransfer });
        await this.dropZone.dispatchEvent('drop', { dataTransfer });
    }

    /**
     * Upload multiple files via drag and drop
     */
    async uploadMultipleFilesViaDragDrop(filePaths: string[]) {
        const input = await this.fileInput.elementHandle();
        if (input) {
            await input.setInputFiles(filePaths);
        }
    }

    /**
     * Close upload dialog
     */
    async closeUploadDialog() {
        await this.closeDialogButton.click();
        await this.page.waitForTimeout(500);
    }

    /**
     * Get uploaded file count
     */
    async getUploadedFileCount(): Promise<number> {
        return await this.uploadedFileItems.count();
    }

    /**
     * Get uploaded file names
     */
    async getUploadedFileNames(): Promise<string[]> {
        const count = await this.fileNameElements.count();
        const names: string[] = [];

        for (let i = 0; i < count; i++) {
            const name = await this.fileNameElements.nth(i).textContent();
            if (name) {
                names.push(name.trim());
            }
        }

        return names;
    }

    /**
     * Delete file by index
     */
    async deleteFileByIndex(index: number) {
        await this.deleteFileButtons.nth(index).click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Delete file by name
     */
    async deleteFileByName(fileName: string) {
        const names = await this.getUploadedFileNames();
        const index = names.indexOf(fileName);

        if (index !== -1) {
            await this.deleteFileByIndex(index);
        }
    }

    /**
     * Check if error message is visible
     */
    async isErrorMessageVisible(): Promise<boolean> {
        return await this.errorMessage.isVisible();
    }

    /**
     * Get error message text
     */
    async getErrorMessageText(): Promise<string> {
        await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
        return await this.errorMessage.textContent() || '';
    }

    /**
     * Check if file type error is displayed
     */
    async hasFileTypeError(): Promise<boolean> {
        try {
            await this.fileTypeErrorMessage.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Check if file size error is displayed
     */
    async hasFileSizeError(): Promise<boolean> {
        try {
            await this.fileSizeErrorMessage.waitFor({ state: 'visible', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Wait for file upload to complete
     */
    async waitForUploadComplete(timeout: number = 10000) {
        await this.page.waitForTimeout(2000);
        // Wait for loading animations to disappear
        try {
            await this.loadingAnimations.first().waitFor({ state: 'hidden', timeout });
        } catch {
            // Loading animation might not appear for small files
        }
    }

    /**
     * Check if upload button is hidden (after first upload)
     */
    async isUploadButtonHidden(): Promise<boolean> {
        try {
            await this.uploadProjectFilesButton.waitFor({ state: 'hidden', timeout: 3000 });
            return true;
        } catch {
            return false;
        }
    }

    /**
     * Verify file is in the list
     */
    async isFileInList(fileName: string): Promise<boolean> {
        const names = await this.getUploadedFileNames();
        return names.some(name => name.includes(fileName));
    }

    /**
     * Get delete button for specific file
     */
    async getDeleteButtonForFile(fileName: string): Locator {
        return this.page.locator(`[data-testid="file-item"]:has-text("${fileName}") button[aria-label*="Delete"], .file-item:has-text("${fileName}") .delete-button`).first();
    }

    /**
     * Wait for drop zone to be visible during drag
     */
    async waitForDropZoneActive() {
        await this.dropFilesHereText.waitFor({ state: 'visible', timeout: 5000 });
    }

    /**
     * Simulate drag over upload area
     */
    async simulateDragOver() {
        await this.uploadArea.dispatchEvent('dragover');
        await this.page.waitForTimeout(500);
    }

    /**
     * Check if a specific file type icon is visible
     */
    async hasFileTypeIcon(fileType: string): Promise<boolean> {
        const icon = this.page.locator(`[data-file-type="${fileType}"], .file-icon-${fileType}`).first();
        return await icon.isVisible();
    }
}
