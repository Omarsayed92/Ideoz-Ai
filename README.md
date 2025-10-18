# Ideoz Ai Testing Suite 🚀


## Overview

This project contains comprehensive end-to-end (E2E) automated tests for the **Ideoz AI** application using Playwright Test Framework. The test suite covers authentication flows, user profile management, anonymous user interactions, and other critical user journeys with full test documentation.

**Test Environment:** https://app-test.ideoz.ai/

## 🚀 Key Features

- ✅ **Playwright Test Framework**: Modern, reliable, and fast end-to-end testing with auto-waiting
- ✅ **Page Object Model (POM)**: Clean, maintainable test structure with reusable page objects
- ✅ **Allure Reporting**: Beautiful, interactive test reports with screenshots, videos, and traces
- ✅ **Cross-Browser Testing**: Configured for Chromium .
- ✅ **Comprehensive Documentation**: Detailed test suite markdown files for all modules
- ✅ **Trace & Screenshots**: Automatic capture of test artifacts on failure for debugging
- ✅ **Data-Driven Testing**: Externalized test data in JSON format for easy maintenance
- ✅ **TypeScript Support**: Type-safe test code with IntelliSense support
- ✅ **CI/CD Ready**: Configured for continuous integration with retry mechanisms

## 📁 Project Structure

```
Ideoz E2E/
├── tests/
│   ├── E2E/
│   │   ├── Authonication/                          # Authentication test suites
│   │   │   ├── CreateAccount.spec.ts               # 16 account creation tests
│   │   │   ├── Login.spec.ts                       # 11 login functionality tests
│   │   │   └── Profile.spec.ts                     # 27 profile & more menu tests
│   │   │                
│   │   └── Anonymous/                              # Anonymous user test suites
│   │       └── Landing.spec.ts                     # 13 landing page tests
│   │        
│   ├── Page/                                       # Page Object Model
│   │   ├── Createaccount.ts                        # Create account page object
│   │   ├── Login.ts                                # Login page object
│   │   └── Profile.ts                              # Profile page object 
│   └── Test Cases/                                 # Test Documentation
│       ├── LOGIN_TEST_SUITE.md                     # Login test documentation
│       ├── CREATE_ACCOUNT_TEST_SUITE.md            # Create account test docs
│       ├── PROFILE_TEST_SUITE.md                   # Profile test documentation
│       └── LANDING_TEST_SUITE.md                   # Landing page test docs
├── TestData/
│   └── testUsers.json                              # Test user credentials and data
├── allure-results/                                 # Allure test results (generated)
├── allure-report/                                  # Allure HTML reports (generated)
├── playwright-report/                              # Playwright HTML reports (generated)
├── test-results/                                   # Test execution artifacts (traces, videos)
├── playwright.config.ts                            # Playwright configuration
├── package.json                                    # Project dependencies and scripts
└── README.md                                       # This file
```

## 🧪 Test Coverage

### 📊 Test Statistics

| Module | Test Cases | Status | Pass Rate |
|--------|-----------|--------|-----------|
| **Login** | 11 | ✅ Active | 100% |
| **Create Account** | 16 | ✅ Active | 100% |
| **Profile & More Menu** | 27 | ✅ Active | 100%  |
| **Landing Page** | 13 | ✅ Active | 100% |
| **Total** | **67+** | ✅ Active | **100%** |

### 🔐 Authentication Tests (Login - 11 Tests)
- ✅ Page redirection and element visibility
- ✅ Google sign-in functionality
- ✅ Valid/invalid credentials validation
- ✅ Email format validation
- ✅ Empty field validation (email, password, both)
- ✅ Incorrect credentials error handling
- ✅ Navigation to Create Account page

### 📝 Account Creation Tests (16 Tests)
- ✅ Page redirection and all elements display
- ✅ Required field validation (Name, Email, Password)
- ✅ Email format validation
- ✅ Password strength requirements (5 rules):
  - Minimum 8 characters
  - At least one number
  - At least one uppercase letter
  - At least one lowercase letter
  - At least one special character
- ✅ Existing email detection
- ✅ Privacy Policy navigation
- ✅ Google authentication integration
- ✅ Password masking/unmasking
- ✅ Navigation back to Login

### 👤 Profile & More Menu Tests (27 Tests)

**More Menu Functionality (11 Tests):**
- ✅ Slider elements display (Profile, Points, Help, Share)
- ✅ Help button functionality
- ✅ Share button functionality
- ✅ Social media links (TikTok, Instagram, YouTube, Facebook, X, LinkedIn)
- ✅ Profile navigation
- ✅ Ideoz Points display

**Profile Page Functionality (16 Tests):**
- ✅ Profile page elements display (Name, Email, Buttons)
- ✅ Change Password dialog opening
- ✅ Password validation (all 5 rules + masking)
- ✅ Cancel password change
- ✅ Logout functionality with confirmation
- ✅ Cancel logout action

### 🕵️ Anonymous Register Tests (8 Tests)
- ✅ "Create free account" button opens registration dialog
- ✅ Registration dialog shows Google auth option
- ✅ Successful account creation and auto-login from main and info section
- ✅ Anonymous user can use plugin/chat without registration
- ✅ "Register for free" button in chat opens registration dialog
- ✅ Successful registration and auto-login from chat
- ✅ Banner appears when skipping registration in chat

### 🌐 Landing Page Tests (13 Tests)
- ✅ Header elements display (Logo, Points, Login, Register)
- ✅ Main heading and subheading
- ✅ User challenge input area
- ✅ Send button state management (disabled/enabled)
- ✅ "Need a nudge?" prompt examples
- ✅ Prompt click navigation to conversation
- ✅ Back navigation with unsaved work warning
- ✅ Login dialog opening
- ✅ Registration dialog opening
- ✅ "What is Ideoz project?" video dialog
- ✅ Video playback functionality
- ✅ Registration from video dialog

## 🛠️ Prerequisites

- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js
- **Allure Command Line**: For viewing reports (optional)

## 📦 Installation



1. Install dependencies:
```bash
npm install
```

2. Install Playwright browsers:
```bash
npx playwright install
```

## 🏃 Running Tests

### Quick Start Commands

#### Run All Tests
```bash
npm test
```

#### Run Tests with Allure Report (Recommended)
```bash
npm run test:report
```
This command will:
1. Clean previous reports
2. Run all tests with Allure reporter
3. Generate Allure HTML report
4. Automatically open the report in your browser

### Run Specific Test Suites

#### Run Login Tests
```bash
npx playwright test tests/E2E/Authonication/Login.spec.ts
```

#### Run Create Account Tests
```bash
npx playwright test tests/E2E/Authonication/CreateAccount.spec.ts
```

#### Run Profile Tests
```bash
npx playwright test tests/E2E/Authonication/Profile.spec.ts
```

#### Run Landing Page Tests
```bash
npx playwright test tests/E2E/Anonymous/Landing.spec.ts
```

#### Run All Authentication Tests
```bash
npx playwright test tests/E2E/Authentication/
```

#### Run All Anonymous User Tests
```bash
npx playwright test tests/E2E/Anonymous/
```

### Run Tests with Specific Options

#### Run Tests in UI Mode (Interactive)
```bash
npx playwright test --ui
```

#### Run Tests in Headed Mode (Visible Browser)
```bash
npx playwright test --headed
```

#### Run Tests in Debug Mode
```bash
npx playwright test --debug
```

#### Run Specific Test Case (by name)
```bash
npx playwright test --grep "valid email format"
```

#### Run Tests with Line Reporter (Minimal Output)
```bash
npx playwright test --reporter=line
```

#### Run Tests with Allure Reporter
```bash
npx playwright test --reporter=allure-playwright
```

#### Run Only Failed Tests
```bash
npx playwright test --last-failed
```

## 📊 Test Reports & Documentation

### 📁 Test Documentation (Markdown Files)

Comprehensive test suite documentation is available in `tests/Test Cases/`:

| Document | Description | Test Cases |
|----------|-------------|------------|
| [LOGIN_TEST_SUITE.md](tests/Test%20Cases/LOGIN_TEST_SUITE.md) | Login functionality test documentation | 11 tests |
| [CREATE_ACCOUNT_TEST_SUITE.md](tests/Test%20Cases/CREATE_ACCOUNT_TEST_SUITE.md) | Account creation test documentation | 16 tests |
| [PROFILE_TEST_SUITE.md](tests/Test%20Cases/PROFILE_TEST_SUITE.md) | Profile & More Menu test documentation | 27 tests |
| [LANDING_TEST_SUITE.md](tests/Test%20Cases/LANDING_TEST_SUITE.md) | Landing page test documentation | 13 tests |
| [ANONYMOUS_REGISTER_TEST_SUITE.md](tests/Test%20Cases/ANONYMOUS_REGISTER_TEST_SUITE.md) | Anonymous registration flow test documentation | 8 tests |


Each document includes:
- Detailed test case descriptions with TC IDs
- Pre-conditions and test steps
- Expected results
- Test data requirements
- Page Object Model documentation
- Run commands for specific scenarios

#### New Test Case File
- [ANONYMOUS_REGISTER_TEST_SUITE.md](tests/Test%20Cases/ANONYMOUS_REGISTER_TEST_SUITE.md): Step-by-step documentation for anonymous registration and related flows.

### 📈 Allure Report (Recommended)

**Generate and Open Allure Report:**
```bash
npm run generate:report    # Generate report from results
npm run open:report         # Open report in browser
```

Or combined:
```bash
npm run test:report         # Run tests + Generate + Open
```

**Allure Report Features:**
- 📊 Test execution overview with graphs
- 📸 Screenshots of failures
- 🎥 Video recordings
- 🔍 Detailed step-by-step traces
- 📋 Test history and trends
- 🏷️ Test categorization
- ⏱️ Execution time analysis

### 📄 Playwright HTML Report

**View Playwright Report:**
```bash
npx playwright show-report
```

**Features:**
- Test results with status (passed/failed/skipped)
- Test execution details
- Screenshots and videos
- Error messages and stack traces

### 🧹 Cleaning Reports

**Clean All Generated Reports:**
```bash
npm run clean:report
```

This removes:
- `allure-results/`
- `allure-report/`
- `playwright-report/`
- `test-results/`

## ⚙️ Configuration

### Playwright Configuration (`playwright.config.ts`)

| Configuration | Value | Description |
|---------------|-------|-------------|
| **Test Directory** | `./tests` | Root folder for all test files |
| **Timeout** | 30000ms (30s) | Maximum time for each test |
| **Parallel Execution** | Enabled | Tests run in parallel for speed |
| **Retries** | 0 local, 2 CI | Failed test retry attempts |
| **Trace** | On first retry | Detailed execution trace |
| **Screenshots** | On failure | Automatic screenshot capture |
| **Video** | Retain on failure | Video recording of failed tests |
| **Browser** | Chromium | Desktop Chrome configuration |
| **Base URL** | Configurable | Test environment URL |

**Key Features:**
- 📹 Automatic trace collection on failure
- 📸 Screenshot capture for debugging
- 🎥 Video recording for visual verification
- 🔄 Automatic retries on CI/CD
- ⚡ Parallel test execution for faster runs




### Best Practices

1. **Use Semantic Locators**: Prefer `getByRole()`, `getByTestId()`, `getByText()` over CSS selectors
2. **Page Object Model**: Keep locators and page interactions in Page Objects
3. **Test Data**: Externalize test data in JSON files
4. **Test Isolation**: Each test should be independent and can run alone
5. **Descriptive Names**: Use clear, descriptive test names with TC IDs
6. **Assertions**: Use Playwright's auto-waiting assertions (`expect`)
7. **BeforeEach Hooks**: Set up clean state before each test
8. **Error Messages**: Include meaningful error messages in assertions

## 🐛 Debugging

- **Traces**: Available in `test-results/` after test failures
- **Screenshots**: Automatically captured on failure
- **Videos**: Recorded for failed tests
- **Console Logs**: Available in test output

## 🤝 Contributing

We welcome contributions to improve the test suite! Please follow these guidelines:

### Contribution Workflow

1. **Create a Branch**: Create a new branch for your feature/fix
   ```bash
   git checkout -b feature/add-new-tests
   ```

2. **Write Tests**: Follow the existing structure and patterns
   - Use Page Object Model
   - Follow naming conventions (TC-XXX format)
   - Add test data to `testUsers.json` if needed
   - Include descriptive test names

3. **Update Documentation**: Create or update test suite markdown files
   - Add test cases to relevant `*_TEST_SUITE.md` file
   - Include test steps and expected results
   - Update test statistics in README

4. **Run Tests**: Ensure all tests pass
   ```bash
   npm test
   ```

5. **Generate Reports**: Verify test execution
   ```bash
   npm run test:report
   ```

6. **Commit Changes**: Use clear commit messages
   ```bash
   git commit -m "feat: add user settings tests"
   ```

7. **Push and Create PR**: Submit for review
   ```bash
   git push origin feature/add-new-tests
   ```

### Coding Standards

- ✅ Use TypeScript for type safety
- ✅ Follow Page Object Model pattern
- ✅ Use semantic locators (getByRole, getByTestId)
- ✅ Write descriptive test names with TC IDs
- ✅ Add comments for complex logic
- ✅ Keep tests independent and isolated
- ✅ Use async/await properly
- ✅ Handle promises correctly

### Test Documentation Standards

When adding new tests, create/update markdown documentation:
- Test case ID (TC-XXX)
- Priority (Critical/High/Medium/Low)
- Test type (Functional/UI/Validation/etc.)
- Description
- Pre-conditions
- Test steps
- Expected results
- Test data
- Status

## 📄 NPM Scripts Reference

| Script | Command | Description |
|--------|---------|-------------|
| `npm test` | `npx playwright test --reporter=allure-playwright` | Run all tests with Allure reporter |
| `npm run test:report` | `clean + test + generate + open` | Complete test cycle with report |
| `npm run clean:report` | Remove report directories | Clean all generated reports |
| `npm run generate:report` | `npx allure generate` | Generate Allure HTML report |
| `npm run open:report` | `npx allure open` | Open Allure report in browser |

### Additional Playwright Commands

| Command | Description |
|---------|-------------|
| `npx playwright test` | Run all tests |
| `npx playwright test --headed` | Run tests in headed mode |
| `npx playwright test --debug` | Run tests in debug mode |
| `npx playwright test --ui` | Run tests in UI mode |
| `npx playwright test --project=chromium` | Run tests on specific browser |
| `npx playwright test --grep "login"` | Run tests matching pattern |
| `npx playwright show-report` | Show Playwright HTML report |
| `npx playwright codegen` | Generate test code with codegen |
| `npx playwright install` | Install browser binaries |

## 📚 Additional Resources

### Official Documentation
- 🎭 [Playwright Documentation](https://playwright.dev/) - Complete Playwright guide
- 📊 [Allure Report Documentation](https://docs.qameta.io/allure/) - Allure reporting framework
- 🏗️ [Page Object Model Pattern](https://playwright.dev/docs/pom) - POM best practices
- 🔍 [Playwright Selectors](https://playwright.dev/docs/selectors) - Locator strategies
- ⚡ [Playwright Best Practices](https://playwright.dev/docs/best-practices) - Testing best practices

### Project Resources
- 📁 [Test Case Documentation](tests/Test%20Cases/) - Detailed test suite docs
- 🧪 [Test Data](TestData/testUsers.json) - Test user credentials
- ⚙️ [Configuration](playwright.config.ts) - Playwright config
- � [Package Info](package.json) - Dependencies and scripts

### Useful Links
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - TypeScript documentation
- [GitHub Repository](https://github.com/OmarSayedQA/Ideoz-Ai) - Project repository
- [Ideoz AI Application](https://app-test.ideoz.ai/) - Test environment

## 🎯 Project Goals

- ✅ Achieve 100% coverage of critical user flows
- ✅ Maintain high test stability (>95% pass rate)
- ✅ Provide comprehensive test documentation
- ✅ Enable fast feedback with parallel execution
- ✅ Support CI/CD integration
- ✅ Facilitate easy maintenance and scalability



## 📧 Support & Contact

For questions, issues, or contributions:
- **Repository**: [Ideoz-Ai](https://github.com/OmarSayedQA/Ideoz-Ai)
- **Owner**: OmarSayedQA
- **Issues**: Create a GitHub issue for bug reports or feature requests

## 📜 License

This project is part of the Ideoz AI testing suite.

---

## 🏆 Acknowledgments

Built with:
- 🎭 **Playwright** - Fast, reliable end-to-end testing
- 📊 **Allure** - Beautiful test reporting
- 💙 **TypeScript** - Type-safe JavaScript
- ⚡ **Node.js** - JavaScript runtime

---

**Project**: Ideoz Ai 
**Last Updated**: October 18, 2025  
**Version**: 1.0.0  
**Status**: ✅ Active Development
