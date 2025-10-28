import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

export class FileGenerator {
    private testFilesDir: string;
    private createdFiles: string[] = [];

    constructor(testFilesDir: string) {
        this.testFilesDir = testFilesDir;
    }

    /**
     * Create all test files needed for the test suite
     */
    async createAllTestFiles(): Promise<void> {
        // Create test files directory if it doesn't exist
        if (!fs.existsSync(this.testFilesDir)) {
            fs.mkdirSync(this.testFilesDir, { recursive: true });
        }

        console.log('Creating test files...');

        // Text files
        await this.createTextFile('test-file.txt', 'This is a test text file.\nLine 2\nLine 3');
        await this.createTextFile('file1.txt', 'Sample text content for testing');
        await this.createTextFile('readme.md', '# Test Markdown\n\n## Overview\nThis is a test markdown file.');
        await this.createTextFile('file2.md', '# Another Markdown\n\nTest content here.');

        // PDF files (ensure size < 10 MB)
        const pdfFiles = [
            { name: 'sample.pdf', size: 1000 },
            { name: 'document.pdf', size: 1000 },
            { name: 'document1.pdf', size: 1000 },
            { name: 'test.pdf', size: 1000 },
            { name: 'to-delete.pdf', size: 1000 },
            { name: 'valid-document.pdf', size: 1000 }
        ];
        for (const pdf of pdfFiles) {
            if (pdf.size >= 10240) {
                throw new Error(`PDF file '${pdf.name}' size must be less than 10 MB (10240 KB). Requested: ${pdf.size} KB`);
            }
            await this.createPDFFile(pdf.name, pdf.size);
        }

        // Word documents (size < 10 MB)
        const wordFiles = [
            { name: 'report.docx', size: 200 },
            { name: 'letter.doc', size: 1000 },
            { name: 'document2.docx', size: 1000 }
        ];
        for (const word of wordFiles) {
            if (word.size >= 10240) {
                throw new Error(`Word file '${word.name}' size must be less than 10 MB (10240 KB). Requested: ${word.size} KB`);
            }
            if (word.name.endsWith('.docx')) {
                await this.createDocxFile(word.name, word.size);
            } else {
                await this.createDocFile(word.name, word.size);
            }
        }

        // Excel files (size < 10 MB)
        const excelFiles = [
            { name: 'data.xlsx', size: 1000 },
            { name: 'budget.xls', size: 120 },
            { name: 'spreadsheet.xlsx', size: 1000 }
        ];
        for (const excel of excelFiles) {
            if (excel.size >= 10240) {
                throw new Error(`Excel file '${excel.name}' size must be less than 10 MB (10240 KB). Requested: ${excel.size} KB`);
            }
            if (excel.name.endsWith('.xlsx')) {
                await this.createXlsxFile(excel.name, excel.size);
            } else {
                await this.createXlsFile(excel.name, excel.size);
            }
        }

        // PowerPoint files (size < 10 MB) - NOTE: Only PPTX is supported according to requirements
        const pptFiles = [
            { name: 'presentation.pptx', size: 1000 }
        ];
        for (const ppt of pptFiles) {
            if (ppt.size >= 10240) {
                throw new Error(`PowerPoint file '${ppt.name}' size must be less than 10 MB (10240 KB). Requested: ${ppt.size} KB`);
            }
            await this.createPptxFile(ppt.name, ppt.size);
        }

        // Image files (size < 10 MB)
        const imageFiles = [
            { name: 'photo.jpg', size: 1000 },
            { name: 'screenshot.png', size: 1000 },
            { name: 'image.png', size: 1000 },
            { name: 'valid-image.png', size: 1000 },
            { name: 'sample.jpeg', size: 1000 },
            { name: 'sample.webp', size: 1000 },
            { name: 'sample.gif', size: 1000 }
        ];
        for (const img of imageFiles) {
            if (img.size >= 10240) {
                throw new Error(`Image file '${img.name}' size must be less than 10 MB (10240 KB). Requested: ${img.size} KB`);
            }
            await this.createImageFile(img.name, img.size);
        }
        await this.createSVGFile('logo.svg');

        // CSV files (if supported - needs verification)
        await this.createCSVFile('data.csv');

        // Size-specific files
        await this.createPDFFile('large-file-11mb.pdf', 11 * 1024); // 11 MB
        // Create a true 10 MB text file
        await this.createTextFile('exact-10mb.txt', 'A'.repeat(10 * 1024 * 1024)); // Exactly 10 MB
        await this.createEmptyFile('empty-file.txt');

        // Unsupported file types
        await this.createBinaryFile('malicious.exe', 50);
        await this.createTextFile('script.js', 'console.log("test");');
        await this.createBinaryFile('video.mp4', 1024);
        await this.createBinaryFile('audio.mp3', 512);
        await this.createBinaryFile('invalid.exe', 100);

        console.log(`Created ${this.createdFiles.length} test files in directory: ${this.testFilesDir}`);
        console.log('Files created:', this.createdFiles.map(f => path.basename(f)).join(', '));
    }

    /**
     * Get the full path to a test file
     */
    getFilePath(fileName: string): string {
        return path.join(this.testFilesDir, fileName);
    }

    /**
     * Clean up all created test files
     */
    async cleanup(): Promise<void> {
        console.log('Cleaning up test files...');

        for (const file of this.createdFiles) {
            try {
                if (fs.existsSync(file)) {
                    fs.unlinkSync(file);
                }
            } catch (error) {
                console.error(`Failed to delete ${file}:`, error);
            }
        }

        // Remove directory if empty
        try {
            if (fs.existsSync(this.testFilesDir)) {
                const files = fs.readdirSync(this.testFilesDir);
                if (files.length === 0) {
                    fs.rmdirSync(this.testFilesDir);
                }
            }
        } catch (error) {
            console.error('Failed to remove test directory:', error);
        }

        this.createdFiles = [];
    }

    /**
     * Create a text file
     */
    private async createTextFile(fileName: string, content: string): Promise<void> {
        const filePath = this.getFilePath(fileName);
        fs.writeFileSync(filePath, content, 'utf8');
        this.createdFiles.push(filePath);
    }

    /**
     * Create a PDF file (mock PDF structure)
     */
    private async createPDFFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);

        // Create a minimal PDF structure
        const pdfHeader = '%PDF-1.4\n';
        const pdfContent = `1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >> >> >> /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
100 700 Td
(Test PDF Document) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000009 00000 n 
0000000056 00000 n 
0000000115 00000 n 
0000000317 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
406
%%EOF\n`;
        let content = pdfHeader + pdfContent;

        // Pad with comments to reach desired size
        const currentSize = Buffer.byteLength(content, 'utf8');
        const targetSize = sizeKB * 1024;

        if (targetSize > currentSize) {
            const paddingSize = targetSize - currentSize;
            const paddingBuffer = Buffer.alloc(paddingSize, 'X');
            fs.writeFileSync(filePath, content, 'utf8');
            fs.appendFileSync(filePath, `\n% Padding:\n`);
            fs.appendFileSync(filePath, paddingBuffer);
        } else {
            fs.writeFileSync(filePath, content, 'utf8');
        }
        this.createdFiles.push(filePath);
        this.createdFiles.push(filePath);
    }

    /**
     * Create a DOCX file (mock ZIP structure)
     */
    private async createDocxFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);

        // DOCX files are ZIP archives, create a minimal structure
        const content = this.createMockZipFile(sizeKB);
        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create a DOC file (binary format)
     */
    private async createDocFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);

        // Create a simple binary file with DOC signature
        const docHeader = Buffer.from([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]);
        const padding = Buffer.alloc(sizeKB * 1024 - docHeader.length);
        const content = Buffer.concat([docHeader, padding]);

        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create an XLSX file (mock ZIP structure)
     */
    private async createXlsxFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);
        const content = this.createMockZipFile(sizeKB);
        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create an XLS file (binary format)
     */
    private async createXlsFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);

        // Create a simple binary file with XLS signature
        const xlsHeader = Buffer.from([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]);
        const padding = Buffer.alloc(sizeKB * 1024 - xlsHeader.length);
        const content = Buffer.concat([xlsHeader, padding]);

        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create a PPTX file (mock ZIP structure)
     */
    private async createPptxFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);
        const content = this.createMockZipFile(sizeKB);
        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create a PPT file (binary format)
     */
    private async createPptFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);

        // Create a simple binary file with PPT signature
        const pptHeader = Buffer.from([0xD0, 0xCF, 0x11, 0xE0, 0xA1, 0xB1, 0x1A, 0xE1]);
        const padding = Buffer.alloc(sizeKB * 1024 - pptHeader.length);
        const content = Buffer.concat([pptHeader, padding]);

        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create an image file (PNG or JPG)
     */
    private async createImageFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);
        const ext = path.extname(fileName).toLowerCase();

        let header: Buffer;
        if (ext === '.png') {
            // PNG signature
            header = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
        } else if (ext === '.jpg' || ext === '.jpeg') {
            // JPEG signature
            header = Buffer.from([0xFF, 0xD8, 0xFF, 0xE0]);
        } else {
            header = Buffer.alloc(0);
        }

        const padding = Buffer.alloc(sizeKB * 1024 - header.length);
        const content = Buffer.concat([header, padding]);

        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create an SVG file
     */
    private async createSVGFile(fileName: string): Promise<void> {
        const filePath = this.getFilePath(fileName);
        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="blue" />
      <text x="50" y="55" text-anchor="middle" fill="white" font-size="16">Test</text>
    </svg>`;

        fs.writeFileSync(filePath, svgContent, 'utf8');
        this.createdFiles.push(filePath);
    }

    /**
     * Create a CSV file
     */
    private async createCSVFile(fileName: string): Promise<void> {
        const filePath = this.getFilePath(fileName);
        const csvContent = `Name,Email,Age,City
John Doe,john@example.com,30,New York
Jane Smith,jane@example.com,25,Los Angeles
Bob Johnson,bob@example.com,35,Chicago`;

        fs.writeFileSync(filePath, csvContent, 'utf8');
        this.createdFiles.push(filePath);
    }

    /**
     * Create an empty file
     */
    private async createEmptyFile(fileName: string): Promise<void> {
        const filePath = this.getFilePath(fileName);
        fs.writeFileSync(filePath, '');
        this.createdFiles.push(filePath);
    }

    /**
     * Create a binary file
     */
    private async createBinaryFile(fileName: string, sizeKB: number): Promise<void> {
        const filePath = this.getFilePath(fileName);
        const content = Buffer.alloc(sizeKB * 1024);

        // Fill with random data efficiently
        crypto.randomFillSync(content);

        fs.writeFileSync(filePath, content);
        this.createdFiles.push(filePath);
    }

    /**
     * Create a mock ZIP file structure
     */
    private createMockZipFile(sizeKB: number): Buffer {
        // ZIP file signature: PK\x03\x04
        const zipHeader = Buffer.from([0x50, 0x4B, 0x03, 0x04]);
        const padding = Buffer.alloc(sizeKB * 1024 - zipHeader.length);
        return Buffer.concat([zipHeader, padding]);
    }
}