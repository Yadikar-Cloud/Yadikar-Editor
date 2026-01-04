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
		    throw new Error('docx library not loaded - cannot convert to DOCX');
		}
		
		// Parse HTML
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const body = doc.body;
		
		const children = [];
		
		// Process each element
		const processNode = (node) => {
		    if (node.nodeType === Node.TEXT_NODE) {
		        const text = node.textContent.trim();
		        if (text) {
		            children.push(
		                new docx.Paragraph({
		                    text: text
		                })
		            );
		        }
		    } else if (node.nodeType === Node.ELEMENT_NODE) {
		        const tagName = node.tagName.toLowerCase();
		        const text = node.textContent.trim();
		        
		        if (!text) return; // Skip empty elements
		        
		        switch(tagName) {
		            case 'h1':
		                children.push(
		                    new docx.Paragraph({
		                        text: text,
		                        heading: docx.HeadingLevel.HEADING_1
		                    })
		                );
		                break;
		                
		            case 'h2':
		                children.push(
		                    new docx.Paragraph({
		                        text: text,
		                        heading: docx.HeadingLevel.HEADING_2
		                    })
		                );
		                break;
		                
		            case 'h3':
		                children.push(
		                    new docx.Paragraph({
		                        text: text,
		                        heading: docx.HeadingLevel.HEADING_3
		                    })
		                );
		                break;
		                
		            case 'h4':
		                children.push(
		                    new docx.Paragraph({
		                        text: text,
		                        heading: docx.HeadingLevel.HEADING_4
		                    })
		                );
		                break;
		                
		            case 'h5':
		                children.push(
		                    new docx.Paragraph({
		                        text: text,
		                        heading: docx.HeadingLevel.HEADING_5
		                    })
		                );
		                break;
		                
		            case 'h6':
		                children.push(
		                    new docx.Paragraph({
		                        text: text,
		                        heading: docx.HeadingLevel.HEADING_6
		                    })
		                );
		                break;
		                
		            case 'p':
		                children.push(
		                    new docx.Paragraph({
		                        text: text
		                    })
		                );
		                break;
		                
		            case 'ul':
		            case 'ol':
		                // Process list items
		                Array.from(node.children).forEach(li => {
		                    if (li.tagName.toLowerCase() === 'li') {
		                        children.push(
		                            new docx.Paragraph({
		                                text: li.textContent.trim(),
		                                bullet: tagName === 'ul' ? {
		                                    level: 0
		                                } : undefined,
		                                numbering: tagName === 'ol' ? {
		                                    reference: "default-numbering",
		                                    level: 0
		                                } : undefined
		                            })
		                        );
		                    }
		                });
		                break;
		                
		            case 'br':
		                children.push(
		                    new docx.Paragraph({
		                        text: ""
		                    })
		                );
		                break;
		                
		            default:
		                // For other elements, process children recursively
		                Array.from(node.childNodes).forEach(processNode);
		        }
		    }
		};
		
		// Process all body children
		Array.from(body.childNodes).forEach(processNode);
		
		// If no children were created, add at least one empty paragraph
		if (children.length === 0) {
		    children.push(
		        new docx.Paragraph({
		            text: ""
		        })
		    );
		}
		
		const document = new docx.Document({
		    sections: [{
		        children: children
		    }]
		});
		
		return await docx.Packer.toBlob(document);
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
