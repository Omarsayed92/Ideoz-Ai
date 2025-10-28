// tests/E2E/Project/DeleteProject.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Fixtures/Login';
import { CreateProjectPage } from '../../Fixtures/CreateProject';
import { DeleteProjectPage } from '../../Fixtures/DeleteProject';
import { ViewProjectPage } from '../../Fixtures/ViewProject';

// Test data constants
const TEST_USER = {
    email: 'testdelete@example.com',
    password: 'Aa@123456'
};

const TEST_PROJECT_NAME = 'Test Project for Delete Visibility';

let loginPage: LoginPage;
let createProjectPage: CreateProjectPage;
let deleteProjectPage: DeleteProjectPage;
let viewProjectPage: ViewProjectPage;

/**
 * Function to login and wait for dashboard
 */
import { Page } from '@playwright/test';

async function loginAndWait(page: Page) {
    await page.goto('/');
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillEmail(TEST_USER.email);
    await loginPage.fillPassword(TEST_USER.password);
    await loginPage.clickLogin();
    await page.waitForTimeout(2000);
}

/**
 *  Function to create a test project
 */
async function createTestProject(page: Page, projectName: string = TEST_PROJECT_NAME) {
    createProjectPage = new CreateProjectPage(page);
    await createProjectPage.openDialog();
    await createProjectPage.fillProjectName(projectName);
    await createProjectPage.submit();
    await page.waitForTimeout(2000);
}

/**
 *  Function to navigate back to project list
 */
async function navigateToProjectList(page: Page) {
    viewProjectPage = new ViewProjectPage(page);
    await viewProjectPage.navigationArrow.click();
    await page.waitForTimeout(1000);
}

test.describe('Verify user can delete a project successfully', () => {


    // TC-001: Verify Delete Option is Visible in Project List
    // Steps:
    // 1. Login with valid credentials.
    // 2. Create a new test project.
    // 3. Navigate back to the project list.
    // 4. Verify the project card is visible.
    // 5. Verify the delete option (Project options) is visible and clickable.

    // Expected Result:
    // - The project card is visible in the list.
    // - The delete option in menu is visible and can be clicked.

    test('TC-001: Verify Delete Option is Visible in Project List', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);
        await createTestProject(page);
        await navigateToProjectList(page);

        // Verify project card is visible
        await deleteProjectPage.verifyProjectCardVisible(TEST_PROJECT_NAME);

        // Verify delete option is visible and clickable
        await expect(deleteProjectPage.projectOptionsButton.first()).toBeVisible();
        await deleteProjectPage.openProjectOptions(0);
        await expect(deleteProjectPage.deleteProjectOption).toBeVisible();
    });



    // TC-002: Verify element in delete dialog
    // Steps:
    // 1. Login with valid credentials.
    // 2. Click Project options and select delete.
    // 3. Verify the delete dialog appears.
    // Expected Result:
    // - Delete dialog is visible after clicking delete option.
    // - Project name input field is visible.
    // - Confirm delete button is visible and disabled.


    test('TC-002: Verify element in delete dialog', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);
        await deleteProjectPage.openDeleteDialog();

        // Verify dialog and its elements
        await deleteProjectPage.verifyDialogVisible();
        await expect(deleteProjectPage.projectNameInput).toBeVisible();
        await expect(deleteProjectPage.confirmDeleteButton).toBeVisible();
        await deleteProjectPage.verifyDeleteButtonDisabled();
    });



    // TC-003: Verify Delete Project Functionality
    // Steps:
    // 1. Login with valid credentials.
    // 2. Click Project options and select delete.
    // 3. Enter correct project name in input.
    // 4. Click confirm delete button.
    // Expected Result:
    // - Project is deleted and dialog closes.
    // - User is redirected to dashboard (main heading visible).

    test('TC-003: Verify Delete Project Functionality', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);
        await deleteProjectPage.deleteProject(TEST_PROJECT_NAME);

        // Verify deletion success
        await deleteProjectPage.verifyDialogHidden();
        await deleteProjectPage.verifyDashboardRedirect();
    });
});

test.describe('Additional scenarios for Delete project functionality', () => {

    // TC-004: Verify Project Deletion Confirmation Message
    // Steps:
    // 1. Login and create a test project.
    // 2. Navigate to project list and open delete dialog.
    // 3. Enter correct project name and confirm delete.
    // 4. Observe confirmation message.
    // Expected Result:
    // - Confirmation message and icon are visible.
    // - Success message for project deletion is displayed.

    test('TC-004: Verify Project Deletion Confirmation Message', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);
        await createTestProject(page);
        await navigateToProjectList(page);

        await deleteProjectPage.deleteProject(TEST_PROJECT_NAME);
        await deleteProjectPage.verifySuccessMessage(TEST_PROJECT_NAME);
    });



    // TC-005: Verify "Delete" button in confirmation dialog is initially disabled
    // Steps:
    // 1. Login and create a test project.
    // 2. Open delete dialog for the project.
    // 3. Observe the state of the delete button before entering project name.
    // Expected Result:
    // - Delete button is disabled until correct project name is entered.

    test('TC-005: Verify "Delete" button in confirmation dialog is initially disabled', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);
        await createTestProject(page);
        await navigateToProjectList(page);

        await deleteProjectPage.openDeleteDialog();
        await deleteProjectPage.verifyDeleteButtonDisabled();
    });


    // TC-006: Verify "Delete" button in confirmation dialog is enabled
    // Steps:
    // 1. Login and open delete dialog for a project.
    // 2. Open delete dialog for the project.
    // 2. Enter correct project name in input field.
    // 3. Observe the state of the delete button.
    // Expected Result:
    // - Delete button becomes enabled when correct project name is entered.

    test('TC-006: Verify "Delete" button in confirmation dialog is enabled', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);

        await deleteProjectPage.openDeleteDialog();
        await deleteProjectPage.enterProjectName(TEST_PROJECT_NAME);
        await deleteProjectPage.verifyDeleteButtonEnabled();
    });






    // TC-007: Verify Close "x" in Delete Dialog
    // Steps:
    // 1. Login and open delete dialog for a project.
    // 2. Open delete dialog for the project.
    // 3. Click the close "x" button in the dialog.
    // Expected Result:
    // - Delete dialog closes 

    test('TC-007: Verify Close "X" in Delete Dialog', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);

        await deleteProjectPage.openDeleteDialog();
        await deleteProjectPage.closeDialog();
    });


    // TC-008: Verify Delete button still disabled after entering wrong title
    // Steps:
    // 1. Login and open delete dialog for a project.
    // 2. Open delete dialog for the project.
    // 3. Enter incorrect project name in input field.
    // 4. Observe the state of the delete button.
    // Expected Result:
    // - Delete button remains disabled if project name does not match.

    test('TC-008: Verify Delete button still disabled after entering wrong title', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);

        await deleteProjectPage.openDeleteDialog();
        await deleteProjectPage.enterProjectName('Test Project for Delete Visibility Wrong');
        await deleteProjectPage.verifyDeleteButtonDisabled();
    });



    // TC-09: Verify Delete Project Functionality
    // Steps:
    // 1. Login and open delete dialog for a project.
    // 2. Enter correct project name in input field.
    // 3. Click confirm delete button.
    // Expected Result:
    // - Project is deleted and dialog closes.
    // - User is redirected to dashboard (main heading visible).

    test('TC-009: Verify Delete Project Functionality', async ({ page }) => {
        deleteProjectPage = new DeleteProjectPage(page);

        await loginAndWait(page);
        await deleteProjectPage.deleteProject(TEST_PROJECT_NAME);

        // Verify deletion success
        await deleteProjectPage.verifyDialogHidden();
        await deleteProjectPage.verifyDashboardRedirect();
    });
});