# Attachment File Input Test Suite

**Test File:** `attachment-File-In-Chat-Input.spec.ts`
**Module:** Chat File Attachment
**Target URL:** http://localhost:3000/

---

## Overview
This test suite provides comprehensive end-to-end coverage for file attachment functionality in the chat area of Ideoz AI. It covers positive and negative scenarios for uploading, managing, and sending files via the chat interface, including drag-and-drop, file type/size validation, and legacy behaviors.

---

## Test Cases and Steps

### Positive Tests - Upload Icon

**POS-01: Upload button should be visible and clickable**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Check that the upload button is visible and enabled.
- Expected Result: Upload button is visible and enabled.

**POS-02: Upload single .txt file via upload icon**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Click the upload icon and select a .txt file.
  4. Wait for the file to appear in the preview area.
- Expected Result: File preview is visible and the file name is correct.

**POS-03: Upload single .pdf file via upload icon**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Click the upload icon and select a .pdf file.
  4. Wait for the file to appear in the preview area.
- Expected Result: File preview is visible and the file name is correct.

**POS-04: Upload single .jpg image file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Click the upload icon and select a .jpg file.
  4. Wait for the file to appear in the preview area.
- Expected Result: File preview is visible and the file name is correct.

**POS-05: Upload single .png image file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Click the upload icon and select a .png file.
  4. Wait for the file to appear in the preview area.
- Expected Result: File preview is visible and the file name is correct.

**POS-06: Upload multiple files simultaneously**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Click the upload icon and select multiple files.
  4. Wait for all files to appear in the preview area.
- Expected Result: All files appear in the preview area and file names are correct.

**POS-07: Upload file with special characters in name**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a file with special characters in the name.
- Expected Result: File preview is visible.

**POS-08: Upload maximum allowed file size (99KB)**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a file of 99KB.
- Expected Result: File uploads successfully without error.

### Positive Tests - Office Document Files

**POS-09: Upload .ppt PowerPoint file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .ppt file.
- Expected Result: File preview is visible.

**POS-10: Upload .pptx PowerPoint file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .pptx file.
- Expected Result: File preview is visible.

**POS-11: Upload .xls Excel file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .xls file.
- Expected Result: File preview is visible and the file name is correct.

**POS-12: Upload .xlsx Excel file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .xlsx file.
- Expected Result: File preview is visible and the file name is correct.

### Positive Tests - Image Files

**POS-13: Upload .jpeg image file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .jpeg file.
- Expected Result: File preview is visible and the file name is correct.

**POS-14: Upload .jpg image file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .jpg file.
- Expected Result: File preview is visible and the file name is correct.

**POS-15: Upload .png image file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .png file.
- Expected Result: File preview is visible and the file name is correct.

**POS-16: Upload .gif animated image**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .gif file.
- Expected Result: File preview is visible and the file name is correct.

**POS-17: Upload .webp image file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .webp file.
- Expected Result: File preview is visible and the file name is correct.

**POS-18: Upload .svg vector image**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a .svg file.
- Expected Result: File preview is visible and the file name is correct.

### Positive Tests - Multiple File Types

**POS-19: Upload multiple office documents**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload multiple office document files.
- Expected Result: All files appear in the preview area and file names are correct.

**POS-20: Upload multiple image formats**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload multiple image files.
- Expected Result: All files appear in the preview area and file names are correct.

**POS-21: Upload mixed file types**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Upload a mix of file types.
- Expected Result: All files appear in the preview area and the file count matches the uploaded files.

### Positive Tests - Drag and Drop

**POS-22: Drag and drop single .txt file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Drag and drop a .txt file into the drop zone.
- Expected Result: The .txt file appears in the preview area.

**POS-23: Drag and drop multiple files**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Drag and drop multiple files into the drop zone.
- Expected Result: All files appear in the preview area.

**POS-24: Drop zone highlights on drag over**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Drag a file over the drop zone without dropping.
- Expected Result: Drop zone visually highlights to indicate it is active.

**POS-25: Drag and drop image file**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Drag and drop an image file into the drop zone.
- Expected Result: Image file appears in the preview area.

**POS-26: Drag and drop office document**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
  3. Drag and drop an office document file into the drop zone.
- Expected Result: Office document file appears in the preview area.

### Positive Tests - File Management

**POS-27: Remove uploaded file**
- Steps:
  1. Login to the application.
  2. Upload a file.
  3. Remove the uploaded file using the UI.
- Expected Result: File is removed from the preview area.

**POS-28: Upload file after removing previous file**
- Steps:
  1. Login to the application.
  2. Upload a file.
  3. Remove the uploaded file.
  4. Upload a new file.
- Expected Result: Only the new file appears in the preview area.

**POS-29: File preview displays correct file icon**
- Steps:
  1. Login to the application.
  2. Upload a file (e.g., PDF).
- Expected Result: The correct file type icon is displayed in the preview area.

### Positive Tests - Integration

**POS-30: Send message with attached file**
- Steps:
  1. Login to the application.
  2. Upload a file.
  3. Type a message in the chat input.
  4. Send the message with the attached file.
- Expected Result: Message with the attached file appears in the chat area.

---

### Negative Tests - File Size Validation

**NEG-01: Reject file exceeding size limit (200KB)**
- Steps:
  1. Login to the application.
  2. Attempt to upload a file larger than 200KB.
- Expected Result: Error message is displayed indicating file size exceeds the limit.

**NEG-02: Reject extremely large file (1MB)**
- Steps:
  1. Login to the application.
  2. Attempt to upload a file of 1MB.
- Expected Result: Error message is displayed for file size.

**NEG-03: Multiple files where one exceeds size limit**
- Steps:
  1. Login to the application.
  2. Upload a valid file.
  3. Upload an invalid file exceeding the size limit.
- Expected Result: Error or warning is displayed for the invalid file. Valid file remains in preview.

### Negative Tests - Unsupported File Type Validation

**NEG-04: Reject .exe executable file**
- Steps:
  1. Login to the application.
  2. Attempt to upload a .exe file.
- Expected Result: Warning or error message is displayed for unsupported file type.

**NEG-05: Reject .bat batch file**
- Steps:
  1. Login to the application.
  2. Attempt to upload a .bat file.
- Expected Result: Warning or error message is displayed for unsupported file type.

**NEG-06: Reject .sh shell script**
- Steps:
  1. Login to the application.
  2. Attempt to upload a .sh file.
- Expected Result: Warning or error message is displayed for unsupported file type.

**NEG-07: Reject .zip archive file**
- Steps:
  1. Login to the application.
  2. Attempt to upload a .zip file.
- Expected Result: Warning or error message is displayed for unsupported file type.

### Negative Tests - Empty & Invalid Files

**NEG-08: Reject empty file (0 bytes)**
- Steps:
  1. Login to the application.
  2. Upload an empty file.
- Expected Result: Error or warning message is displayed for empty file.

**NEG-09: Reject file with null characters**
- Steps:
  1. Login to the application.
  2. Upload a file with null characters.
- Expected Result: Error or warning message is displayed for invalid file.

### Negative Tests - Drag and Drop Edge Cases

**NEG-10: Drop invalid file type via drag-and-drop**
- Steps:
  1. Login to the application.
  2. Drag and drop a .exe file into the drop zone.
- Expected Result: Warning or error message is displayed for unsupported file type.

**NEG-11: Drop oversized file via drag-and-drop**
- Steps:
  1. Login to the application.
  2. Drag and drop a file larger than the allowed size into the drop zone.
- Expected Result: Error message is displayed for file size.

**NEG-12: Drag non-file content to drop zone**
- Steps:
  1. Login to the application.
  2. Drag non-file content (e.g., text) into the drop zone.
- Expected Result: No files are uploaded.

### Negative Tests - UI/UX Boundaries

**NEG-13: Attempt to upload more than 10 files**
- Steps:
  1. Login to the application.
  2. Attempt to upload 15 files at once.
- Expected Result: Warning or error message is displayed for file limit.

**NEG-14: Rapid consecutive file uploads**
- Steps:
  1. Login to the application.
  2. Upload multiple files rapidly without waiting.
- Expected Result: System handles uploads gracefully.

**NEG-15: Upload same file twice**
- Steps:
  1. Login to the application.
  2. Upload a file.
  3. Upload the same file again.
- Expected Result: System handles duplicate uploads gracefully.

### Negative Tests - Network & Errors

**NEG-16: Upload file while offline**
- Steps:
  1. Login to the application.
  2. Set network to offline.
  3. Attempt to upload a file.
- Expected Result: Network error is shown.

**NEG-17: Cancel file upload mid-process**
- Steps:
  1. Login to the application.
  2. Upload a large file.
  3. Cancel the upload mid-process.
- Expected Result: Upload is cancelled.

---

### Legacy Tests

**TC-01: File input should be visible**
- Steps:
  1. Login to the application.
  2. Navigate to the chat area.
- Expected Result: File input is present and visible in the chat area.

**TC-02: Should attach a .txt file**
- Steps:
  1. Login to the application.
  2. Attach a .txt file using the file input.
- Expected Result: .txt file appears in the preview area with correct name.

**TC-03: Should attach a .pdf file**
- Steps:
  1. Login to the application.
  2. Attach a .pdf file using the file input.
- Expected Result: .pdf file appears in the preview area with correct name.

**TC-04: Should attach multiple files**
- Steps:
  1. Login to the application.
  2. Attach multiple files using the file input.
- Expected Result: All attached files appear in the preview area with correct names.

---

## Page Object Model
- All UI actions use the `AttachmentFilePage` page object for maintainability.
- Login actions use the `LoginPage` page object.

## Test Data
- Dummy files are generated on the fly for each test.
- Credentials: `testuploadfileuser@gmail.com` / `Aa@123456`

## How to Run
- Run all tests:
  ```powershell
  npx playwright test tests/E2E/Chat/attachment-File-In-Chat-Input.spec.ts
  ```
- Run a specific test:
  ```powershell
  npx playwright test tests/E2E/Chat/attachment-File-In-Chat-Input.spec.ts --grep "POS-30"
  ```
- View HTML report:
  ```powershell
  npx playwright show-report
  ```

---

**Status:** All major chat file attachment scenarios are covered, including edge cases and legacy behaviors. For updates, add new test cases and document them in this file.
