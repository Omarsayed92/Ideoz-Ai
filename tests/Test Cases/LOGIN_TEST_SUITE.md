# Login Test Suite

**Test Suite ID:** LOGIN-TS-001  
**Module:** Authentication - Login  
**Test File:** `tests/E2E/Authonication/Login.spec.ts`  
**Total Test Cases:** 11  
**Status:** ✅ Active  
**Last Updated:** October 18, 2025

---

## Test Suite Overview

This test suite validates the login functionality of the Ideoz application, including form validation, authentication, error handling, and navigation.

---

## Test Cases

### TC-001: Verify Redirection to Login Page
**Test ID:** LOGIN-TC-001  
**Priority:** High  
**Test Type:** UI/Functional  

**Description:**  
Verify that clicking the "Login" button redirects to the Login page and displays all required elements.

**Pre-conditions:**
- Application is accessible
- User is on the home page

**Test Steps:**
1. Navigate to application home page
2. Click on "Login" button
3. Verify Login page is displayed

**Expected Results:**
- Email field is visible
- Password field is visible
- Login button is visible
- "Login with Google" button is visible
- "Sign Up" button is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-002: Verify "Login with Google" Functionality
**Test ID:** LOGIN-TC-002  
**Priority:** High  
**Test Type:** Integration  

**Description:**  
Verify that clicking "Login with Google" button opens Google sign-in dialog in a new tab.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Click on "Login with Google" button
2. Wait for popup window

**Expected Results:**
- Google sign-in dialog opens in new tab
- "Sign in with Google" text is visible

**Test Data:**
- Button: `data-testid="btn-google-auth"`

**Status:** ✅ Passed

---

### TC-003: Verify Successful Login with Valid Credentials
**Test ID:** LOGIN-TC-003  
**Priority:** Critical  
**Test Type:** Functional  

**Description:**  
Verify that user can successfully login with valid email and password credentials.

**Pre-conditions:**
- User has valid account credentials
- User is on Login page

**Test Steps:**
1. Enter valid email address
2. Enter valid password
3. Click "Login" button
4. Verify successful login

**Expected Results:**
- User is redirected to dashboard
- Profile icon (with initial 'T') is visible
- "Create new Project" button is visible

**Test Data:**
- Email: `testUsers.loginCredentials.validUser.email`
- Password: `testUsers.loginCredentials.validUser.password`

**Status:** ✅ Passed

---

### TC-004: Verify Error for Invalid Email Format
**Test ID:** LOGIN-TC-004  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows validation error when user enters invalid email format.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Enter invalid email format (e.g., "invalidemail")
2. Enter valid password
3. Click "Login" button
4. Verify validation error

**Expected Results:**
- Browser native validation prevents submission
- Email field validity is false
- Login button remains visible (form not submitted)

**Test Data:**
- Email: `testUsers.loginCredentials.invalidEmailFormats[0]`
- Password: `testUsers.loginCredentials.validUser.password`

**Status:** ✅ Passed

---

### TC-005: Verify Invalid Password Validation
**Test ID:** LOGIN-TC-005  
**Priority:** Medium  
**Test Type:** Validation  

**Description:**  
Verify that system validates password field correctly without showing premature errors.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Enter valid email
2. Enter short/invalid password
3. Click "Login" button

**Expected Results:**
- Error message "Unknown email address. Check again or try your username." should NOT appear
- System allows submission attempt

**Test Data:**
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].shortPassword`

**Status:** ✅ Passed

---

### TC-006: Verify Error When Email Field is Empty
**Test ID:** LOGIN-TC-006  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows error message when email field is left empty.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Leave email field empty
2. Enter password
3. Click "Login" button

**Expected Results:**
- Error message "Field is required" is displayed
- Form is not submitted

**Test Data:**
- Email: (empty)
- Password: `testUsers.users[0].shortPassword`

**Status:** ✅ Passed

---

### TC-007: Verify Error When Password Field is Empty
**Test ID:** LOGIN-TC-007  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows error message when password field is left empty.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Enter valid email
2. Leave password field empty
3. Click "Login" button

**Expected Results:**
- Error message "Field is required" is displayed
- Form is not submitted

**Test Data:**
- Email: `testUsers.loginCredentials.validUser.email`
- Password: (empty)

**Status:** ✅ Passed

---

### TC-008: Verify Error for Incorrect Credentials
**Test ID:** LOGIN-TC-008  
**Priority:** Critical  
**Test Type:** Security  

**Description:**  
Verify that system shows appropriate error message when user enters incorrect credentials.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Enter valid email format but incorrect credentials
2. Enter incorrect password
3. Click "Login" button

**Expected Results:**
- Error message "Unknown email address. Check again or try your username." is displayed
- User is not logged in

**Test Data:**
- Email: `testUsers.loginCredentials.invalidCredentials.email`
- Password: `testUsers.loginCredentials.invalidCredentials.password`

**Status:** ✅ Passed

---

### TC-009: Verify Error When Both Fields are Empty
**Test ID:** LOGIN-TC-009  
**Priority:** Medium  
**Test Type:** Validation  

**Description:**  
Verify that system shows error when both email and password fields are empty.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Leave both email and password fields empty
2. Click "Login" button

**Expected Results:**
- Error message "Field is required" is displayed (at least once)
- Form is not submitted

**Test Data:**
- Email: (empty)
- Password: (empty)

**Status:** ✅ Passed

---

### TC-010: Verify Navigation to Create Account Page
**Test ID:** LOGIN-TC-010  
**Priority:** Medium  
**Test Type:** Navigation  

**Description:**  
Verify that clicking "Sign Up" button navigates to Create Account page.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Click on "Sign Up" button
2. Verify redirection to Create Account page

**Expected Results:**
- Create Account page is displayed
- Name field is visible
- Email field is visible
- Password field is visible
- "Create account" button is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 11 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **11** | **100%** |

---

## Test Data Dependencies

**File:** `TestData/testUsers.json`

```json
{
  "loginCredentials": {
    "validUser": {
      "email": "testtt@example.com",
      "password": "P@ssw0rd123"
    },
    "invalidCredentials": {
      "email": "validuser@example.com",
      "password": "WrongPassword123!"
    },
    "invalidEmailFormats": [
      "invalidemail",
      "invalid@",
      "@example.com"
    ]
  }
}
```

---

## Page Object Model

**File:** `tests/Page/Login.ts`

**Key Elements:**
- `emailField`: Email input field
- `passwordField`: Password input field
- `loginButton`: Login submit button
- `loginWithGoogleButton`: Google OAuth button
- `SignUpButton`: Sign up navigation button

**Key Methods:**
- `gotoLoginPage()`: Navigate to login page
- `fillEmail(email)`: Fill email field
- `fillPassword(password)`: Fill password field
- `clickLogin()`: Click login button

---

## Notes

- All tests use Playwright's auto-waiting and auto-retry mechanisms
- Browser native validation is checked for email format
- Tests are isolated and can run in parallel
- Each test includes proper cleanup via beforeEach hook

---

## Run Commands

```bash
# Run all login tests
npx playwright test tests/E2E/Authonication/Login.spec.ts

# Run with specific reporter
npx playwright test tests/E2E/Authonication/Login.spec.ts --reporter=line

# Run with Allure reporter
npx playwright test tests/E2E/Authonication/Login.spec.ts --reporter=allure-playwright

# Run in headed mode (visible browser)
npx playwright test tests/E2E/Authonication/Login.spec.ts --headed

# Run specific test
npx playwright test tests/E2E/Authonication/Login.spec.ts --grep "valid email format"
```
