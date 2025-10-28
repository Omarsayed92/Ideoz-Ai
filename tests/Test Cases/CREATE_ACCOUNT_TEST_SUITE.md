# Create Account Test Suite

**Test Suite ID:** CREATE-ACCOUNT-TS-001  
**Module:** Authentication - Account Creation  
**Test File:** `tests/E2E/Authonication/CreateAccount.spec.ts`  
**Total Test Cases:** 16  
**Status:** ✅ Passed  
**Last Updated:** October 18, 2025

---

## Test Suite Overview

This test suite validates the account creation functionality of the Ideoz application, including form validation, password strength requirements, duplicate account handling, and navigation.

---

## Test Cases

### TC-001: Verify Create Account Page Redirection and Elements
**Test ID:** CREATE-TC-001  
**Priority:** Critical  
**Test Type:** UI/Functional  

**Description:**  
Verify that clicking "Sign Up" from login page redirects to Create Account page and all required elements are displayed.

**Pre-conditions:**
- User is on Login page

**Test Steps:**
1. Click on "Sign Up" button
2. Verify redirection to Create Account page

**Expected Results:**
- Name field is visible
- Email field is visible
- Password field is visible
- "Create account" button is visible
- "Login with Google" button is visible
- "Privacy Policy" checkbox is visible
- "Back to Login" link is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-002: Verify Error When Name Field is Empty
**Test ID:** CREATE-TC-002  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system displays validation error when Name field is left empty.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Leave Name field empty
2. Fill valid email
3. Fill valid password
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "Field is required" is displayed for Name field
- Account is not created
- Form remains on Create Account page

**Test Data:**
- Name: (empty)
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].password`

**Status:** ✅ Passed

---

### TC-003: Verify Error When Email Field is Empty
**Test ID:** CREATE-TC-003  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system displays validation error when Email field is left empty.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Leave Email field empty
3. Fill valid password
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "Field is required" is displayed for Email field
- Account is not created
- Form remains on Create Account page

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: (empty)
- Password: `testUsers.users[0].password`

**Status:** ✅ Passed

---

### TC-004: Verify Error When Password Field is Empty
**Test ID:** CREATE-TC-004  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system displays validation error when Password field is left empty.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Fill valid email
3. Leave Password field empty
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "Field is required" is displayed for Password field
- Account is not created
- Form remains on Create Account page

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].email`
- Password: (empty)

**Status:** ✅ Passed

---

### TC-005: Verify Successful Account Creation
**Test ID:** CREATE-TC-005  
**Priority:** Critical  
**Test Type:** Functional  

**Description:**  
Verify that user can successfully create account with valid credentials and meeting all password requirements.

**Pre-conditions:**
- User is on Create Account page
- Email address is not already registered

**Test Steps:**
1. Fill valid name
2. Fill valid email (not registered)
3. Fill valid password (meets all requirements)
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Account is created successfully
- User is redirected to dashboard
- "Create new Project" button is visible

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].password` (Test@123)

**Password Requirements Met:**
- Minimum 8 characters
- At least one number
- At least one uppercase letter
- At least one lowercase letter
- At least one special character

**Status:** ✅ Passed

---

### TC-006: Verify Error for Invalid Email Format
**Test ID:** CREATE-TC-006  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system validates email format and prevents account creation with invalid email.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Fill invalid email format (e.g., "invalidemail")
3. Fill valid password
4. Check Privacy Policy checkbox
5. Attempt to submit form

**Expected Results:**
- Browser native validation message appears
- Email field's validity state is false
- Form submission is prevented
- Account is not created

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: "invalidemail" (no @ symbol)
- Password: `testUsers.users[0].password`

**Status:** ✅ Passed

---

### TC-007: Verify Error for Short Password (Length Validation)
**Test ID:** CREATE-TC-007  
**Priority:** High  
**Test Type:** Password Validation  

**Description:**  
Verify that system shows error when password is less than 8 characters.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Fill valid email
3. Fill password with less than 8 characters (e.g., "Test@1")
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "Minimum 8 characters" is displayed
- Account is not created
- Password field shows validation error

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].shortPassword` (Test@1)

**Status:** ✅ Passed

---

### TC-008: Verify Error for Password Without Numbers
**Test ID:** CREATE-TC-008  
**Priority:** High  
**Test Type:** Password Validation  

**Description:**  
Verify that system shows error when password doesn't contain at least one number.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Fill valid email
3. Fill password without numbers (e.g., "Test@abc")
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "At least one number" is displayed
- Account is not created
- Password field shows validation error

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].noNumber` (Test@abc)

**Status:** ✅ Passed

---

### TC-009: Verify Error for Password Without Uppercase Letters
**Test ID:** CREATE-TC-009  
**Priority:** High  
**Test Type:** Password Validation  

**Description:**  
Verify that system shows error when password doesn't contain at least one uppercase letter.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Fill valid email
3. Fill password without uppercase (e.g., "test@123")
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "At least one uppercase letter" is displayed
- Account is not created
- Password field shows validation error

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].noUppercase` (test@123)

**Status:** ✅ Passed

---

### TC-010: Verify Error for Password Without Lowercase Letters
**Test ID:** CREATE-TC-010  
**Priority:** High  
**Test Type:** Password Validation  

**Description:**  
Verify that system shows error when password doesn't contain at least one lowercase letter.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Fill valid email
3. Fill password without lowercase (e.g., "TEST@123")
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "At least one lowercase letter" is displayed
- Account is not created
- Password field shows validation error

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].noLowercase` (TEST@123)

**Status:** ✅ Passed

---

### TC-011: Verify Error for Password Without Special Characters
**Test ID:** CREATE-TC-011  
**Priority:** High  
**Test Type:** Password Validation  

**Description:**  
Verify that system shows error when password doesn't contain at least one special character.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill valid name
2. Fill valid email
3. Fill password without special characters (e.g., "Test1234")
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "At least one special character" is displayed
- Account is not created
- Password field shows validation error

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].email`
- Password: `testUsers.users[0].noSpecialChar` (Test1234)

**Status:** ✅ Passed

---

### TC-012: Verify Error for Existing Email
**Test ID:** CREATE-TC-012  
**Priority:** Critical  
**Test Type:** Validation  

**Description:**  
Verify that system prevents account creation when email is already registered and displays appropriate error message.

**Pre-conditions:**
- Email address is already registered in the system

**Test Steps:**
1. Fill valid name
2. Fill existing email address
3. Fill valid password
4. Check Privacy Policy checkbox
5. Click "Create account" button

**Expected Results:**
- Error message "User with this email already exist." is displayed
- Account is not created
- Form remains on Create Account page

**Test Data:**
- Name: `testUsers.users[0].name`
- Email: `testUsers.users[0].existingEmail` (testtt@example.com)
- Password: `testUsers.users[0].password`

**Status:** ✅ Passed

---

### TC-013: Verify Navigation to Privacy Policy Page
**Test ID:** CREATE-TC-013  
**Priority:** Medium  
**Test Type:** Navigation  

**Description:**  
Verify that clicking "Privacy Policy" link opens Privacy Policy page in new tab.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Click on "Privacy Policy" link in checkbox label
2. Switch to new tab

**Expected Results:**
- New tab opens
- Privacy Policy page is displayed
- URL contains "/privacy-policy"
- "Privacy Policy" heading is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-014: Verify Google Authentication Navigation
**Test ID:** CREATE-TC-014  
**Priority:** High  
**Test Type:** Integration  

**Description:**  
Verify that clicking "Login with Google" button opens Google sign-in dialog.

**Pre-conditions:**
- User is on Create Account page

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

### TC-015: Verify Navigation Back to Login Page
**Test ID:** CREATE-TC-015  
**Priority:** Medium  
**Test Type:** Navigation  

**Description:**  
Verify that clicking "Back to Login" link redirects to Login page.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Click on "Back to Login" link
2. Verify redirection to Login page

**Expected Results:**
- Login page is displayed
- Email field is visible
- Password field is visible
- Login button is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-016: Verify Password Field Masking/Unmasking
**Test ID:** CREATE-TC-016  
**Priority:** Low  
**Test Type:** Security/UI  

**Description:**  
Verify that password field has toggle functionality to show/hide password.

**Pre-conditions:**
- User is on Create Account page

**Test Steps:**
1. Fill password in password field
2. Verify password is masked (type="password")
3. Click eye icon to unmask
4. Verify password is visible (type="text")
5. Click eye icon again
6. Verify password is masked again

**Expected Results:**
- Password field initially has type="password"
- Password is masked by default (shows dots/asterisks)
- Eye icon toggles password visibility
- Password field type changes between "password" and "text"

**Test Data:**
- Password: `testUsers.users[0].password`

**Status:** ✅ Passed

---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 16 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **16** | **100%** |

---

## Password Requirements Matrix

| Requirement | Test Case | Status |
|-------------|-----------|--------|
| Minimum 8 characters | TC-007 | ✅ Passed |
| At least one number | TC-008 | ✅ Passed |
| At least one uppercase letter | TC-009 | ✅ Passed |
| At least one lowercase letter | TC-010 | ✅ Passed |
| At least one special character | TC-011 | ✅ Passed |
| All requirements met | TC-005 | ✅ Passed |

---



## Page Object Model

**File:** `tests/Page/Createaccount.ts`

**Key Elements:**
- `namefield`: Name input field
- `emailfield`: Email input field
- `passwordfield`: Password input field
- `createaccountButton`: Create account submit button
- `loginWithGoogleButton`: Google OAuth button
- `privacyPolicyCheckbox`: Privacy policy agreement checkbox
- `backToLoginLink`: Back to login navigation link

**Key Methods:**
- `gotoCreateAccountPage()`: Navigate to create account page
- `fillName(name)`: Fill name field
- `fillEmail(email)`: Fill email field
- `fillPassword(password)`: Fill password field
- `checkPrivacyPolicy()`: Check privacy policy checkbox
- `clickCreateAccount()`: Click create account button

---

## Validation Rules

### Email Validation
- Format: RFC 5322 compliant
- Required: Yes
- Browser native validation enabled

### Password Validation
- **Length:** Minimum 8 characters
- **Complexity:**
  - At least 1 number (0-9)
  - At least 1 uppercase letter (A-Z)
  - At least 1 lowercase letter (a-z)
  - At least 1 special character (!@#$%^&*()_+-=[]{}|;:,.<>?)

### Name Validation
- Required: Yes
- Format: Any text string
- Min/Max length: Not specified

---

## Notes

- All password validation rules are enforced client-side with real-time feedback
- Email uniqueness is validated server-side
- Privacy Policy checkbox is mandatory for account creation
- Google OAuth is alternative signup method
- Each test includes proper cleanup via beforeEach hook
- Tests are isolated and can run in parallel

---

## Run Commands

```bash
# Run all create account tests
npx playwright test tests/E2E/Authonication/CreateAccount.spec.ts

# Run with specific reporter
npx playwright test tests/E2E/Authonication/CreateAccount.spec.ts --reporter=line

# Run with Allure reporter
npx playwright test tests/E2E/Authonication/CreateAccount.spec.ts --reporter=allure-playwright

# Run in headed mode (visible browser)
npx playwright test tests/E2E/Authonication/CreateAccount.spec.ts --headed

# Run specific test case
npx playwright test tests/E2E/Authonication/CreateAccount.spec.ts --grep "short password"

# Run only password validation tests
npx playwright test tests/E2E/Authonication/CreateAccount.spec.ts --grep "password"
```
