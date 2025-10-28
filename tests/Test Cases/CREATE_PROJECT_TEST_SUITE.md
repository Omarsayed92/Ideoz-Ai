
# Create Project Test Suite



---

## Run Commands

Run all tests:
```powershell
npx playwright test tests/E2E/Project/CreateProject.spec.ts
```

Run a specific test by name:
```powershell
npx playwright test tests/E2E/Project/CreateProject.spec.ts -g "<test name>"
```

---
 ## Test Data
Email :testcreateproject@example.co
Password :P@ssw0rd123

## Test Cases

### TC-001
**Test ID:** TC-001  
**Priority:** High  
**Test Type:** Functional/UI  

**Description:** Verify successful project creation from "Create new Projects" page.

**Pre-conditions:**
- User is logged in with valid credentials

**Test Steps:**
1. Click "Create new Project" button
2. Enter valid project name
3. Click "Create" button

**Expected Results:**
- Project appears in list, success notification, redirect to view project page 
- Project title and action buttons are visible

**Test Data:**
- Project name: Checkout drop-off issue

**Status:** ✅ Passed

---

### TC-002
**Test ID:** TC-002  
**Priority:** Medium  
**Test Type:** Validation/UI  

**Description:** Project name field validation (empty)

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Leave project name empty
3. Check button state

**Expected Results:**
- Create button is disabled
- Dialog remains visible

**Test Data:**
- (none)

**Status:** ✅ Passed

---

### TC-003
**Test ID:** TC-003  
**Priority:** Medium  
**Test Type:** Boundary/Validation  

**Description:** Project name length boundary

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Enter max length name (e.g., 100 chars)
3. Click create

**Expected Results:**
- Project created 
- Project title and action buttons are visible

**Test Data:**
- Project name: 100 characters

**Status:** ✅ Passed

---

### TC-004
**Test ID:** TC-004  
**Priority:** Medium  
**Test Type:** Functional/Validation  

**Description:** Duplicate project name

**Pre-conditions:**
- User is logged in
- Project with same name may already exist

**Test Steps:**
1. Open create project dialog
2. Enter existing project name
3. Click create

**Expected Results:**
-  Project appears in list, success notification, redirect to view project page 
- Project title and action buttons are visible

**Test Data:**
- Project name: Checkout drop-off issue

**Status:** ✅ Passed

---

### TC-005
**Test ID:** TC-005  
**Priority:** Medium  
**Test Type:** Validation  

**Description:** Special characters in project name

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Enter name with special characters
3. Click create

**Expected Results:**
- Project created or error if not allowed

**Test Data:**
- Project name: Project #1: Onboarding!

**Status:** ✅ Passed

---

### TC-006
**Test ID:** TC-006  
**Priority:** Low  
**Test Type:** UI/Functional  

**Description:** Cancel project creation

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Click close button

**Expected Results:**
- Dialog closes, no project created

**Test Data:**
- (none)

**Status:** ✅ Passed

---

### TC-007
**Test ID:** TC-007  
**Priority:** Medium  
**Test Type:** Accessibility/UI  

**Description:** Accessibility and UI validation

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Tab through fields and buttons

**Expected Results:**
- Dialog, input, and button are visible
- Keyboard navigation works

**Test Data:**
- (none)

**Status:** ✅ Passed

---

### TC-008
**Test ID:** TC-008  
**Priority:** Medium  
**Test Type:** UI/Validation  

**Description:** Create button enabled after typing valid project name

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Enter valid project name

**Expected Results:**
- Create button is enabled

**Test Data:**
- Project name: Valid Project

**Status:** ✅ Passed

---

### TC-009
**Test ID:** TC-009  
**Priority:** Medium  
**Test Type:** Validation  

**Description:** Create button remains disabled if project name is only spaces

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Enter only spaces in project name

**Expected Results:**
- Create button is disabled

**Test Data:**
- Project name: (spaces only)

**Status:** ✅ Passed

---

### TC-010
**Test ID:** TC-010  
**Priority:** Medium  
**Test Type:** Validation  

**Description:** Handle invalid characters in project name

**Pre-conditions:**
- User is logged in

**Test Steps:**
1. Open create project dialog
2. Enter invalid characters in project name
3. Click create

**Expected Results:**
- Project created or error if not allowed

**Test Data:**
- Project name: Project<>?

**Status:** ✅ Passed

---

### TC-011
**Test ID:** TC-011  
**Priority:** Medium  
**Test Type:** UI/Functional  

**Description:** Create project button in chat opens dialog

**Pre-conditions:**
- User is logged in
- On chat page

**Test Steps:**
1. Navigate to chat
2. Click create project button

**Expected Results:**
- Create project dialog is visible

**Test Data:**
- (none)

**Status:** ✅ Passed

---

### TC-012
**Test ID:** TC-012  
**Priority:** Medium  
**Test Type:** UI/Functional  

**Description:** Create project button in "What is Ideoz project?" section opens dialog

**Pre-conditions:**
- User is logged in
- On landing page

**Test Steps:**
1. Click "What is Ideoz project?" button
2. Click create project button

**Expected Results:**
- Create project dialog is visible

**Test Data:**
- (none)

**Status:** ✅ Passed

---

### TC-013
**Test ID:** TC-013  
**Priority:** Medium  
**Test Type:** UI/Functional  

**Description:** Success Create project button from "What is Ideoz project?"

**Pre-conditions:**
- User is logged in
- On landing page

**Test Steps:**
1. Click "What is Ideoz project?" button
2. Click create project button
3. Complete project creation

**Expected Results:**
- Project created successfully

**Test Data:**
- Project name: (unique)

testuser1000@example.com
P@ssw0rd123

**Status:** ✅ Passed




## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 13 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **13** | **100%** |