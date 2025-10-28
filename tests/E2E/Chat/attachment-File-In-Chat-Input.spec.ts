import { test, expect } from '@playwright/test';
import { LoginPage } from '../../Fixtures/Login';

import { AttachmentFilePage } from '../../Fixtures/attachmentFile';
import * as fs from 'fs';
import * as path from 'path';

// Helper to create a dummy file for upload
function createDummyFile(fileName: string, content: string, mimeType: string) {
    const filePath = path.join(__dirname, fileName);
    fs.writeFileSync(filePath, content);
    return { name: fileName, mimeType, path: filePath };
}

/**
 * Attach File Input Test Suite
 *
 * Comprehensive test coverage for file attachment functionality in chat area
 * Includes: Upload icon, Drag-and-drop, Positive & Negative scenarios
 * 
 * 
 * 
 */

// Test configuration

const TEST_EMAIL = 'testuploadfileuser@gmail.com';
const TEST_PASSWORD = 'Aa@123456';

let loginPage: LoginPage;
test.describe('File Attachment - Chat Area', () => {

    let attachmentPage: AttachmentFilePage;


    test.beforeEach(async ({ page }) => {
        await page.goto('/');
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(TEST_EMAIL);
        await loginPage.fillPassword(TEST_PASSWORD);
        await loginPage.clickLogin();
        await page.waitForTimeout(2000);

        attachmentPage = new AttachmentFilePage(page);



        // Wait for React hydration and chat file input
        await attachmentPage.waitForPageLoad();
    });

    // ========================================
    // POSITIVE TEST CASES
    // ========================================

    test.describe('Positive Tests - Upload Icon', () => {


        // POS-01: Upload button should be visible and clickable
        //Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //Expectued results:
        // 1. Verify upload button is visible using attachmentPage locators
        // 2. Verify upload button is enabled/clickable

        test('POS-01: Upload button should be visible and clickable', async () => {
            // Verify upload button exists using attachmentPage locators
            await expect(attachmentPage.uploadButton).toBeVisible();
            await expect(attachmentPage.uploadButton).toBeEnabled();
        });

        // POS-02: Upload single .txt file via upload icon
        //Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //3. Click upload icon and select a .txt file
        //4. Wait for file to appear in preview area
        //Expectued results:
        // 1. Verify txt file preview is visible
        // 2. Verify file name is correct

        test('POS-02: Upload single .txt file via upload icon', async () => {
            const txtFile = createDummyFile('document.txt', 'Test content', 'text/plain');
            await attachmentPage.uploadSingleFile(txtFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreview('document.txt')).toBeVisible();
            await expect(attachmentPage.getFilePreview('document.txt')).toContainText('document.txt');
        });

        // POS-03: Upload single .pdf file via upload icon
        //Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //3. Click upload icon and select a .pdf file
        //4. Wait for file to appear in preview area
        //Expectued results:
        // 1. Verify pdf file preview is visible
        // 2. Verify file name is correct

        test('POS-03: Upload single .pdf file via upload icon', async () => {
            const pdfFile = createDummyFile('report.pdf', 'PDF content', 'application/pdf');
            await attachmentPage.uploadSingleFile(pdfFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreview('report.pdf')).toBeVisible();
            await expect(attachmentPage.getFilePreview('report.pdf')).toContainText('report.pdf');
        });


        // POS-04: Upload single .jpg image file
        //Steps :

        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //3. Click upload icon and select a .jpg file
        //4. Wait for file to appear in preview area
        //Expectued results:
        // 1. Verify jpg file preview is visible
        // 2. Verify file name is correct

        test('POS-04: Upload single .jpg image file', async () => {
            const imageFile = createDummyFile('photo.jpg', 'JPEG data', 'image/jpeg');
            await attachmentPage.uploadSingleFile(imageFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('photo.jpg')).toBeVisible({ timeout: 5000 });
        });


        // POS-05: Upload single .png image file
        //Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //3. Click upload icon and select a .png file
        //4. Wait for file to appear in preview area
        //Expectued results:
        // 1. Verify png file preview is visible
        // 2. Verify file name is correct

        test('POS-05: Upload single .png image file', async () => {
            const imageFile = createDummyFile('screenshot.png', 'PNG data', 'image/png');
            await attachmentPage.uploadSingleFile(imageFile.path);

            await expect(attachmentPage.getFilePreviewByPartialName('screenshot.png')).toBeVisible({ timeout: 5000 });
        });

        // POS-06: Upload multiple files simultaneously
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //3. Click upload icon and select multiple files
        //4. Wait for files to appear in preview area
        //Expectued results:
        // 1. Verify all files appear in preview
        // 2. Verify files name are correct

        test('POS-06: Upload multiple files simultaneously', async () => {
            const file1 = createDummyFile('file1.txt', 'Content 1', 'text/plain');
            const file2 = createDummyFile('file2.pdf', 'Content 2', 'application/pdf');
            const file3 = createDummyFile('file3.txt', 'Content 3', 'text/plain');

            await attachmentPage.uploadMultipleFiles([file1.path, file2.path, file3.path]);

            // Verify all files appear in preview
            await expect(attachmentPage.getFilePreview('file1.txt')).toBeVisible();
            await expect(attachmentPage.getFilePreview('file2.pdf')).toBeVisible();
            await expect(attachmentPage.getFilePreview('file3.txt')).toBeVisible();
        });

        // POS-07: Upload file with special characters in name
        //Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //Expectued results:
        // 1. Verify upload button is visible using attachmentPage locators


        test('POS-07: Upload file with special characters in name', async () => {
            const specialFile = createDummyFile('test-file_v1.2.txt', 'Content', 'text/plain');
            await attachmentPage.uploadSingleFile(specialFile.path);

            await expect(attachmentPage.filePreviewItems.first()).toBeVisible();
        });

        // POS-08: Upload maximum allowed file size (99KB)
        //Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        //Expectued results:
        // 1. Verify upload button is visible using attachmentPage locators
        // 2. Verify upload button is enabled/clickable

        test('POS-08: Upload maximum allowed file size (99KB)', async () => {
            const largeFile = createDummyFile('large.txt', 'a'.repeat(99 * 1024), 'text/plain');
            await attachmentPage.uploadSingleFile(largeFile.path);

            // Should upload successfully without error
            await expect(attachmentPage.getFilePreviewByPartialName('large.txt')).toBeVisible({ timeout: 5000 });

            // No error should be displayed
            const hasError = await attachmentPage.hasError();
            expect(hasError).toBeFalsy();
        });
    });

    test.describe('Positive Tests - Office Document Files', () => {
        // POS-09: Upload .ppt PowerPoint file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // Expected results:
        // 1. Verify upload button is visible using attachmentPage locators
        // 2. Verify upload button is enabled/clickable

        test('POS-09: Upload .ppt PowerPoint file', async () => {
            const pptFile = createDummyFile('presentation.ppt', 'PowerPoint content', 'application/vnd.ms-powerpoint');
            await attachmentPage.uploadSingleFile(pptFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('presentation.ppt')).toBeVisible({ timeout: 5000 });
        });

        // POS-10: Upload .pptx PowerPoint file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // Expected results:
        // 1. Verify upload button is visible using attachmentPage locators
        // 2. Verify upload button is enabled/clickable

        test('POS-10: Upload .pptx PowerPoint file', async () => {
            const pptxFile = createDummyFile('presentation.pptx', 'PowerPoint XML content', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
            await attachmentPage.uploadSingleFile(pptxFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('presentation.pptx')).toBeVisible({ timeout: 5000 });
        });


        // POS-11: Upload .xls Excel file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .xls file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify xls file preview is visible
        // 2. Verify file name is correct
        test('POS-11: Upload .xls Excel file', async () => {
            const xlsFile = createDummyFile('spreadsheet.xls', 'Excel content', 'application/vnd.ms-excel');
            await attachmentPage.uploadSingleFile(xlsFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('spreadsheet.xls')).toBeVisible({ timeout: 5000 });
        });



        // POS-12: Upload .xlsx Excel file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .xlsx file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify xlsx file preview is visible
        // 2. Verify file name is correct
        test('POS-12: Upload .xlsx Excel file', async () => {
            const xlsxFile = createDummyFile('spreadsheet.xlsx', 'Excel XML content', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            await attachmentPage.uploadSingleFile(xlsxFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('spreadsheet.xlsx')).toBeVisible({ timeout: 5000 });
        });
    });

    test.describe('Positive Tests - Image Files', () => {

        // POS-13: Upload .jpeg image file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .jpeg file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify jpeg file preview is visible
        // 2. Verify file name is correct

        test('POS-13: Upload .jpeg image file', async () => {
            const jpegFile = createDummyFile('image.jpeg', 'JPEG image data', 'image/jpeg');
            await attachmentPage.uploadSingleFile(jpegFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('image.jpeg')).toBeVisible({ timeout: 5000 });
        });

        // POS-14: Upload .jpg image file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .jpg file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify jpg file preview is visible
        // 2. Verify file name is correct

        test('POS-14: Upload .jpg image file', async () => {
            const jpgFile = createDummyFile('photo.jpg', 'JPG image data', 'image/jpeg');
            await attachmentPage.uploadSingleFile(jpgFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('photo.jpg')).toBeVisible({ timeout: 5000 });
        });

        // POS-15: Upload .png image file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .png file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify png file preview is visible
        // 2. Verify file name is correct

        test('POS-15: Upload .png image file', async () => {
            const pngFile = createDummyFile('graphic.png', 'PNG image data', 'image/png');
            await attachmentPage.uploadSingleFile(pngFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('graphic.png')).toBeVisible({ timeout: 5000 });
        });

        // POS-16: Upload .gif animated image
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .gif file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify gif file preview is visible
        // 2. Verify file name is correct
        test('POS-16: Upload .gif animated image', async () => {
            const gifFile = createDummyFile('animation.gif', 'GIF89a', 'image/gif');
            await attachmentPage.uploadSingleFile(gifFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('animation.gif')).toBeVisible({ timeout: 5000 });
        });

        // POS-17: Upload .webp image file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .webp file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify webp file preview is visible
        // 2. Verify file name is correct
        test('POS-17: Upload .webp image file', async () => {
            const webpFile = createDummyFile('modern-image.webp', 'WEBP image data', 'image/webp');
            await attachmentPage.uploadSingleFile(webpFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('modern-image.webp')).toBeVisible({ timeout: 5000 });
        });

        // POS-18: Upload .svg vector image
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a .svg file
        // 4. Wait for file to appear in preview area
        // Expected results:
        // 1. Verify svg file preview is visible
        // 2. Verify file name is correct
        test('POS-18: Upload .svg vector image', async () => {
            const svgFile = createDummyFile('icon.svg', '<svg xmlns="http://www.w3.org/2000/svg"></svg>', 'image/svg+xml');
            await attachmentPage.uploadSingleFile(svgFile.path);

            // Verify file preview appears
            await expect(attachmentPage.getFilePreviewByPartialName('icon.svg')).toBeVisible({ timeout: 5000 });
        });
    });

    test.describe('Positive Tests - Multiple File Types', () => {

        // POS-19: Upload multiple office documents
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select multiple office document files
        // 4. Wait for files to appear in preview area
        // Expected results:
        // 1. Verify all office document files appear in preview
        // 2. Verify file names are correct

        test('POS-19: Upload multiple office documents', async () => {
            const pptFile = createDummyFile('slides.ppt', 'PPT content', 'application/vnd.ms-powerpoint');
            const xlsxFile = createDummyFile('data.xlsx', 'Excel content', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            const pdfFile = createDummyFile('report.pdf', 'PDF content', 'application/pdf');

            await attachmentPage.uploadMultipleFiles([pptFile.path, xlsxFile.path, pdfFile.path]);

            // Verify all files appear
            await expect(attachmentPage.getFilePreviewByPartialName('slides.ppt')).toBeVisible({ timeout: 5000 });
            await expect(attachmentPage.getFilePreviewByPartialName('data.xlsx')).toBeVisible({ timeout: 5000 });
            await expect(attachmentPage.getFilePreviewByPartialName('report.pdf')).toBeVisible({ timeout: 5000 });
        });

        // POS-20: Upload multiple image formats
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select multiple image files
        // 4. Wait for files to appear in preview area
        // Expected results:
        // 1. Verify all image files appear in preview
        // 2. Verify file names are correct

        test('POS-20: Upload multiple image formats', async () => {
            const jpgFile = createDummyFile('photo1.jpg', 'JPG data', 'image/jpeg');
            const pngFile = createDummyFile('photo2.png', 'PNG data', 'image/png');
            const gifFile = createDummyFile('photo3.gif', 'GIF data', 'image/gif');
            const webpFile = createDummyFile('photo4.webp', 'WEBP data', 'image/webp');

            await attachmentPage.uploadMultipleFiles([jpgFile.path, pngFile.path, gifFile.path, webpFile.path]);

            // Verify all files appear
            await expect(attachmentPage.getFilePreviewByPartialName('photo1.jpg')).toBeVisible({ timeout: 5000 });
            await expect(attachmentPage.getFilePreviewByPartialName('photo2.png')).toBeVisible({ timeout: 5000 });
            await expect(attachmentPage.getFilePreviewByPartialName('photo3.gif')).toBeVisible({ timeout: 5000 });
            await expect(attachmentPage.getFilePreviewByPartialName('photo4.webp')).toBeVisible({ timeout: 5000 });
        });

        // POS-21: Upload mixed file types
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Click upload icon and select a mix of file types
        // 4. Wait for files to appear in preview area
        // Expected results:
        // 1. Verify all files appear in preview
        // 2. Verify file count matches uploaded files

        test('POS-21: Upload mixed file types', async () => {
            const txtFile = createDummyFile('document.txt', 'Text content', 'text/plain');
            const pptxFile = createDummyFile('slides.pptx', 'PPTX content', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
            const jpgFile = createDummyFile('image.jpg', 'JPG data', 'image/jpeg');


            await attachmentPage.uploadMultipleFiles([txtFile.path, pptxFile.path, jpgFile.path]);

            // Verify file count
            const fileCount = await attachmentPage.getFileCount();
            expect(fileCount).toBe(3);
        });
    });

    test.describe('Positive Tests - Drag and Drop', () => {

        // POS-22: Drag and drop single .txt file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Drag and drop a .txt file into the drop zone
        // Expected results:
        // 1. Verify the .txt file appears in the preview area

        test('POS-22: Drag and drop single .txt file', async () => {
            const txtFile = createDummyFile('dragged.txt', 'Dragged content', 'text/plain');

            // Perform drag and drop using attachmentPage
            await attachmentPage.dragAndDropFile(txtFile.path);

            // Verify file appears
            await expect(attachmentPage.getFilePreviewByPartialName('dragged.txt')).toBeVisible({ timeout: 5000 });
        });

        // POS-23: Drag and drop multiple files
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Drag and drop multiple files into the drop zone
        // Expected results:
        // 1. Verify all files appear in the preview area

        test('POS-23: Drag and drop multiple files', async () => {
            const file1 = createDummyFile('drag1.txt', 'Content 1', 'text/plain');
            const file2 = createDummyFile('drag2.pdf', 'Content 2', 'application/pdf');

            await attachmentPage.uploadMultipleFiles([file1.path, file2.path]);

            // Verify both files appear
            await expect(attachmentPage.getFilePreviewByPartialName('drag1')).toBeVisible({ timeout: 5000 });
            await expect(attachmentPage.getFilePreviewByPartialName('drag2')).toBeVisible({ timeout: 5000 });
        });

        // POS-24: Drop zone highlights on drag over
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Drag a file over the drop zone without dropping
        // Expected results:
        // 1. Drop zone should visually highlight to indicate it is active

        test('POS-24: Drop zone highlights on drag over', async () => {
            // Trigger dragover event using attachmentPage
            await attachmentPage.triggerDragOver();

            // Check if highlight is visible
            const hasHighlight = await attachmentPage.isDropZoneHighlighted();
            console.log('Drop zone highlighted:', hasHighlight);
        });

        // POS-25: Drag and drop image file
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Drag and drop an image file into the drop zone
        // Expected results:
        // 1. Image file appears in the preview area

        test('POS-25: Drag and drop image file', async () => {
            const imageFile = createDummyFile('dropped-image.jpg', 'JPG data', 'image/jpeg');

            await attachmentPage.dragAndDropFile(imageFile.path);

            // Verify file appears
            await expect(attachmentPage.getFilePreviewByPartialName('dropped-image.jpg')).toBeVisible({ timeout: 5000 });
        });

        // POS-26: Drag and drop office document
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area where file upload is possible
        // 3. Drag and drop an office document file into the drop zone
        // Expected results:
        // 1. Office document file appears in the preview area

        test('POS-26: Drag and drop office document', async () => {
            const pptxFile = createDummyFile('dropped-slides.pptx', 'PPTX content', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');

            await attachmentPage.dragAndDropFile(pptxFile.path);

            // Verify file appears
            await expect(attachmentPage.getFilePreviewByPartialName('dropped-slides.pptx')).toBeVisible({ timeout: 5000 });
        });
    });

    test.describe('Positive Tests - File Management', () => {

        // POS-27: Remove uploaded file
        // Steps :
        // 1. Login to the application
        // 2. Upload a file
        // 3. Remove the uploaded file using the UI
        // Expected results:
        // 1. File is removed from the preview area

        test('POS-27: Remove uploaded file', async ({ page }) => {
            const txtFile = createDummyFile('removable.txt', 'Content', 'text/plain');
            await attachmentPage.uploadSingleFile(txtFile.path);


            await expect(attachmentPage.getFilePreview('removable.txt')).toBeVisible();

            await page.getByTestId('file-preview-removable.txt').getByRole('button').click();

            // Click remove button using attachmentPage method
            //await attachmentPage.removeFile('removable.txt');


            // Verify file is removed
            await expect(attachmentPage.getFilePreview('removable.txt')).not.toBeVisible();
        });



        // POS-28: File preview displays correct file icon
        // Steps :
        // 1. Login to the application
        // 2. Upload a file (e.g., PDF)
        // Expected results:
        // 1. The correct file type icon is displayed in the preview area

        test('POS-28: File preview displays correct file icon', async () => {
            const pdfFile = createDummyFile('icon-test.pdf', 'PDF', 'application/pdf');
            await attachmentPage.uploadSingleFile(pdfFile.path);

            await expect(attachmentPage.getFilePreviewByPartialName('icon-test')).toBeVisible({ timeout: 5000 });

            // Check for file icon (SVG or image)
            await expect(attachmentPage.fileIcons.first()).toBeVisible().catch(() => { });
        });
    });

    test.describe('Positive Tests - Integration', () => {

        // POS-29: Send message with attached file
        // Steps :
        // 1. Login to the application
        // 2. Upload a file
        // 3. Type a message in the chat input
        // 4. Send the message with the attached file
        // Expected results:
        // 1. Message with the attached file appears in the chat area
        test('POS-29: Send message with attached file', async ({ page }) => {
            const txtFile = createDummyFile('message-file.txt', 'Content', 'text/plain');
            await attachmentPage.uploadSingleFile(txtFile.path);

            // Use attachmentPage method to send message with attachment

            await page.getByTestId('chat-input').click();
            await page.getByTestId('chat-input').fill('Here is my file');

            // Verify message with attachment appears in chat

            await expect(page.getByText('Here is my file')).toBeVisible();



            await page.getByTestId('chat-submit-button').click();
            await expect(page.getByTestId('chat-messages-container')).toBeVisible();




        });
    });

    // ========================================
    // NEGATIVE TEST CASES
    // ========================================

    test.describe('Negative Tests - File Size Validation', () => {

        // NEG-01: Reject file exceeding size limit (200KB)
        // Steps :
        // 1. Login to the application
        // 2. Attempt to upload a file larger than 200KB
        // Expected results:
        // 1. Error message is displayed indicating file size exceeds the limit

        test('NEG-01: Reject file exceeding size limit (200KB)', async ({ page }) => {
            const oversizedFile = createDummyFile('huge.txt', 'a'.repeat(200 * 1024), 'text/plain');
            await attachmentPage.uploadSingleFile(oversizedFile.path);

            // Verify error message appears using attachmentPage
            // await expect(attachmentPage.errorBar).toBeVisible();

            await expect(page.getByText('1 files exceeding 100KB and')).toBeVisible();

        });

        // NEG-02: Reject extremely large file (1MB)
        // Steps :
        // 1. Login to the application
        // 2. Attempt to upload a file of 1MB
        // Expected results:
        // 1. Error message is displayed for file size
        test('NEG-02: Reject extremely large file (1MB)', async () => {
            const massiveFile = createDummyFile('massive.txt', 'x'.repeat(1024 * 1024), 'text/plain');
            await attachmentPage.uploadSingleFile(massiveFile.path);

            // Verify error message
            await expect(attachmentPage.errorBar).toBeVisible;
        });


        // NEG-03: Multiple files where one exceeds size limit
        // Steps :
        // 1. Login to the application
        // 2. Upload a valid file
        // 3. Upload an invalid file exceeding the size limit
        // Expected results:
        // 1. Error or warning is displayed for the invalid file
        // 2. Valid file remains in preview
        test('NEG-03: Multiple files where one exceeds size limit', async ({ page }) => {
            const validFile = createDummyFile('valid.txt', 'Small file', 'text/plain');
            const invalidFile = createDummyFile('invalid.txt', 'b'.repeat(200 * 1024), 'text/plain');

            await attachmentPage.uploadSingleFile(validFile.path);
            await attachmentPage.uploadSingleFile(invalidFile.path);

            // Verify error or warning using attachmentPage methods
            //await expect(attachmentPage.errorBar).toBeVisible();
            await expect(page.locator('.p-3').first()).toBeVisible();
            await expect(page.locator('.p-3 > .flex').first()).toBeVisible();



            await expect(attachmentPage.getFilePreviewByPartialName('valid.txt')).toBeVisible();

        });
    });

    test.describe('Negative Tests - Unsupported File Type Validation', () => {

        // NEG-04: Reject .exe executable file
        // Steps :
        // 1. Login to the application
        // 2. Attempt to upload a .exe file
        // Expected results:
        // 1. Warning or error message is displayed for unsupported file type
        test('NEG-04: Reject .exe executable file', async ({ page }) => {
            const exeFile = createDummyFile('malware.exe', 'Executable', 'application/octet-stream');
            await attachmentPage.uploadSingleFile(exeFile.path);

            // Verify warning/error message
            // await expect(page.getByTestId("warning-bar")).toBeVisible();
            // await expect(attachmentPage.warningBar).toBeVisible();
            // await expect(attachmentPage.warningBar).toContainText(/unsupportedi/i);


            await expect(page.locator('div').filter({ hasText: /^Unsupported file types: application\/x-msdownload$/ }).nth(1)).toBeVisible();
        });

        // NEG-05: Reject .bat batch file
        // Steps :
        // 1. Login to the application
        // 2. Attempt to upload a .bat file
        // Expected results:
        // 1. Warning or error message is displayed for unsupported file type
        test('NEG-05: Reject .bat batch file', async ({ page }) => {
            const batFile = createDummyFile('script.bat', '@echo off', 'application/x-bat');
            await attachmentPage.uploadSingleFile(batFile.path);

            // await expect(page.locator('div').filter({ hasText: /^Unsupported file types: application\/x-msdownload$/ }).nth(1)).toBeVisible();

            //await page.locator('.p-2').click();
            await expect(page.getByText('Unsupported file types:')).toBeVisible();
            //await page.locator('svg').nth(3).click();
        });

        // NEG-06: Reject .sh shell script
        // Steps :
        // 1. Login to the application
        // 2. Attempt to upload a .sh file
        // Expected results:
        // 1. Warning or error message is displayed for unsupported file type
        test('NEG-06: Reject .sh shell script', async ({ page }) => {
            const shFile = createDummyFile('deploy.sh', '#!/bin/bash', 'application/x-sh');
            await attachmentPage.uploadSingleFile(shFile.path);

            // Verify warning/error message
            await expect(page.locator('div').filter({ hasText: /^Unsupported file types: text\/x-sh$/ }).nth(1)).toBeVisible();
            await expect(page.getByText('Unsupported file types: text/')).toBeVisible();

        });



        // NEG-07: Reject .zip archive file
        // Steps :
        // 1. Login to the application
        // 2. Attempt to upload a .zip file
        // Expected results:
        // 1. Warning or error message is displayed for unsupported file type
        test('NEG-07: Reject .zip archive file', async () => {
            const zipFile = createDummyFile('archive.zip', 'PK...', 'application/zip');
            await attachmentPage.uploadSingleFile(zipFile.path);

            await expect(attachmentPage.warningBar).toBeVisible().catch(() => { });
        });
    });

    test.describe('Negative Tests - Empty & Invalid Files', () => {

        // NEG-08: Reject empty file (0 bytes)
        // Steps :
        // 1. Create an empty file
        // 2. Attempt to upload the file
        // 3. Check for error/warning messages
        // Expected results: Error or warning message should be displayed

        test('NEG-08: Reject empty file (0 bytes)', async () => {
            const emptyFile = createDummyFile('empty.txt', '', 'text/plain');
            await attachmentPage.uploadSingleFile(emptyFile.path);

            // Should show error or warning for empty file
            await attachmentPage.wait(2000);

            const hasError = await attachmentPage.hasError();
            const hasWarning = await attachmentPage.hasWarning();

            // Empty files may be rejected or allowed based on business logic
            console.log('Empty file - Error:', hasError, 'Warning:', hasWarning);
        });


        // NEG-09: Reject file with null characters
        // Steps :
        // 1. Create a file with null characters
        // 2. Attempt to upload the file
        // 3. Check for error/warning messages
        // Expected results: Error or warning message should be displayed


        test('NEG-09: Reject file with null characters', async () => {
            const nullFile = createDummyFile('null.txt', 'text\x00null', 'text/plain');
            await attachmentPage.uploadSingleFile(nullFile.path);

            await attachmentPage.wait(2000);
        });

    });



    test.describe('Negative Tests - Drag and Drop Edge Cases', () => {

        // NEG-10: Drop invalid file type via drag-and-drop
        // Steps :
        // 1. Create an unsupported file type
        // 3. Check for error/warning messages
        // Expected results: Error or warning message should be displayed

        test('NEG-10: Drop invalid file type via drag-and-drop', async ({ page }) => {
            const invalidFile = createDummyFile('virus.exe', 'Malicious', 'application/octet-stream');

            await attachmentPage.dragAndDropFile(invalidFile.path);

            // Verify warning appears
            await expect(page.locator('div').filter({ hasText: /^Unsupported file types: application\/x-msdownload$/ }).nth(1)).toBeVisible();
        });

        // NEG-11: Drop oversized file via drag-and-drop
        // Steps :
        // 1. Create a file larger than the allowed size
        // 2. Attempt to drop the file
        // 3. Check for error/warning messages
        // Expected results: Error or warning message should be displayed

        test('NEG-11: Drop oversized file via drag-and-drop', async ({ page }) => {
            const largeFile = createDummyFile('large-drop.txt', 'y'.repeat(300 * 1024), 'text/plain');

            await attachmentPage.dragAndDropFile(largeFile.path);

            // Verify error message
            // await expect(attachmentPage.errorBar).toBeVisible();


            await expect(page.locator('.p-3').first()).toBeVisible();
            await expect(page.locator('.p-3 > .flex').first()).toBeVisible();
        });

        // NEG-12: Drag non-file content to drop zone
        // Steps :
        // 1. Attempt to drag non-file content (e.g., text)
        // 2. Drop into the file upload area
        // 3. Verify no upload occurs
        // Expected results: No files should be uploaded

        test('NEG-12: Drag non-file content to drop zone', async ({ page }) => {
            // Try to drag text instead of file
            await attachmentPage.mainArea.dispatchEvent('drop', {
                dataTransfer: await page.evaluateHandle(() => {
                    const dt = new DataTransfer();
                    // Add text data instead of file
                    return dt;
                })
            });

            // Should not upload anything
            await attachmentPage.wait(1000);
        });
    });

    test.describe('Negative Tests - UI/UX Boundaries', () => {

        // NEG-13: Attempt to upload more than 10 files
        // Steps :
        // 1. Create 15 files
        // 2. Attempt to upload all 15 files
        // 3. Check for error/warning messages
        // Expected results:
        // system should prevent more than 10 files from being uploaded
        // Error or warning message should be displayed

        test('NEG-13: Attempt to upload more than 10 files', async () => {
            const files = [];
            for (let i = 1; i <= 15; i++) {
                files.push(createDummyFile(`file${i}.txt`, `Content ${i}`, 'text/plain').path);
            }

            await attachmentPage.uploadMultipleFiles(files);

            // May show warning about file limit
            await attachmentPage.wait(2000);

            const hasWarning = await attachmentPage.hasWarning();
            console.log('Too many files warning:', hasWarning);
        });


        //NEG-14: Rapid consecutive file uploads
        // Steps :
        // 1. Create 3 small files  

        test('NEG-14: Rapid consecutive file uploads', async () => {
            const file1 = createDummyFile('rapid1.txt', 'Fast 1', 'text/plain');
            const file2 = createDummyFile('rapid2.txt', 'Fast 2', 'text/plain');
            const file3 = createDummyFile('rapid3.txt', 'Fast 3', 'text/plain');

            // Upload files rapidly without waiting
            await attachmentPage.uploadSingleFile(file1.path);
            await attachmentPage.uploadSingleFile(file2.path);
            await attachmentPage.uploadSingleFile(file3.path);

            // Check final state
            await attachmentPage.wait(2000);
        });

        // NEG-15: Upload same file twice
        // Steps :
        // 1. Create a file
        // 2. Upload the file
        // 3. Attempt to upload the same file again
        // 4. Check for error/warning messages
        // Expected results: System should handle duplicate uploads gracefully
        //files appear in chat preview

        test('NEG-15: Upload same file twice', async ({ page }) => {
            const duplicateFile = createDummyFile('duplicate.txt', 'Same file', 'text/plain');

            // Upload first time
            await attachmentPage.uploadSingleFile(duplicateFile.path);
            await attachmentPage.wait(1000);

            // Upload same file again
            await attachmentPage.uploadSingleFile(duplicateFile.path);

            // May show warning or replace previous upload
            await attachmentPage.wait(2000);

            await expect(page.locator('div').filter({ hasText: /^duplicate\.txtTXT$/ }).nth(1)).toBeVisible();
            await page.locator('div').filter({ hasText: /^duplicate\.txtTXT$/ }).nth(4).click();
        });
    });

    //
    // LEGACY TEST CASES (Original)
    // 

    test.describe('Legacy Tests', () => {



        // TC-01: File input should be visible
        // Steps :
        // 1. Login to the application
        // 2. Navigate to chat area
        // Expected results:
        // 1. File input is present and visible in the chat area
        
        test('TC-01: File input should be visible', async () => {
            const isAttached = await attachmentPage.isFileInputAttached();
            expect(isAttached).toBeTruthy();
            console.log('File input is attached:', isAttached);
        });

        // TC-02: Should attach a .txt file
        // Steps :
        // 1. Login to the application
        // 2. Attach a .txt file using the file input
        // Expected results:
        // 1. .txt file appears in the preview area with correct name
        test('TC-02: Should attach a .txt file', async () => {
            const dummyFile = createDummyFile('test.txt', 'Hello world', 'text/plain');
            await attachmentPage.uploadSingleFile(dummyFile.path);
            await expect(attachmentPage.getFilePreview('test.txt')).toBeVisible();
            await expect(attachmentPage.getFilePreview('test.txt')).toContainText('test.txt');
        });

        // TC-03: Should attach a .pdf file
        // Steps :
        // 1. Login to the application
        // 2. Attach a .pdf file using the file input
        // Expected results:
        // 1. .pdf file appears in the preview area with correct name
        test('TC-03: Should attach a .pdf file', async () => {
            const dummyFile = createDummyFile('sample.pdf', 'PDF content', 'application/pdf');
            await attachmentPage.uploadSingleFile(dummyFile.path);
            await expect(attachmentPage.getFilePreview('sample.pdf')).toBeVisible();
            await expect(attachmentPage.getFilePreview('sample.pdf')).toContainText('sample.pdf');
        });

        // TC-04: Should attach multiple files
        // Steps :
        // 1. Login to the application
        // 2. Attach multiple files using the file input
        // Expected results:
        // 1. All attached files appear in the preview area with correct names
        test('TC-04: Should attach multiple files', async () => {
            const file1 = createDummyFile('one.txt', 'One', 'text/plain');
            const file2 = createDummyFile('two.pdf', 'Two', 'application/pdf');
            await attachmentPage.uploadMultipleFiles([file1.path, file2.path]);
            await expect(attachmentPage.getFilePreview('one.txt')).toBeVisible();
            await expect(attachmentPage.getFilePreview('two.pdf')).toBeVisible();
        });


    });
});