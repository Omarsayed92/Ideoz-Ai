// tests/E2E/Project/CreateProject.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Fixtures/Login';
import { Createaccount } from '../../Fixtures/Createaccount';
import { CreateProjectPage } from '../../Fixtures/CreateProject';



test.describe('Create Project Tests', () => {

    let loginPage: LoginPage;
    let createProjectPage: CreateProjectPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        createProjectPage = new CreateProjectPage(page);

        // Login before each test
        await page.goto('/');
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail("testcreateproject@example.co");
        await loginPage.fillPassword("P@ssw0rd123");
        await loginPage.clickLogin();


    });


    //Tc-001: Verify successful project creation from "Create new Projects" page.
    // User is logged in with valid credentials

    /**Test Steps:**
    1. Click "Create new Project" button
    2. Enter valid project name
    3. Click "Create" button

    **Expected Results:**
    - Project appears in list, success notification, redirect to view project page 
    - Project title and action buttons are visible */


    test('Successful project creation', async ({ page }) => {
        // 1. Click "Create new Project" button

        await createProjectPage.openDialog();

        // 2. Enter valid project name
        await createProjectPage.fillProjectName('Checkout drop-off issue');

        // 3. Click "Create" button
        await createProjectPage.submit();

        // Expected: Project appears in list, success notification, redirect
        await expect(page.getByText(/project created|workspace|dashboard/i)).toBeVisible();
        await expect(page.getByTestId('project-title-name')).toBeVisible();

        await expect(page.getByTestId('btn-update-project-context')).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
        //Update project context appears in toast
        await expect(page.getByLabel('Notifications alt+T').getByRole('button', { name: 'Update project context' })).toBeVisible();

    });



    // TC-002: Project name field validation (empty)
    /**Test Steps:
    2. Leave project name empty
    3. Check button state

    **Expected Results:**
    - Create button is disabled
    - Dialog remains visible **/


    test('Project name field validation (empty)', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();

        // Leave project name empty and check button state
        await expect(createProject.createButton).toBeDisabled();

        // If button is disabled, dialog should remain visible
        await expect(createProject.dialog).toBeVisible();
    });


    // TC-003: Project name length boundary
    /**1. Open create project dialog
    2. Enter max length name (e.g., 100 chars)
    3. Click create

    **Expected Results:**
    - Project created
    - Project title and action buttons are visible
    **/

    test('Project name length boundary', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();

        // Enter max length name (adjust length as per app limit)
        const longName = 'A'.repeat(100);
        await createProject.fillProjectName(longName);
        await createProject.submit();

        // Expected: Project created or error if over limit
        await expect(page.getByText(/project created/i)).toBeVisible();
        await expect(page.getByTestId('project-title-name')).toBeVisible();

        await expect(page.getByTestId('btn-update-project-context')).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
    });




    // TC-004: Duplicate project name
    /**Test Steps:
    1. Open create project dialog
    2. Enter existing project name
    3. Click create

    **Expected Results:**
    - Project created
    - Project title and action buttons are visible
    **/

    test('Duplicate project name', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();

        // Try to create a project with an existing name
        await createProject.fillProjectName('Checkout drop-off issue');
        await createProject.submit();

        // Expected: Application allows duplicate names, so project is created successfully
        await expect(page.getByText(/project created|workspace|dashboard/i)).toBeVisible();
        await expect(page.getByTestId('project-title-name')).toBeVisible();

        await expect(page.getByTestId('btn-update-project-context')).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
    });


    // TC-005: Special characters in project name
    /**Test Steps:
    1. Open create project dialog
    2. Enter name with special characters
    3. Click create

    **Expected Results:**
    - Project created
    - Project title and action buttons are visible
    **/

    test('Special characters in project name', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();

        // Enter name with special characters
        await createProject.fillProjectName('Project #1: Onboarding!');
        await createProject.submit();

        // Expected: Project created or error if not allowed
        await expect(page.getByText(/project created/i)).toBeVisible();
        await expect(page.getByTestId('project-title-name')).toBeVisible();

        await expect(page.getByTestId('btn-update-project-context')).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
    });


    // TC-006: Cancel project creation
    /**Test Steps:
    1. Open create project dialog
    2. Click close button

    **Expected Results:**
    - Dialog closes, no project created
    **/

    test('Cancel project creation', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();

        // Click close button
        await createProject.closeDialog();

        // Expected: Dialog closes, no project created
        await expect(createProject.dialog).not.toBeVisible();
    });


    // TC-007: Accessibility and UI validation
    /**Test Steps:
    1. Open create project dialog

    **Expected Results:**
    - Dialog is accessible
    - All UI elements are visible and properly labeled
    **/

    test('Accessibility and UI validation', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();

        // Verify dialog is accessible
        await expect(createProject.dialog).toBeVisible();
        await expect(createProject.projectNameInput).toBeVisible();
        await expect(createProject.createButton).toBeVisible();

        // Tab through to ensure keyboard navigation works
        await page.keyboard.press('Tab');
        const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
        // Verify some element received focus
        expect(focusedElement).toBeTruthy();
    });


    // TC-008: Create button enabled after typing valid project name
    /**Test Steps:
    1. Open create project dialog
    2. Enter valid project name

    **Expected Results:**
    - Create button is enabled
    **/

    test('Create button enabled after typing valid project name', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();
        await createProject.fillProjectName('Valid Project');
        await expect(createProject.createButton).toBeEnabled();
    });


    // TC-009: Create button remains disabled if project name is only spaces
    /**Test Steps:
    1. Open create project dialog
    2. Enter project name with only spaces

    **Expected Results:**
    - Create button remains disabled
    **/

    test('Create button remains disabled if project name is only spaces', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();
        await createProject.fillProjectName('     ');
        await expect(createProject.createButton).toBeDisabled();
    });

    // TC-010: Handle invalid characters in project name
    /**Test Steps:
    1. Open create project dialog
    2. Enter name with invalid characters
    3. Click create

    **Expected Results:**
    - Project created
    - Project title and action buttons are visible
    **/

    test('Handle invalid characters in project name', async ({ page }) => {
        const createProject = new CreateProjectPage(page);
        await createProject.openDialog();
        await createProject.fillProjectName('Project<>?');

        await createProject.submit();

        // Expected: Project created or error if not allowed
        await expect(page.getByText(/project created/i)).toBeVisible();
        await expect(page.getByTestId('project-title-name')).toBeVisible();

        await expect(page.getByTestId('btn-update-project-context')).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
    });



    // TC-011: Success Create project button from chat opens dialog
    /**Test Steps:
    1. Open chat
    2. Click on create project button

    **Expected Results:**
    - Create project dialog opens
    **/

    test('Create project button in chat opens dialog', async ({ page }) => {
        await page.locator('.truncate.flex.items-center').click();

        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Go to bottom' }).click();
        await page.getByRole('button', { name: 'Go to bottom' }).click();

        await page.getByRole('button', { name: 'Create Project' }).click();

        await page.waitForTimeout(5000);
        await page.getByTestId('confirm-project-button').click();



        await expect(page.getByRole('dialog', { name: /create new project/i })).toBeVisible();
        await expect(page.getByTestId('project-title-name')).toBeVisible();

        await expect(page.getByTestId('btn-update-project-context')).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
    });
});

test.describe('Create Project from "What is Ideoz project?" section', () => {

    function generateUser(suffix = '') {
        const timestamp = Date.now();
        return {
            name: `Test User${suffix}`,
            email: `testuser_${timestamp}${suffix}@example.com`,
            password: 'P@ssw0rd123'
        };
    }


    let createaccount: Createaccount;

    test.beforeEach(async ({ page }) => {
        await page.goto('/');

        createaccount = new Createaccount(page);
        await createaccount.gotoCreateAccountPage();
    });



    // TC-012: Create project button in "What is Ideoz project?" section opens dialog

    /**Test Steps:
     * create new account
    1. Open "What is Ideoz project?" section
    2. Click on create project button

    **Expected Results:**
    - Create project dialog opens
    **/

    test('Create project button in "What is Ideoz project?" section opens dialog', async ({ page }) => {
        // account should not have any project
        const user = generateUser();

        await createaccount.fillName(user.name);
        await createaccount.fillEmail(user.email);
        await createaccount.fillPassword(user.password);
        await createaccount.clickCreateAccount();

        await page.waitForTimeout(2000);

        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible();
        await page.getByRole('button').filter({ hasText: /^$/ }).click();


        await page.waitForTimeout(2000);

        await page.getByRole('button', { name: /what is ideoz project\?/i }).click();

        await expect(page.getByTestId('what-is-project-create-project-button')).toBeVisible();

    });

    // TC-013: Success Create project button from "What is Ideoz project?"
    /**Test Steps:
    1. Create new account
    2. Open "What is Ideoz project?" section
    3. Click on create project button

    4. Complete project creation
    5. Verify project creation success

    **Expected Results:**
    - Project created successfully
    **/

    test('Success Create project button from"What is Ideoz project?" ', async ({ page }) => {

        // account should not have any project
        const user = generateUser();

        await createaccount.fillName(user.name);
        await createaccount.fillEmail(user.email);
        await createaccount.fillPassword(user.password);
        await createaccount.clickCreateAccount();

        await page.waitForTimeout(2000);

        await expect(page.getByRole('dialog')).toBeVisible();
        await expect(page.locator('iframe[title="What is Ideoz Project?"]').contentFrame().locator('.ytp-cued-thumbnail-overlay-image')).toBeVisible();
        await page.getByRole('button').filter({ hasText: /^$/ }).click();
        await page.waitForTimeout(2000);


        await page.getByRole('button', { name: /what is ideoz project\?/i }).click();

        await page.getByTestId('what-is-project-create-project-button').click();
        await page.waitForTimeout(5000);

        const createProject = new CreateProjectPage(page);
        await createProject.fillProjectName('Design Onboarding Flow');
        await createProject.submit();

        // Expected: Project created or error if not allowed
        await expect(page.getByText(/project created/i)).toBeVisible();
        await expect(page.getByTestId('project-title-name')).toBeVisible();

        await expect(page.getByTestId('btn-update-project-context')).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();


    });
});



