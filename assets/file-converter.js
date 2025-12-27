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
            
            case '.pdf':
                return await this.htmlToPDF(htmlContent);
            
            case '.docx':
                return this.htmlToDocx(htmlContent);
            
            default:
                return htmlContent;
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
    
    // HTML to PDF
	async htmlToPDF(html) {
		if (typeof html2pdf === 'undefined') {
		    throw new Error('html2pdf not loaded');
		}
		
		try {
		    const tempDiv = document.createElement('div');
		    tempDiv.innerHTML = html;
		    tempDiv.style.width = '210mm';
		    tempDiv.style.padding = '20px';
		    document.body.appendChild(tempDiv);
		    
		    const worker = html2pdf();
		    const configured = worker.set({
		        margin: 10,
		        filename: 'document.pdf',
		        image: { type: 'jpeg', quality: 0.98 },
		        html2canvas: { scale: 2 },
		        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
		    });
		    const withSource = configured.from(tempDiv);
		    const blob = await withSource.output('blob');
		    
		    document.body.removeChild(tempDiv);
		    
		    return blob;
		    
		} catch (error) {
		    console.error('PDF conversion error:', error);
		    throw error;
		}
	},
    
    // HTML to DOCX
	async htmlToDocx(html) {
		if (typeof docx === 'undefined') {
		    throw new Error('docx library not loaded');
		}
		
		// Convert HTML to plain text for now (docx library needs structured data)
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
