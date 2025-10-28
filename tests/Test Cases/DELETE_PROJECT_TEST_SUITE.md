# DELETE_PROJECT_TEST_SUITE.md

## Delete Project Test Suite

This document describes the test cases for the Delete Project functionality in Ideoz AI.

---

### TC-001: Verify Delete Option is Visible in Project List
**Steps:**
1. Login with valid credentials.
2. Create a new test project.
3. Navigate back to the project list.
4. Verify the project card is visible.
5. Verify the delete option (Project options) is visible and clickable.
**Expected Result:**
- The project card is visible in the list.
- The delete option is visible and can be clicked.

---

### TC-002: Verify element in delete dialog
**Steps:**
1. Login with valid credentials.
2. Click Project options and select delete.
3. Verify the delete dialog appears.
**Expected Result:**
- Delete dialog is visible after clicking delete option.

---

### TC-003: Verify Delete Project Functionality
**Steps:**
1. Login with valid credentials.
2. Click Project options and select delete.
3. Enter correct project name in input.
4. Click confirm delete button.
**Expected Result:**
- Project is deleted and dialog closes.
- User is redirected to dashboard (main heading visible).

---

### TC-004: Verify Project Deletion Confirmation Message
**Steps:**
1. Login and create a test project.
2. Navigate to project list and open delete dialog.
3. Enter correct project name and confirm delete.
4. Observe confirmation message.
**Expected Result:**
- Confirmation message and icon are visible.
- Success message for project deletion is displayed.

---

### TC-005: Verify "Delete" button in confirmation dialog is initially disabled
**Steps:**
1. Login and create a test project.
2. Open delete dialog for the project.
3. Observe the state of the delete button before entering project name.
**Expected Result:**
- Delete button is disabled until correct project name is entered.

---

### TC-006: Verify "Delete" button in confirmation dialog is enabled
**Steps:**
1. Login and open delete dialog for a project.
2. Enter correct project name in input field.
3. Observe the state of the delete button.
**Expected Result:**
- Delete button becomes enabled when correct project name is entered.

---

### TC-007: Verify Close "x" in Delete Dialog
**Steps:**
1. Login and open delete dialog for a project.
2. Click the close "x" button in the dialog.
**Expected Result:**
- Delete dialog closes and is no longer visible.

---

### TC-008: Verify Delete button still disabled after entering wrong title
**Steps:**
1. Login and open delete dialog for a project.
2. Enter incorrect project name in input field.
3. Observe the state of the delete button.
**Expected Result:**
- Delete button remains disabled if project name does not match.

---

### TC-010: Verify Delete Project Functionality
**Steps:**
1. Login and open delete dialog for a project.
2. Enter correct project name in input field.
3. Click confirm delete button.
**Expected Result:**
- Project is deleted and dialog closes.
- User is redirected to dashboard (main heading visible).

---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 09 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **09** | **100%** |


## Test Data Dependencies

- Valid user credentials:  
  - Email: testdelete@example.com  
  - Password: Aa@123456
  

## References
- See `tests/E2E/Project/deleteproject-omar.spec.js` for implementation.
- Page objects: `LoginPage`, `CreateProjectPage`, `DeleteProjectPage`, `ViewProjectPage`

---

**Suite Owner:** QA Team
**Last Updated:** October 27, 2025
