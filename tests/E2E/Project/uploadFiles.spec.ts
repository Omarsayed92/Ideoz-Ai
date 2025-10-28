import { test, expect, Page } from '@playwright/test';
import path from 'path';
import * as fs from 'fs';

import { LoginPage } from '../../Fixtures/Login';
import { CreateProjectPage } from '../../Fixtures/CreateProject';
import { UploadFilePage } from '../../Fixtures/UploadFile';
import { FileGenerator } from '../../utils/file-generator';

// Test configuration

const TEST_EMAIL = 'testuploadfileuser@gmail.com';
const TEST_PASSWORD = 'Aa@123456';
const MAX_FILE_SIZE_MB = 10;

let loginPage: LoginPage;
let createProjectPage: CreateProjectPage;
let uploadFilePage: UploadFilePage;
let fileGenerator: FileGenerator;

// Configure tests to run serially to avoid file cleanup issues with parallel workers
test.describe.configure({ mode: 'serial' });

// Set timeout to 60 seconds for file upload tests
test.setTimeout(60000);

/**
 
 * POSITIVE TEST CASES - GENERAL UPLOAD FUNCTIONALITY

 */

test.describe('Upload Project Files - Positive Test Cases', () => {
    let loginPage: LoginPage;
    let createProjectPage: CreateProjectPage;
    let fileGenerator: FileGenerator;

    test.beforeAll(async () => {
        fileGenerator = new FileGenerator(path.join(__dirname, '../../test-files'));
        await fileGenerator.createAllTestFiles();
    });

    test.afterAll(async ({ }, testInfo) => {
        // Only clean up files if all tests passed
        if (testInfo && testInfo.status === 'passed') {
            await fileGenerator.cleanup();
        } else {
            // Leave files for debugging if any test failed
            console.warn('Some tests failed. Skipping file cleanup for debugging.');
        }
    });

    test.beforeEach(async ({ page, context }) => {
        await page.goto('/');
        // Clear all authentication state to ensure fresh login
        await context.clearCookies();
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });


        loginPage = new LoginPage(page);
        createProjectPage = new CreateProjectPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(TEST_EMAIL);
        await loginPage.fillPassword(TEST_PASSWORD);
        await loginPage.clickLogin();

        await page.waitForSelector('[data-testid="create-project-button"]', { timeout: 15000 });
        await page.waitForTimeout(2000);

        await createProjectPage.openDialog();
        const projectName = `Upload Test ${Date.now()}`;
        await createProjectPage.fillProjectName(projectName);
        await createProjectPage.submit();
        await page.waitForTimeout(3000);
    });

    /**
     * TC-001: Verify "Upload project files" option is present and clickable
     * step 
     * 1: Navigate to project page
     * 2: Verify "Upload project files" button is visible
     * 3: Click the "Upload project files" button
     * expected result: "Upload project files" button is visible and clickable
     */
    test('TC-001: Verify "Upload project files" option is present and clickable', async ({ page }) => {

        const uploadProjectFilesButton = page.getByTestId('btn-upload-project-files');
        await expect(uploadProjectFilesButton).toBeVisible();
        await expect(uploadProjectFilesButton).toBeEnabled();
    });

    /**
     * TC-002: Verify clicking "Upload project files" opens the "Upload Files" dialog
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * expected result: "Upload Files" dialog is opened
     */
    test('TC-002: Verify clicking "Upload project files" opens the "Upload Files" dialog', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const uploadDialog = page.locator('[data-testid="upload-files-dialog"]').or(
            page.locator('[role="dialog"]:has-text("Upload")')
        );

        await expect(uploadDialog).toBeVisible();
    });

    /**
     * TC-003: Verify upload dialog UI elements
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * expected result: Upload dialog displays title, 
     * drag-and-drop area, 
     * max file size info, 
     * close icon
     */
    test('TC-003: Verify upload dialog UI elements are present', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        await expect(page.getByText('Upload Files')).toBeVisible();
        await expect(page.getByText('Drag & drop or click to add files')).toBeVisible();
        await expect(page.getByText(`Maximum file size: 10 MB`)).toBeVisible();

        await expect(page.getByRole('button').first()).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeHidden();
    });


    /**
     * TC-004: Verify successful upload of a single valid file
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload a valid file (e.g., test-file.txt)
     * expected result: File appears in upload list with name and type,
     * upload success message is displayed
     */
    test('TC-004: Verify successful upload of a single valid file', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const testFile = fileGenerator.getFilePath('test-file.txt');
        await uploadFile(page, testFile);

        await expect(page.locator('text="test-file"')).toBeVisible({ timeout: 1000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });


    /**
     * TC-005: Verify successful upload of multiple valid files
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload multiple valid files (e.g., test-file.txt, readme.md, file1.txt)
     * expected result: All files appear in upload list with names and types,
     * upload success message is displayed
     */
    test('TC-005: Verify successful upload of multiple valid files', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const files = [
            fileGenerator.getFilePath('test-file.txt'),
            fileGenerator.getFilePath('readme.md'),
            fileGenerator.getFilePath('file1.txt')
        ];

        await uploadMultipleFiles(page, files);

        await expect(page.locator('text="test-file"')).toBeVisible({ timeout: 1000 });
        await expect(page.locator('text="readme"')).toBeVisible({ timeout: 1000 });
        await expect(page.locator('text="file1"')).toBeVisible({ timeout: 1000 });
        await expect(page.getByText('Successfully uploaded: 3 files')).toBeVisible();
    });



    /**
     * TC-006: Verify close icon closes the dialog
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Click the close icon
     * expected result: Upload dialog is closed
     */
    test('TC-006: Verify close icon closes the dialog', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const closeButton = page.locator('[role="dialog"]').locator('button').nth(0);
        await closeButton.click();
        await page.waitForTimeout(500);

        const uploadDialog = page.locator('[role="dialog"]:has-text("Upload Files")');
        await expect(uploadDialog).not.toBeVisible();
    });

    /**
     * TC-007: Verify upload button in project page hides after first file upload
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload a valid file (e.g., test-file.txt)
     * 4: Close the upload dialog
     * expected result: "Upload project files" button is no longer visible on project page
     */
    test('TC-007: Verify upload button in project page hides after first file upload', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const testFile = fileGenerator.getFilePath('test-file.txt');
        await uploadFile(page, testFile);

        const closeButton = page.locator('[role="dialog"]').locator('button').nth(0);
        await closeButton.click();
        await page.waitForTimeout(500);

        await expect(page.getByRole('button', { name: 'Upload new files' })).not.toBeVisible();
    });



    /**
     * TC-008: Verify successful deletion of uploaded files
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload a valid file (e.g., test-file.txt)
     * 4: Delete the uploaded file
     * expected result: File is removed from upload list, and success message is displayed
     */
    test('TC-008: Verify successful deletion of uploaded files', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const testFile = fileGenerator.getFilePath('test-file.txt');
        await uploadFile(page, testFile);

        await page.waitForTimeout(1000);

        await page.locator('[data-testid="upload-files-dialog"]').getByRole('button').nth(1).click();
        // File is removed from upload list, and success message is displayed
        await expect(page.locator('text="test-file"')).not.toBeVisible();
        await expect(page.getByText('File deleted successfully')).toBeVisible();
    });


    /**
     * TC-009: Verify drag and drop of single file
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Drag and drop a valid file (e.g., test-file.txt)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-009: Verify drag and drop of single file', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const testFile = fileGenerator.getFilePath('test-file.txt');
        await dragAndDropFile(page, testFile);

        await expect(page.locator('text="test-file"')).toBeVisible({ timeout: 15000 });
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });


    /**
     * TC-010: Verify drag and drop of multiple files
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Drag and drop multiple valid files (e.g., file1.txt, file2.md, readme.md)
     * expected result: All files are uploaded successfully and appear in upload list
     */
    test('TC-010: Verify drag and drop of multiple files', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const files = [
            fileGenerator.getFilePath('file1.txt'),
            fileGenerator.getFilePath('file2.md'),
            fileGenerator.getFilePath('readme.md')
        ];

        await dragAndDropMultipleFiles(page, files);

        await expect(page.locator('text="file1"')).toBeVisible({ timeout: 15000 });
        await expect(page.locator('text="file2"')).toBeVisible({ timeout: 15000 });
        await expect(page.locator('text="readme"')).toBeVisible({ timeout: 15000 });
        await expect(page.getByText('Successfully uploaded: 3 files')).toBeVisible();
    });

    /**
     * TC-011: Verify files display with names and types
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload a valid file (e.g., test-file.txt)
     * expected result: Uploaded file displays correct name and type in upload list
     */

    test('TC-011: Verify files display with names and types', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const testFile = fileGenerator.getFilePath('test-file.txt');
        await uploadFile(page, testFile);

        await expect(page.getByText('test-file')).toBeVisible();
        await expect(page.getByText('txt')).toBeVisible();
    });

    /**
     * TC-012: Verify upload new files button appears after upload
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload a valid file (e.g., test-file.txt)
     * expected result: "Upload new files" button becomes visible after file upload
     */
    test('TC-012: Verify upload new files button appears after upload', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeHidden();

        const testFile = fileGenerator.getFilePath('test-file.txt');
        await uploadFile(page, testFile);

        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
    });
});

/**
 * NEGATIVE TEST CASES - ERROR HANDLING
 */

test.describe('Upload Project Files - Negative Test Cases', () => {
    let loginPage: LoginPage;
    let createProjectPage: CreateProjectPage;
    let fileGenerator: FileGenerator;

    test.beforeAll(async () => {
        fileGenerator = new FileGenerator(path.join(__dirname, '../../test-files'));
        await fileGenerator.createAllTestFiles();
    });

    test.afterAll(async ({ }, testInfo) => {
        // Only clean up files if all tests passed
        if (testInfo && testInfo.status === 'passed') {
            await fileGenerator.cleanup();
        } else {
            // Leave files for debugging if any test failed
            console.warn('Some tests failed. Skipping file cleanup for debugging.');
        }
    });

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        createProjectPage = new CreateProjectPage(page);

        await loginPage.gotoLoginPage();
        await loginPage.fillEmail(TEST_EMAIL);
        await loginPage.fillPassword(TEST_PASSWORD);
        await loginPage.clickLogin();

        await page.waitForSelector('[data-testid="create-project-button"]', { timeout: 15000 });
        await page.waitForTimeout(2000);

        await createProjectPage.openDialog();
        const projectName = `Upload Test Negative ${Date.now()}`;
        await createProjectPage.fillProjectName(projectName);
        await createProjectPage.submit();
        await page.waitForTimeout(3000);
    });

    /**
     * TC-N001: Verify empty file upload is rejected
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload an empty file
     * expected result: Error message is displayed for empty file upload
     */
    test('TC-N001: Empty file upload shows error', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const emptyFile = fileGenerator.getFilePath('empty-file.txt');
        await uploadFile(page, emptyFile);

        const errorMessage = page.locator('text=/empty|0 bytes|invalid/i');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });


    /**
     * TC-N002: Verify file exceeding size limit is rejected (11 MB)
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload a file larger than 10 MB (e.g., large-file-11mb.pdf)
     * expected result: Error message is displayed for file exceeding size limit
     */

    test('TC-N002: File exceeding size limit shows error', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const largeFile = fileGenerator.getFilePath('large-file-11mb.pdf');
        await uploadFile(page, largeFile);

        const errorMessage = page.locator('text=/exceeds.*size|too large|11.*MB/i');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });

    /**
     * TC-N003: Verify file at exact size limit (10 MB) handling
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload a file exactly 10 MB (e.g., exact-10mb.txt)
     * expected result: File is accepted and uploaded successfully
     */

    test('TC-N003: File at exact size limit is handled', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const exactSizeFile = fileGenerator.getFilePath('exact-10mb.txt');
        await uploadFile(page, exactSizeFile);

        await page.waitForTimeout(5000);

        const uploadDialog = page.locator('[data-testid="upload-files-dialog"]');
        await expect(uploadDialog).toBeVisible();
    });

    /**
     * TC-N004: Verify unsupported file type .exe is rejected
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload an unsupported file type (e.g., malicious.exe)
     * expected result: Error message is displayed for unsupported file type
     */
    test('TC-N004: Executable file upload shows error', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const exeFile = fileGenerator.getFilePath('malicious.exe');
        await uploadFile(page, exeFile);

        const errorMessage = page.locator('text=/not supported|invalid file type/i');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });

    /**
     * TC-N005: Verify unsupported file type .js is rejected
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload an unsupported file type (e.g., script.js)
     * expected result: Error message is displayed for unsupported file type
     */

    test('TC-N005: JavaScript file upload shows error', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const jsFile = fileGenerator.getFilePath('script.js');
        await uploadFile(page, jsFile);

        const errorMessage = page.locator('text=/not supported|invalid file type/i');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });

    /**
     * TC-N006: Verify unsupported file type .mp4 is rejected
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload an unsupported file type (e.g., video.mp4)
     * expected result: Error message is displayed for unsupported file type
     */
    test('TC-N006: Video file upload shows error', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const mp4File = fileGenerator.getFilePath('video.mp4');
        await uploadFile(page, mp4File);

        const errorMessage = page.locator('text=/not supported|invalid file type/i');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });

    /**
     * TC-N007: Verify unsupported file type .mp3 is rejected
     * steps:
     * 1: Open project page
     * 2: Click the "Upload project files" button
     * 3: Upload an unsupported file type (e.g., audio.mp3)
     * expected result: Error message is displayed for unsupported file type
     */
    test('TC-N007: Audio file upload shows error', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const mp3File = fileGenerator.getFilePath('audio.mp3');
        await uploadFile(page, mp3File);

        const errorMessage = page.locator('text=/not supported|invalid file type/i');
        await expect(errorMessage).toBeVisible({ timeout: 5000 });
    });
});






/**
 
 * INDIVIDUAL FILE TYPE UPLOAD TESTS - ORGANIZED BY FILE TYPE GROUPS
 
 * Supported file types: txt, md, docx, doc, pdf, pptx, xlsx, xls, jpeg, jpg,
 * png, gif, webp, svg
 * Max file size: 10 MB
 
 */

test.describe('Upload Individual File Types - Text Files Group', () => {
    let fileGenerator: FileGenerator;

    test.beforeAll(async () => {
        fileGenerator = new FileGenerator(path.join(__dirname, '../../test-files'));
        await fileGenerator.createAllTestFiles();
    });

    test.afterAll(async ({ }, testInfo) => {
        // Only clean up files if all tests passed
        if (testInfo && testInfo.status === 'passed') {
            await fileGenerator.cleanup();
        } else {
            // Leave files for debugging if any test failed
            console.warn('Some tests failed. Skipping file cleanup for debugging.');
        }
    });

    test.beforeEach(async ({ page, context }) => {
        await page.goto('/');
        // Clear all authentication state to ensure fresh login
        await context.clearCookies();
        await page.evaluate(() => {
            localStorage.clear();
            sessionStorage.clear();
        });

        // Navigate to the page
        // await page.goto('/');
        await page.waitForTimeout(1000);

        // Check if login button exists (user not authenticated)
        const loginButtonExists = await page.getByTestId('btn-login').isVisible({ timeout: 2000 }).catch(() => false);

        if (loginButtonExists) {
            // User needs to login
            loginPage = new LoginPage(page);
            await loginPage.gotoLoginPage();
            await loginPage.fillEmail(TEST_EMAIL);
            await loginPage.fillPassword(TEST_PASSWORD);
            await loginPage.clickLogin();
            await page.waitForTimeout(2000);
        } else {
            // User is already logged in
            await page.waitForTimeout(1000);
        }

        const createProjectPage = new CreateProjectPage(page);
        await createProjectPage.openDialog();
        const projectName = `Test Project ${Date.now()}`;
        await createProjectPage.fillProjectName(projectName);
        await createProjectPage.submit();
        await page.waitForTimeout(2000);
    });

    /**
     * TC-TXT-001: Upload TXT file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., test-file.txt)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-TXT-001: Upload TXT file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();


        const txtFile = fileGenerator.getFilePath('test-file.txt');
        await uploadFile(page, txtFile);

        await expect(page.locator('text="test-file"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-MD-002: Upload MD (Markdown) file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., readme.md)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-MD-002: Upload MD (Markdown) file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const mdFile = fileGenerator.getFilePath('readme.md');
        await uploadFile(page, mdFile);

        await expect(page.locator('text="readme"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-JPG-003: Upload JPG file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., photo.jpg)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-JPG-003: Upload JPG file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const jpgFile = fileGenerator.getFilePath('photo.jpg');
        await uploadFile(page, jpgFile);

        await expect(page.locator('text="photo"')).toBeVisible({ timeout: 7000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-JPEG-004: Upload JPEG file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., sample.jpeg)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-JPEG-004: Upload JPEG file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const jpegFile = fileGenerator.getFilePath('sample.jpeg');
        await uploadFile(page, jpegFile);

        await expect(page.locator('text="sample"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-PNG-005: Upload PNG file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., screenshot.png)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-PNG-005: Upload PNG file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const pngFile = fileGenerator.getFilePath('screenshot.png');
        await uploadFile(page, pngFile);

        await expect(page.locator('text="screenshot"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-GIF-006: Upload GIF file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., sample.gif)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-GIF-006: Upload GIF file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const gifFile = fileGenerator.getFilePath('sample.gif');
        await uploadFile(page, gifFile);

        await expect(page.locator('text="sample"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-WEBP-007: Upload WEBP file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., sample.webp)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-WEBP-007: Upload WEBP file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const webpFile = fileGenerator.getFilePath('sample.webp');
        await uploadFile(page, webpFile);

        await expect(page.locator('text="sample"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-SVG-008: Upload SVG file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., logo.svg)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-SVG-008: Upload SVG file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const svgFile = fileGenerator.getFilePath('logo.svg');
        await uploadFile(page, svgFile);

        await expect(page.locator('text="logo"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });


    /**
    * TC-XLSX-009: Upload XLSX file
    * 1. Open project page
    * 2. Click the "Upload project files" button
    * 3. Upload a supported file type (e.g., data.xlsx)
    * expected result: File is uploaded successfully and appears in upload list
    */
    test('TC-XLSX-009: Upload XLSX file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const xlsxFile = fileGenerator.getFilePath('data.xlsx');
        await uploadFile(page, xlsxFile);

        await expect(page.locator('text="data"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-XLS-010: Upload XLS file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., budget.xls)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-XLS-010: Upload XLS file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();

        const xlsFile = fileGenerator.getFilePath('budget.xls');
        await uploadFile(page, xlsFile);

        await expect(page.locator('text="budget"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });


    /**
     * TC-PPTX-011: Upload PPTX file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., presentation.pptx)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-PPTX-011: Upload PPTX file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();
        const pptxFile = fileGenerator.getFilePath('presentation.pptx');
        await uploadFile(page, pptxFile);

        await expect(page.locator('text="presentation"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-DOCX-012: Upload DOCX file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., report.docx)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-DOCX-012: Upload DOCX file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();
        const docxFile = fileGenerator.getFilePath('report.docx');
        await uploadFile(page, docxFile);

        await expect(page.locator('text="report"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-DOC-013: Upload DOC file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., letter.doc)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-DOC-013: Upload DOC file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();
        const docFile = fileGenerator.getFilePath('letter.doc');
        await uploadFile(page, docFile);

        await expect(page.locator('text="letter"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });

    /**
     * TC-PDF-014: Upload PDF file
     * 1. Open project page
     * 2. Click the "Upload project files" button
     * 3. Upload a supported file type (e.g., valid-document.pdf)
     * expected result: File is uploaded successfully and appears in upload list
     */
    test('TC-PDF-014: Upload PDF file successfully', async ({ page }) => {
        const uploadFilePage = new UploadFilePage(page);
        await uploadFilePage.clickUploadProjectFiles();
        const pdfFile = fileGenerator.getFilePath('valid-document.pdf');
        await uploadFile(page, pdfFile);

        await expect(page.locator('text="valid-document"')).toBeVisible({ timeout: 5000 });
        await expect(page.getByRole('button').nth(1)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Upload new files' })).toBeVisible();
        await expect(page.getByText('Successfully uploaded: 1 file')).toBeVisible();
    });
});

/**
 * =============================================================================
 * HELPER FUNCTIONS
 * =============================================================================
 */

async function openUploadDialog(page: Page) {
    const uploadButton = page.locator('text="Upload project files"').or(
        page.locator('button:has-text("Upload")'),
    ).or(
        page.locator('[data-testid="upload-project-files"]')
    );

    await uploadButton.click({ timeout: 10000 });
    await page.waitForTimeout(1000);
}

async function uploadFile(page: Page, filePath: string) {
    const dropZone = page.locator('text="Drag & drop or click to add files"').first();

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        dropZone.click()
    ]);

    await fileChooser.setFiles(filePath);
    await page.waitForTimeout(3000);
}

async function uploadMultipleFiles(page: Page, filePaths: string[]) {
    const dropZone = page.locator('text="Drag & drop or click to add files"').first();

    const [fileChooser] = await Promise.all([
        page.waitForEvent('filechooser'),
        dropZone.click()
    ]);

    await fileChooser.setFiles(filePaths);
    await page.waitForTimeout(4000);
}

async function dragAndDropFile(page: Page, filePath: string) {
    const fs = require('fs');
    const buffer = fs.readFileSync(filePath);
    const fileName = path.basename(filePath);

    const dataTransfer = await page.evaluateHandle(({ buffer, fileName }) => {
        const dt = new DataTransfer();
        const blob = new Blob([new Uint8Array(buffer as number[])]);
        const file = new File([blob], fileName);
        dt.items.add(file);
        return dt;
    }, { buffer: Array.from(buffer), fileName });

    const dropZone = page.locator('text="Drag & drop or click to add files"').first();

    await dropZone.dispatchEvent('drop', { dataTransfer });
    await page.waitForTimeout(2000);
}

async function dragAndDropMultipleFiles(page: Page, filePaths: string[]) {
    const fs = require('fs');

    const files = filePaths.map(filePath => ({
        buffer: Array.from(fs.readFileSync(filePath)),
        fileName: path.basename(filePath)
    }));

    const dataTransfer = await page.evaluateHandle((files) => {
        const dt = new DataTransfer();
        files.forEach(({ buffer, fileName }) => {
            const blob = new Blob([new Uint8Array(buffer as number[])]);
            const file = new File([blob], fileName);
            dt.items.add(file);
        });
        return dt;
    }, files);

    const dropZone = page.locator('text="Drag & drop or click to add files"').first();

    await dropZone.dispatchEvent('drop', { dataTransfer });
    await page.waitForTimeout(3000);
}


