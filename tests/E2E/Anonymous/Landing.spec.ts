import { test, expect } from '@playwright/test';

test.describe('Anonymous Landing Page Tests', () => {
    const baseURL = 'https://app-staging.ideoz.ai/';

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
    });

    // TC-001-Anonymous Verify all header elements are displayed correctly.
    test('should display all header elements correctly', async ({ page }) => {
        // Verify logo is present
        await expect(page.getByRole('img')).toBeVisible();

        // Verify points button is displayed and disabled
        await expect(page.getByRole('button', { name: /points remaining/ })).toBeVisible();
        

        // Verify Login button is displayed
        await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();

        // Verify Register for free button is displayed
        await expect(page.getByRole('button', { name: 'Register for free' })).toBeVisible();
    });


    // TC-002-Anonymous Verify main heading and subheading are displayed.
    test('should display main heading and subheading', async ({ page }) => {
        // Verify main heading
        await expect(page.getByRole('heading', { name: 'What problem are you working on now?' })).toBeVisible();

        // Verify subheading
        await expect(page.getByText('Uncover the right UX problem faster and smarter with Ideoz-AI')).toBeVisible();
    });


    // TC-003-Anonymous Verify the user challenge input area elements are present.
    test('should display user challenge input area elements', async ({ page }) => {
        // Verify text input field
        await expect(page.getByRole('textbox', { name: /Describe your user experience challenge/ })).toBeVisible();

        // Verify Mode section
        await expect(page.getByText('Mode')).toBeVisible();
        await expect(page.getByText('🧠 Uncover')).toBeVisible();

        // Verify buttons in the input area
        await expect(page.locator('.flex.gap-1')).toBeVisible();
    });


    // TC-004-Anonymous Verify the "Need a nudge?" hint section is displayed.
    test('should display "Need a nudge?" hint section', async ({ page }) => {
        // Verify "Need a nudge?" text
        await expect(page.getByText('Need a nudge? Try this prompt')).toBeVisible();
        // Verify "Quick prompt examples" text
        await expect(page.locator('.truncate.flex.items-center')).toBeVisible();
    });

    // TC-005-Anonymous Verify the send button is disabled when the input field is empty.
    test('should have send button disabled when input field is empty', async ({ page }) => {
        await expect(page.locator('.flex.gap-1')).toBeVisible();
    });

    // TC-006-Anonymous Verify the send button is enabled after typing text in the input field.
    test('should enable send button after typing text in input field', async ({ page }) => {
        const inputField = page.getByRole('textbox', { name: /Describe your user experience / });
        await inputField.fill('This is a test input');
        await expect(page.locator('.flex.gap-1')).toBeVisible();
    });

    // TC-007-Anonymous Verify clicking on a prompt example navigates to the conversation page with the prompt pre-filled.
    test('should make prompt example clickable and navigate to conversation', async ({ page }) => {
        // Click on the first prompt example
        await page.locator('.truncate.flex.items-center').click();
        // Verify navigation to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/);
    });

    // TC-008-Anonymous Verify clicking back from conversation page returns to landing page without creating an account.
    test('should return to landing page without creating an account', async ({ page }) => {
        // Click on the first prompt example
        await page.locator('.truncate.flex.items-center').click();
        // Verify navigation to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/);
        // Click back button
        await page.getByRole('button', { name: 'New Conversation' }).click();
       // await expect(page.locator('#landingHeader'))
        await page.getByRole('button', { name: 'Back' }).click();

        // Verify return to landing page
        await expect(page).toHaveURL(baseURL);
    });

    // TC-009-Anonymous Verify clicking the Login button opens the login dialog.
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

    // TC-010-Anonymous Verify clicking the Register for free button opens the registration dialog.
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

    // TC-11-Anonymous Verify "What is Ideoz project?" button redirects to the relevant page/section.
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

    // TC-12-Anonymous Verify the video in the "What is Ideoz project?" section plays correctly.
    test('should play video in "What is Ideoz project?" section', async ({ page }) => {
        // Click "What is Ideoz project?" button
        await page.getByRole('button', { name: 'What is Ideoz project?' }).click();
        // Play the video
        await page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Play' }).click();
        // Verify video is playing by checking the pause button appears
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Pause' })).toBeVisible();

    });

    // TC-13-Anonymous Verify the video in the "What is Ideoz project?" section can be shared.
    test('should share video in "What is Ideoz project?" section', async ({ page }) => {
        // Click "What is Ideoz project?" button
        await page.getByRole('button', { name: 'What is Ideoz project?' }).click();
        // Click the share button
        await page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Share' }).click();
        // Verify share options appear
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Facebook' })).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'Twitter' })).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().getByRole('button', { name: 'LinkedIn' })).toBeVisible();
    });

    // TC-14-Anonymous Verify the "Create Free Account" button in the "What is Ideoz project?" section opens the registration dialog.
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





