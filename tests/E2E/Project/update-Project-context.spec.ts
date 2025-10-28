// tests/E2E/Project/UpdateProjectContext.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Fixtures/Login';
import { CreateProjectPage } from '../../Fixtures/CreateProject';
import { ViewProjectPage } from '../../Fixtures/ViewProject';
import { UpdateProjectContextPage } from '../../Fixtures/UpdateProjectContext';

const TEST_EMAIL = 'test.u.project@gmail.com';
const TEST_PASSWORD = 'P@ssw0rd123';

test.describe('Update Project Context Tests', () => {

    let loginPage: LoginPage;
    let createProjectPage: CreateProjectPage;
    let viewProjectPage: ViewProjectPage;
    let projectContextPage: UpdateProjectContextPage;




    test.beforeEach(async ({ page }) => {

        createProjectPage = new CreateProjectPage(page);
        viewProjectPage = new ViewProjectPage(page);
        projectContextPage = new UpdateProjectContextPage(page);


        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(TEST_EMAIL);
        await loginPage.fillPassword(TEST_PASSWORD);
        await loginPage.clickLogin();

        // Generate a unique project name using timestamp
        const projectName = `Test Project ${Date.now()}`;

        // Example usage in your test:
        await createProjectPage.openDialog();
        await createProjectPage.fillProjectName(projectName);
        await createProjectPage.submit();

        // Assert project creation
        //await page.getByTestId('btn-upload-project-files').click(); await expect(page.getByText(projectName)).toBeVisible();



        await page.waitForTimeout(3000);
        // await page.getByRole('heading', { name: 'Checkout drop-off issue' }).first().click();

    });







    // TC-001: Verify "Update Project Context" Option is Present and Clickable
    // Steps:
    // 1. Login as testuser1000@example.com / P@ssw0rd123
    // 2. Create a new project from the home page
    // 3. Open the project
    // 4. Locate the "Update Project Context" option (icon and text)
    // Expected Result:
    // - - Update Project Context button is visible
    // Upload project files button is visible
    // Update Project Context button is enabled


    test('TC-001: Verify "Update Project Context" Option is Present and Clickable', async ({ page }) => {

        await expect(projectContextPage.updateContextButton).toBeVisible();
        await expect(page.getByTestId('btn-upload-project-files')).toBeVisible();
        await expect(projectContextPage.updateContextButton).toBeEnabled();

    });



    // TC-002: Verify "More Options Icon" is visible with options for Update project context.
    // Steps:
    // 1. Click on More Options icon (vertical ellipsis)
    // 2. Verify menu appears
    // 3. Verify "Update Project Context" option is visible
    // Expected Result:
    // - Vertical ellipsis icon is visible
    // - Options for Upload files and Update project context are present

    test('TC-002: Verify "More Options Icon" is visible with options for Update project context.', async ({ page }) => {

        await viewProjectPage.moreOptionsIcon.click();

        await expect(page.getByRole('menu', { name: 'Header menu' })).toBeVisible();
        await expect(viewProjectPage.updateProjectContextMenuItem).toBeVisible();

    });




    // TC-003: Verify Clicking "Update Project Context" Opens the Dialog
    // Steps:
    // 1. User is on the view project page
    // 2. Click the "Update Project Context" button/icon

    // Expected Result:

    // A modal dialog titled "Update Project Context" appears. The dialog contains a
    // -Project name field
    // -Project description field
    // -Who is your main user? field
    // -What is your design process? field
    // -Your role in the project? field
    // -How should Ideoz act? field
    // Update-Cancel buttons , and a Cancel icon ('X').


    test('TC-003: Verify Clicking "Update Project Context" Opens the Dialog', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await expect(projectContextPage.contextDialog).toBeVisible();
        await expect(projectContextPage.projectNameInput).toBeVisible();
        await expect(projectContextPage.scopeEditor).toBeVisible();
        await expect(projectContextPage.mainUserInput).toBeVisible();
        await expect(projectContextPage.designProcessOptions).toBeVisible();
        await expect(projectContextPage.roleInput).toBeVisible();
        await expect(projectContextPage.Act).toBeVisible();
        await expect(projectContextPage.updateButton).toBeVisible();
        await expect(projectContextPage.cancelButton).toBeVisible();

    });




    // TC-004: Verify Dialog Can Be Closed Using Escape Key
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Press Escape key
    // Expected Result:
    // - Dialog closes and is not visible

    test('TC-004: Verify Dialog Can Be Closed Using Escape Key', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await page.keyboard.press('Escape');
        await expect(projectContextPage.contextDialog).not.toBeVisible();
    });





    // TC-005: Verify "Project Name" Field is Present and Editable
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Edit Project Name field
    // Expected Result:
    // - Project Name field is editable and value updates
    test('TC-005: Verify "Project Name" Field is Present and Editable', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await expect(projectContextPage.projectNameInput).toBeVisible();
        const value = await projectContextPage.projectNameInput.inputValue();
        expect(value).not.toBe('');
        await projectContextPage.projectNameInput.fill('New Project Name');
        await expect(projectContextPage.projectNameInput).toHaveValue('New Project Name');
        await projectContextPage.updateButton.isEnabled();

    });





    // TC-006: Verify Project Name is a Required Field
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Clear Project Name field
    // Expected Result:
    // - Update button is disabled when field is empty
    test('TC-006: Verify Project Name is a Required Field', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await projectContextPage.projectNameInput.fill('');
        await expect(projectContextPage.updateButton).toBeDisabled();
    });





    // TC-007: Verify Project Name Character Limit Validation
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Enter long name in Project Name field
    // Expected Result:
    // - Character limit is enforced

    test('TC-007: Verify Project Name Character Limit Validation', async ({ page }) => {
        await projectContextPage.updateContextButton.click();

        await page.getByTestId('input-project-name').click();

        await page.getByTestId('input-project-name').fill('');
        const longName = 'A'.repeat(256);
        await projectContextPage.projectNameInput.fill(longName);

        await projectContextPage.updateButton.isEnabled();

    });



    // TC-08: Verify "Who is Your Main User?" Field Functionality
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Fill Main User field
    // Expected Result:
    // - Character count updates and field is editable

    test('TC-08: Verify "Who is Your Main User?" Field Functionality', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await page.getByTestId('input-main-persona').click();
        await page.getByTestId('input-main-persona').fill('Designer');

        await expect(page.getByText('8/255')).toBeVisible();

    });


    // TC-09: Verify Main User Field Character Limit Enforcement
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Enter long value in Main User field
    // Expected Result:
    // - Character limit is enforced

    test('TC-09: Verify Main User Field Character Limit Enforcement', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await page.getByTestId('input-main-persona').click();
        const longUser = 'A'.repeat(256);
        await projectContextPage.mainUserInput.fill(longUser);
        await expect(page.getByText('255/255')).toBeVisible();
    });


    // TC-010: Verify "What is Your Design Process" Selection Options
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Check available design process options
    // Expected Result:
    // - All expected options are visible
    test('TC-010: Verify "What is Your Design Process" Selection Options', async ({ page }) => {
        await projectContextPage.updateContextButton.click();

        await expect(page.getByText('Double Diamond')).toBeVisible();
        await expect(page.getByText('Design Sprint')).toBeVisible();
        await expect(page.getByText('Design Thinking')).toBeVisible();

    });



    // TC-011: Verify Design Process Tags are Selectable/Deselectable
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Select/deselect design process tags
    // Expected Result:
    // - Tags can be selected/deselected and checkmark appears
    test('TC-011: Verify Design Process Tags are Selectable/Deselectable', async ({ page }) => {
        await projectContextPage.updateContextButton.click();

        const designSprintBadge = page.getByTestId('badge-design-process-design_sprint');
        await designSprintBadge.click();

        // Verify badge is selected (has checkmark icon)
        await expect(designSprintBadge.locator('svg').first()).toBeVisible();

        // Click Design Thinking badge
        const designThinkingBadge = page.getByTestId('badge-design-process-design_thinking');
        await designThinkingBadge.click();

        // Verify Design Thinking is now selected
        await expect(designThinkingBadge.locator('svg').first()).toBeVisible();

        // Verify Design Sprint is deselected
        const designSprintCheckmark = designSprintBadge.locator('svg').first();
        await expect(designSprintCheckmark).not.toBeVisible();


    });



    // TC-012: Verify "Your Role in This Project" Field Functionality
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Fill Role field
    // Expected Result:
    // - Character count updates and field is editable
    test('TC-012: Verify "Your Role in This Project" Field Functionality', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await projectContextPage.roleInput.fill('Lead Designer');
        await page.getByTestId('textarea-user-role').click();
        await page.getByTestId('textarea-user-role').fill('Lead Designer');

        await expect(page.getByText('13/255')).toBeVisible();
    });



    // TC-013: Verify Role Field Character Limit Enforcement
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Enter long value in Role field
    // Expected Result:
    // - Character limit is enforced
    test('TC-013: Verify Role Field Character Limit Enforcement', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await page.getByTestId('textarea-user-role').click();
        const longRole = 'A'.repeat(256);
        await projectContextPage.roleInput.fill(longRole);
        await expect(page.getByText('255/255')).toBeVisible();
    });





    // TC-014: Verify "How Should Ideoz Act?" Field is Editable
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Fill Ideoz Act field
    // Expected Result:
    // - Field is editable and value updates
    test('TC-014: Verify "How Should Ideoz Act?" Field is Editable', async ({ page }) => {
        await projectContextPage.updateContextButton.click();

        await page.getByTestId('textarea-ideoz-role').click();
        await page.getByTestId('textarea-ideoz-role').fill('Be creative');

        await expect(page.getByTestId('textarea-ideoz-role')).toHaveValue('Be creative');


    });


    // TC-015: Verify Behavior Field Character Limit
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Enter long value in Ideoz Act field
    // Expected Result:
    // - Character limit is enforced
    test('TC-015: Verify Behavior Field Character Limit', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        const longAct = 'A'.repeat(255);
        await projectContextPage.Act.fill(longAct);
        await expect(page.getByText('255/255')).toBeVisible();
    });


    // TC-016: Verify "Cancel" Button Functionality
    // Steps:
    // 1. Open Update Project Context dialog
    // 2. Fill Project Name field
    // 3. Click Cancel button
    // Expected Result:
    // - Dialog closes and changes are not saved
    test('TC-016: Verify "Cancel" Button Functionality', async ({ page }) => {
        await projectContextPage.updateContextButton.click();
        await projectContextPage.projectNameInput.fill('Cancel Test');
        await projectContextPage.cancelButton.click();
        await expect(projectContextPage.contextDialog).not.toBeVisible();
    });

});





test.describe('Update Project Context - Additional Test Cases', () => {

    let loginPage: LoginPage;
    let createProjectPage: CreateProjectPage;
    let viewProjectPage: ViewProjectPage;
    let projectContextPage: UpdateProjectContextPage;

    test.beforeEach(async ({ page }) => {

        createProjectPage = new CreateProjectPage(page);
        viewProjectPage = new ViewProjectPage(page);
        projectContextPage = new UpdateProjectContextPage(page);

        const loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail('testuser2@example.com');
        await loginPage.fillPassword('P@ssw0rd123');
        await loginPage.clickLogin();
        await page.waitForTimeout(3000);


    });




    // TC-017: Verify Project Name Can Be Successfully Updated
    // Steps:
    // 1. Open Create Project dialog
    // 2. Enter valid project name
    // 3. Click Create button
    // 4. Update project context and name
    // Expected Result:
    // - Project name is updated and update button disappears
    test('TC-017: Verify Project Name Can Be Successfully Updated', async ({ page }) => {

        await createProjectPage.openDialog();
        // 2. Enter valid project name
        await createProjectPage.fillProjectName('Checkout drop-off issue 1');
        // 3. Click "Create" button
        await createProjectPage.submit();

        await page.waitForTimeout(3000);

        await projectContextPage.updateContextButton.click();

        await page.getByTestId('input-project-name').click();
        await page.getByTestId('input-project-name').fill('Checkout drop-off issue ');
        await page.getByTestId('btn-update-project-details').click();

        await expect(page.getByRole('listitem')).toBeVisible();
        // await expect(projectContextPage.successMessage).toContainText('updated');
        await expect(projectContextPage.updateContextButton).not.toBeVisible();
    });




    // TC-018: Verify Successful Update of Project Details
    // Steps:
    // 1. Open Create Project dialog
    // 2. Enter valid project name
    // 3. Click Create button
    // 4. Update project context through toast
    // Expected Result:
    // - Project details are updated and update button disappears
    test('TC-018: Verify Successful Update of Project Details', async ({ page }) => {
        await createProjectPage.openDialog();
        // 2. Enter valid project name
        await createProjectPage.fillProjectName('Checkout drop-off issue 1');
        // 3. Click "Create" button
        await createProjectPage.submit();

        await page.getByLabel('Notifications alt+T').getByRole('button', { name: 'Update project context' }).click();

        await page.waitForTimeout(2000);

        await page.getByTestId('input-project-name').click();
        await page.getByTestId('input-project-name').fill('Checkout drop-off issue ');
        await projectContextPage.updateButton.click();

        await expect(page.getByRole('listitem')).toBeVisible();

        await expect(projectContextPage.updateContextButton).not.toBeVisible();
    });







    // TC-019: Verify "Project Details Updated Successfully" Confirmation Behavior

    // Steps:
    // 1. Open Create Project dialog
    // 2. Enter valid project name
    // 3. Click Create button
    // 4. Update project context through toast
    // Expected Result:
    // - Success message appears and disappears after timeout
    test('TC-019: Verify "Project Details Updated Successfully" Confirmation Behavior', async ({ page }) => {
        await createProjectPage.openDialog();
        // 2. Enter valid project name
        await createProjectPage.fillProjectName('Checkout drop-off issue 1');
        // 3. Click "Create" button
        await createProjectPage.submit();

        await page.getByLabel('Notifications alt+T').getByRole('button', { name: 'Update project context' }).click();

        await page.getByTestId('input-project-name').click();
        await page.getByTestId('input-project-name').fill('Checkout drop-off issue ');
        await projectContextPage.updateButton.click();

        await expect(projectContextPage.successMessage).toBeVisible();
        await page.waitForTimeout(7000);
        await expect(projectContextPage.successMessage).not.toBeVisible();
    });



    // TC-020: Verify Changes Persist After Successful Update
    // Steps:
    // 1. Open Create Project dialog
    // 2. Enter valid project name
    // 3. Click Create button
    // 4. Update project context and scope
    // 5. Reopen update dialog and verify changes
    // Expected Result:
    // - Changes persist and are visible in dialog
    test('TC-020: Verify Changes Persist After Successful Update', async ({ page }) => {

        await createProjectPage.openDialog();
        // 2. Enter valid project name
        await createProjectPage.fillProjectName('Checkout drop-off issue 2');
        // 3. Click "Create" button
        await createProjectPage.submit();

        await page.waitForTimeout(3000);

        await projectContextPage.updateContextButton.click();

        await page.getByRole('paragraph').click();
        await page.locator('.ql-editor').fill('Design Sprint Project Scope');
        await page.getByTestId('input-project-name').click();
        await page.getByTestId('input-project-name').fill('Design Sprint Project');
        await projectContextPage.updateButton.click();

        await page.waitForTimeout(3000);
        await page.getByRole('button', { name: 'Header menu' }).click();
        await projectContextPage.updateProjectContextMenuItem.click();


        await expect(page.locator('div').filter({ hasText: /^Design Sprint Project Scope$/ }).nth(1)).toBeVisible();


        await expect(page.getByTestId('input-project-name')).toHaveValue('Design Sprint Project');

    });




    // TC-021: Verify "Update Project Context" Button Hides After Adding Details
    // Steps:
    // 1. Open Create Project dialog
    // 2. Enter valid project name
    // 3. Click Create button
    // 4. Update project context
    // Expected Result:
    // - Update button disappears after adding details
    test('TC-021: Verify "Update Project Context" Button Hides After Adding Details', async ({ page }) => {
        await createProjectPage.openDialog();
        // 2. Enter valid project name
        await createProjectPage.fillProjectName('Checkout drop-off issue 1');
        // 3. Click "Create" button
        await createProjectPage.submit();

        await projectContextPage.updateContextButton.click();

        await page.getByTestId('input-project-name').click();
        await page.getByTestId('input-project-name').fill('Checkout drop-off issue ');

        await projectContextPage.updateButton.click();
        await expect(projectContextPage.updateContextButton).not.toBeVisible();
    });


    // TC-022: Make sure that the data is filled automatically from the AI in case of choosing the nudge prompt
    // Steps:
    // 1. Click on the nudge prompt element
    // 2. Wait for AI to process and autofill the fields
    // 3. Click 'Go to bottom' twice to scroll down
    // 4. Click 'Create Project' button
    // 5. Wait for project creation dialog and confirm
    // 6. Verify the 'Create New Project' dialog is visible
    // 7. Check that the project title and update context button are visible
    // 8. Click 'Update Project Context' button
    // 9. Assert that the Project Name field is auto-filled by AI
    //10.Click on button inside toast notification to open project context
    // Expected Result:
    // - Project Name field is not empty (auto-filled by AI)
    // - Other context fields may also be auto-filled

    test('TC-022: Make sure that the data is filled automatically from the AI in case of choosing the nudge prompt', async ({ page }) => {
        // Click on the truncate element
        await page.locator('.truncate.flex.items-center').click();

        // Wait for AI processing (consider using waitForResponse instead if possible)
        await page.waitForTimeout(17000);

        // Navigate to bottom twice
        await page.getByRole('button', { name: 'Go to bottom' }).click();
        //wait page.getByRole('button', { name: 'Go to bottom' }).click();

        // Create project flow

        await page.getByRole('button', { name: 'Create Project' }).click();
        await page.getByTestId('confirm-project-button').click();





        // Verify dialog is visible
        await expect(page.getByRole('dialog', { name: /create new project/i })).toBeVisible();

        await page.getByLabel('Notifications alt+T').getByRole('button', { name: 'Update project context' }).click();



        // Test Field 1: Project Name
        const projectNameInput = page.getByTestId('input-project-name');
        await expect(projectNameInput).toBeVisible();
        const projectName = await projectNameInput.inputValue();

        expect(projectName.trim()).not.toBe('');
        expect(projectName.trim().length).toBeGreaterThan(0);
        // console.log('✅ Project Name:', projectName);

        // Test Field 2: Ideoz Role
        const ideozRoleTextarea = page.getByTestId('textarea-ideoz-role');
        await expect(ideozRoleTextarea).toBeVisible();
        const ideozRole = await ideozRoleTextarea.inputValue();

        expect(ideozRole.trim()).not.toBe('');
        expect(ideozRole.trim().length).toBeGreaterThan(0);
        //console.log('✅ Ideoz Role:', ideozRole);

        // Test Field 3: Main Persona
        const mainPersonaInput = page.getByTestId('input-main-persona');
        await expect(mainPersonaInput).toBeVisible();
        const mainPersona = await mainPersonaInput.inputValue();

        expect(mainPersona.trim()).not.toBe('');
        expect(mainPersona.trim().length).toBeGreaterThan(0);

    });




    // TC-023: Make sure that the data is filled automatically from the AI in case of choosing the nudge prompt from project context menu
    // Steps:
    // 1. Click on the nudge prompt element
    // 2. Wait for AI to process and autofill the fields
    // 3. Click 'Go to bottom' twice to scroll down
    // 4. Click 'Create Project' button
    // 5. Wait for project creation dialog and confirm
    // 6. Verify the 'Create New Project' dialog is visible
    // 7. Check that the project title and update context button are visible
    // 8. Click 'Update Project Context' button
    // 9. Assert that the Project Name field is auto-filled by AI
    //10.Click on button inside more options menu to open project context
    // Expected Result:
    // - Project Name field is not empty (auto-filled by AI)
    // - Other context fields may also be auto-filled

    test('TC-023: Make sure that the data is filled automatically from the AI in case of choosing the nudge prompt from project context menu', async ({ page }) => {
        // Click on the truncate element
        await page.locator('.truncate.flex.items-center').click();

        // Wait for AI processing (consider using waitForResponse instead if possible)
        await page.waitForTimeout(17000);

        // Navigate to bottom twice
        await page.getByRole('button', { name: 'Go to bottom' }).click();
        //wait page.getByRole('button', { name: 'Go to bottom' }).click();

        // Create project flow

        await page.getByRole('button', { name: 'Create Project' }).click();
        await page.getByTestId('confirm-project-button').click();



        // Verify dialog is visible
        await expect(page.getByRole('dialog', { name: /create new project/i })).toBeVisible();

        // Open the project context menu

        await page.getByRole('button', { name: 'Header menu' }).click();


        await expect(viewProjectPage.updateProjectContextMenuItem).toBeVisible();

        await viewProjectPage.updateProjectContextMenuItem.click();


        await page.getByRole('button', { name: 'Header menu' }).click();
        await page.getByRole('menuitem', { name: 'Update project context' }).click();

        // Test Field 1: Project Name
        const projectNameInput = page.getByTestId('input-project-name');
        await expect(projectNameInput).toBeVisible();
        const projectName = await projectNameInput.inputValue();

        expect(projectName.trim()).not.toBe('');
        expect(projectName.trim().length).toBeGreaterThan(0);
        // 

        // Test Field 2: Ideoz Role
        const ideozRoleTextarea = page.getByTestId('textarea-ideoz-role');
        await expect(ideozRoleTextarea).toBeVisible();
        const ideozRole = await ideozRoleTextarea.inputValue();

        expect(ideozRole.trim()).not.toBe('');
        expect(ideozRole.trim().length).toBeGreaterThan(0);


        // Test Field 3: Main Persona
        const mainPersonaInput = page.getByTestId('input-main-persona');
        await expect(mainPersonaInput).toBeVisible();
        const mainPersona = await mainPersonaInput.inputValue();

        expect(mainPersona.trim()).not.toBe('');
        expect(mainPersona.trim().length).toBeGreaterThan(0);


    });

});



