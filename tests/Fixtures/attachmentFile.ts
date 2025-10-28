import { Page, Locator } from '@playwright/test';

/**
 * AttachmentFile Page Object
 *
 * Locators and methods for file attachment functionality in chat area
 * URL: http://localhost:3000/
 *
 * Features:
 * - Upload icon/button interactions
 * - Drag and drop file upload
 * - File preview management
 * - Error and warning messages
 * - Chat integration
 */
export class AttachmentFilePage {
    readonly page: Page;

    // ========================================
    // UPLOAD BUTTON & FILE INPUT LOCATORS
    // ========================================

    /** Main upload button with circle-plus icon */
    readonly uploadButton: Locator;

    /** Alternative upload button selectors */
    readonly uploadIconButton: Locator;

    /** Hidden file input element */
    readonly chatFileInput: Locator;

    /** Add files button (alternative) */
    readonly chatAddFilesButton: Locator;

    // ========================================
    // DRAG AND DROP LOCATORS
    // ========================================

    /** Drop zone area for drag and drop */
    readonly dropZone: Locator;

    /** Chat area that accepts drops */
    readonly chatArea: Locator;

    /** Main content area for drops */
    readonly mainArea: Locator;

    /** Drop text indicator */
    readonly dropFilesHereText: Locator;

    // ========================================
    // FILE PREVIEW LOCATORS
    // ========================================

    /** Container for all file previews */
    readonly filePreviewContainer: Locator;

    /** All file preview items */
    readonly filePreviewItems: Locator;

    /** File icons in previews */
    readonly fileIcons: Locator;

    /** File names in previews */
    readonly fileNames: Locator;

    /** Loading/spinner indicators */
    readonly loadingIndicators: Locator;

    // ========================================
    // FILE MANAGEMENT LOCATORS
    // ========================================

    /** Remove/delete file buttons */
    readonly removeFileButtons: Locator;

    /** Cancel upload buttons */
    readonly cancelUploadButtons: Locator;

    // ========================================
    // ERROR & WARNING LOCATORS
    // ========================================

    /** Error bar for critical errors */
    readonly errorBar: Locator;

    /** Warning bar for warnings */
    readonly warningBar: Locator;

    /** File size error messages */
    readonly fileSizeError: Locator;

    /** File type error messages */
    readonly fileTypeError: Locator;

    /** Network error messages */
    readonly networkError: Locator;

    /** General error messages */
    readonly errorMessages: Locator;

    // ========================================
    // CHAT INTEGRATION LOCATORS
    // ========================================

    /** Chat input textarea */
    readonly chatInput: Locator;

    /** Send message button */
    readonly sendButton: Locator;

    /** Chat messages container */
    readonly chatMessages: Locator;

    /** Attached files in sent messages */
    readonly messageAttachments: Locator;

    // ========================================
    // VISUAL FEEDBACK LOCATORS
    // ========================================

    /** Drop zone highlight state */
    readonly dropZoneHighlighted: Locator;

    /** Upload progress indicators */
    readonly uploadProgress: Locator;

    /** Success indicators */
    readonly successIndicators: Locator;

    constructor(page: Page) {
        this.page = page;

        // Upload button & file input
        this.uploadButton = page.locator('button:has(svg.lucide-circle-plus)');
        this.uploadIconButton = page.locator('button[aria-label*="upload" i], button[title*="upload" i]');
        this.chatFileInput = page.locator('[data-testid="chat-file-input"]');
        this.chatAddFilesButton = page.locator('[data-testid="chat-add-files-button"]');

        // Drag and drop
        this.dropZone = page.locator('[data-testid="drop-zone"], .drop-zone, .upload-area');
        this.chatArea = page.locator('.chat-area, [data-testid="chat-area"]');
        this.mainArea = page.locator('main');
        this.dropFilesHereText = page.locator('text="Drop files here to attach", text="Drop files here"');

        // File preview
        this.filePreviewContainer = page.locator('[data-testid="file-preview-container"], .file-preview-container');
        this.filePreviewItems = page.locator('[data-testid*="file-preview-"], .file-preview-item');
        this.fileIcons = page.locator('[data-testid*="file-preview-"] svg, [data-testid*="file-preview-"] img');
        this.fileNames = page.locator('[data-testid*="file-preview-"] .file-name, [data-testid*="file-preview-"]');
        this.loadingIndicators = page.locator('[data-testid="loading"], .loading, .spinner');

        // File management
        this.removeFileButtons = page.locator('[data-testid="remove-file-button"], button[aria-label*="Delete" i], button[aria-label*="Remove" i]');
        this.cancelUploadButtons = page.locator('[data-testid="cancel-upload"], button[aria-label*="cancel" i]');

        // Error & warning
        this.errorBar = page.locator('[data-testid="error-bar"]');
        this.warningBar = page.locator('[data-testid="warning-bar"]');
        this.fileSizeError = page.locator('text=/exceeding|size|limit|large/i');
        this.fileTypeError = page.locator('text=/unsupported|not allowed|invalid/i');
        this.networkError = page.locator('text=/network|offline|connection/i');
        this.errorMessages = page.locator('[role="alert"], .error-message, .alert-error');

        // Chat integration
        this.chatInput = page.locator('textarea[placeholder*="Describe"], textarea[placeholder*="Type"]');
        this.sendButton = page.locator('.flex.gap-1 button[type="submit"], button[aria-label*="Send" i]');
        this.chatMessages = page.locator('.chat-messages, [data-testid="chat-messages"]');
        this.messageAttachments = page.locator('.message-attachment, [data-testid="message-attachment"]');

        // Visual feedback
        this.dropZoneHighlighted = page.locator('.drop-zone.drag-over, .drop-zone.highlight, .dropping');
        this.uploadProgress = page.locator('[data-testid="upload-progress"], .upload-progress, progress');
        this.successIndicators = page.locator('[data-testid="success"], .success-message, .checkmark');
    }

    // ========================================
    // NAVIGATION METHODS
    // ========================================

    /**
     * Navigate to the application
     * @param url - Application URL (default: http://localhost:3000/)
     */
    async navigate(url: string = 'http://localhost:3000/') {
        await this.page.goto(url, { waitUntil: 'networkidle' });
    }

    /**
     * Wait for page to be fully loaded
     */
    async waitForPageLoad() {
        await this.page.waitForLoadState('networkidle');
        await this.chatFileInput.waitFor({ state: 'attached', timeout: 15000 });
    }

    // ========================================
    // UPLOAD METHODS
    // ========================================

    /**
     * Click upload button to open file picker
     */
    async clickUploadButton() {
        await this.uploadButton.waitFor({ state: 'visible', timeout: 10000 });
        await this.uploadButton.click();
    }

    /**
     * Upload file(s) via file input
     * @param filePaths - Single file path or array of file paths
     */
    async uploadFiles(filePaths: string | string[]) {
        const paths = Array.isArray(filePaths) ? filePaths : [filePaths];
        await this.chatFileInput.setInputFiles(paths);
    }

    /**
     * Upload single file
     * @param filePath - Path to file
     */
    async uploadSingleFile(filePath: string) {
        await this.chatFileInput.setInputFiles(filePath);
    }

    /**
     * Upload multiple files
     * @param filePaths - Array of file paths
     */
    async uploadMultipleFiles(filePaths: string[]) {
        await this.chatFileInput.setInputFiles(filePaths);
    }

    /**
     * Clear all uploaded files
     */
    async clearFiles() {
        await this.chatFileInput.setInputFiles([]);
    }

    // ========================================
    // DRAG AND DROP METHODS
    // ========================================

    /**
     * Trigger drag over event on drop zone
     */
    async triggerDragOver() {
        const dataTransfer = await this.page.evaluateHandle(() => new DataTransfer());
        await this.mainArea.dispatchEvent('dragover', { dataTransfer });
    }

    /**
     * Simulate drag and drop (using file input as fallback)
     * @param filePath - Path to file
     */
    async dragAndDropFile(filePath: string) {
        // Playwright doesn't fully support drag and drop with files
        // Using setInputFiles as a reliable alternative
        await this.chatFileInput.setInputFiles(filePath);
    }

    /**
     * Check if drop zone is highlighted
     */
    async isDropZoneHighlighted(): Promise<boolean> {
        return await this.dropZoneHighlighted.isVisible().catch(() => false);
    }

    // ========================================
    // FILE PREVIEW METHODS
    // ========================================

    /**
     * Get file preview by filename
     * @param fileName - Name of the file
     */
    getFilePreview(fileName: string): Locator {
        return this.page.locator(`[data-testid="file-preview-${fileName}"]`);
    }

    /**
     * Get file preview by partial name
     * @param partialName - Partial file name
     */
    getFilePreviewByPartialName(partialName: string): Locator {
        return this.page.locator(`[data-testid*="file-preview-${partialName}"]`);
    }

    /**
     * Check if file preview exists
     * @param fileName - Name of the file
     */
    async hasFilePreview(fileName: string): Promise<boolean> {
        return await this.getFilePreview(fileName).isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Get all file preview elements
     */
    async getAllFilePreviews(): Promise<Locator[]> {
        const count = await this.filePreviewItems.count();
        const previews: Locator[] = [];
        for (let i = 0; i < count; i++) {
            previews.push(this.filePreviewItems.nth(i));
        }
        return previews;
    }

    /**
     * Get count of uploaded files
     */
    async getFileCount(): Promise<number> {
        return await this.filePreviewItems.count();
    }

    /**
     * Wait for file preview to appear
     * @param fileName - Name of the file
     * @param timeout - Timeout in milliseconds (default: 5000)
     */
    async waitForFilePreview(fileName: string, timeout: number = 5000) {
        await this.getFilePreview(fileName).waitFor({ state: 'visible', timeout });
    }

    // ========================================
    // FILE MANAGEMENT METHODS
    // ========================================

    /**
     * Remove file by filename
     * @param fileName - Name of the file to remove
     */
    async removeFile(fileName: string) {
        const filePreview = this.getFilePreview(fileName);
        const removeButton = filePreview.locator('[data-testid="remove-file-button"]');
        await removeButton.click();
    }

    /**
     * Remove file by index
     * @param index - Index of the file (0-based)
     */
    async removeFileByIndex(index: number) {
        await this.removeFileButtons.nth(index).click();
    }

    /**
     * Cancel ongoing upload
     */
    async cancelUpload() {
        await this.cancelUploadButtons.first().click();
    }

    // ========================================
    // ERROR & WARNING METHODS
    // ========================================

    /**
     * Check if error bar is visible
     */
    async hasError(): Promise<boolean> {
        return await this.errorBar.isVisible({ timeout: 3000 }).catch(() => false);
    }

    /**
     * Check if warning bar is visible
     */
    async hasWarning(): Promise<boolean> {
        return await this.warningBar.isVisible({ timeout: 3000 }).catch(() => false);
    }

    /**
     * Get error message text
     */
    async getErrorMessage(): Promise<string> {
        if (await this.hasError()) {
            return await this.errorBar.textContent() || '';
        }
        return '';
    }

    /**
     * Get warning message text
     */
    async getWarningMessage(): Promise<string> {
        if (await this.hasWarning()) {
            return await this.warningBar.textContent() || '';
        }
        return '';
    }

    /**
     * Check if file size error exists
     */
    async hasFileSizeError(): Promise<boolean> {
        return await this.fileSizeError.isVisible({ timeout: 3000 }).catch(() => false);
    }

    /**
     * Check if file type error exists
     */
    async hasFileTypeError(): Promise<boolean> {
        return await this.fileTypeError.isVisible({ timeout: 3000 }).catch(() => false);
    }

    /**
     * Wait for error to appear
     * @param timeout - Timeout in milliseconds (default: 5000)
     */
    async waitForError(timeout: number = 5000) {
        await this.errorBar.waitFor({ state: 'visible', timeout });
    }

    /**
     * Wait for warning to appear
     * @param timeout - Timeout in milliseconds (default: 5000)
     */
    async waitForWarning(timeout: number = 5000) {
        await this.warningBar.waitFor({ state: 'visible', timeout });
    }

    // ========================================
    // CHAT INTEGRATION METHODS
    // ========================================

    /**
     * Type message in chat input
     * @param message - Message text
     */
    async typeMessage(message: string) {
        await this.chatInput.fill(message);
    }

    /**
     * Click send button
     */
    async clickSend() {
        await this.sendButton.click();
    }

    /**
     * Send message with attachment
     * @param message - Message text
     * @param filePath - Path to file
     */
    async sendMessageWithAttachment(message: string, filePath: string) {
        await this.uploadSingleFile(filePath);
        await this.page.waitForTimeout(1000); // Wait for file to attach
        await this.typeMessage(message);
        await this.clickSend();
    }

    /**
     * Check if message was sent successfully
     */
    async isMessageSent(): Promise<boolean> {
        await this.page.waitForTimeout(1000);
        // File preview should disappear after sending
        const fileCount = await this.getFileCount();
        return fileCount === 0;
    }

    // ========================================
    // VALIDATION METHODS
    // ========================================

    /**
     * Check if upload button is visible
     */
    async isUploadButtonVisible(): Promise<boolean> {
        return await this.uploadButton.isVisible({ timeout: 5000 }).catch(() => false);
    }

    /**
     * Check if upload button is enabled
     */
    async isUploadButtonEnabled(): Promise<boolean> {
        return await this.uploadButton.isEnabled().catch(() => false);
    }

    /**
     * Check if file input is attached to DOM
     */
    async isFileInputAttached(): Promise<boolean> {
        try {
            const handle = await this.chatFileInput.elementHandle();
            return !!handle && await handle.evaluate((el) => !!el.isConnected);
        } catch {
            return false;
        }
    }

    /**
     * Wait for upload to complete
     * @param timeout - Timeout in milliseconds (default: 10000)
     */
    async waitForUploadComplete(timeout: number = 10000) {
        await this.page.waitForTimeout(2000);
        // Wait for loading indicators to disappear
        try {
            await this.loadingIndicators.first().waitFor({ state: 'hidden', timeout });
        } catch {
            // Loading may not appear for small files
        }
    }

    // ========================================
    // UTILITY METHODS
    // ========================================

    /**
     * Take screenshot of chat area
     * @param filename - Screenshot filename
     */
    async takeScreenshot(filename: string) {
        await this.page.screenshot({ path: filename, fullPage: true });
    }

    /**
     * Get page title
     */
    async getPageTitle(): Promise<string> {
        return await this.page.title();
    }

    /**
     * Wait for timeout
     * @param ms - Milliseconds to wait
     */
    async wait(ms: number) {
        await this.page.waitForTimeout(ms);
    }
}
