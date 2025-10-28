# Profile Test Suite

**Test Suite ID:** PROFILE-TS-001  
**Module:** User Profile & Settings  
**Test File:** `tests/E2E/Authonication/Profile.spec.ts`  
**Total Test Cases:** 27
**Status:** ✅ passed (27/27 Passed)  
**Last Updated:** October 26,2025

---

## Test Suite Overview

This test suite validates the Profile functionality and More Menu features of the Ideoz application, including profile management, password changes, logout functionality, social media navigation, and help features.

---

## Section 1: More Menu Functionality (11 Tests)

### TC-001: Verify More Menu Slider Elements Display
**Test ID:** PROFILE-TC-001  
**Priority:** High  
**Test Type:** UI/Functional  

**Description:**  
Verify that clicking "More" button opens the More Menu drawer and displays all slider elements correctly.

**Pre-conditions:**
- User is logged in
- User is on dashboard

**Test Steps:**
1. Click on "More" button in navigation
2. Wait for More Menu drawer to open
3. Verify all slider elements are visible

**Expected Results:**
- More Menu drawer opens from right side
- Profile button is visible
- Ideoz Points section is visible
- Help button is visible
- Share button is visible
- Social media icons are visible (TikTok, Instagram, YouTube, Facebook, X, LinkedIn)

**Test Data:**
- Login: valid user credentials (e.g., user@example.com / YourPassword123!)

**Status:** ✅ Passed

---

### TC-002: Verify Help Button Functionality
**Test ID:** PROFILE-TC-002  
**Priority:** Medium  
**Test Type:** Functional  

**Description:**  
Verify that clicking Help button in More Menu opens help documentation in new tab.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on "Help" button
3. Wait for new tab to open
4. Switch to new tab

**Expected Results:**
- New tab opens
- Help page URL is correct: `https://help.ideoz.io`
- Help documentation is displayed

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-003: Verify Share Button Functionality
**Test ID:** PROFILE-TC-003  
**Priority:** Low  
**Test Type:** Functional  

**Description:**  
Verify that clicking Share button copies text to clipboard and shows confirmation message.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on "Share" button
3. Wait for confirmation message

**Expected Results:**
- Text is copied to clipboard
- Confirmation message "copied" appears
- Share functionality works correctly

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-004: Verify TikTok Social Media Link
**Test ID:** PROFILE-TC-004  
**Priority:** Low  
**Test Type:** Integration  

**Description:**  
Verify that clicking TikTok icon opens TikTok profile in new tab.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on TikTok icon
3. Wait for new tab to open
4. Switch to new tab

**Expected Results:**
- New tab opens
- URL contains "tiktok.com"
- TikTok profile page is displayed

**Test Data:**
- Expected URL pattern: https://www.tiktok.com/*

**Status:** ✅ Passed

---

### TC-005: Verify Instagram Social Media Link
**Test ID:** PROFILE-TC-005  
**Priority:** Low  
**Test Type:** Integration  

**Description:**  
Verify that clicking Instagram icon opens Instagram profile in new tab.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on Instagram icon
3. Wait for new tab to open
4. Switch to new tab

**Expected Results:**
- New tab opens
- URL contains "instagram.com"
- Instagram profile page is displayed

**Test Data:**
- Expected URL pattern: https://www.instagram.com/*

**Status:** ✅ Passed

---

### TC-006: Verify YouTube Social Media Link
**Test ID:** PROFILE-TC-006  
**Priority:** Low  
**Test Type:** Integration  

**Description:**  
Verify that clicking YouTube icon opens YouTube channel in new tab.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on YouTube icon
3. Wait for new tab to open
4. Switch to new tab

**Expected Results:**
- New tab opens
- URL contains "youtube.com"
- YouTube channel page is displayed

**Test Data:**
- Expected URL pattern: https://www.youtube.com/*

**Status:** ✅ Passed

---

### TC-007: Verify Facebook Social Media Link
**Test ID:** PROFILE-TC-007  
**Priority:** Low  
**Test Type:** Integration  

**Description:**  
Verify that clicking Facebook icon opens Facebook profile in new tab.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on Facebook icon
3. Wait for new tab to open
4. Switch to new tab

**Expected Results:**
- New tab opens
- URL contains "facebook.com"
- Facebook profile page is displayed

**Test Data:**
- Expected URL pattern: https://www.facebook.com/*

**Status:** ✅ Passed

---

### TC-008: Verify X (Twitter) Social Media Link
**Test ID:** PROFILE-TC-008  
**Priority:** Low  
**Test Type:** Integration  

**Description:**  
Verify that clicking X (formerly Twitter) icon opens X profile in new tab.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on X icon
3. Wait for new tab to open
4. Switch to new tab

**Expected Results:**
- New tab opens
- URL contains "x.com" or "twitter.com"
- X profile page is displayed

**Test Data:**
- Expected URL pattern: https://x.com/* or https://twitter.com/*

**Status:** ✅ Passed

---

### TC-009: Verify LinkedIn Social Media Link
**Test ID:** PROFILE-TC-009  
**Priority:** Low  
**Test Type:** Integration  

**Description:**  
Verify that clicking LinkedIn icon opens LinkedIn profile in new tab.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on LinkedIn icon
3. Wait for new tab to open
4. Switch to new tab

**Expected Results:**
- New tab opens
- URL contains "linkedin.com"
- LinkedIn profile page is displayed

**Test Data:**
- Expected URL pattern: https://www.linkedin.com/*

**Status:** ✅ Passed

---

### TC-010: Verify Profile Navigation from More Menu
**Test ID:** PROFILE-TC-010  
**Priority:** High  
**Test Type:** Navigation  

**Description:**  
Verify that clicking Profile button in More Menu opens Profile page.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Click on "Profile" button
3. Verify Profile page opens

**Expected Results:**
- Profile page is displayed
- User's name is visible
- User's email is visible
- "Change Password" button is visible
- "Logout" button is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-011: Verify Ideoz Points Section Display
**Test ID:** PROFILE-TC-011  
**Priority:** Medium  
**Test Type:** UI  

**Description:**  
Verify that Ideoz Points section is displayed in More Menu with correct information.

**Pre-conditions:**
- User is logged in
- More Menu is open

**Test Steps:**
1. Open More Menu
2. Locate Ideoz Points section

**Expected Results:**
- Ideoz Points section is visible
- Points value/information is displayed
- Section is properly formatted

**Test Data:** N/A

**Status:** ✅ Passed

---

## Section 2: Profile Page Functionality (16 Tests)

### TC-012: Verify Profile Page Elements Display
**Test ID:** PROFILE-TC-012  
**Priority:** Critical  
**Test Type:** UI/Functional  

**Description:**  
Verify that all required elements are displayed on Profile page.

**Pre-conditions:**
- User is logged in
- User navigates to Profile page via More Menu

**Test Steps:**
1. Navigate to Profile page
2. Verify all elements are visible

**Expected Results:**
- User's name is displayed
- User's email is displayed
- "Change Password" button is visible
- "Logout" button is visible

**Test Data:**
- Login: valid user credentials

**Status:** ✅ Passed

---

### TC-013: Verify Change Password Dialog Opens
**Test ID:** PROFILE-TC-013  
**Priority:** High  
**Test Type:** Functional  

**Description:**  
Verify that clicking "Change Password" button opens the Change Password dialog with all required fields.

**Pre-conditions:**
- User is on Profile page

**Test Steps:**
1. Click on "Change Password" button
2. Wait for dialog to appear

**Expected Results:**
- Change Password dialog opens
- Current Password field is visible
- New Password field is visible
- Submit button is visible
- Cancel button is visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-014: Verify Password Change with Short Password
**Test ID:** PROFILE-TC-014  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows error when new password is less than 8 characters.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill current password
3. Fill new password with less than 8 characters (e.g., "Test@1")
4. Click Submit button

**Expected Results:**
- Error message "Minimum 8 characters" is displayed
- Password is not changed
- Dialog remains open

**Test Data:**
- Current Password: valid password
- New Password: short password (e.g., Test@1)

**Status:** ✅ Passed

---

### TC-015: Verify Password Change Without Numbers
**Test ID:** PROFILE-TC-015  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows error when new password doesn't contain at least one number.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill current password
3. Fill new password without numbers (e.g., "Test@abc")
4. Click Submit button

**Expected Results:**
- Error message "At least one number" is displayed
- Password is not changed
- Dialog remains open

**Test Data:**
- Current Password: valid password
- New Password: no number (e.g., Test@abc)

**Status:** ✅ Passed

---

### TC-016: Verify Password Change Without Uppercase
**Test ID:** PROFILE-TC-016  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows error when new password doesn't contain at least one uppercase letter.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill current password
3. Fill new password without uppercase (e.g., "test@123")
4. Click Submit button

**Expected Results:**
- Error message "At least one uppercase letter" is displayed
- Password is not changed
- Dialog remains open

**Test Data:**
- Current Password: valid password
- New Password: no uppercase (e.g., test@123)

**Status:** ✅ Passed

---

### TC-017: Verify Password Change Without Lowercase
**Test ID:** PROFILE-TC-017  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows error when new password doesn't contain at least one lowercase letter.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill current password
3. Fill new password without lowercase (e.g., "TEST@123")
4. Click Submit button

**Expected Results:**
- Error message "At least one lowercase letter" is displayed
- Password is not changed
- Dialog remains open

**Test Data:**
- Current Password: valid password
- New Password: no lowercase (e.g., TEST@123)

**Status:** ✅ Passed

---

### TC-018: Verify Password Change Without Special Characters
**Test ID:** PROFILE-TC-018  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that system shows error when new password doesn't contain at least one special character.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill current password
3. Fill new password without special characters (e.g., "Test1234")
4. Click Submit button

**Expected Results:**
- Error message "At least one special character" is displayed
- Password is not changed
- Dialog remains open

**Test Data:**
- Current Password: valid password
- New Password: no special character (e.g., Test1234)

**Status:** ✅ Passed

---

### TC-019: Verify Current Password Field Masking
**Test ID:** PROFILE-TC-019  
**Priority:** Medium  
**Test Type:** Security/UI  

**Description:**  
Verify that current password field in Change Password dialog is masked by default.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill current password field
3. Verify field type is "password"

**Expected Results:**
- Password is masked (dots/asterisks)
- Field type is "password"
- Password characters are not visible

**Test Data:**
- Password: valid password

**Status:** ✅ Passed

---

### TC-020: Verify New Password Field Masking
**Test ID:** PROFILE-TC-020  
**Priority:** Medium  
**Test Type:** Security/UI  

**Description:**  
Verify that new password field in Change Password dialog is masked by default.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill new password field
3. Verify field type is "password"

**Expected Results:**
- Password is masked (dots/asterisks)
- Field type is "password"
- Password characters are not visible

**Test Data:**
- Password: valid password

**Status:** ✅ Passed

---

### TC-021: Verify Cancel Button in Change Password Dialog
**Test ID:** PROFILE-TC-021  
**Priority:** Medium  
**Test Type:** Functional  

**Description:**  
Verify that clicking Cancel button in Change Password dialog closes the dialog without making changes.

**Pre-conditions:**
- User is on Profile page
- Change Password dialog is open

**Test Steps:**
1. Open Change Password dialog
2. Fill some data in fields
3. Click Cancel button
4. Verify dialog closes

**Expected Results:**
- Dialog closes
- No password change occurs
- User remains on Profile page
- Profile page elements are still visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-022: Verify User Name Display on Profile Page
**Test ID:** PROFILE-TC-022  
**Priority:** Medium  
**Test Type:** UI  

**Description:**  
Verify that logged-in user's name is correctly displayed on Profile page.

**Pre-conditions:**
- User is logged in
- User is on Profile page

**Test Steps:**
1. Navigate to Profile page
2. Locate user name element

**Expected Results:**
- User's name is displayed
- Name matches the logged-in account
- Name is properly formatted

**Test Data:**
- Expected Name: From logged-in user's profile

**Status:** ✅ Passed

---

### TC-023: Verify User Email Display on Profile Page
**Test ID:** PROFILE-TC-023  
**Priority:** Medium  
**Test Type:** UI  

**Description:**  
Verify that logged-in user's email is correctly displayed on Profile page.

**Pre-conditions:**
- User is logged in
- User is on Profile page

**Test Steps:**
1. Navigate to Profile page
2. Locate user email element

**Expected Results:**
- User's email is displayed
- Email matches the logged-in account
- Email is properly formatted

**Test Data:**
- Expected Email: user@example.com

**Status:** ✅ Passed

---

### TC-024: Verify Logout Button Functionality
**Test ID:** PROFILE-TC-024  
**Priority:** Critical  
**Test Type:** Functional  

**Description:**  
Verify that clicking Logout button opens logout confirmation dialog with correct buttons.

**Pre-conditions:**
- User is logged in
- User is on Profile page

**Test Steps:**
1. Click on "Logout" button
2. Wait for confirmation dialog

**Expected Results:**
- Logout confirmation dialog appears
- "Quit" button is visible
- "Continue" button is visible
- Dialog asks for logout confirmation

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-025: Verify Logout Confirmation - Quit Action
**Test ID:** PROFILE-TC-025  
**Priority:** Critical  
**Test Type:** Security  

**Description:**  
Verify that clicking Quit button in logout dialog logs user out and redirects to login page.

**Pre-conditions:**
- User is on Profile page
- Logout confirmation dialog is open

**Test Steps:**
1. Click Logout button to open dialog
2. Click "Quit" button
3. Wait for redirection

**Expected Results:**
- User is logged out
- User is redirected to Login page
- Login page elements are visible (email field, password field, login button)
- Session is terminated

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-026: Verify Logout Confirmation - Cancel Action
**Test ID:** PROFILE-TC-026  
**Priority:** High  
**Test Type:** Functional  

**Description:**  
Verify that clicking Continue button in logout dialog cancels logout and keeps user logged in.

**Pre-conditions:**
- User is on Profile page
- Logout confirmation dialog is open

**Test Steps:**
1. Click Logout button to open dialog
2. Click "Continue" button
3. Verify dialog closes

**Expected Results:**
- Dialog closes
- User remains logged in
- User stays on Profile page
- Profile page elements remain visible

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-027: Verify Profile Icon Display on Dashboard
**Test ID:** PROFILE-TC-027  
**Priority:** Medium  
**Test Type:** UI  

**Description:**  
Verify that user's profile icon is displayed on dashboard after login.

**Pre-conditions:**
- User is logged in
- User is on dashboard

**Test Steps:**
1. Log in to application
2. Verify profile icon is visible on dashboard

**Expected Results:**
- Profile icon is visible
- Icon displays user's initial (e.g., "T" for "Test User")
- Icon is clickable

**Test Data:**
- Login: valid user credentials

**Status:** ✅ Passed

---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 27 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **27** | **100%** |

---

## Test Results by Category

### More Menu Tests (11 Tests)
| Category | Passed | Failed | Known Issues |
|----------|--------|--------|--------------|
| UI Elements | 2 | 0 | 0 |
| Navigation | 1 | 0 | 0 |
| Social Media | 6 | 0 | 0 |
| Functionality | 2 | 0 | 0|
| **Subtotal** | **11** | **0** | **** |

### Profile Page Tests (16 Tests)
| Category | Passed | Failed | Known Issues |
|----------|--------|--------|--------------|
| UI Elements | 3 | 0 | 0 |
| Password Change | 7 | 0 | 0 |
| Security | 2 | 0 | 0 |
| Logout | 3 | 0 | 0 |
| Navigation | 1 | 0 | 0 |
| **Subtotal** | **16** | **0** | **0** |

---

## Password Requirements Matrix (Profile Page)

| Requirement | Test Case | Status |
|-------------|-----------|--------|
| Minimum 8 characters | TC-014 | ✅ Passed |
| At least one number | TC-015 | ✅ Passed |
| At least one uppercase letter | TC-016 | ✅ Passed |
| At least one lowercase letter | TC-017 | ✅ Passed |
| At least one special character | TC-018 | ✅ Passed |
| Current password masking | TC-019 | ✅ Passed |
| New password masking | TC-020 | ✅ Passed |

---


## Page Object Model

**File:** `tests/Page/Profile.ts`

### Key Elements - More Menu
- `profileIcon`: User profile icon in header
- `moreMenuDrawer`: More menu slider container
- `profileButton`: Profile navigation button in More Menu
- `ideozPointsSection`: Ideoz points display section
- `helpButton`: Help documentation button
- `shareButton`: Share functionality button
- `tiktokIcon`: TikTok social media link
- `instagramIcon`: Instagram social media link
- `youtubeIcon`: YouTube social media link
- `facebookIcon`: Facebook social media link
- `xIcon`: X (Twitter) social media link
- `linkedinIcon`: LinkedIn social media link

### Key Elements - Profile Page
- `userName`: User's name display
- `userEmail`: User's email display
- `changePasswordButton`: Open change password dialog button
- `logoutButton`: Logout button

### Key Elements - Change Password Dialog
- `currentPasswordInput`: Current password field
- `newPasswordInput`: New password field
- `submitChangePasswordButton`: Submit password change button
- `cancelButton`: Cancel password change button

### Key Elements - Logout Dialog
- `quitButton`: Confirm logout button
- `continueButton`: Cancel logout button

### Key Methods
- `openMoreMenu()`: Opens More menu drawer
- `clickProfile()`: Navigates to Profile page
- `openChangePasswordDialog()`: Opens Change Password dialog
- `fillCurrentPassword(password)`: Fills current password
- `fillNewPassword(password)`: Fills new password
- `submitPasswordChange()`: Clicks submit in change password dialog
- `clickLogout()`: Clicks logout button
- `confirmLogout()`: Clicks quit in logout dialog
- `cancelLogout()`: Clicks continue in logout dialog

---



---

## Locator Strategies Used

### More Menu Social Media Icons
- Uses `href` attribute for stable identification
- Example: `page.locator('a[href*="tiktok.com"]')`
- Benefit: Links are identified by destination URL, not visual elements

### Profile Elements
- Primary: `data-testid` attributes for core functionality
- Fallback: `getByRole()` for semantic elements
- Text-based: `getByText()` for unique labels

### Dialog Elements
- Modal detection: `role="dialog"`
- Button identification: `getByRole('button', { name: /text/i })`

### Strict Mode Handling
- Profile button: Uses regex `/^profile$/i` for exact match
- Ideoz Points: Uses `.first()` when multiple matches expected
- Social Icons: Uses unique href patterns

---

## Notes

- All tests use Playwright's auto-waiting and auto-retry mechanisms
- Tests are isolated and can run in parallel
- Each test includes proper setup (login) and teardown
- Social media links open in new tabs - tests verify navigation
- Password validation follows same rules as Create Account
- Change Password dialog has client-side validation
- Logout requires confirmation to prevent accidental logouts
- More Menu uses Material-UI Drawer component
- Profile page requires authentication

---

## Run Commands

```bash
# Run all profile tests
npx playwright test tests/E2E/Authonication/Profile.spec.ts

# Run with specific reporter
npx playwright test tests/E2E/Authonication/Profile.spec.ts --reporter=line

# Run with Allure reporter
npx playwright test tests/E2E/Authonication/Profile.spec.ts --reporter=allure-playwright

# Run in headed mode (visible browser)
npx playwright test tests/E2E/Authonication/Profile.spec.ts --headed

# Run only More Menu tests
npx playwright test tests/E2E/Authonication/Profile.spec.ts --grep "More Menu"

# Run only Profile Page tests
npx playwright test tests/E2E/Authonication/Profile.spec.ts --grep "Profile Page"

# Run only password validation tests
npx playwright test tests/E2E/Authonication/Profile.spec.ts --grep "password"

# Run only social media tests
npx playwright test tests/E2E/Authonication/Profile.spec.ts --grep "social media"

# Run specific test case
npx playwright test tests/E2E/Authonication/Profile.spec.ts --grep "logout"

# Generate Allure report after run
allure generate allure-results --clean -o allure-report; allure open allure-report
```

---

## Best Practices Applied

1. **Page Object Model**: All locators centralized in Profile.ts
2. **Test Isolation**: Each test is independent with proper setup/teardown
3. **Stable Locators**: Prioritizes data-testid and semantic selectors
4. **Auto-waiting**: Leverages Playwright's built-in waiting mechanisms
5. **Error Handling**: Tests verify both positive and negative scenarios
6. **Security**: Password fields are masked by default
7. **User Experience**: Confirmation dialogs prevent accidental actions
8. **Maintainability**: Clear test structure and descriptive names
9. **Debugging**: Screenshots captured on failures
10. **Reporting**: Allure integration for comprehensive test reports
