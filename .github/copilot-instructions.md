# Copilot Instructions for Ideoz AI Playwright E2E Test Suite

## Project Overview
This codebase contains comprehensive end-to-end (E2E) automated tests for the Ideoz AI web application using the Playwright Test Framework. The suite covers authentication, profile management, anonymous user flows, and other critical user journeys. All tests are run against the test environment at https://app-test.ideoz.ai/.

## Architecture & Key Components
- **tests/E2E/**: Main directory for E2E test specs, organized by feature (Anonymous, Authentication, etc.).
- **tests/Page/**: Page Object Model (POM) files (e.g., `Createaccount.ts`, `Login.ts`, `Profile.ts`) encapsulate locators and actions for maintainability.
- **TestData/testUsers.json**: Contains reusable test user credentials and data.
- **tests/Test Cases/**: Markdown documentation for each test suite, describing scenarios and expected outcomes.
- **playwright.config.ts**: Central Playwright configuration (baseURL, reporter, global setup, etc.).

## Developer Workflow
- **Install dependencies:**
  ```powershell
  npm install
  npx playwright install
  ```
- **Run all tests:**
  ```powershell
  npx playwright test
  ```
- **Run a specific test file:**
  ```powershell
  npx playwright test tests/E2E/Anonymous/Anonymous-Register.spec.ts
  ```
- **Generate and view Allure report:**
  ```powershell
  npx playwright test --reporter=allure
  npx allure generate ./playwright-report --clean && npx allure open ./playwright-report
  ```

## Patterns & Conventions
- **Page Object Model:** All UI interactions use page objects for maintainability. Example: `new CreateAccountPage(page)`.
- **Role-based locators:** Use Playwright's `getByRole` for robust, auto-waiting selectors.
- **No manual timeouts:** Rely on Playwright's built-in auto-waiting and retries.
- **Test data:** Use `TestData/testUsers.json` for user credentials; update or randomize emails to avoid registration conflicts.
- **Test documentation:** Each suite has a corresponding markdown file in `tests/Test Cases/` describing scenarios and expected results.

## Integration Points
- **External Service:** All tests target https://app-test.ideoz.ai/.
- **Reporting:** Allure is used for advanced reporting; see Playwright config for setup.

## Example: Using Page Object in a Test
```typescript
import { test, expect } from '@playwright/test';
import { CreateAccountPage } from '../../Page/Createaccount';

test('Create account flow', async ({ page }) => {
  const createAccount = new CreateAccountPage(page);
  await page.goto('https://app-test.ideoz.ai/');
  await createAccount.createFreeAccountButton.click();
  await expect(createAccount.registrationDialog).toBeVisible();
});
```

## References
- [README.md](../README.md): Full project overview, structure, and setup instructions
- [playwright.config.ts](../playwright.config.ts): Playwright configuration
- [tests/Page/](../tests/Page/): Page objects
- [tests/Test Cases/](../tests/Test%20Cases/): Test documentation

---
**For AI agents:**
- Always use page objects for UI actions
- Prefer role-based locators
- Reference markdown docs for scenario details
- Use provided test data and avoid hardcoding credentials
- Follow Playwright best practices for reliability
