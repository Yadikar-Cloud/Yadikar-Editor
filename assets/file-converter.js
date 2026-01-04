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
		
		const parser = new DOMParser();
		const doc = parser.parseFromString(html, 'text/html');
		const children = [];
		
		const processNode = (node) => {
		    if (node.nodeType === Node.ELEMENT_NODE) {
		        const tag = node.tagName.toLowerCase();
		        
		        // Headings
		        if (tag.match(/^h[1-6]$/)) {
		            const level = parseInt(tag[1]);
		            const text = node.textContent || ' ';
		            children.push(new docx.Paragraph({
		                text: text,
		                heading: docx.HeadingLevel[`HEADING_${level}`]
		            }));
		        }
		        // Paragraphs
		        else if (tag === 'p') {
		            const runs = processInlineElements(node);
		            children.push(new docx.Paragraph({
		                children: runs.length > 0 ? runs : [new docx.TextRun(' ')]
		            }));
		        }
		        // Lists
		        else if (tag === 'ul' || tag === 'ol') {
		            const items = node.querySelectorAll('li');
		            items.forEach(li => {
		                const runs = processInlineElements(li);
		                children.push(new docx.Paragraph({
		                    children: runs.length > 0 ? runs : [new docx.TextRun(' ')],
		                    bullet: tag === 'ul' ? { level: 0 } : undefined,
		                    numbering: tag === 'ol' ? { reference: "default", level: 0 } : undefined
		                }));
		            });
		        }
		        // Line breaks
		        else if (tag === 'br') {
		            children.push(new docx.Paragraph({ children: [new docx.TextRun('')] }));
		        }
		        // Divs - process children
		        else if (tag === 'div') {
		            node.childNodes.forEach(child => processNode(child));
		        }
		    }
		    else if (node.nodeType === Node.TEXT_NODE) {
		        const text = node.textContent.trim();
		        if (text) {
		            children.push(new docx.Paragraph({ text: text }));
		        }
		    }
		};
		
		const processInlineElements = (node) => {
		    const runs = [];
		    
		    const traverse = (n, formatting = {}) => {
		        if (n.nodeType === Node.TEXT_NODE) {
		            const text = n.textContent;
		            if (text) {
		                runs.push(new docx.TextRun({
		                    text: text,
		                    ...formatting
		                }));
		            }
		        }
		        else if (n.nodeType === Node.ELEMENT_NODE) {
		            const tag = n.tagName.toLowerCase();
		            const newFormatting = { ...formatting };
		            
		            // Add formatting based on tag
		            if (tag === 'strong' || tag === 'b') newFormatting.bold = true;
		            if (tag === 'em' || tag === 'i') newFormatting.italics = true;
		            if (tag === 'u') newFormatting.underline = {};
		            if (tag === 's' || tag === 'strike') newFormatting.strike = true;
		            
		            // Process children with accumulated formatting
		            n.childNodes.forEach(child => traverse(child, newFormatting));
		        }
		    };
		    
		    node.childNodes.forEach(child => traverse(child));
		    return runs;
		};
		
		// Process all body children
		doc.body.childNodes.forEach(node => processNode(node));
		
		// Ensure at least one paragraph
		if (children.length === 0) {
		    children.push(new docx.Paragraph({ text: ' ' }));
		}
		
		// Create numbering for ordered lists
		const document = new docx.Document({
		    numbering: {
		        config: [{
		            reference: "default",
		            levels: [{
		                level: 0,
		                format: docx.LevelFormat.DECIMAL,
		                text: "%1.",
		                alignment: docx.AlignmentType.START
		            }]
		        }]
		    },
		    sections: [{
		        properties: {},
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
