# Quick Start Guide - Login Tests

## Files Created

### 1. Page Object Model
- **File**: `tests/Page/Login.ts`
- **Purpose**: Contains all login page elements and methods
- **Features**:
  - Role-based locators
  - Reusable methods for common actions
  - Verification methods

### 2. Test Suite (Main)
- **File**: `tests/E2E/Authonication/Login.spec.ts`
- **Tests**: 18 comprehensive test cases
- **Coverage**: All login functionality scenarios

### 3. Test Suite (With Data)
- **File**: `tests/E2E/Authonication/LoginWithData.spec.ts`
- **Tests**: Same 18 test cases using centralized test data
- **Data Source**: `TestData/testUsers.json`

### 4. Test Data
- **File**: `TestData/testUsers.json`
- **Updated with**: Login-specific test credentials and validation data

### 5. Documentation
- **File**: `tests/E2E/Authonication/LOGIN_TEST_SUITE.md`
- **Contains**: Detailed test case descriptions and execution instructions

## Quick Commands

### Run Login Tests
```powershell
# Run all login tests
npx playwright test tests/E2E/Authonication/Login.spec.ts

# Run in headed mode (see browser)
npx playwright test tests/E2E/Authonication/Login.spec.ts --headed

# Run in UI mode (interactive)
npx playwright test tests/E2E/Authonication/Login.spec.ts --ui

# Run specific test
npx playwright test tests/E2E/Authonication/Login.spec.ts -g "should login successfully"

# Run with Allure report
npx playwright test tests/E2E/Authonication/Login.spec.ts --reporter=allure-playwright
npm run generate:report
npm run open:report
```

### Debug Tests
```powershell
# Debug mode (step through tests)
npx playwright test tests/E2E/Authonication/Login.spec.ts --debug

# Debug specific test
npx playwright test tests/E2E/Authonication/Login.spec.ts -g "Verify redirection" --debug
```

### View Reports
```powershell
# View HTML report
npx playwright show-report

# Generate and open Allure report
npm run test:report
```

## Test Coverage

✅ **18 Test Cases Covering:**
1. Landing page load
2. Navigation to login page
3. Google sign-in integration
4. Email validation (valid/invalid)
5. Password validation (valid/invalid)
6. Forget password functionality
7. Create account navigation
8. Successful login
9. Empty field validations
10. Incorrect credentials
11. Non-existent account
12. All UI elements present
13. Field blur validation
14. Both fields empty
15. Special characters in email

## Playwright Best Practices Applied

✅ **Role-based Locators**: Using semantic selectors  
✅ **Auto-retrying Assertions**: No manual waits  
✅ **Page Object Model**: Clean, maintainable code  
✅ **Test Data Management**: Centralized in JSON  
✅ **No Hardcoded Timeouts**: Relying on Playwright auto-wait  
✅ **Test Isolation**: Independent test execution  
✅ **Descriptive Names**: Clear test descriptions  

## Next Steps

1. **Update Test Credentials**: Edit `TestData/testUsers.json` with actual test account credentials
2. **Run Tests**: Execute `npx playwright test tests/E2E/Authonication/Login.spec.ts`
3. **Review Results**: Check HTML or Allure reports
4. **Adjust Assertions**: Update error messages based on actual application behavior
5. **CI/CD Integration**: Add to your pipeline configuration

## Notes

- Tests use `https://app-testing.ideoz.ai/` as base URL
- Update credentials in test data file before running
- Some tests (TC 010, 013, 014) may need actual credentials to pass
- Google sign-in test requires popup handling
- All locators follow accessibility best practices

## Support

For issues or questions:
1. Check the detailed documentation in `LOGIN_TEST_SUITE.md`
2. Review Playwright documentation: https://playwright.dev/
3. Check test execution traces in `test-results/` folder
