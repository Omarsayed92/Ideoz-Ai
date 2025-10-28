# UPLOAD_FILE_TEST_SUITE.md

## Overview
This document describes the test cases for the file upload feature, based on the tests implemented in `uploadFiles.spec.ts`.

---

## Test Cases (Step-by-Step)

### Positive Test Cases

**TC-001: Verify "Upload project files" option is present and clickable**
1. Navigate to the project page.
2. Verify the "Upload project files" button is visible and enabled.
3. Click the button.
4. Expect the button to be clickable and visible.

**TC-002: Verify clicking upload opens dialog**
1. Open the project page.
2. Click the "Upload project files" button.
3. Expect the upload dialog to open.

**TC-003: Verify upload dialog UI elements**
1. Open the project page.
2. Click the "Upload project files" button.
3. Expect the dialog to show title, drag-and-drop area, max file size info, and close icon.

**TC-004: Upload a single valid file**
1. Open the upload dialog.
2. Upload `test-file.txt`.
3. Expect the file to appear in the list and a success message to display.

**TC-005: Upload multiple valid files**
1. Open the upload dialog.
2. Upload `test-file.txt`, `readme.md`, and `file1.txt`.
3. Expect all files to appear in the list and a success message to display.

**TC-006: Close icon closes dialog**
1. Open the upload dialog.
2. Click the close icon.
3. Expect the dialog to close.

**TC-007: Upload button hides after upload**
1. Upload a file.
2. Close the dialog.
3. Expect the upload button to be hidden.

**TC-008: Delete uploaded file**
1. Upload a file.
2. Delete the file from the list.
3. Expect the file to be removed and a success message to display.

**TC-009: Drag and drop single file**
1. Open the upload dialog.
2. Drag and drop `test-file.txt` into the drop zone.
3. Expect the file to be uploaded and appear in the list.

**TC-010: Drag and drop multiple files**
1. Open the upload dialog.
2. Drag and drop `file1.txt`, `file2.md`, and `readme.md`.
3. Expect all files to be uploaded and appear in the list.

**TC-011: Files display with names and types**
1. Upload `test-file.txt`.
2. Expect the file name and type to be shown in the list.

**TC-012: Upload new files button appears after upload**
1. Upload a file.
2. Expect the "Upload new files" button to become visible.

---

### Negative Test Cases

**TC-N001: Empty file upload is rejected**
1. Upload `empty-file.txt`.
2. Expect an error message for empty file upload.

**TC-N002: File exceeding size limit is rejected**
1. Upload `large-file-11mb.pdf`.
2. Expect an error message for exceeding the size limit.

**TC-N003: File at exact size limit is handled**
1. Upload `exact-10mb.txt`.
2. Expect the file to be accepted and uploaded.

**TC-N004: Unsupported .exe file is rejected**
1. Upload `malicious.exe`.
2. Expect an error message for unsupported file type.

**TC-N005: Unsupported .js file is rejected**
1. Upload `script.js`.
2. Expect an error message for unsupported file type.

**TC-N006: Unsupported .mp4 file is rejected**
1. Upload `video.mp4`.
2. Expect an error message for unsupported file type.

**TC-N007: Unsupported .mp3 file is rejected**
1. Upload `audio.mp3`.
2. Expect an error message for unsupported file type.

---

### Individual File Type Uploads (Grouped)

**TXT:**
1. Upload `test-file.txt`.
2. Expect the file to be uploaded and appear in the list.

**MD:**
1. Upload `readme.md`.
2. Expect the file to be uploaded and appear in the list.

**JPG:**
1. Upload `photo.jpg`.
2. Expect the file to be uploaded and appear in the list.

**JPEG:**
1. Upload `sample.jpeg`.
2. Expect the file to be uploaded and appear in the list.

**PNG:**
1. Upload `screenshot.png`.
2. Expect the file to be uploaded and appear in the list.

**GIF:**
1. Upload `sample.gif`.
2. Expect the file to be uploaded and appear in the list.

**WEBP:**
1. Upload `sample.webp`.
2. Expect the file to be uploaded and appear in the list.

**SVG:**
1. Upload `logo.svg`.
2. Expect the file to be uploaded and appear in the list.

**XLSX:**
1. Upload `data.xlsx`.
2. Expect the file to be uploaded and appear in the list.

**XLS:**
1. Upload `budget.xls`.
2. Expect the file to be uploaded and appear in the list.

**PPTX:**
1. Upload `presentation.pptx`.
2. Expect the file to be uploaded and appear in the list.

**DOCX:**
1. Upload `report.docx`.
2. Expect the file to be uploaded and appear in the list.

**DOC:**
1. Upload `letter.doc`.
2. Expect the file to be uploaded and appear in the list.

**PDF:**
1. Upload `valid-document.pdf`.
2. Expect the file to be uploaded and appear in the list.

---

## Notes
- All tests use the Playwright Page Object Model and auto-waiting assertions.
- Max file size for uploads is 10 MB.
- Negative cases ensure robust error handling for unsupported types and size violations.
- Test data is generated and cleaned up automatically unless a test fails.

---

## How to Run

```bash
npx playwright test tests/E2E/Project/uploadFiles.spec.ts
```

---

## File Location
- Test implementation: `tests/E2E/Project/uploadFiles.spec.ts`
- Test data: `tests/test-files/`
- Page objects: `tests/Fixtures/`
