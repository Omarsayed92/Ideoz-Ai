# Login Test Suite - Updated

## ✅ Changes Made

### 1. **URL Updated**
- Changed from `https://app-testing.ideoz.ai/` to `https://app-test.ideoz.ai/`
- Updated in both `Login.ts` Page Object and `Login.spec.ts`

### 2. **Test Structure Refactored**
- **Removed** `test.describe()` wrapper to match Create Account pattern
- **Added** `import testUsers from '../../../TestData/testUsers.json'`
- **Changed** from inline test data to using centralized JSON data

### 3. **Test Pattern Alignment**
Now matches the Create Account test pattern exactly:

```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Page/Login';
import testUsers from '../../../TestData/testUsers.json';

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
});

// TC 005 - Validate Email field - Invalid email address
test('should show error for invalid email address format', async ({ page }) => {
    await loginPage.clickLogInButton();
    
    await loginPage.fillEmail(testUsers.loginCredentials.invalidEmailFormats[0]);
    await loginPage.fillPassword('ValidPassword123');
    await loginPage.clickLogin();
    
    // Verify validation error appears
    await expect(page.getByText(/invalid email address/i)).toBeVisible();
});
```

### 4. **Improved Test Data Usage**
All tests now use data from `testUsers.json`:

- ✅ `testUsers.loginCredentials.validUser.email`
- ✅ `testUsers.loginCredentials.validUser.password`
- ✅ `testUsers.loginCredentials.invalidEmailFormats[0]`
- ✅ `testUsers.loginCredentials.invalidPasswords[0]`
- ✅ `testUsers.loginCredentials.invalidCredentials.email`
- ✅ `testUsers.loginCredentials.nonExistentUser.email`

### 5. **Simplified Assertions**
Removed `.or()` chaining where not necessary for cleaner, more focused assertions:

**Before:**
```typescript
await expect(page.getByText(/invalid email address/i).or(page.getByText('Field is required'))).toBeVisible();
```

**After:**
```typescript
await expect(page.getByText(/invalid email address/i)).toBeVisible();
```

### 6. **Removed Unnecessary Timeouts**
Changed from:
```typescript
await expect(page.getByRole('button', { name: 'Create new Project' }).or(page.locator('[data-testid="dashboard"]'))).toBeVisible({ timeout: 10000 });
```

To:
```typescript
await expect(page.getByRole('button', { name: 'Create new Project' })).toBeVisible();
```

## 📋 All 18 Test Cases

1. ✅ Open Ideoz landing page
2. ✅ Verify redirection to Login page from "Log in" button
3. ✅ Verify "Login with Google" button redirects to Google sign-in dialog
4. ✅ Validate Email field - Valid email address
5. ✅ Validate Email field - Invalid email address
6. ✅ Validate Password field - Valid password
7. ✅ Validate Password field - Invalid password (too short)
8. ✅ Click "Forget password" CTA
9. ✅ Click "Create Account" button
10. ✅ Successful login with valid credentials
11. ✅ Login with empty Email field
12. ✅ Login with empty Password field
13. ✅ Login with incorrect credentials
14. ✅ Login with non-existent account
15. ✅ Verify all login page elements are present
16. ✅ Verify email field validation on blur
17. ✅ Verify both fields empty
18. ✅ Verify email field accepts special characters in valid format

## 🚀 Running Tests

```powershell
# Run all login tests
npx playwright test tests/E2E/Authonication/Login.spec.ts

# Run in headed mode
npx playwright test tests/E2E/Authonication/Login.spec.ts --headed

# Run in UI mode
npx playwright test tests/E2E/Authonication/Login.spec.ts --ui

# Run specific test
npx playwright test tests/E2E/Authonication/Login.spec.ts -g "should show error for invalid email"

# Debug mode
npx playwright test tests/E2E/Authonication/Login.spec.ts --debug
```

## 📝 Files Updated

1. ✅ `tests/E2E/Authonication/Login.spec.ts` - Complete refactor
2. ✅ `tests/Page/Login.ts` - URL updated (already correct)
3. ✅ `TestData/testUsers.json` - Already has login data

## 🎯 Best Practices Applied

- ✅ **Consistent Structure**: Matches Create Account test pattern
- ✅ **Centralized Test Data**: Using JSON file
- ✅ **Role-based Locators**: Semantic selectors
- ✅ **Auto-retrying Assertions**: No manual waits
- ✅ **Clean Code**: Removed unnecessary complexity
- ✅ **Proper Comments**: Each test case numbered and described

## ⚠️ Notes

- Update actual credentials in `testUsers.json` before running tests
- Test URL is now `https://app-test.ideoz.ai/`
- All tests follow Playwright best practices
- No manual timeouts or waits
- Tests are independent and can run in any order
