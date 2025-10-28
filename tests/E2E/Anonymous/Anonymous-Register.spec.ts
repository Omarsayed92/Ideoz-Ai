import { test, expect } from '@playwright/test';

function generateUser(suffix = '') {
    const timestamp = Date.now();
    return {
        name: `Test User${suffix}`,
        email: `testuser_${timestamp}${suffix}@example.com`,
        password: 'P@ssw0rd123'
    };
}

test.describe('Anonymous Landing Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });




    /**
     * Name: TC-001: "Create free account" button redirects to registration dialog
     * Steps:
     *  1. Click the "Create free account" button on the landing page.
     * Expected Result:
     *  - Registration dialog submit button is visible.
     *  - Google authentication button is visible.
     */
    test('TC-001: "Create free account" button redirects to registration dialog', async ({ page }) => {

        await page.getByTestId('btn-register').click();
        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();
        // Expected: Google authentication button is visible
        await expect(page.getByTestId('btn-google-auth')).toBeVisible();
    });


    /**
     * Name: TC-002: Successful account creation and auto-login
     * Steps:
     *  1. Click the "Create free account" button.
     *  2. Fill in name, email, and password fields with valid data.
     *  3. Click the submit button.
     *  4. Wait for the video dialog to appear and close it.
     * Expected Result:
     *  - Profile icon appears after successful registration (auto-login).
     *  - "Create new Project" button is visible after login.
     */
    test('TC-002: Successful account creation and auto-login', async ({ page }) => {
        const user = generateUser();
        await page.getByTestId('btn-register').click();
        await page.getByRole('textbox', { name: /name/i }).fill(user.name);
        await page.getByRole('textbox', { name: /email/i }).fill(user.email);
        await page.getByRole('textbox', { name: /password/i }).fill(user.password);
        await page.getByTestId('btn-submit-auth').click();

        // Wait for the video iframe to appear after registration
        const videoFrame = page.locator('iframe[title="What is Ideoz Project?"]');
        await expect(videoFrame).toBeVisible({ timeout: 10000 });

        // Wait for video thumbnail to be loaded
        await expect(videoFrame.contentFrame().locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible({ timeout: 5000 });

        // Close the dialog


        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible();
        await page.getByRole('button').filter({ hasText: /^$/ }).click();

        // Expected: Profile icon appears after successful registration (auto-login)
        await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible({ timeout: 10000 });
        // Expected: "Create new Project" button is visible after login
        await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
    });


    /**
     * Name: TC-003: "Create free account" button in "What is Ideoz project?" section redirects to registration dialog
     * Steps:
     *  1. Click the "What is Ideoz project?" button.
     *  2. Click the "Create free account" button in the dialog.
     * Expected Result:
     *  - Registration dialog submit button is visible.
     *  - Google authentication button is visible.
     */
    test('TC-003: "Create free account" button in "What is Ideoz project?" section redirects to registration dialog', async ({ page }) => {

        await page.getByRole('button', { name: /what is ideoz project\?/i }).click();
        await page.getByRole('button', { name: /create free account/i }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();
        // Expected: Google authentication button is visible
        await expect(page.getByTestId('btn-google-auth')).toBeVisible();
    });

    /**
     * Name: TC-004: Successful account creation and auto-login via "What is Ideoz project?" section
     * Steps:
     *  1. Click the "What is Ideoz project?" button.
     *  2. Click the "Create free account" button in the dialog.
     *  3. Fill in name, email, and password fields with valid data.
     *  4. Click the submit button.
     *  5. Wait for the video dialog to appear and close it.
     * Expected Result:
     *  - Profile icon appears after successful registration (auto-login).
     *  - "Create new Project" button is visible after login.
     */
    test('TC-004: Successful account creation and auto-login via "What is Ideoz project?" section', async ({ page }) => {
        const user = generateUser('_info');
        await page.getByRole('button', { name: /what is ideoz project\?/i }).click();
        await page.getByRole('button', { name: /create free account/i }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();

        await page.getByRole('textbox', { name: /name/i }).fill(user.name);
        await page.getByRole('textbox', { name: /email/i }).fill(user.email);
        await page.getByRole('textbox', { name: /password/i }).fill(user.password);
        await page.getByTestId('btn-submit-auth').click();

        // Wait for the video iframe to appear after registration
        const videoFrame = page.locator('iframe[title="What is Ideoz Project?"]');
        await expect(videoFrame).toBeVisible({ timeout: 10000 });

        // Wait for video thumbnail to be loaded
        await expect(videoFrame.contentFrame().locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible({ timeout: 5000 });

        // Close the dialog
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible();
        await page.getByRole('button').filter({ hasText: /^$/ }).click();

        // Expected: Profile icon appears after successful registration (auto-login)
        await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible({ timeout: 10000 });
        // Expected: "Create new Project" button is visible after login
        await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
    });

    /**
     * Name: TC-005: Anonymous user can use plugin without account creation
     * Steps:
     *  1. Click on a plugin/conversation item on the landing page.
     * Expected Result:
     *  - Navigates to conversation page.
     *  - "Go to bottom" button is visible in chat.
     *  - "Register for free" button is visible in chat.
     */
    test('TC-005: Anonymous user can use plugin without account creation', async ({ page }) => {
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');

        // Click on the plugin/conversation item
        const conversationItem = page.locator('.truncate.flex.items-center').first();
        await expect(conversationItem).toBeVisible({ timeout: 10000 });
        await conversationItem.click();

        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/, { timeout: 10000 });

        // Wait for chat interface to load
        await page.waitForLoadState('networkidle');

        // Expected: "Go to bottom" button is visible in chat
        await expect(page.getByRole('button', { name: 'Go to bottom' })).toBeVisible({ timeout: 15000 });
        // Expected: "Register for free" button is visible in chat
        await expect(page.getByRole('button', { name: 'Register for free' })).toBeVisible();

    });


    /**
     * Name: TC-006: "Create free account" button inside chat redirects to registration dialog
     * Steps:
     *  1. Click on a plugin/conversation item on the landing page.
     *  2. Click the "Register for free" button in chat.
     * Expected Result:
     *  - Registration dialog submit button is visible in chat.
     */
    test('TC-006: "Create free account" button inside chat redirects to registration dialog', async ({ page }) => {
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');

        // Click on the plugin/conversation item
        const conversationItem = page.locator('.truncate.flex.items-center').first();
        await expect(conversationItem).toBeVisible({ timeout: 10000 });
        await conversationItem.click();

        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/, { timeout: 10000 });

        // Wait for chat interface to load
        await page.waitForLoadState('networkidle');

        // Expected: "Go to bottom" button is visible in chat
        await expect(page.getByRole('button', { name: 'Go to bottom' })).toBeVisible({ timeout: 15000 });

        // Expected: Click "Register for free" button in chat
        await page.getByRole('button', { name: 'Register for free' }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible({ timeout: 5000 });

    });

    /**
     * Name: TC-007: Successful account creation and auto-login in chat
     * Steps:
     *  1. Click on a plugin/conversation item on the landing page.
     *  2. Click the "Register for free" button in chat.
     *  3. Fill in name, email, and password fields with valid data.
     *  4. Click the submit button.
     * Expected Result:
     *  - "Continue chat" or "Create project" text is visible after registration.
     *  - Profile icon appears after successful registration (auto-login).
     */
    test('TC-007: Successful account creation and auto-login in chat', async ({ page }) => {
        const user = generateUser('_chat');

        // Wait for page to be ready
        await page.waitForLoadState('networkidle');

        // Click on the plugin/conversation item
        const conversationItem = page.locator('.truncate.flex.items-center').first();
        await expect(conversationItem).toBeVisible({ timeout: 10000 });
        await conversationItem.click();

        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/, { timeout: 10000 });

        // Wait for chat interface to load
        await page.waitForLoadState('networkidle');

        // Expected: "Go to bottom" button is visible in chat
        await expect(page.getByRole('button', { name: 'Go to bottom' })).toBeVisible({ timeout: 15000 });

        // Expected: Click "Register for free" button in chat
        await page.getByRole('button', { name: 'Register for free' }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible({ timeout: 5000 });

        await page.getByRole('textbox', { name: /name/i }).fill(user.name);
        await page.getByRole('textbox', { name: /email/i }).fill(user.email);
        await page.getByRole('textbox', { name: /password/i }).fill(user.password);
        await page.getByTestId('btn-submit-auth').click();

        // Expected: "Continue chat" or "Create project" text is visible after registration
        await expect(page.getByText(/continue chat|create project/i)).toBeVisible({ timeout: 10000 });
        // Expected: Profile icon appears after successful registration (auto-login)
        await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible({ timeout: 10000 });
    });

    /**
     * Name: TC-008: Banner appears when skipping account creation in chat
     * Steps:
     *  1. Click on a plugin/conversation item on the landing page.
     *  2. Enter a message in the chat input and send it without registering.
     * Expected Result:
     *  - Banner appears: "Want to go deeper? Create a project now for better context results".
     *  - Banner action button is visible.
     */
    test('TC-008: Banner appears when skipping account creation in chat', async ({ page }) => {
        // Wait for page to be ready
        await page.waitForLoadState('networkidle');

        // Click on the plugin/conversation item
        const conversationItem = page.locator('.truncate.flex.items-center').first();
        await expect(conversationItem).toBeVisible({ timeout: 10000 });
        await conversationItem.click();

        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/, { timeout: 10000 });

        // Wait for chat interface to be fully loaded
        await page.waitForLoadState('networkidle');

        // Wait for chat input to be visible and enabled
        const chatInput = page.getByTestId('chat-input');
        await expect(chatInput).toBeVisible({ timeout: 30000 });
        await expect(chatInput).toBeEnabled({ timeout: 10000 });

        await chatInput.click();
        await chatInput.fill('tell me more based result ');

        await page.getByTestId('chat-submit-button').click();

        // Wait for response and banner to appear
        const banner = page.getByText(/Want to go deeper\? Create a project now for better context results/i);
        await expect(banner).toBeVisible({ timeout: 10000 });

        // Expected: Banner action button is visible
        await expect(page.getByTestId('banner-action-button')).toBeVisible();

    });


});
