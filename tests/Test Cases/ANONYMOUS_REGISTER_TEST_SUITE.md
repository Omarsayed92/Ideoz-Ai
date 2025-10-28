# ANONYMOUS_REGISTER_TEST_SUITE.md

**Test Suite ID:** TS-001
**Module:** Anonymous Registration
**Test File:** `tests/E2E/Anonymous/Anonymous-Register.spec.ts`
**Total Test Cases:** 8
**Status:** ✅ Active
**Last Updated:** October 19, 2025

---

## Test Suite: Anonymous Register

This document describes the step-by-step test cases for the anonymous registration flow on the Ideoz AI application.

---

### TC-001: "Create free account" button redirects to registration dialog
**Steps:**
1. Click the "Create free account" button.
2. Verify the registration dialog submit button is visible.
3. Verify the Google authentication button is visible.

**Expected Results:**
- Registration dialog appears with submit and Google auth buttons.

---

### TC-002: Successful account creation and auto-login
**Steps:**
1. Click the "Create free account" button.
2. Fill in the name, email, and password fields.
3. Click the submit button.
4. Verify the profile icon appears.
5. Verify the "Create new Project" button is visible.

**Expected Results:**
- User is auto-logged in and redirected to the main page with profile icon and project button.

---

### TC-003: "Create free account" button in "What is Ideoz project?" section redirects to registration dialog
**Steps:**
1. Click the "What is Ideoz project?" button.
2. Click the "Create free account" button in the section.
3. Verify the registration dialog submit button is visible.
4. Verify the Google authentication button is visible.

**Expected Results:**
- Registration dialog appears with submit and Google auth buttons.

---

### TC-004: Successful account creation and auto-login via "What is Ideoz project?" section
**Steps:**
1. Click the "What is Ideoz project?" button.
2. Click the "Create free account" button in the section.
3. Fill in the name, email, and password fields.
4. Click the submit button.
5. Verify the profile icon appears.
6. Verify the "Create new Project" button is visible.

**Expected Results:**
- User is auto-logged in and redirected to the main page with profile icon and project button.

---

### TC-005: Anonymous user can use plugin without account creation
**Steps:**
1. Wait for page to load.
2. Click the plugin area.
3. Verify navigation to the conversation page.
4. Wait for chat to load.
5. Verify "Go to bottom" and "Register for free" buttons are visible in chat.

**Expected Results:**
- Anonymous user can access chat and see registration prompts.

---

### TC-006: "Create free account" button inside chat redirects to registration dialog
**Steps:**
1. Wait for page to load.
2. Click the plugin area.
3. Verify navigation to the conversation page.
4. Wait for chat to load.
5. Click "Register for free" button in chat.
6. Verify registration dialog submit button is visible.

**Expected Results:**
- Registration dialog appears from chat area.

---

### TC-007: Successful account creation and auto-login in chat
**Steps:**
1. Wait for page to load.
2. Click the plugin area.
3. Verify navigation to the conversation page.
4. Wait for chat to load.
5. Click "Register for free" button in chat.
6. Fill in the name, email, and password fields.
7. Click the submit button.
8. Verify "Continue chat" or "Create project" text is visible.
9. Verify the profile icon appears.

**Expected Results:**
- User is auto-logged in and can continue chat or create a project.

---

### TC-008: Banner appears when skipping account creation in chat
**Steps:**
1. Wait for page to load.
2. Click the plugin area.
3. Verify navigation to the conversation page.
4. Wait for chat to load.
5. Enter a message in chat input and submit.
6. Verify banner text appears prompting user to create a project.
7. Verify banner action button is visible.

**Expected Results:**
- Banner appears with prompt and action button for project creation.

---

**Test Data:**
- Use unique emails for each registration to avoid conflicts.
- Example user: name = "Test User", email = "testuser1000@example.com", password = "P@ssw0rd123"

**References:**
- See `Anonymous-Register.spec.ts` for implementation details.
-

---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 8 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **8** | **100%** |

---

## Test Data Dependencies

**File:** `tests/E2E/Anonymous/Anonymous-Register.spec.ts`

```javascript
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
```

---

## Notes

- All tests validate anonymous user registration flow
- Tests cover multiple entry points for registration (main page, chat area, project info section)
- Auto-login is verified after successful registration
- Tests use unique email addresses to prevent conflicts
- 
