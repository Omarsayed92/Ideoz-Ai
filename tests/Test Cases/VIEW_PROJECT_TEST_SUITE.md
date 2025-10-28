# View Project Page - Test Suite



---

## Test Data Dependencies

- Valid user credentials:  
  - Password: P@ssw0rd123
- At least one project created (e.g., "Checkout drop-off issue")
 Valid user credentials:  
  - Email: userviewproject@example.com  
  - Password: P@ssw0rd123
---
## Run Commands

Run all tests:
```powershell
npx playwright test tests/E2E/Project/ViewProject.spec.ts
```

Run a specific test by name:
```powershell
npx playwright test tests/E2E/Project/ViewProject.spec.ts -g "<test name>"
```

**Pre-conditions:** User is logged in with valid credentials  
1. Click "Create new Project" button  
2. Enter valid project name  
3. Click "Create" button  
**Expected Results:**  
- Project appears in list  
- Success notification  
- Redirect to view project page  
- Project title and action buttons are visible  
**Test Data:** Valid user, valid project name
**Pre-conditions:** Project has been created  
1. Click project in list  
2. Wait for page to load  
**Expected Results:**  
- Project title is visible  
- All details are displayed  
**Test Data:** Valid project

---
**Test Type:** UI  
**Pre-conditions:** User is on the view project page  
**Test Steps:**  
1. Observe the project details section  
**Expected Results:**  
- Project title is visible  
**Test Data:** Valid project

---
### TC-004: "Navigation Arrow" redirects to previous page
**Test Type:** Navigation/UI  
**Pre-conditions:** User is on the view project page  
**Test Steps:**  
1. Click navigation arrow  
**Expected Results:**  
- User is redirected to landing page  
**Test Data:** Valid project

---
### TC-005: "More Options Icon" is visible
**Test Type:** UI  
**Pre-conditions:** User is on the view project page  
**Test Steps:**  
1. Observe project details section  
**Expected Results:**  
- More options icon is visible  
**Test Data:** Valid project

---
### TC-006: "More Options Icon" shows Upload/Update options
**Test Type:** UI/Functional  
**Pre-conditions:** User is on the view project page  
**Test Steps:**  
1. Click more options icon  
**Expected Results:**  
- Upload files and update project context options are visible  
**Test Data:** Valid project

---
**Test Type:** UI  
**Description:** Verify chat input field is present and labeled "Describe your user ..."  
**Test Steps:**  
1. Observe chat input field  
**Expected Results:**  
- Chat input is visible  
- Placeholder text is correct  
**Test Data:** Valid project

---
### TC-008: Clicking "Suggested nudge" populates chat or triggers suggestions
**Test Type:** Functional/UI  
**Pre-conditions:** User is on the view project page  
**Test Steps:**  
1. Click a suggested nudge  
**Expected Results:**  
- Chat messages container is visible  
**Test Data:** Valid project

---

**Test Type:** Functional/UI  
**Description:** Verify chat history appears after exiting chat  
**Test Steps:**  
1. Send a message in chat  
2. Click back icon  
**Expected Results:**  
- Previous chats and conversations list are visible  
**Test Data:** Valid project, sample message

---
### TC-010: "Upload project files" option is present and clickable
**Test Type:** UI/Functional  
**Pre-conditions:** User is on the view project page  
**Test Steps:**  
1. Click upload files button  
**Expected Results:**  
- Upload files dialog is visible  
**Test Data:** Valid project

---
### TC-011: "Update project context" option is present and clickable
**Test Type:** UI/Functional  
**Pre-conditions:** User is on the view project page  
**Test Steps:**  
1. Click update context button  
**Expected Results:**  
- Update project context dialog is visible  
**Test Data:** Valid project

---

**Pre-conditions:** User is on the view project page  
**Test Steps:**  
2. Cancel or close dialog  
**Expected Results:**  
- Dialog closes  
- No files uploaded  
- User remains on project page  
**Test Data:** Valid project

---

**Pre-conditions:** User is on the view project page  
**Test Steps:**  
2. Cancel or close dialog  
**Expected Results:**  
- Dialog closes  
- No changes made  
- User remains on project page  
**Test Data:** Valid project

---
### TC-014: Access View Project Page with Invalid Project ID
**Test Type:** Negative/Navigation  
**Pre-conditions:** User is logged in  
**Test Steps:**  
1. Navigate to URL with invalid project ID  
**Expected Results:**  
- User is redirected to home/landing page  
**Test Data:** Invalid project ID

---
### TC-015: Access View Project Page Without Authentication
**Test Type:** Negative/Navigation  
**Pre-conditions:** None  
**Test Steps:**  
1. Open project URL in new browser (not logged in)  
**Expected Results:**  
- Login and register buttons are visible  
**Test Data:** Valid project URL

---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 15 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **15** | **100%** |
