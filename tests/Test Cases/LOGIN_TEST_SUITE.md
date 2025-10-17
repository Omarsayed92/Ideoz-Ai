# Login Page Test Suite

## Overview
This test suite provides comprehensive coverage for the Ideoz login page functionality using Playwright with TypeScript.

## Test Files
- **Login.spec.ts**: Main test file with all login test cases
- **LoginWithData.spec.ts**: Enhanced version using test data from JSON file
- **Login.ts**: Page Object Model for login page

## Test Cases

### TC 001 - Open Ideoz Landing Page
**Description**: Verify that the Ideoz landing page loads successfully  
**Steps**:
1. Navigate to https://app-testing.ideoz.ai/
2. Verify URL is correct
3. Verify "Register for free" button is visible
4. Verify "Log in" button is visible

### TC 002 - Verify Redirection to Login Page
**Description**: Verify that clicking "Log in" button redirects to login page  
**Steps**:
1. Open landing page
2. Click "Log in" button
3. Verify all login page elements are visible (email, password, buttons, links)

### TC 003 - Login with Google
**Description**: Verify "Login with Google" button redirects to Google sign-in dialog  
**Steps**:
1. Navigate to login page
2. Click "Login with Google" button
3. Verify Google authentication page opens in new window
4. Verify URL contains "accounts.google.com"

### TC 004 - Valid Email Address
**Description**: Validate that the email field accepts valid email formats  
**Steps**:
1. Navigate to login page
2. Enter valid email address
3. Enter valid password
4. Verify no validation error appears

### TC 005 - Invalid Email Address
**Description**: Validate that the email field shows error for invalid formats  
**Steps**:
1. Navigate to login page
2. Enter invalid email (e.g., "invalidemail")
3. Enter valid password
4. Click login button
5. Verify validation error message appears

### TC 006 - Valid Password
**Description**: Validate that the password field accepts valid passwords  
**Steps**:
1. Navigate to login page
2. Enter valid email
3. Enter valid password (8+ characters)
4. Verify no validation error appears

### TC 007 - Invalid Password
**Description**: Validate that the password field shows error for invalid passwords  
**Steps**:
1. Navigate to login page
2. Enter valid email
3. Enter invalid password (less than 8 characters)
4. Click login button
5. Verify validation error message appears

### TC 008 - Forget Password Link
**Description**: Verify "Forget password?" link navigation  
**Steps**:
1. Navigate to login page
2. Click "Forget password?" link
3. Verify redirection to password recovery page

### TC 009 - Create Account Button
**Description**: Verify "Create account" button navigation  
**Steps**:
1. Navigate to login page
2. Click "Create account" button
3. Verify redirection to create account page
4. Verify Name, Email, Password fields are visible

### TC 010 - Successful Login
**Description**: Verify successful login with valid credentials  
**Steps**:
1. Navigate to login page
2. Enter valid email
3. Enter valid password
4. Click login button
5. Verify redirection to dashboard/project page

### TC 011 - Empty Email Field
**Description**: Verify error when email field is empty  
**Steps**:
1. Navigate to login page
2. Leave email field empty
3. Enter valid password
4. Click login button
5. Verify "Field is required" error appears

### TC 012 - Empty Password Field
**Description**: Verify error when password field is empty  
**Steps**:
1. Navigate to login page
2. Enter valid email
3. Leave password field empty
4. Click login button
5. Verify "Field is required" error appears

### TC 013 - Incorrect Credentials
**Description**: Verify error message for incorrect password  
**Steps**:
1. Navigate to login page
2. Enter valid email
3. Enter incorrect password
4. Click login button
5. Verify "Invalid credentials" error appears

### TC 014 - Non-existent Account
**Description**: Verify error message for non-existent user  
**Steps**:
1. Navigate to login page
2. Enter non-existent email
3. Enter any password
4. Click login button
5. Verify error message appears

### TC 015 - Login Page Elements
**Description**: Verify all required login page elements are present  
**Steps**:
1. Navigate to login page
2. Verify email field is visible
3. Verify password field is visible
4. Verify login button is visible
5. Verify "Login with Google" button is visible
6. Verify "Forget password?" link is visible
7. Verify "Create account" button is visible

### TC 016 - Email Validation on Blur
**Description**: Verify email validation occurs when field loses focus  
**Steps**:
1. Navigate to login page
2. Click email field
3. Enter invalid email
4. Click password field (trigger blur)
5. Verify inline validation error appears

### TC 017 - Both Fields Empty
**Description**: Verify error when both email and password are empty  
**Steps**:
1. Navigate to login page
2. Leave both fields empty
3. Click login button
4. Verify error messages appear

### TC 018 - Email with Special Characters
**Description**: Verify email field accepts valid special characters  
**Steps**:
1. Navigate to login page
2. Enter email with special characters (e.g., user+test@example.com)
3. Enter valid password
4. Verify no validation error appears

## Playwright Best Practices Implemented

### 1. Role-based Locators
All locators use semantic role-based selectors for better accessibility and maintainability:
```typescript
page.getByRole('textbox', { name: 'Email' })
page.getByRole('button', { name: 'Log in' })

```

### 2. Auto-retrying Assertions
Using Playwright's built-in auto-retrying assertions:
```typescript
await expect(element).toBeVisible()
await expect(page).toHaveURL(expectedURL)
```

### 3. No Manual Timeouts
Tests rely on Playwright's built-in auto-waiting and retries instead of manual `setTimeout()` or `waitForTimeout()`.

### 4. Page Object Model
Clean separation of concerns with dedicated Page Object Model class (`Login.ts`).

### 5. Test Data Management
Centralized test data in `TestData/testUsers.json` for easy maintenance.

### 6. Proper Test Isolation
Each test uses `beforeEach` to ensure clean state and independence.

### 7. Descriptive Test Names
All test names clearly describe what is being tested.

## Running the Tests

### Run all login tests:
```bash
npx playwright test tests/E2E/Authonication/Login.spec.ts
```

### Run with UI mode:
```bash
npx playwright test tests/E2E/Authonication/Login.spec.ts --ui
```

### Run specific test:
```bash
npx playwright test tests/E2E/Authonication/Login.spec.ts -g "should login successfully"
```

### Run with Allure reporter:
```bash
npm run test:report
```

### Debug mode:
```bash
npx playwright test tests/E2E/Authonication/Login.spec.ts --debug
```

## Test Configuration
- **Browser**: Chromium (configurable in playwright.config.ts)
- **Base URL**: https://app-testing.ideoz.ai/
- **Reporters**: HTML, Allure
- **Retry**: Configured in playwright.config.ts
- **Trace**: On for failed tests
- **Screenshots**: On failure
- **Videos**: Retained on failure

## Maintenance Notes
- Update test credentials in `TestData/testUsers.json`
- All locators use role-based selectors for better resilience
- Tests follow AAA pattern (Arrange, Act, Assert)
- Each test is independent and can run in isolation
