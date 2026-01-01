// File conversion utilities
window.fileConverter = {
    
    // Convert HTML to different formats
    async convert(htmlContent, targetFormat) {
        switch(targetFormat) {
            case '.html':
                return htmlContent;
            
            case '.txt':
                return this.htmlToText(htmlContent);
            
            case '.md':
                return this.htmlToMarkdown(htmlContent);
            
            case '.docx':
                return this.htmlToDocx(htmlContent);
            
            default:
                return htmlContent;
        }
    },
    
    // Convert back to HTML from different formats
    async convertToHtml(content, sourceFormat) {
        switch(sourceFormat) {
            case '.html':
            case '.htm':
                return content; // Already HTML
            
            case '.txt':
                return this.textToHtml(content);
            
            case '.md':
                return this.markdownToHtml(content);
            
            case '.docx':
                return await this.docxToHtml(content);
            
            default:
                return content;
        }
    },
    
    // Plain Text to HTML
    textToHtml(text) {
        const lines = text.split('\n');
        return lines.map(line => {
            if (line.trim() === '') {
                return '<p><br></p>';
            }
            // Escape HTML entities
            const escaped = line.replace(/&/g, '&amp;')
                               .replace(/</g, '&lt;')
                               .replace(/>/g, '&gt;');
            return '<p>' + escaped + '</p>';
        }).join('');
    },
    
    // Markdown to HTML
    markdownToHtml(markdown) {
        if (typeof marked !== 'undefined') {
            return marked.parse(markdown);
        } else {
            // Fallback: treat as plain text
            return this.textToHtml(markdown);
        }
    },
    
    // DOCX to HTML (placeholder - requires mammoth.js)
    async docxToHtml(blob) {
        if (typeof mammoth !== 'undefined') {
            const arrayBuffer = await blob.arrayBuffer();
            const result = await mammoth.convertToHtml({arrayBuffer: arrayBuffer});
            return result.value; // The generated HTML
        } else {
            throw new Error('Mammoth.js library not loaded - cannot convert DOCX to HTML');
        }
    },
    
    // HTML to Plain Text
    htmlToText(html) {
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    },
    
    // HTML to Markdown
    htmlToMarkdown(html) {
        if (typeof TurndownService === 'undefined') {
            throw new Error('TurndownService not loaded');
        }
        const turndown = new TurndownService({
            headingStyle: 'atx',
            codeBlockStyle: 'fenced'
        });
        return turndown.turndown(html);
    },

    // HTML to DOCX
    async htmlToDocx(html) {
        if (typeof docx === 'undefined') {
            throw new Error('docx library not loaded');
        }
        
        const plainText = this.htmlToText(html);
        
        const doc = new docx.Document({
            sections: [{
                children: [
                    new docx.Paragraph({
                        text: plainText
                    })
                ]
            }]
        });
        
        return await docx.Packer.toBlob(doc);
    },
    
    // Get MIME type
    getMimeType(extension) {
        const mimeTypes = {
            '.html': 'text/html',
            '.txt': 'text/plain',
            '.md': 'text/markdown',
            '.pdf': 'application/pdf',
            '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        };
        return mimeTypes[extension] || 'text/plain';
    }
};
