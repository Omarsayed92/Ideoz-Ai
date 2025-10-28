# Landing Page Test Suite (Anonymous User)

**Test Suite ID:** LANDING-TS-001  
**Module:** Anonymous User - Landing Page  
**Test File:** `tests/E2E/Anonymous/Landing.spec.ts`  
**Total Test Cases:** 13  
**Status:** ✅ Active  
**Last Updated:** October 18, 2025

---

## Test Suite Overview

This test suite validates the Landing Page functionality for anonymous (non-authenticated) users of the Ideoz application, including header elements, user input areas, prompt examples, authentication dialogs, and educational content.

---

## Test Cases

### TC-001: Verify All Header Elements Display Correctly
**Test ID:** LANDING-TC-001  
**Priority:** Critical  
**Test Type:** UI/Functional  

**Description:**  
Verify that all header elements are displayed correctly on the Landing page for anonymous users.

**Pre-conditions:**
- User is not logged in
- User navigates to application home page

**Test Steps:**
1. Navigate to application home page 
2. Verify logo is visible
3. Verify "points remaining" button is visible
4. Verify Login button is visible
5. Verify "Register for free" button is visible

**Expected Results:**
- Logo image is displayed in header
- Points remaining button is visible and disabled
- Login button is visible and clickable
- "Register for free" button is visible and clickable
- All header elements are properly aligned

**Test Data:**
- URL: 

**Status:** ✅ Passed

---

### TC-002: Verify Main Heading and Subheading Display
**Test ID:** LANDING-TC-002  
**Priority:** High  
**Test Type:** UI/Content  

**Description:**  
Verify that main heading and subheading are displayed prominently on the Landing page.

**Pre-conditions:**
- User is on Landing page

**Test Steps:**
1. Navigate to Landing page
2. Locate main heading
3. Locate subheading

**Expected Results:**
- Main heading "What problem are you working on now?" is visible
- Subheading "Uncover the right UX problem faster and smarter with Ideoz-AI" is visible
- Text is properly formatted and readable

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-003: Verify User Challenge Input Area Elements
**Test ID:** LANDING-TC-003  
**Priority:** Critical  
**Test Type:** UI/Functional  

**Description:**  
Verify that all elements of the user challenge input area are present and functional.

**Pre-conditions:**
- User is on Landing page

**Test Steps:**
1. Navigate to Landing page
2. Locate text input field
3. Verify Mode section is visible
4. Verify action buttons are present

**Expected Results:**
- Text input field with placeholder "Describe your user experience challenge" is visible
- "Mode" label is displayed
- "🧠 Uncover" mode is visible
- Action buttons container (`.flex.gap-1`) is visible
- All elements are properly aligned

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-004: Verify "Need a Nudge?" Hint Section Display
**Test ID:** LANDING-TC-004  
**Priority:** Medium  
**Test Type:** UI/Content  

**Description:**  
Verify that the "Need a nudge?" hint section with prompt examples is displayed.

**Pre-conditions:**
- User is on Landing page

**Test Steps:**
1. Navigate to Landing page
2. Scroll to hint section
3. Verify hint text is visible
4. Verify prompt examples are visible

**Expected Results:**
- "Need a nudge? Try this prompt" text is displayed
- "Quick prompt examples" section is visible
- Prompt examples container is visible with truncated text
- Section is properly formatted

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-005: Verify Send Button Disabled When Input Empty
**Test ID:** LANDING-TC-005  
**Priority:** High  
**Test Type:** Validation  

**Description:**  
Verify that the send button is disabled when the input field is empty.

**Pre-conditions:**
- User is on Landing page
- Input field is empty (default state)

**Test Steps:**
1. Navigate to Landing page
2. Verify input field is empty
3. Check send button state

**Expected Results:**
- Send button container is visible
- Send button is disabled (not clickable)
- Visual indication that button is disabled

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-006: Verify Send Button Enabled After Typing Text
**Test ID:** LANDING-TC-006  
**Priority:** High  
**Test Type:** Functional  

**Description:**  
Verify that the send button is enabled after user types text in the input field.

**Pre-conditions:**
- User is on Landing page
- Input field is initially empty

**Test Steps:**
1. Navigate to Landing page
2. Click on input field
3. Type text "This is a test input"
4. Verify send button state

**Expected Results:**
- Input field accepts text input
- Send button container is visible
- Send button becomes enabled after text is entered
- Button is now clickable

**Test Data:**
- Input text: "This is a test input"

**Status:** ✅ Passed

---

### TC-007: Verify Prompt Example Click Navigation
**Test ID:** LANDING-TC-007  
**Priority:** High  
**Test Type:** Navigation  

**Description:**  
Verify that clicking on a prompt example navigates to the conversation page with the prompt pre-filled.

**Pre-conditions:**
- User is on Landing page
- Prompt examples are visible

**Test Steps:**
1. Navigate to Landing page
2. Locate prompt example in "Need a nudge?" section
3. Click on the first prompt example
4. Verify navigation

**Expected Results:**
- Prompt example is clickable
- User is redirected to conversation page
- URL matches pattern `/conversation/*`
- Prompt text is pre-filled in conversation

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-008: Verify Back Navigation Without Creating Account
**Test ID:** LANDING-TC-008  
**Priority:** High  
**Test Type:** Navigation  

**Description:**  
Verify that clicking back from conversation page returns to landing page without requiring account creation, with appropriate warning message.

**Pre-conditions:**
- User is on Landing page
- User has clicked on a prompt example

**Test Steps:**
1. Navigate to Landing page
2. Click on a prompt example to go to conversation page
3. Click back button (data-testid="btn-back")
4. Click confirmation "Back" button in dialog
5. Verify warning message

**Expected Results:**
- Back button is visible on conversation page
- Confirmation dialog appears asking about unsaved work
- Warning message "Your all work was not saved," is displayed
- "What is project" button (data-testid="what-is-project-button") is visible
- User returns to landing page without authentication

**Test Data:** N/A

**Status:** ✅ Passed

---

### TC-009: Verify Login Button Opens Login Dialog
**Test ID:** LANDING-TC-009  
**Priority:** Critical  
**Test Type:** Authentication  

**Description:**  
Verify that clicking the Login button opens the login dialog with all required elements.

**Pre-conditions:**
- User is on Landing page
- User is not logged in

**Test Steps:**
1. Navigate to Landing page
2. Click Login button in header (#landingHeader)
3. Verify dialog appears
4. Verify all login elements

**Expected Results:**
- Login dialog (role="dialog") appears
- "Login with Google" button is visible
- Email textbox is visible
- Password textbox is visible
- Login button is visible
- "Sign up" button is visible
- Dialog is properly formatted

**Test Data:**
- Header selector: `#landingHeader`

**Status:** ✅ Passed

---

### TC-010: Verify Register Button Opens Registration Dialog
**Test ID:** LANDING-TC-010  
**Priority:** Critical  
**Test Type:** Authentication  

**Description:**  
Verify that clicking the "Register for free" button opens the registration dialog with all required elements.

**Pre-conditions:**
- User is on Landing page
- User is not logged in

**Test Steps:**
1. Navigate to Landing page
2. Click "Register for free" button in header (#landingHeader)
3. Verify dialog appears
4. Verify all registration elements

**Expected Results:**
- Registration dialog (role="dialog") appears
- "Create account with Google" button is visible
- Email textbox is visible
- Password textbox is visible
- "Create account" button is visible
- "Log in" button is visible
- Dialog is properly formatted

**Test Data:**
- Header selector: `#landingHeader`

**Status:** ✅ Passed

---

### TC-011: Verify "What is Ideoz Project?" Button Opens Video Dialog
**Test ID:** LANDING-TC-011  
**Priority:** Medium  
**Test Type:** Educational Content  

**Description:**  
Verify that clicking "What is Ideoz project?" button opens a dialog with embedded YouTube video and relevant controls.

**Pre-conditions:**
- User is on Landing page

**Test Steps:**
1. Navigate to Landing page
2. Click "What is Ideoz project?" button
3. Verify video dialog opens
4. Verify video iframe and controls
5. Close dialog

**Expected Results:**
- Dialog opens with YouTube iframe
- Iframe title is "What is Ideoz Project?"
- Iframe src contains "youtube.com"
- Cancel button is visible
- Play button is visible in video player
- Share button is visible in video player
- "Create Free Account" button is visible
- Close button (empty text button) is functional

**Test Data:**
- Video source: YouTube embedded player

**Status:** ✅ Passed

---

### TC-012: Verify Video Playback in "What is Ideoz Project?" Section
**Test ID:** LANDING-TC-012  
**Priority:** Medium  
**Test Type:** Functional/Media  

**Description:**  
Verify that the YouTube video in the "What is Ideoz project?" section plays correctly.

**Pre-conditions:**
- User is on Landing page
- "What is Ideoz project?" dialog is open

**Test Steps:**
1. Navigate to Landing page
2. Click "What is Ideoz project?" button
3. Click Play button in video iframe
4. Verify video playback starts

**Expected Results:**
- Play button is clickable
- Video starts playing
- Pause button appears (replacing Play button)
- Video controls are responsive
- Audio and video playback is smooth

**Test Data:**
- Iframe title: "What is Ideoz Project?"
- Video controls: Play/Pause buttons

**Status:** ✅ Passed

---

### TC-013: Verify "Create Free Account" Button in Video Dialog
**Test ID:** LANDING-TC-013  
**Priority:** High  
**Test Type:** Authentication/Navigation  

**Description:**  
Verify that clicking "Create Free Account" button in the "What is Ideoz project?" section opens the registration dialog.

**Pre-conditions:**
- User is on Landing page
- "What is Ideoz project?" dialog is open

**Test Steps:**
1. Navigate to Landing page
2. Click "What is Ideoz project?" button
3. Click "Create Free Account" button in dialog
4. Verify registration dialog appears

**Expected Results:**
- "Create Free Account" button is visible and clickable
- Registration dialog (role="dialog") appears
- "Create account with Google" button is visible
- Email textbox is visible
- Password textbox is visible
- "Create account" button is visible
- "Log in" button is visible
- Video dialog closes
- Registration dialog is properly formatted

**Test Data:** N/A

**Status:** ✅ Passed

---

## Test Execution Summary

| Status | Count | Percentage |
|--------|-------|------------|
| ✅ Passed | 13 | 100% |
| ❌ Failed | 0 | 0% |
| ⏭️ Skipped | 0 | 0% |
| **Total** | **13** | **100%** |

---

## Test Results by Category

### UI Elements Tests (4 Tests)
| Test Case | Category | Status |
|-----------|----------|--------|
| TC-001 | Header Elements | ✅ Passed |
| TC-002 | Content Display | ✅ Passed |
| TC-003 | Input Area | ✅ Passed |
| TC-004 | Hint Section | ✅ Passed |

### Functional Tests (3 Tests)
| Test Case | Category | Status |
|-----------|----------|--------|
| TC-005 | Input Validation | ✅ Passed |
| TC-006 | Input Interaction | ✅ Passed |
| TC-012 | Media Playback | ✅ Passed |

### Navigation Tests (3 Tests)
| Test Case | Category | Status |
|-----------|----------|--------|
| TC-007 | Prompt Navigation | ✅ Passed |
| TC-008 | Back Navigation | ✅ Passed |
| TC-011 | Dialog Opening | ✅ Passed |

### Authentication Tests (3 Tests)
| Test Case | Category | Status |
|-----------|----------|--------|
| TC-009 | Login Dialog | ✅ Passed |
| TC-010 | Registration Dialog | ✅ Passed |
| TC-013 | Registration from Video | ✅ Passed |

---

## User Flows Covered

### Flow 1: Anonymous User Exploration
1. Land on home page → View header elements → Read main heading
2. See input area → View prompt examples → Click prompt
3. Navigate to conversation → Use back button → See warning message

### Flow 2: Quick Registration Path
1. Land on home page → Click "Register for free"
2. View registration dialog → Fill details → Create account

### Flow 3: Educational Content Path
1. Land on home page → Click "What is Ideoz project?"
2. Watch video → Click "Create Free Account"
3. Complete registration

### Flow 4: Login Path
1. Land on home page → Click "Login"
2. Enter credentials → Access dashboard

---

## Key Features Tested

### Header Section
- ✅ Logo display
- ✅ Points remaining button (disabled for anonymous)
- ✅ Login button
- ✅ Register for free button

### Main Content Area
- ✅ Main heading and subheading
- ✅ User challenge input field
- ✅ Mode selector (🧠 Uncover)
- ✅ Send button state management

### Prompt Examples Section
- ✅ "Need a nudge?" hint display
- ✅ Quick prompt examples visibility
- ✅ Prompt example clickability
- ✅ Navigation to conversation

### Authentication Dialogs
- ✅ Login dialog elements
- ✅ Registration dialog elements
- ✅ Google authentication options

### Educational Content
- ✅ "What is Ideoz project?" button
- ✅ YouTube video iframe
- ✅ Video playback controls
- ✅ Registration CTA in video dialog

---

## Technical Implementation

### Base URL
```typescript

```

### Key Selectors Used

**Header Elements:**
- Logo: `page.getByRole('img')`
- Points button: `page.getByRole('button', { name: /points remaining/ })`
- Login button: `#landingHeader button[name="Login"]`
- Register button: `#landingHeader button[name="Register for free"]`

**Content Elements:**
- Main heading: `page.getByRole('heading', { name: 'What problem are you working on now?' })`
- Input field: `page.getByRole('textbox', { name: /Describe your user experience/ })`
- Mode indicator: `page.getByText('🧠 Uncover')`
- Action buttons: `.flex.gap-1`

**Prompt Examples:**
- Prompt container: `.truncate.flex.items-center`
- Back button: `page.getByTestId('btn-back')`

**Dialog Elements:**
- Dialog container: `page.getByRole('dialog')`
- Email field: `page.getByRole('textbox', { name: 'Email' })`
- Password field: `page.getByRole('textbox', { name: 'Password' })`

**Video Dialog:**
- Iframe: `iframe[title="What is Ideoz Project?"]`
- Video controls: `contentFrame().getByRole('button', { name: 'Play' })`

---

## Page Object Model (Suggested)

**File:** `tests/Page/Landing.ts` (To be created)

### Suggested Key Elements:
```typescript
// Header
logo: Locator
pointsButton: Locator
loginButton: Locator
registerButton: Locator

// Content
mainHeading: Locator
subheading: Locator
inputField: Locator
modeSelector: Locator
sendButton: Locator

// Prompts
nudgeHintText: Locator
promptExamples: Locator

// Dialogs
loginDialog: Locator
registrationDialog: Locator
videoDialog: Locator

// Video
videoIframe: Locator
playButton: Locator
createAccountButton: Locator
```

### Suggested Key Methods:
```typescript
gotoLandingPage(): Promise<void>
clickLogin(): Promise<void>
clickRegister(): Promise<void>
fillUserChallenge(text: string): Promise<void>
clickPromptExample(): Promise<void>
openWhatIsIdeozProject(): Promise<void>
playVideo(): Promise<void>
```

---

## Test Data Dependencies

### Environment Variables
- 

### No External Test Data Required
This test suite is designed for anonymous users and does not require:
- User credentials
- Test user accounts
- Pre-populated data

### Dynamic Content
- Prompt examples (fetched from application)
- YouTube video URL (embedded in page)

---

## Browser Compatibility

All tests are executed on:
- **Primary:** Chromium (Desktop Chrome)
- **Can be extended to:** Firefox, Safari/WebKit

---

## Notes

### Anonymous User Behavior
- No authentication required to access Landing page
- Limited functionality without account
- Prompt examples available for exploration
- Conversation history not saved without account

### State Management
- Each test starts from a clean Landing page state
- No cookies or session data required
- Tests are fully isolated

### Dialog Interactions
- Login and Registration dialogs are modal overlays
- Video dialog contains embedded YouTube iframe
- Proper iframe navigation using `contentFrame()`

### Back Navigation Warning
- Warning message appears when leaving conversation without saving
- Ensures users are aware of unsaved work
- Part of UX to encourage account creation

---

## Known Behaviors

### Points Button
- Displayed but disabled for anonymous users
- Shows "points remaining" text
- Becomes functional after login

### Send Button
- Disabled by default (empty input)
- Enables when text is entered
- Visual state changes with interaction

### Prompt Examples
- Pre-written UX challenge prompts
- Help users get started quickly
- Navigate to conversation with pre-filled content

---

## Run Commands

```bash
# Run all landing page tests
npx playwright test tests/E2E/Anonymous/Landing.spec.ts

# Run with specific reporter
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --reporter=line

# Run with Allure reporter
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --reporter=allure-playwright

# Run in headed mode (visible browser)
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --headed

# Run specific test case
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --grep "header elements"

# Run only authentication tests
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --grep "Login|Register"

# Run only navigation tests
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --grep "navigate"

# Run only UI tests
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --grep "display"

# Generate Allure report after run
allure generate allure-results --clean -o allure-report; allure open allure-report
```

---

## Best Practices Applied

1. **User-Centric Testing**: Tests reflect actual anonymous user journey
2. **Isolated Tests**: Each test is independent with beforeEach hook
3. **Semantic Selectors**: Uses role-based selectors (getByRole) for stability
4. **Clear Test Names**: Descriptive test names explain purpose
5. **Comprehensive Coverage**: All landing page features tested
6. **Dialog Handling**: Proper modal and iframe interaction
7. **Navigation Verification**: URL pattern matching for route validation
8. **State Verification**: Checks both enabled and disabled states
9. **Content Validation**: Verifies text and element visibility
10. **User Flow Testing**: Tests complete user journeys

---

## Future Enhancements

### Potential Additional Tests
1. **Accessibility Testing**: ARIA labels, keyboard navigation
2. **Responsive Design**: Mobile and tablet viewports
3. **Performance Testing**: Page load times, input responsiveness
4. **Error Handling**: Network failures, video loading errors
5. **Browser Compatibility**: Cross-browser testing
6. **Analytics**: Track user interactions and conversions
7. **A/B Testing**: Different CTA placements and wording
8. **SEO Validation**: Meta tags, structured data

### Page Object Model Implementation
Creating a dedicated Page Object file would improve:
- Code reusability across test files
- Maintenance when UI changes
- Readability of test specifications
- Separation of concerns (locators vs logic)

---

## Traceability Matrix

| Requirement | Test Case(s) | Status |
|-------------|-------------|--------|
| REQ-LAND-001: Display header elements | TC-001 | ✅ |
| REQ-LAND-002: Show main content | TC-002, TC-003 | ✅ |
| REQ-LAND-003: Provide prompt examples | TC-004, TC-007 | ✅ |
| REQ-LAND-004: Validate input state | TC-005, TC-006 | ✅ |
| REQ-LAND-005: Enable authentication | TC-009, TC-010 | ✅ |
| REQ-LAND-006: Support navigation | TC-007, TC-008 | ✅ |
| REQ-LAND-007: Educational content | TC-011, TC-012, TC-013 | ✅ |

---

## Maintenance Guidelines

### When to Update Tests
- UI/UX changes to Landing page
- New authentication methods added
- Prompt example mechanism changes
- Video platform migration
- New CTAs or marketing content

### Selector Stability
- Prioritize `data-testid` attributes for key elements
- Use role-based selectors for semantic elements
- Avoid CSS class selectors (can change with styling)
- Document custom selectors with comments

### Test Data Management
- Landing page tests don't require test data files
- Environment-specific URLs in config
- Video URLs should be configurable

---

## Test Suite Metrics

**Coverage:** 100% of anonymous Landing page features  
**Execution Time:** ~2-3 minutes (13 tests)  
**Stability:** High (semantic selectors, isolated tests)  
**Maintainability:** High (clear structure, descriptive names)

---

**Document Version:** 1.0  
**Created By:** QA Automation Team  
**Review Date:** October 26, 2025  

