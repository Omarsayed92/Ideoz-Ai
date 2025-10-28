import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Fixtures/Login';
import { CreateProjectPage } from '../../Fixtures/CreateProject';
import { ViewProjectPage } from '../../Fixtures/ViewProject';


const TEST_EMAIL = 'userviewproject@example.com';
const TEST_PASSWORD = 'P@ssw0rd123';

let loginPage: LoginPage;
let createProjectPage: CreateProjectPage;
let viewProjectPage: ViewProjectPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    createProjectPage = new CreateProjectPage(page);
    viewProjectPage = new ViewProjectPage(page);

    await page.goto('/');
    loginPage = new LoginPage(page);
    await loginPage.gotoLoginPage();
    await loginPage.fillEmail(TEST_EMAIL);
    await loginPage.fillPassword(TEST_PASSWORD);
    await loginPage.clickLogin();
    await page.waitForTimeout(2000);
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

test('TC-001:Successful project creation', async ({ page }) => {
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

});


// TC-002: Verify View Project Page Loads Successfully
// Steps:
// 1. Successfully create a new project
// 2. View project page loads successfully with all project details displayed
// Expected: Project page loads and all details are visible

test('TC-002: Verify View Project Page Loads Successfully', async ({ page }) => {


    await page.waitForTimeout(2000);
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();


    await page.waitForTimeout(2000);
    await expect(viewProjectPage.projectTitle).toBeVisible();
});



// TC-003: Verify "Project Title" is clearly displayed.
// Steps:
// 1. User is on the view project page
// 2. Observe the project details section
// Expected: Project title is  displayed at the top of the page and chat area

test('TC-003: Verify "Project Title" is clearly displayed.', async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();


    await page.waitForTimeout(2000);
    await expect(viewProjectPage.projectTitle).toBeVisible();
});


// TC-004: Verify "Navigation Arrow" redirects to the previous page
// Steps:
// 1. User is on the view project page
// 2. Click on the "Navigation Arrow"
// Expected: User is redirected to the landing page

test('TC-004: Verify "Navigation Arrow" redirects to the previous page', async ({ page }) => {
    await page.waitForTimeout(2000);
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await viewProjectPage.navigationArrow.click();

    await page.waitForTimeout(2000);
    await expect(page.getByTestId('create-project-button')).toBeVisible();

});

// TC-005: Verify "More Options Icon" is visible
// Steps:
// 1. User is on the view project page
// 2. Observe the project details section
// Expected: Vertical ellipsis icon is visible, 

test('TC-005: Verify "More Options Icon" is visible.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await page.waitForTimeout(2000);

    await expect(viewProjectPage.moreOptionsIcon).toBeVisible();
});


// TC-006: Verify "More Options Icon" is visible
// Steps:
// 1. User is on the view project page
// 2. Observe the project details section
// Expected: Vertical ellipsis icon is visible, with options for Upload files and Update project context

test('TC-006: Verify "More Options Icon" is visible with options for Upload files and Update project context.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await page.waitForTimeout(2000);

    await viewProjectPage.moreOptionsIcon.click();


    await expect(page.getByRole('menu', { name: 'Header menu' })).toBeVisible();
    await expect(viewProjectPage.uploadFilesMenuItem).toBeVisible();
    await expect(viewProjectPage.updateProjectContextMenuItem).toBeVisible();

});


// TC-007: Verify "Chat Input Field" is present and labeled correctly
// Steps:
// 1. User is on the view project page
// 2. Observe the project details section
// Expected: A text input field labeled "Describe your user ..." is present

test('TC-007: Verify "Chat Input Field" is present and labeled correctly.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await expect(viewProjectPage.chatInput).toBeVisible();
    await expect(viewProjectPage.chatInput).toHaveAttribute('placeholder', /describe your user/i);
});


// TC-008: Verify clicking "Suggested nudge" Redirect to conversation
// Steps:
// 1. User is on the view project page
// 2. Click on a "Suggested nudge"
// Expected: The text of the nudge is populated or a relevant action is triggered

test('TC-008: Verify clicking "Suggested nudge" populates chat input or triggers suggestions.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();

    await viewProjectPage.suggestedNudge.click();


    await expect(page.getByTestId('chat-messages-container')).toBeVisible();

});

// TC-009: Verify "History chat appears" after exit from chat in project
// Steps:
// 1. User is on the view project page
// 2. Send a message in chat
// 3. Click back icon in chat
// Expected: Chat history appears

test('TC-009: Verify "History chat appears" after exit from chat in project.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();

    await viewProjectPage.chatInput.fill('What are some color palettes?');
    await viewProjectPage.chatInput.press('Enter');
    await page.waitForTimeout(5000);
    await viewProjectPage.navigationArrow.click();

    await expect(page.getByText('Previous chats')).toBeVisible();
    await expect(page.getByTestId('project-conversations-list')).toBeVisible();

});


// TC-010: Verify "Upload project files" option is present and clickable
// Steps:
// 1. User is on the view project page
// 2. Observe and click the file upload icon
// Expected: Icon is visible and clickable

test('TC-010: Verify "Upload project files" option is present and clickable.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await expect(viewProjectPage.uploadFilesButton).toBeVisible();

    await viewProjectPage.uploadFilesButton.click();
    await expect(page.getByTestId('upload-files-dialog')).toBeVisible();

});


// TC-011: Verify "update project context" option is present and clickable
// Steps:
// 1. User is on the view project page
// 2. Observe and click the update context icon
// Expected: Icon and text are visible and clickable

test('TC-011: Verify "update project context" option is present and clickable.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await expect(viewProjectPage.updateContextButton).toBeVisible();
    await viewProjectPage.updateContextButton.click();

    await expect(page.getByRole('dialog', { name: 'Update project context' })).toBeVisible();
});




// TC-012: Verify "Upload project files" handles cancellation
// Steps:
// 1. User is on the view project page
// 2. Click upload files
// 3. Cancel or close the file dialog
// Expected: Dialog closes, no files uploaded, user remains on project page

test('TC-012: Verify "Upload project files" handles cancellation.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await expect(viewProjectPage.uploadFilesButton).toBeVisible();

    await viewProjectPage.uploadFilesButton.click();
    await expect(page.getByTestId('upload-files-dialog')).toBeVisible();
    // Click on close icon
    await page.getByRole('button').filter({ hasText: /^$/ }).click();
    await expect(page.getByTestId('project-title-name')).toBeVisible();

    await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
    await expect(page.getByTestId('btn-update-project-context')).toBeVisible();


});


// TC-013: Verify "update project context" handles cancellation
// Steps:
// 1. User is on the view project page
// 2. Click update context
// 3. Cancel or close the dialog
// Expected: Dialog closes, no changes made, user remains on project page

test('TC-013: Verify "update project context" handles cancellation.', async ({ page }) => {
    await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();
    await viewProjectPage.updateContextButton.click();

    await page.getByRole('button', { name: 'Update project context' }).click();
    await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
    await expect(page.getByTestId('btn-update-project-context')).toBeVisible();

});


// TC-014: Access View Project Page with Invalid Project ID
// Steps:
// 1. Manually modify URL with invalid project ID
// 2. Navigate to the URL
// Expected: User redirected to home page

test('TC-014: Access View Project Page with Invalid Project ID.', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/project/invalid-id');

    // await expect(page.getByRole('heading', { name: 'What problem are you working' })).toBeVisible();
    // await expect(page.getByRole('heading', { name: 'My Projects' })).toBeVisible();

    await expect(page.getByTestId('btn-login')).toBeVisible();
    await expect(page.getByTestId('btn-register')).toBeVisible();


});



// TC-015: Access View Project Page Without Authentication
// Steps:
// 1. Copy view project URL
// 2. Open in new browser (not logged in)
// 3. Navigate to the URL
// Expected: User redirected to home page


test('TC-015: Access View Project Page Without Authentication.', async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('http://localhost:3000/project/valid-id');

    await expect(page.getByTestId('btn-login')).toBeVisible();
    await expect(page.getByTestId('btn-register')).toBeVisible();

    await context.close();
});


