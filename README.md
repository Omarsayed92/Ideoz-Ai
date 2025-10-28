<div align="center">

# Ideoz AI - End-to-End Testing 

## 🌟 Overview

The **Ideoz AI E2E Testing Suite** is an enterprise-grade test automation framework built with **Playwright** and **TypeScript**. It provides comprehensive coverage of all critical user journeys across the Ideoz AI web application, including authentication flows, project management, chat functionality, and anonymous user interactions.

### 🎯 Project Objectives

- **Quality Assurance**: Ensure 100% reliability of critical user flows
- **Maintainability**: Leverage Page Object Model for scalable test architecture
- **Visibility**: Generate comprehensive test reports with Allure
- **CI/CD Integration**: Support continuous testing in deployment pipelines
- **Developer Experience**: Provide clear documentation and debugging tools

### 🔗 Test Environment

**Base URL**: `http://localhost:3000/`

---

## 🚀 Key Features

<table>
<tr>
<td width="50%">

### 🎭 Modern Test Framework
- **Playwright** - Fast, reliable, cross-browser testing
- **TypeScript** - Type-safe, maintainable code
- **Auto-waiting** - No flaky tests from timing issues
- **Parallel Execution** - Run tests concurrently for speed

</td>
<td width="50%">

### 📊 Advanced Reporting
- **Allure Reports** - Interactive HTML dashboards
- **Screenshots** - Automatic capture on failures
- **Video Recording** - Visual verification of test runs
- **Trace Files** - Detailed execution analysis

</td>
</tr>
<tr>
<td width="50%">

### 🏗️ Clean Architecture
- **Page Object Model** - Reusable, maintainable components
- **Separation of Concerns** - Tests, POMs, and data isolated
- **Test Fixtures** - Consistent test setup and teardown
- **Modular Design** - Easy to extend and scale

</td>
<td width="50%">

### 🔄 CI/CD Ready
- **Automated Reporting** - Generate reports post-execution
- **Retry Mechanism** - Configurable retries on CI
- **Parallel Workers** - Optimized for CI environments
- **Environment Variables** - Flexible configuration

</td>
</tr>
</table>

---

## 📁 Project Architecture

```plaintext
Ideoz-AI-E2E/
│
├── 📂 tests/
│   ├── 📂 E2E/                          # Test Specifications
│   │   ├── 📂 Authentication/            # Authentication Tests
│   │   │   ├── Login.spec.ts            # Login flow tests (11 tests)
│   │   │   ├── CreateAccount.spec.ts    # Account creation tests (16 
│   │   │   └── Profile.spec.ts          # Profile & menu tests (27 
│   │   │
│   │   ├── 📂 Anonymous/                 # Anonymous User Tests
│   │   │   ├── Landing.spec.ts          # Landing page tests (13 tests)
│   │   │   └── Anonymous-Register.spec.ts # Registration tests (8 
│   │   │
│   │   ├── 📂 Project/                   # Project Management Tests
│   │   │   ├── createProject.spec.ts    # Project creation tests
│   │   │   ├── viewProject.spec.ts      # Project viewing tests
│   │   │   ├── update-Project-context.spec.ts # Update tests
│   │   │   ├── DeleteProject.spec.ts    # Deletion tests
│   │   │   └── uploadFiles.spec.ts      # File upload tests
│   │   │
│   │   └── 📂 Chat/                      # Chat Functionality Tests
│   │       └── attachment-File-In-Chat-Input.spec.ts # File attachment 
│   │
│   ├── 📂 Fixtures/                     # Page Object Models (POMs)
│   │   ├── Login.ts                     # Login page object
│   │   ├── Createaccount.ts             # Create account page object
│   │   ├── Profile.ts                   # Profile page object
│   │   ├── CreateProject.ts             # Create project page object
│   │   ├── ViewProject.ts               # View project page object
│   │   ├── UpdateProjectContext.ts      # Update project page object
│   │   ├── DeleteProject.ts             # Delete project page object
│   │   ├── UploadFile.ts                # Upload file page object
│   │   └── attachmentFile.ts            # File attachment page object
│   │
│   └── 📂 Test Cases/                   # Test Documentation (Markdown)
│       ├── LOGIN_TEST_SUITE.md
│       ├── CREATE_ACCOUNT_TEST_SUITE.md
│       ├── PROFILE_TEST_SUITE.md
│       ├── LANDING_TEST_SUITE.md
│       ├── ANONYMOUS_REGISTER_TEST_SUITE.md
│       ├── CREATE_PROJECT_TEST_SUITE.md
│       ├── VIEW_PROJECT_TEST_SUITE.md
│       ├── UPDATE_PROJECT_CONTEXT_TEST_SUITE.md
│       ├── DELETE_PROJECT_TEST_SUITE.md
│       ├── UPLOAD_FILE_TEST_SUITE.md
│       └── ATTACHMENT_FILE_IN_CHAT_INPUT_TEST_SUITE.md
│
├── 📂 playwright-report/                # Playwright HTML reports
├── 📂 test-results/                     # Test artifacts (traces, videos, screenshots)
│
├── 📄 playwright.config.ts              # Playwright configuration
├── 📄 package.json                      # Dependencies & NPM scripts
├── 📄 tsconfig.json                     # TypeScript configuration
└── 📄 README.md                         # This file
```



---

## 🧪 Test Coverage & Scenarios

### 📊 Test Statistics Overview

<div align="center">

| Module | Test Cases | Test Files | Status | Coverage |
|--------|:----------:|:----------:|:------:|:--------:|
| **Login** | 10 | 1 | ✅ Passed | 100% |
| **Create Account** | 16 | 1 | ✅ Passed | 100% |
| **Profile & More Menu Tests** | 27 | 1 | ✅ Passed | 100% |
| **Anonymous Register** | 08 | 1 | ✅ Passed  | 100% |
| **Landing Page** | 13 | 1 | ✅ Passed  | 100% |
| **Create Project** | 13 | 1 | ✅ Passed  | 100% |
| **Delete Project** | 09 | 1 | ✅ Passed  | 100% |
| **Update Project context** | 23 | 1 | ✅ Passed  | 100% |
| **Uplaod Files** | 33 | 1 | ✅ Passed  | 100% |
| **View Project** | 15 | 1 | ✅ Passed  | 100% |
| **Chat & File Upload** | 53 | 1 | ✅ Passed | 100% |
| **Total** | **220** | **11** | ✅ Passed | **100%** |

</div>

### 🎯 Test Modules Breakdown

<details>
<summary><b>🔐 Authentication Module (54 Tests)</b></summary>

#### 1. Login Tests (10 Tests)
**File**: `tests/E2E/Authentication/Login.spec.ts`
**POM**: `tests/Fixtures/Login.ts`
**Documentation**: [LOGIN_TEST_SUITE.md](tests/Test%20Cases/LOGIN_TEST_SUITE.md)

- ✅ Page redirection and element visibility
- ✅ Google sign-in functionality
- ✅ Valid/invalid credentials validation
- ✅ Email format validation
- ✅ Empty field validation (email, password, both)
- ✅ Incorrect credentials error handling
- ✅ Navigation to Create Account page

#### 2. Create Account Tests (16 Tests)
**File**: `tests/E2E/Authentication/CreateAccount.spec.ts`
**POM**: `tests/Fixtures/Createaccount.ts`
**Documentation**: [CREATE_ACCOUNT_TEST_SUITE.md](tests/Test%20Cases/CREATE_ACCOUNT_TEST_SUITE.md)

- ✅ Page redirection and all elements display
- ✅ Required field validation (Name, Email, Password)
- ✅ Email format validation
- ✅ Password strength requirements (5 rules)
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

#### 3. Profile & More Menu Tests (27 Tests)
**File**: `tests/E2E/Authentication/Profile.spec.ts`
**POM**: `tests/Fixtures/Profile.ts`
**Documentation**: [PROFILE_TEST_SUITE.md](tests/Test%20Cases/PROFILE_TEST_SUITE.md)

**More Menu Functionality (11 Tests)**:
- ✅ Slider elements display (Profile, Points, Help, Share)
- ✅ Help button functionality
- ✅ Share button functionality
- ✅ Social media links (TikTok, Instagram, YouTube, Facebook, X, LinkedIn)
- ✅ Profile navigation
- ✅ Ideoz Points display

**Profile Page Functionality (16 Tests)**:
- ✅ Profile page elements display (Name, Email, Buttons)
- ✅ Change Password dialog functionality
- ✅ Password validation (all 5 rules + masking)
- ✅ Cancel password change
- ✅ Logout functionality with confirmation
- ✅ Cancel logout action

</details>

<details>
<summary><b>🕵️ Anonymous User Module (21 Tests)</b></summary>

#### 1. Anonymous Register Tests (8 Tests)
**File**: `tests/E2E/Anonymous/Anonymous-Register.spec.ts`
**Documentation**: [ANONYMOUS_REGISTER_TEST_SUITE.md](tests/Test%20Cases/ANONYMOUS_REGISTER_TEST_SUITE.md)

- ✅ "Create free account" button opens registration dialog
- ✅ Registration dialog shows Google auth option
- ✅ Successful account creation and auto-login (main & info sections)
- ✅ Anonymous user can use plugin/chat without registration
- ✅ "Register for free" button in chat opens registration dialog
- ✅ Successful registration and auto-login from chat
- ✅ Banner appears when skipping registration in chat

#### 2. Landing Page Tests (13 Tests)
**File**: `tests/E2E/Anonymous/Landing.spec.ts`
**Documentation**: [LANDING_TEST_SUITE.md](tests/Test%20Cases/LANDING_TEST_SUITE.md)

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

</details>

<details>
<summary><b>📁 Project Management Module (15+ Tests)</b></summary>

#### 1. Create Project Tests (13 Tests)
**File**: `tests/E2E/Project/createProject.spec.ts`
**POM**: `tests/Fixtures/CreateProject.ts`
**Documentation**: [CREATE_PROJECT_TEST_SUITE.md](tests/Test%20Cases/CREATE_PROJECT_TEST_SUITE.md)

- ✅ Project creation with valid data
- ✅ Project name validation
- ✅ Project type selection
- ✅ Project context setup

#### 2. View Project Tests (15 Tests)
**File**: `tests/E2E/Project/viewProject.spec.ts`
**POM**: `tests/Fixtures/ViewProject.ts`
**Documentation**: [VIEW_PROJECT_TEST_SUITE.md](tests/Test%20Cases/VIEW_PROJECT_TEST_SUITE.md)

- ✅ Project details display
- ✅ Project navigation
- ✅ Project information verification

#### 3. Update Project Context Tests (23 Tests)
**File**: `tests/E2E/Project/update-Project-context.spec.ts`
**POM**: `tests/Fixtures/UpdateProjectContext.ts`
**Documentation**: [UPDATE_PROJECT_CONTEXT_TEST_SUITE.md](tests/Test%20Cases/UPDATE_PROJECT_CONTEXT_TEST_SUITE.md)

- ✅ Context update functionality
- ✅ Context validation
- ✅ Context persistence

#### 4. Delete Project Tests (09 Tests)
**File**: `tests/E2E/Project/DeleteProject.spec.ts`
**POM**: `tests/Fixtures/DeleteProject.ts`
**Documentation**: [DELETE_PROJECT_TEST_SUITE.md](tests/Test%20Cases/DELETE_PROJECT_TEST_SUITE.md)

- ✅ Project deletion confirmation
- ✅ Project removal verification
- ✅ Cancel deletion action

#### 5. Upload Files Tests (33 Tests)
**File**: `tests/E2E/Project/uploadFiles.spec.ts`
**POM**: `tests/Fixtures/UploadFile.ts`
**Documentation**: [UPLOAD_FILE_TEST_SUITE.md](tests/Test%20Cases/UPLOAD_FILE_TEST_SUITE.md)

- ✅ File upload functionality
- ✅ File type validation
- ✅ File size validation
- ✅ Multiple file uploads

</details>

<details>
<summary><b>💬 Chat & File Upload Module (5+ Tests)</b></summary> 

#### Attachment File in Chat Input Tests (53 Tests)
**File**: `tests/E2E/Chat/attachment-File-In-Chat-Input.spec.ts`
**POM**: `tests/Fixtures/attachmentFile.ts`
**Documentation**: [ATTACHMENT_FILE_IN_CHAT_INPUT_TEST_SUITE.md](tests/Test%20Cases/ATTACHMENT_FILE_IN_CHAT_INPUT_TEST_SUITE.md)

- ✅ File attachment in chat input
- ✅ Attachment preview display
- ✅ Attachment removal
- ✅ Sending messages with attachments
- ✅ File type validation

</details>


---

## 🛠️ Getting Started

### 📋 Prerequisites

Before setting up the project, ensure you have the following installed:

| Requirement | Version | Download Link |
|------------|---------|---------------|
| **Node.js** | 14.0.0+ | [nodejs.org](https://nodejs.org/) |
| **npm** | 6.0.0+ | Comes with Node.js |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |
| **Allure CLI** (Optional) | Latest | [Allure Documentation](https://docs.qameta.io/allure/#_installing_a_commandline) |

**Verify Installation**:
```bash
node --version   # Should show v14.0.0 or higher
npm --version    # Should show 6.0.0 or higher
git --version    # Should show installed version
```

---

## 📦 Installation

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/Omarsayed92/Ideoz-Ai.git

# Navigate to project directory
cd Ideoz-Ai
```

### Step 2: Install Dependencies

```bash
# Install all Node.js dependencies
npm install
```

This will install:
- `@playwright/test` (^1.56.1) - Playwright testing framework
- `allure-playwright` (^3.4.1) - Allure reporter integration
- `@types/node` (^24.9.1) - TypeScript type definitions
- `rimraf` (^6.0.1) - Cross-platform clean utility
- `mkdirp` (^3.0.1) - Directory creation utility

### Step 3: Install Playwright Browsers

```bash
# Install Chromium, Firefox, and WebKit browsers
npx playwright install

# Or install specific browser only
npx playwright install chromium
```

### Step 4: Verify Installation

```bash
# Run a quick test to verify setup
npx playwright test tests/E2E/Anonymous/Landing.spec.ts --headed
```

If successful, you should see a browser window open and tests executing.


---

## 🏃 Running Tests

### 🚀 Quick Start Commands

<table>
<tr>
<td width="50%">

#### Run All Tests
```bash
npm test
```
Runs all tests with Allure reporter

</td>
<td width="50%">

#### Complete Test Cycle
```bash
npm run test:report
```
Clean → Run → Generate → Open Report

</td>
</tr>
</table>

### 📁 Run Tests by Module

<details>
<summary><b>Authentication Tests</b></summary>

```bash
# Run all authentication tests
npx playwright test tests/E2E/Authentication/

# Run specific authentication test files
npx playwright test tests/E2E/Authentication/Login.spec.ts
npx playwright test tests/E2E/Authentication/CreateAccount.spec.ts
npx playwright test tests/E2E/Authentication/Profile.spec.ts

# Using NPM scripts
npm run test:login
npm run test:create-account
npm run test:profile
```

</details>

<details>
<summary><b>Anonymous User Tests</b></summary>

```bash
# Run all anonymous user tests
npx playwright test tests/E2E/Anonymous/

# Run specific anonymous test files
npx playwright test tests/E2E/Anonymous/Landing.spec.ts
npx playwright test tests/E2E/Anonymous/Anonymous-Register.spec.ts

# Using NPM scripts
npm run test:landing
npm run test:anonymous
```

</details>

<details>
<summary><b>Project Management Tests</b></summary>

```bash
# Run all project management tests
npx playwright test tests/E2E/Project/

# Run specific project test files
npx playwright test tests/E2E/Project/createProject.spec.ts
npx playwright test tests/E2E/Project/viewProject.spec.ts
npx playwright test tests/E2E/Project/update-Project-context.spec.ts
npx playwright test tests/E2E/Project/DeleteProject.spec.ts
npx playwright test tests/E2E/Project/uploadFiles.spec.ts
```

</details>

<details>
<summary><b>Chat & File Upload Tests</b></summary>

```bash
# Run chat and file upload tests
npx playwright test tests/E2E/Chat/

# Run specific chat test files
npx playwright test tests/E2E/Chat/attachment-File-In-Chat-Input.spec.ts
```

</details>

### 🎛️ Advanced Test Execution Options

<details>
<summary><b>Execution Modes</b></summary>

```bash
# Interactive UI mode - Visual test runner
npx playwright test --ui

# Headed mode - See browser during execution
npx playwright test --headed

# Debug mode - Step through tests with DevTools
npx playwright test --debug

# Specific browser
npx playwright test --project=chromium
```

</details>

<details>
<summary><b>Test Filtering & Selection</b></summary>

```bash
# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests with specific tag
npx playwright test --grep "@smoke"

# Exclude tests with pattern
npx playwright test --grep-invert "slow"

# Run only failed tests from last run
npx playwright test --last-failed

# Run specific test by line number
npx playwright test tests/E2E/Authentication/Login.spec.ts:25
```

</details>

<details>
<summary><b>Reporters & Output</b></summary>

```bash
# Minimal output (line reporter)
npx playwright test --reporter=line

# Detailed output (list reporter)
npx playwright test --reporter=list

# HTML report
npx playwright test --reporter=html

# Allure report
npx playwright test --reporter=allure-playwright

# Multiple reporters
npx playwright test --reporter=line --reporter=allure-playwright
```

</details>



### 📄 Playwright HTML Report

Built-in Playwright HTML reporter for quick test review.

```bash
# Generate and open Playwright HTML report
npx playwright show-report
```

**Features**:
- ✅ Test results with pass/fail status
- 📸 Automatic screenshots on failure
- 🎥 Video recordings for failed tests
- 📝 Error messages and stack traces
- ⏱️ Test duration and timing
- 🔍 Test file and line references


### 🧹 Report Management



## ⚙️ Configuration & Best Practices

### 🔧 Playwright Configuration

The project uses `playwright.config.ts` for centralized test configuration.

<details>
<summary><b>View Configuration Details</b></summary>

| Setting | Value | Description |
|---------|-------|-------------|
| **Test Directory** | `./tests` | Root folder for all test files |
| **Base URL** | `http://localhost:3000` | Application URL |
| **Parallel Execution** | ✅ Enabled | Tests run concurrently |
| **Retries** | 0 (local) / 2 (CI) | Retry failed tests on CI |
| **Workers** | Auto (local) / 1 (CI) | Number of parallel workers |
| **Timeout** | 30000ms (30s) | Default test timeout |
| **Trace** | On | Always capture execution traces |
| **Screenshots** | On failure | Automatic screenshot capture |
| **Video** | On failure | Video recording when tests fail |
| **Reporter** | HTML + Allure | Dual reporter setup |
| **Browser** | Chromium (Desktop) | Primary test browser |

**Key Configuration Sections**:

```typescript
// Test execution settings
fullyParallel: true              // Run tests in parallel
forbidOnly: !!process.env.CI     // Prevent test.only on CI
retries: process.env.CI ? 2 : 0  // Retry logic

// Test artifacts
trace: 'on'                      // Always collect traces
screenshot: 'only-on-failure'    // Screenshots on failures
video: 'retain-on-failure'       // Videos for failed tests

// Reporting
reporter: [
  ['html'],                      // Playwright HTML report
  ['allure-playwright']          // Allure report
]
```

</details>



<details>
<summary><b>Code Organization</b></summary>

#### Project Structure Guidelines

1. **Test Files** (`tests/E2E/`)
   - Organize by feature/module
   - One spec file per feature
   - Use descriptive file names

2. **Page Objects** (`tests/Fixtures/`)
   - One POM per page/component
   - Encapsulate locators and actions
   - Return page objects for chaining

3. **Test Documentation** (`tests/Test Cases/`)
   - One markdown file per test suite
   - Include TC IDs, steps, and expected results
   - Keep documentation in sync with tests

4. **Test Data**
   - Externalize in JSON files
   - Use environment variables for sensitive data
   - Maintain separate data for different environments

</details>

<details>
<summary><b>Performance Optimization</b></summary>




</td>
</tr>
</table>

### 📊 Test Artifacts

Automatically generated on test failures:

| Artifact | Location | Description |
|----------|----------|-------------|
| **Screenshots** | `test-results/` | PNG images of failures |
| **Videos** | `test-results/` | Full test execution recordings |
| **Traces** | `test-results/` | Detailed execution timeline |
| **Logs** | Console output | Browser console logs |

**View Trace Files**:
```bash
# Open trace viewer
npx playwright show-trace test-results/trace.zip
```

### 🛠️ Debugging Techniques

<details>
<summary><b>Inspect Elements</b></summary>

```bash
# Use codegen to inspect elements
npx playwright codegen http://localhost:3000

# Pick locators in running test
npx playwright test --ui
# Click "Pick Locator" button
```

</details>


</details>

### 🎯 What to Contribute

We appreciate contributions in these areas:

- ✅ New test cases for uncovered scenarios
- ✅ Bug fixes for failing tests
- ✅ Performance improvements
- ✅ Documentation enhancements
- ✅ CI/CD pipeline improvements
- ✅ New Page Object Models
- ✅ Test data management improvements
- ✅ Code refactoring for better maintainability

---


## 📄 NPM Scripts Reference

### Available Scripts

<table>
<tr>
<th>Script</th>
<th>Command</th>
<th>Description</th>
</tr>
<tr>
<td><code>npm test</code></td>
<td><code>npx playwright test --reporter=allure-playwright</code></td>
<td>Run all tests with Allure reporter</td>
</tr>
<tr>
<td><code>npm run test:report</code></td>
<td><code>clean + test + generate + open</code></td>
<td>Complete test cycle: clean → run → generate → open report</td>
</tr>
<tr>
<td><code>npm run test:ui</code></td>
<td><code>npx playwright test --ui</code></td>
<td>Run tests in interactive UI mode</td>
</tr>
<tr>
<td><code>npm run test:headed</code></td>
<td><code>npx playwright test --headed</code></td>
<td>Run tests with visible browser</td>
</tr>
<tr>
<td><code>npm run test:debug</code></td>
<td><code>npx playwright test --debug</code></td>
<td>Run tests in debug mode with Playwright Inspector</td>
</tr>
<tr>
<td><code>npm run test:login</code></td>
<td><code>npx playwright test tests/E2E/Authentication/Login.spec.ts</code></td>
<td>Run login tests only</td>
</tr>
<tr>
<td><code>npm run test:create-account</code></td>
<td><code>npx playwright test tests/E2E/Authentication/CreateAccount.spec.ts</code></td>
<td>Run create account tests only</td>
</tr>
<tr>
<td><code>npm run test:profile</code></td>
<td><code>npx playwright test tests/E2E/Authentication/Profile.spec.ts</code></td>
<td>Run profile tests only</td>
</tr>
<tr>
<td><code>npm run test:landing</code></td>
<td><code>npx playwright test tests/E2E/Anonymous/Landing.spec.ts</code></td>
<td>Run landing page tests only</td>
</tr>
<tr>
<td><code>npm run test:anonymous</code></td>
<td><code>npx playwright test tests/E2E/Anonymous/</code></td>
<td>Run all anonymous user tests</td>
</tr>
<tr>
<td><code>npm run clean:report</code></td>
<td><code>rimraf allure-* playwright-report test-results</code></td>
<td>Clean all generated reports and artifacts</td>
</tr>
<tr>
<td><code>npm run generate:report</code></td>
<td><code>allure generate allure-results -o allure-report --clean</code></td>
<td>Generate Allure HTML report from results</td>
</tr>
<tr>
<td><code>npm run open:report</code></td>
<td><code>allure open allure-report</code></td>
<td>Open Allure report in browser</td>
</tr>
</table>

### Playwright CLI Commands

<table>
<tr>
<th>Command</th>
<th>Description</th>
</tr>
<tr>
<td><code>npx playwright test</code></td>
<td>Run all tests</td>
</tr>
<tr>
<td><code>npx playwright test --headed</code></td>
<td>Run tests in headed mode (visible browser)</td>
</tr>
<tr>
<td><code>npx playwright test --debug</code></td>
<td>Run tests in debug mode with Inspector</td>
</tr>
<tr>
<td><code>npx playwright test --ui</code></td>
<td>Run tests in interactive UI mode</td>
</tr>
<tr>
<td><code>npx playwright test --project=chromium</code></td>
<td>Run tests on specific browser</td>
</tr>
<tr>
<td><code>npx playwright test --grep "login"</code></td>
<td>Run tests matching pattern</td>
</tr>
<tr>
<td><code>npx playwright test --workers=1</code></td>
<td>Run tests sequentially</td>
</tr>
<tr>
<td><code>npx playwright show-report</code></td>
<td>Show Playwright HTML report</td>
</tr>
<tr>
<td><code>npx playwright codegen http://localhost:3000</code></td>
<td>Generate test code with codegen</td>
</tr>
<tr>
<td><code>npx playwright install</code></td>
<td>Install browser binaries</td>
</tr>
<tr>
<td><code>npx playwright install chromium</code></td>
<td>Install specific browser</td>
</tr>
<tr>
<td><code>npx playwright show-trace trace.zip</code></td>
<td>Open trace viewer</td>
</tr>
</table>

---


## 📚 Additional Resources

### 📖 Official Documentation

<table>
<tr>
<td width="50%">

#### Playwright Resources
- 🎭 [Playwright Documentation](https://playwright.dev/)
- 📘 [Playwright API Reference](https://playwright.dev/docs/api/class-playwright)
- 🏗️ [Page Object Model Pattern](https://playwright.dev/docs/pom)
- 🔍 [Playwright Selectors](https://playwright.dev/docs/selectors)
- ⚡ [Best Practices](https://playwright.dev/docs/best-practices)
- 🔧 [Configuration](https://playwright.dev/docs/test-configuration)
- 🐛 [Debugging Guide](https://playwright.dev/docs/debug)

</td>
<td width="50%">



</td>
</tr>
</table>

### 🗂️ Project Resources

| Resource | Location | Description |
|----------|----------|-------------|
| **Test Documentation** | [tests/Test Cases/](tests/Test%20Cases/) | Comprehensive test suite markdown docs |
| **Configuration** | [playwright.config.ts](playwright.config.ts) | Playwright configuration file |
| **Dependencies** | [package.json](package.json) | NPM dependencies and scripts |
| **GitHub Repository** | [Ideoz-Ai](https://github.com/Omarsayed92/Ideoz-Ai) | Source code repository |

---

## 🎯 Project Goals & Roadmap

### ✅ Current Goals (Achieved)

- ✅ **100% Critical Path Coverage** - All essential user journeys tested
- ✅ **High Test Stability** - >95% pass rate maintained
- ✅ **Comprehensive Documentation** - Detailed test case documentation
- ✅ **Fast Execution** - Parallel test execution enabled
- ✅ **Rich Reporting** - Allure reports with full traceability
- ✅ **Maintainable Architecture** - Page Object Model implementation

### 🚀 Future Enhancements

- 🔄 **CI/CD Pipeline Integration** - GitHub Actions/Jenkins setup
- 🌐 **Multi-Browser Testing** - Firefox, Safari, Edge support
- 🔐 **API Testing Integration** - Backend API test coverage
- 🎨 **Visual Regression Testing** - Screenshot comparison
- 🌍 **Multi-Environment Support** - Dev, Staging, Production configs
- 📊 **Performance Testing** - Lighthouse integration
- 🤖 **Test Generation** - AI-powered test case generation

---

---

## 📧 Support & Contact

<table>
<tr>
<td width="50%">

### 👥 Project Team

**Author**: Omar Sayed
**Email**: omarsayedqa@gmail.com
**GitHub**: [@Omarsayed92](https://github.com/Omarsayed92)
**Repository**: [Ideoz-Ai](https://github.com/Omarsayed92/Ideoz-Ai)

</td>
<td width="50%">

### 🐛 Report Issues

- **Bug Reports**: [Create Issue](https://github.com/Omarsayed92/Ideoz-Ai/issues)
- **Feature Requests**: [Create Issue](https://github.com/Omarsayed92/Ideoz-Ai/issues)
- **Questions**: [Discussions](https://github.com/Omarsayed92/Ideoz-Ai/discussions)

</td>
</tr>
</table>

---

## 📜 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

Copyright (c) 2025 Omar Sayed

---

## 🏆 Acknowledgments

This project is built with industry-leading tools and frameworks:

<div align="center">

### Powered By

| Technology | Description | Link |
|:----------:|-------------|------|
| 🎭 **Playwright** | Modern end-to-end testing framework | [playwright.dev](https://playwright.dev/) |
| 💙 **TypeScript** | Type-safe JavaScript superset | [typescriptlang.org](https://www.typescriptlang.org/) |
| ⚡ **Node.js** | JavaScript runtime environment | [nodejs.org](https://nodejs.org/) |

</div>

### Special Thanks

- **Playwright Team** - For creating an amazing testing framework
- **Open Source Community** - For continuous support and contributions

---

<div align="center">

## 📊 Project Statistics

![Tests](https://img.shields.io/badge/Tests-95+-success)
![Coverage](https://img.shields.io/badge/Coverage-100%25-brightgreen)
![Pass Rate](https://img.shields.io/badge/Pass%20Rate-100%25-success)
![Playwright](https://img.shields.io/badge/Playwright-1.56.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

**Project**: Ideoz AI E2E Test Suite
**Version**: 1.0.0
**Last Updated**: October 28, 2025
**Status**: ✅ Actively Maintained

Made with ❤️ by [Omar Sayed](https://github.com/Omarsayed92)

[⬆ Back to Top](#ideoz-ai---end-to-end-testing-suite)

</div>
