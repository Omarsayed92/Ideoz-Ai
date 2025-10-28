# Update Project Context Test Suite

**Test Suite ID:** UPDATEPROJECTCONTEXT-TS-001
**Module:** Project Context Update
**Test File:** `tests/E2E/Project/Update Project context.spec.ts`
**Total Test Cases:** 23
**Status:** ✅ Passed
**Last Updated:** October 22, 2025

---

## Test Suite Overview

This test suite validates the Update Project Context functionality in the Ideoz application, including dialog display, field validation, AI autofill, and update/cancel actions. Each test case below is directly mapped to the Playwright spec file.

---

## Test Cases

### TC-001: Verify "Update Project Context" Option is Present and Clickable
**Test ID:** UPDATEPROJECTCONTEXT-TC-001
**Priority:** High
**Test Type:** UI/Functional

**Description:**
Verify the "Update Project Context" option is visible and clickable on the project view page.

**Pre-conditions:**
- User is logged in as testuser002@example.com
- User is on an existing project page

**Test Steps:**
1. Login as valid user
2. Navigate to existing project "Checkout drop-off issue"
3. Locate the "Update Project Context" button
4. Verify button is visible and enabled

**Expected Results:**
- Update Project Context button is visible
- Upload project files button is visible
- Update Project Context button is enabled

**Test Data:**
- Email: test.u.project@gmail.com (or testuser2@example.com for some tests)
- Password: P@ssw0rd123
- Project name: Test Project <timestamp> (or as specified)

**Status:** ✅ Passed

---

### TC-002: Verify "More Options Icon" is visible with options for Update project context
**Test ID:** UPDATEPROJECTCONTEXT-TC-002
**Priority:** High
**Test Type:** UI/Functional

**Description:**
Verify vertical ellipsis icon and menu options are present.

**Pre-conditions:**
- User is on the view project page (after dynamic project creation)

**Test Steps:**
1. Click on More Options icon (vertical ellipsis)
2. Verify menu appears
3. Verify "Update Project Context" option is visible

**Expected Results:**
- Header menu is visible
- Update Project Context menu item is visible

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>

**Status:** ✅ Passed

---

### TC-003: Verify Clicking "Update Project Context" Opens the Dialog
**Test ID:** UPDATEPROJECTCONTEXT-TC-003
**Priority:** High
**Test Type:** UI/Functional

**Description:**
Verify dialog opens with all required fields and buttons.

**Pre-conditions:**
- User is on the view project page

**Test Steps:**
1. Click "Update Project Context" button
2. Verify dialog appears with all required elements

**Expected Results:**
- Context dialog is visible
- Project Name field is visible
- Project Scope editor (rich text) is visible
- Main User field is visible
- Design Process options are visible
- Role field is visible
- "How Should Ideoz Act?" field is visible
- Update button is visible
- Cancel button is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-004: Verify Dialog Can Be Closed Using Escape Key
**Test ID:** UPDATEPROJECTCONTEXT-TC-004
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify pressing Escape key closes the dialog.

**Pre-conditions:**
- Update Project Context dialog is open (after dynamic project creation)

**Test Steps:**
1. Open Update Project Context dialog
2. Press Escape key

**Expected Results:**
- Dialog closes and is not visible

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>

**Status:** ✅ Passed

---



---



---

### TC-005: Verify "Project Name" Field is Present and Editable
**Test ID:** UPDATEPROJECTCONTEXT-TC-005
**Priority:** High
**Test Type:** UI/Functional

**Description:**
Verify Project Name field is editable and value updates.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Verify Project Name field has a value
3. Fill Project Name with "New Project Name"
4. Verify value is updated

**Expected Results:**
- Project Name field is visible
- Field contains existing value (not empty)
- Field accepts new value "New Project Name"
- Update button is enabled

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- New Project Name: "New Project Name"

**Status:** ✅ Passed

---

### TC-006: Verify Project Name is a Required Field
**Test ID:** UPDATEPROJECTCONTEXT-TC-006
**Priority:** High
**Test Type:** Validation

**Description:**
Verify Update button is disabled when Project Name field is empty.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Clear Project Name field

**Expected Results:**
- Update button is disabled

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>

**Status:** ✅ Passed

---

### TC-007: Verify Project Name Character Limit Validation
**Test ID:** UPDATEPROJECTCONTEXT-TC-007
**Priority:** Medium
**Test Type:** Validation

**Description:**
Verify character limit is enforced for Project Name field.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Click Project Name field
3. Clear field
4. Enter 256 'A' characters

**Expected Results:**
- Character limit is enforced
- Update button is enabled with valid long name

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- String of 256 'A' characters

**Status:** ✅ Passed

---

### TC-08: Verify "Who is Your Main User?" Field Functionality
**Test ID:** UPDATEPROJECTCONTEXT-TC-08
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify Main User field is editable and character count updates.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Click Main Persona field
3. Type "Designer"
4. Verify character count

**Expected Results:**
- Character count shows "8/255"
- Field accepts input

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- Main User: "Designer"

**Status:** ✅ Passed

---

### TC-009: Verify Main User Field Character Limit Enforcement
**Test ID:** UPDATEPROJECTCONTEXT-TC-009
**Priority:** Medium
**Test Type:** Validation

**Description:**
Verify character limit is enforced for Main User field.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Click Main Persona field
3. Enter 256 'A' characters

**Expected Results:**
- Character count shows "255/255"
- Character limit is enforced at 255

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- String of 256 'A' characters

**Status:** ✅ Passed

---

### TC-010: Verify "What is Your Design Process" Selection Options
**Test ID:** UPDATEPROJECTCONTEXT-TC-010
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify all expected design process options are visible.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Check available design process options

**Expected Results:**
- "Double Diamond" option is visible
- "Design Sprint" option is visible
- "Design Thinking" option is visible

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>

**Status:** ✅ Passed

---

### TC-011: Verify Design Process Tags are Selectable/Deselectable
**Test ID:** UPDATEPROJECTCONTEXT-TC-011
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify tags can be selected/deselected and checkmark appears.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Click "Design Sprint" badge
3. Verify checkmark appears
4. Click "Design Thinking" badge
5. Verify "Design Thinking" has checkmark
6. Verify "Design Sprint" checkmark disappears

**Expected Results:**
- Design Sprint badge shows checkmark when selected
- Design Thinking badge shows checkmark when selected
- Only one badge can be selected at a time
- Previous selection is deselected

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>

**Status:** ✅ Passed

---

### TC-012: Verify "Your Role in This Project" Field Functionality
**Test ID:** UPDATEPROJECTCONTEXT-TC-012
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify Role field is editable and character count updates.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Fill Role field with "Lead Designer"
3. Verify character count

**Expected Results:**
- Character count shows "13/255"
- Field is editable

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- Role: "Lead Designer"

**Status:** ✅ Passed

---

### TC-013: Verify Role Field Character Limit Enforcement
**Test ID:** UPDATEPROJECTCONTEXT-TC-013
**Priority:** Medium
**Test Type:** Validation

**Description:**
Verify character limit is enforced for Role field.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Click User Role field
3. Enter 256 'A' characters

**Expected Results:**
- Character count shows "255/255"
- Character limit is enforced at 255

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- String of 256 'A' characters

**Status:** ✅ Passed

---

### TC-014: Verify "How Should Ideoz Act?" Field is Editable
**Test ID:** UPDATEPROJECTCONTEXT-TC-014
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify Ideoz Act field is editable and value updates.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Click Ideoz Role field
3. Type "Be creative"
4. Verify value is updated

**Expected Results:**
- Field accepts input
- Field value is "Be creative"

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- Ideoz Role: "Be creative"

**Status:** ✅ Passed

---

### TC-015: Verify Behavior Field Character Limit
**Test ID:** UPDATEPROJECTCONTEXT-TC-015
**Priority:** Medium
**Test Type:** Validation

**Description:**
Verify character limit is enforced for Ideoz Act field.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Fill Ideoz Act field with 255 'A' characters

**Expected Results:**
- Character count shows "255/255"
- Character limit is enforced at 255

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- String of 255 'A' characters

**Status:** ✅ Passed

---

### TC-016: Verify "Cancel" Button Functionality
**Test ID:** UPDATEPROJECTCONTEXT-TC-016
**Priority:** High
**Test Type:** Functional

**Description:**
Verify Cancel closes dialog and changes are not saved.

**Pre-conditions:**
- Update Project Context dialog is open

**Test Steps:**
1. Open Update Project Context dialog
2. Fill Project Name with "Cancel Test"
3. Click Cancel button

**Expected Results:**
- Dialog closes
- Changes are not saved

**Test Data:**
- Email: test.u.project@gmail.com
- Password: P@ssw0rd123
- Project name: Test Project <timestamp>
- Project Name: "Cancel Test"

**Status:** ✅ Passed

---

### TC-017: Verify Project Name Can Be Successfully Updated
**Test ID:** UPDATEPROJECTCONTEXT-TC-017
**Priority:** High
**Test Type:** Functional

**Description:**
Verify updating project name saves changes and hides update button.

**Pre-conditions:**
- User is logged in as testuser2@example.com

**Test Steps:**
1. Open Create Project dialog
2. Enter project name "Checkout drop-off issue 1"
3. Click Create button
4. Wait for project creation
5. Click Update Project Context button
6. Update project name to "Checkout drop-off issue "
7. Click Update button

**Expected Results:**
- Success list item is visible
- Update Project Context button disappears

**Test Data:**
- Email: testuser2@example.com
- Password: P@ssw0rd123
- Initial Project Name: "Checkout drop-off issue 1"
- Updated Project Name: "Checkout drop-off issue "

**Status:** ✅ Passed

---

### TC-018: Verify Successful Update of Project Details
**Test ID:** UPDATEPROJECTCONTEXT-TC-018
**Priority:** High
**Test Type:** Functional

**Description:**
Verify updating project context through toast saves changes and hides update button.

**Pre-conditions:**
- User is logged in as testuser2@example.com

**Test Steps:**
1. Open Create Project dialog
2. Enter project name "Checkout drop-off issue 1"
3. Click Create button
4. Click "Update project context" button in notifications toast
5. Update project name to "Checkout drop-off issue "
6. Click Update button

**Expected Results:**
- Success list item is visible
- Update Project Context button disappears

**Test Data:**
- Email: testuser2@example.com
- Password: P@ssw0rd123
- Initial Project Name: "Checkout drop-off issue 1"
- Updated Project Name: "Checkout drop-off issue "

**Status:** ✅ Passed

---

### TC-019: Verify "Project Details Updated Successfully" Confirmation Behavior
**Test ID:** UPDATEPROJECTCONTEXT-TC-019
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify success message appears and disappears after timeout.

**Pre-conditions:**
- User is logged in as testuser2@example.com

**Test Steps:**
1. Open Create Project dialog
2. Enter project name "Checkout drop-off issue 1"
3. Click Create button
4. Click "Update project context" in notifications toast
5. Update project name to "Checkout drop-off issue "
6. Click Update button
7. Wait 7 seconds

**Expected Results:**
- Success message appears after update
- Success message disappears after ~7 seconds

**Test Data:**
- Initial Project Name: "Checkout drop-off issue 1"
- Updated Project Name: "Checkout drop-off issue "

**Status:** ✅ Passed

---

### TC-020: Verify Changes Persist After Successful Update
**Test ID:** UPDATEPROJECTCONTEXT-TC-020
**Priority:** High
**Test Type:** Functional

**Description:**
Verify changes persist after dialog is closed and reopened.

**Pre-conditions:**
- User is logged in as testuser2@example.com

**Test Steps:**
1. Open Create Project dialog
2. Enter project name "Checkout drop-off issue 2"
3. Click Create button
4. Click Update Project Context button
5. Fill Project Scope with "Design Sprint Project Scope"
6. Update project name to "Design Sprint Project"
7. Click Update button
8. Wait 3 seconds
9. Click Header menu button
10. Click "Update project context" menu item
11. Verify changes persist

**Expected Results:**
- Project Scope shows "Design Sprint Project Scope"
- Project Name shows "Design Sprint Project"
- Changes are visible after reopening dialog

**Test Data:**
- Email: testuser2@example.com
- Password: P@ssw0rd123
- Initial Project Name: "Checkout drop-off issue 2"
- Updated Project Name: "Design Sprint Project"
- Project Scope: "Design Sprint Project Scope"

**Status:** ✅ Passed

---

### TC-021: Verify "Update Project Context" Button Hides After Adding Details
**Test ID:** UPDATEPROJECTCONTEXT-TC-021
**Priority:** Medium
**Test Type:** UI/Functional

**Description:**
Verify update button disappears after adding details.

**Pre-conditions:**
- User is logged in as testuser2@example.com

**Test Steps:**
1. Open Create Project dialog
2. Enter project name "Checkout drop-off issue 1"
3. Click Create button
4. Click Update Project Context button
5. Update project name to "Checkout drop-off issue "
6. Click Update button

**Expected Results:**
- Update Project Context button disappears after successful update

**Test Data:**
- Email: testuser2@example.com
- Password: P@ssw0rd123
- Initial Project Name: "Checkout drop-off issue 1"
- Updated Project Name: "Checkout drop-off issue "

**Status:** ✅ Passed

---

### TC-022: Make sure that the data is filled automatically from the AI in case of choosing the nudge prompt
**Test ID:** UPDATEPROJECTCONTEXT-TC-022
**Priority:** High
**Test Type:** AI/Functional

**Description:**
Verify fields are auto-filled by AI after nudge prompt.

**Pre-conditions:**
- User is logged in as testuser2@example.com

**Test Steps:**
1. Click on the nudge prompt element (truncate element)
2. Wait 17 seconds for AI to process and autofill
3. Click "Go to bottom" button
4. Click "Create Project" button
5. Click confirm project button
6. Verify "Create New Project" dialog is visible
7. Click "Update project context" in notifications toast
8. Verify all fields are auto-filled by AI

**Expected Results:**
- Project Name field is not empty (auto-filled)
- Ideoz Role field is not empty (auto-filled)
- Main Persona field is not empty (auto-filled)


**Test Data:**
- Email: testuser2@example.com
- Password: P@ssw0rd123
- Project name: (AI-generated)

**Status:** ✅ Passed


  ## TC-023: Make sure that the data is filled automatically from the AI in case of choosing the nudge prompt from project context menu

   **Test ID:** UPDATEPROJECTCONTEXT-TC-023
   **Priority:** High
   **Test Type:** AI/Functional

    **Test Steps:**
     1. Click on the nudge prompt element
     2. Wait for AI to process and autofill the fields
     3. Click 'Go to bottom' twice to scroll down
     4. Click 'Create Project' button
     5. Wait for project creation dialog and confirm
     6. Verify the 'Create New Project' dialog is visible
     7. Check that the project title and update context button are visible
     8. Click 'Update Project Context' button
     9. Assert that the Project Name field is auto-filled by AI
    10.Click on button inside more options menu to open project context
  **Expected Result:**
   1- Project Name field is not empty (auto-filled by AI)
   2- Other context fields may also be auto-filled

   **Status:**   ❌ Failed


**Test Data** 
EMAIL = test.u.project@gmail.com
PASSWORD = P@ssw0rd123

Email= testuser2@example.com
 Password= P@ssw0rd123


---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 22 | 100% |
| ❌ Failed | 1| 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **23** | **100%** |

---

## Test Suite Structure

### Test Describe Block 1: "Update Project Context Tests"
- **Test Cases:** TC-001 to TC-018
- **Setup:** Login as testuser002@example.com, navigate to existing project "Checkout drop-off issue"
- **Focus:** Dialog functionality, field validation, formatting

### Test Describe Block 2: "Update Project Context - Additional Test Cases"
- **Test Cases:** TC-019 to TC-024
- **Setup:** Login as testuser2@example.com
- **Focus:** Project creation, updates, persistence, AI autofill

---

## Page Object Model

**File:** `tests/Fixtures/UpdateProjectContext.ts`

### Key Elements
- `updateContextButton`: Update Project Context button
- `contextDialog`: Dialog container
- `projectNameInput`: Project Name field
- `scopeEditor`: Rich text editor for Project Scope
- `mainUserInput`: Main Persona field
- `designProcessOptions`: Design Process tags
- `roleInput`: User Role field
- `Act`: Ideoz Role field
- `updateButton`: Update button
- `cancelButton`: Cancel button
- `successMessage`: Success toast message
- `updateProjectContextMenuItem`: Menu item in header menu

### Key Methods
- `openDialog()`: Opens Update Project Context dialog
- `fillProjectName(name)`: Fills Project Name field
- `fillScope(text)`: Fills Project Scope editor
- `fillMainUser(user)`: Fills Main Persona field
- `selectDesignProcess(option)`: Selects design process tag
- `fillRole(role)`: Fills User Role field
- `fillAct(act)`: Fills Ideoz Role field
- `submit()`: Clicks Update button
- `cancel()`: Clicks Cancel button

---

## Fixtures Used

1. **LoginPage** (`tests/Fixtures/Login.ts`)
   - Handles user authentication

2. **CreateProjectPage** (`tests/Fixtures/CreateProject.ts`)
   - Handles project creation dialog and actions

3. **ViewProjectPage** (`tests/Fixtures/ViewProject.ts`)
   - Handles project view page elements and actions

4. **UpdateProjectContextPage** (`tests/Fixtures/UpdateProjectContext.ts`)
   - Handles Update Project Context dialog elements and actions

---

---

## Locator Strategies Used

- `data-testid` attributes for core fields and buttons
  - `input-project-name`
  - `input-main-persona`
  - `textarea-user-role`
  - `textarea-ideoz-role`
  - `btn-update-project-details`
  - `badge-design-process-design_sprint`
  - `badge-design-process-design_thinking`

- `getByRole()` for semantic elements
  - buttons, dialogs, paragraphs, menus

- Text-based locators for unique labels
  - "Double Diamond", "Design Sprint", "Design Thinking"

- CSS selectors for rich text editor
  - `.ql-editor`, `.ql-list`, `.ql-color`

---

## Best Practices Applied

1. **Page Object Model**: All locators centralized in fixture files
2. **Test Isolation**: Each test is independent with proper setup in beforeEach
3. **Stable Locators**: Prioritizes data-testid and semantic selectors
4. **Auto-waiting**: Leverages Playwright's built-in waiting mechanisms
5. **Explicit Waits**: Uses waitForTimeout where necessary for AI processing
6. **Error Handling**: Tests verify both positive and negative scenarios
7. **Maintainability**: Clear test structure and descriptive names
8. **Debugging**: Screenshots captured on failures (Playwright default)
9. **Reporting**: Allure integration for comprehensive test reports

---

## Known Issues & Notes

1. **AI Processing Time**: TC-024 requires 17-second wait for AI autofill
2. **Toast Timeout**: Success message appears for ~7 seconds (TC-021)
3. **Single Selection**: Design Process badges allow only one selection at a time (TC-013)
4. **Character Limits**:
   - Project Name: No strict limit enforced (tested with 256 chars)
   - Main Persona: 255 characters
   - User Role: 255 characters
   - Ideoz Role: 255 characters

---

## Future Test Considerations

- TC-025: AI autofill from project context menu (commented in spec file)
- TC-028 & TC-029: AI autofill with chat/file upload simulation (noted in spec file)
- Error handling scenarios
- Network failure scenarios
- Concurrent updates
- Special character handling
