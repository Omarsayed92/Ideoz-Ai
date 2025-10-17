import { test, expect } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

test.describe('Anonymous Landing Page Tests', () => {
    const baseURL = 'https://app-staging.ideoz.ai/';

    test.beforeEach(async ({ page }) => {
        await page.goto(baseURL);
        // Wait for page to be fully loaded
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000); // Additional wait for UI to stabilize
    });

    test.setTimeout(60000); // Set timeout to 60 seconds

    test('Upload files in chat area - FIXED', async ({ page }) => {
        // Correct file path construction
        const filePath = path.join(__dirname, 'UploadFiles', 'Txt', 'SampleTextFile_10kb.txt');

        // Verify file exists before proceeding
        //if (!fs.existsSync(filePath)) {
         //   throw new Error(`Test file not found at: ${filePath}`);
      //  }

        // Wait for page to be fully interactive
        await page.waitForLoadState('networkidle');

        // Step 1 & 2: Click button and upload file with better error handling
        try {
            const [fileChooser] = await Promise.all([
                page.waitForEvent('filechooser', { timeout: 10000 }),
                page.locator('button:has(svg.lucide-circle-plus)').click()
            ]);
            await fileChooser.setFiles(filePath);
        } catch (error) {
            // Fallback: try alternative upload button selector
            const [fileChooser] = await Promise.all([
                page.waitForEvent('filechooser', { timeout: 10000 }),
                page.locator('button[aria-label*="upload"], button[title*="upload"], input[type="file"] + button').first().click()
            ]);
            await fileChooser.setFiles(filePath);
        }

        // Step 3: Wait and confirm file appears with timeout
        await expect(page.getByText('SampleTextFile_10kb.txt')).toBeVisible({ timeout: 15000 });

        // Optional: Click on the file name if it's clickable
        const fileName = page.getByText('SampleTextFile_10kb.txt');
        if (await fileName.isVisible()) {
            await fileName.click();
        }
        
        await expect(page.locator('.flex.gap-1')).toBeEnabled();
        await page.getByRole('button').nth(5).click();
        await expect(page.locator('.flex.gap-1')).toBeDisabled(); 

    
        
        

    });








});