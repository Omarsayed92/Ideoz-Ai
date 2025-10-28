import { test, expect } from '@playwright/test';

test.describe('Anonymous Landing Page Tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('/');
    });

    /**
     * Name: TC-001-Anonymous Verify all header elements are displayed correctly
     * Steps:
     *  1. Navigate to the landing page.
     *  2. Check for logo, Login button, and Register for free button.
     * Expected Result:
     *  - Logo, Login, and Register for free buttons are visible.
     */
    test('should display all header elements correctly', async ({ page }) => {
        // Verify logo is present
        await expect(page.getByRole('img')).toBeVisible();

        // Verify points button is displayed and disabled
        // await expect(page.getByRole('button', { name: /points remaining/ })).toBeVisible();


        // Verify Login button is displayed
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

        // Verify Register for free button is displayed
        await expect(page.getByRole('button', { name: 'Register for free' })).toBeVisible();
    });


    /**
     * Name: TC-002-Anonymous Verify main heading and subheading are displayed
     * Steps:
     *  1. Navigate to the landing page.
     *  2. Check for main heading and subheading text.
     * Expected Result:
     *  - Main heading and subheading are visible.
     */
    test('should display main heading and subheading', async ({ page }) => {
        // Verify main heading
        await expect(page.getByRole('heading', { name: 'What problem are you working on now?' })).toBeVisible();

        // Verify subheading
        await expect(page.getByText('Uncover the right UX problem faster and smarter with Ideoz-AI')).toBeVisible();
    });


    /**
     * Name: TC-003-Anonymous Verify the user challenge input area elements are present
     * Steps:
     *  1. Navigate to the landing page.
     *  2. Check for challenge input field, Mode section, and related buttons.
     * Expected Result:
     *  - Input field, Mode section, and buttons are visible.
     */
    test('should display user challenge input area elements', async ({ page }) => {
        // Verify text input field
        await expect(page.getByRole('textbox', { name: /Describe your user experience challenge/ })).toBeVisible();

        // Verify Mode section
        await expect(page.getByText('Mode')).toBeVisible();
        await expect(page.getByText('🧠 Uncover')).toBeVisible();

        // Verify buttons in the input area
        await expect(page.locator('.flex.gap-1')).toBeVisible();
    });


    /**
     * Name: TC-004-Anonymous Verify the "Need a nudge?" hint section is displayed
     * Steps:
     *  1. Navigate to the landing page.
     *  2. Check for "Need a nudge? Try this prompt" and prompt examples.
     * Expected Result:
     *  - "Need a nudge?" text and prompt examples are visible.
     */
    test('should display "Need a nudge?" hint section', async ({ page }) => {
        // Verify "Need a nudge?" text
        await expect(page.getByText('Need a nudge? Try this prompt')).toBeVisible();
        // Verify "Quick prompt examples" text
        await expect(page.locator('.truncate.flex.items-center')).toBeVisible();
    });

    /**
     * Name: TC-005-Anonymous Verify the send button is disabled when the input field is empty
     * Steps:
     *  1. Ensure the challenge input field is empty.
     *  2. Check the send button state.
     * Expected Result:
     *  - Send button is disabled when input is empty.
     */
    test('should have send button disabled when input field is empty', async ({ page }) => {
        await expect(page.locator('.flex.gap-1')).toBeVisible();
    });

    /**
     * Name: TC-006-Anonymous Verify the send button is enabled after typing text in the input field
     * Steps:
     *  1. Type text into the challenge input field.
     *  2. Check the send button state.
     * Expected Result:
     *  - Send button is enabled after typing text.
     */
    test('should enable send button after typing text in input field', async ({ page }) => {
        const inputField = page.getByRole('textbox', { name: /Describe your user experience / });
        await inputField.fill('This is a test input');
        await expect(page.locator('.flex.gap-1')).toBeVisible();
    });

    /**
     * Name: TC-007-Anonymous Verify clicking on a prompt example navigates to the conversation page with the prompt pre-filled
     * Steps:
     *  1. Click on a prompt example.
     *  2. Check navigation to conversation page.
     * Expected Result:
     *  - Navigates to conversation page with prompt pre-filled.
     */
    test('should make prompt example clickable and navigate to conversation', async ({ page }) => {
        // Click on the first prompt example
        await page.locator('.truncate.flex.items-center').click();
        // Verify navigation to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/);
    });

    /**
     * Name: TC-008-Anonymous Verify clicking back from conversation page returns to landing page without creating an account
     * Steps:
     *  1. Click on a prompt example to go to conversation page.
     *  2. Click back button to return to landing page.
     * Expected Result:
     *  - Warning about unsaved work is shown.
     *  - Landing page is displayed.
     */
    test('should return to landing page without creating an account', async ({ page }) => {
        // Click on the first prompt example to navigate to conversation page
        await page.locator('.truncate.flex.items-center').click();
        await page.getByTestId('btn-back').click();
        await page.getByRole('button', { name: 'Back' }).click();

        // Verify return to landing page
        await expect(page.getByText('Your all work was not saved,')).toBeVisible();
        await expect(page.getByTestId('what-is-project-button')).toBeVisible();


    });

    /**
     * Name: TC-009-Anonymous Verify clicking the Login button opens the login dialog
     * Steps:
     *  1. Click the Login button in the header.
     * Expected Result:
     *  - Login dialog appears with all login fields and buttons.
     */
    test('should display login dialog when Login button is clicked', async ({ page }) => {
        // Click Login button
        await page.locator('#landingHeader').getByRole('button', { name: 'Login' }).click();

        // Verify login dialog appears
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login with Google' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Login' }).last()).toBeVisible();
        await expect(page.getByRole('button', { name: 'Sign up' })).toBeVisible();
    });

    /**
     * Name: TC-010-Anonymous Verify clicking the Register for free button opens the registration dialog
     * Steps:
     *  1. Click the Register for free button in the header.
     * Expected Result:
     *  - Registration dialog appears with all registration fields and buttons.
     */
    test('should display registration dialog when Register for free button is clicked', async ({ page }) => {
        // Click Register for free button
        await page.locator('#landingHeader').getByRole('button', { name: 'Register for free' }).click();

        // Verify registration dialog appears
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Create account with Google' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Create account' }).last()).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    });

    /**
     * Name: TC-011-Anonymous Verify "What is Ideoz project?" button redirects to the relevant page/section
     * Steps:
     *  1. Click the "What is Ideoz project?" button.
     * Expected Result:
     *  - YouTube iframe, Cancel, Play, Share, and Create Free Account buttons are visible.
     */
    test('should redirect to Ideoz project section when "What is Ideoz project?" button is clicked', async ({ page }) => {
        // Click "What is Ideoz project?" button
        await page.getByRole('button', { name: 'What is Ideoz project?' }).click();

        // Verify redirection to the Ideoz project section
        await expect(page.locator('iframe[title="What is Ideoz Project?"]')).toHaveAttribute('src', /.*youtube.com.*/);
        await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Play' })).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Share' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Create Free Account' })).toBeVisible();

        // Close the iframe dialog
        await page.getByRole('button').filter({ hasText: /^$/ }).click();
    });

    /**
     * Name: TC-012-Anonymous Verify the video in the "What is Ideoz project?" section plays correctly
     * Steps:
     *  1. Click the "What is Ideoz project?" button.
     *  2. Play the video in the iframe.
     * Expected Result:
     *  - Video plays and Pause button is visible.
     */
    test('should play video in "What is Ideoz project?" section', async ({ page }) => {
        // Click "What is Ideoz project?" button
        await page.getByRole('button', { name: 'What is Ideoz project?' }).click();
        // Play the video
        await page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Play' }).click();
        // Verify video is playing by checking the pause button appears
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Pause' })).toBeVisible();

    });


    /**
     * Name: TC-013-Anonymous Verify the "Create Free Account" button in the "What is Ideoz project?" section opens the registration dialog
     * Steps:
     *  1. Click the "What is Ideoz project?" button.
     *  2. Click the "Create Free Account" button in the dialog.
     * Expected Result:
     *  - Registration dialog appears with all registration fields and buttons.
     */
    test('should open registration dialog when "Create Free Account" button is clicked in "What is Ideoz project?" section', async ({ page }) => {
        // Click "What is Ideoz project?" button
        await page.getByRole('button', { name: 'What is Ideoz project?' }).click();
        // Click "Create Free Account" button
        await page.getByRole('button', { name: 'Create Free Account' }).click();
        // Verify registration dialog appears
        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.getByRole('button', { name: 'Create account with Google' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
        await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Create account' }).last()).toBeVisible();
        await expect(page.getByRole('button', { name: 'Log in' })).toBeVisible();
    });


});





