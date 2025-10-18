import { test, expect } from '@playwright/test';
import { time } from 'console';

test.describe('Anonymous Landing Page Tests', () => {
    const baseURL = 'https://app-test.ideoz.ai/';

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);

    });


    // Test user data
    const testUser = {
        name: 'Test User',
        email: 'testuser1000@example.com',
        password: 'P@ssw0rd123',

        name1: 'Test User',
        email1: 'testuser2@example.com',
        password1: 'P@ssw0rd123',

        name2: 'Test User 2',
        email2: 'testuser002@example.com',
        password2: 'P@ssw0rd123'
    };


    test('TC-001: "Create free account" button redirects to registration dialog', async ({ page }) => {
        await page.getByTestId('btn-register').click();
        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();
        // Expected: Google authentication button is visible
        await expect(page.getByTestId('btn-google-auth')).toBeVisible();
    });


    test('TC-002: Successful account creation and auto-login', async ({ page }) => {
        await page.getByTestId('btn-register').click();
        await page.getByRole('textbox', { name: /name/i }).fill(testUser.name);
        await page.getByRole('textbox', { name: /email/i }).fill(testUser.email);
        await page.getByRole('textbox', { name: /password/i }).fill(testUser.password);
        await page.getByTestId('btn-submit-auth').click();

        // Expected: Profile icon appears after successful registration (auto-login)
        await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible();
        // Expected: "Create new Project" button is visible after login
        await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
    });

    test('TC-003: "Create free account" button in "What is Ideoz project?" section redirects to registration dialog', async ({ page }) => {

        await page.getByRole('button', { name: /what is ideoz project\?/i }).click();
        await page.getByRole('button', { name: /create free account/i }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();
        // Expected: Google authentication button is visible
        await expect(page.getByTestId('btn-google-auth')).toBeVisible();
    });

    test('TC-004: Successful account creation and auto-login via "What is Ideoz project?" section', async ({ page }) => {

        await page.getByRole('button', { name: /what is ideoz project\?/i }).click();
        await page.getByRole('button', { name: /create free account/i }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();

        await page.getByRole('textbox', { name: /name/i }).fill(testUser.name1);
        await page.getByRole('textbox', { name: /email/i }).fill(testUser.email1);
        await page.getByRole('textbox', { name: /password/i }).fill(testUser.password1);
        await page.getByTestId('btn-submit-auth').click();

        // Expected: Profile icon appears after successful registration (auto-login)
        await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible();
        // Expected: "Create new Project" button is visible after login
        await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
    });

    test('TC-005: Anonymous user can use plugin without account creation', async ({ page }) => {
        await page.waitForTimeout(5000);
        await page.locator('.truncate.flex.items-center').click();
        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/);


        await page.waitForTimeout(10000);
        // Expected: "Go to bottom" button is visible in chat
        await expect(page.getByRole('button', { name: 'Go to bottom' })).toBeVisible();
        // Expected: "Register for free" button is visible in chat
        await expect(page.getByRole('button', { name: 'Register for free' })).toBeVisible();

    });

    test('TC-006: "Create free account" button inside chat redirects to registration dialog', async ({ page }) => {
        await page.waitForTimeout(5000);
        await page.locator('.truncate.flex.items-center').click();
        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/);


        await page.waitForTimeout(10000);
        // Expected: "Go to bottom" button is visible in chat
        await expect(page.getByRole('button', { name: 'Go to bottom' })).toBeVisible();
        // Expected: Click "Register for free" button in chat
        await page.getByRole('button', { name: 'Register for free' }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();


    });

    test('TC-007: Successful account creation and auto-login in chat', async ({ page }) => {
        await page.waitForTimeout(5000);
        await page.locator('.truncate.flex.items-center').click();
        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/);


        await page.waitForTimeout(10000);
        // Expected: "Go to bottom" button is visible in chat
        await expect(page.getByRole('button', { name: 'Go to bottom' })).toBeVisible();
        // Expected: Click "Register for free" button in chat
        await page.getByRole('button', { name: 'Register for free' }).click();

        // Expected: Registration dialog submit button is visible
        await expect(page.getByTestId('btn-submit-auth')).toBeVisible();

        await page.getByRole('textbox', { name: /name/i }).fill(testUser.name2);
        await page.getByRole('textbox', { name: /email/i }).fill(testUser.email2);
        await page.getByRole('textbox', { name: /password/i }).fill(testUser.password2);
        await page.getByTestId('btn-submit-auth').click();

        // Expected: "Continue chat" or "Create project" text is visible after registration
        await expect(page.getByText(/continue chat|create project/i)).toBeVisible();
        // Expected: Profile icon appears after successful registration (auto-login)
        await expect(page.getByRole('button', { name: 'T', exact: true })).toBeVisible()
    });

    test('TC-008: Banner appears when skipping account creation in chat', async ({ page }) => {
        await page.waitForTimeout(5000);
        await page.locator('.truncate.flex.items-center').click();
        // Expected: Navigates to conversation page
        await expect(page).toHaveURL(/.*\/conversation\/.*/);
        await page.waitForTimeout(20000);

        await page.getByTestId('chat-input').click();
        await page.getByTestId('chat-input').fill('tell me more based result ');

        await page.getByTestId('chat-submit-button').click();
        // Expected: Banner text appears prompting user to create a project
        await expect(page.getByText('Want to go deeper? Create a project now for better context resultsCreate free')).toBeVisible();
        // Expected: Banner action button is visible
        await expect(page.getByTestId('banner-action-button')).toBeVisible();

    });

});
