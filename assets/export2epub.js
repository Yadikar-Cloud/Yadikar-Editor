class EPUBGenerator {
    constructor(title = 'Document', author = '', description = '', language = 'en') {
        this.title = title;
        this.author = author;
        this.description = description;
        this.language = language;
        this.uuid = this.generateUUID();
        this.date = new Date().toISOString().replace(/\.\d{3}Z$/, 'Z');
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    escapeXML(text) {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
    }

	normalizeForXHTML(root) {
		const walker = document.createTreeWalker(
		    root,
		    NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT,
		    null,
		    false
		);

		const voidTags = new Set([
		    "br", "img", "hr", "meta", "link", "input", "area", "base", "col", "source"
		]);

		let node;
		while ((node = walker.nextNode())) {

		    // --- TEXT NODES: fix entities
		    if (node.nodeType === Node.TEXT_NODE) {
		        node.nodeValue = node.nodeValue
		            .replace(/\u00A0/g, " ")   // nbsp → space
		            .replace(/&nbsp;/g, " ");
		    }

		    // --- ELEMENT NODES
		    if (node.nodeType === Node.ELEMENT_NODE) {
		        const el = node;

		        // Lowercase tag name
		        const tag = el.tagName.toLowerCase();
		        if (el.tagName !== tag) {
		            const replacement = document.createElement(tag);
		            [...el.attributes].forEach(a =>
		                replacement.setAttribute(a.name.toLowerCase(), a.value)
		            );
		            while (el.firstChild) replacement.appendChild(el.firstChild);
		            el.parentNode.replaceChild(replacement, el);
		            node = replacement;
		        }

		        // Fix boolean attributes
		        [...el.attributes].forEach(attr => {
		            if (attr.value === "" || attr.value === attr.name) {
		                el.setAttribute(attr.name, attr.name);
		            }
		        });

		        // Ensure void elements have no children
		        if (voidTags.has(tag)) {
		            while (el.firstChild) el.removeChild(el.firstChild);
		        }

		        // Remove illegal nesting: block inside <p>
		        if (tag === "p") {
		            [...el.children].forEach(child => {
		                if (["div", "p", "h1", "h2", "h3", "h4", "h5", "h6"].includes(child.tagName.toLowerCase())) {
		                    el.parentNode.insertBefore(child, el.nextSibling);
		                }
		            });
		        }
		    }
		}
	}
	
    htmlToXHTML(doc) {
		const container = doc.getElementById("tinymce");
		
		// ===== CRITICAL: Remove ALL scripts =====
		const scripts = container.querySelectorAll('script');
		scripts.forEach(script => script.remove());
		
		// Fix the DOM in-place before serialization
		this.normalizeForXHTML(container);

		const serializer = new XMLSerializer();
		const bodyXhtml = serializer.serializeToString(container);
    	
        const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
			<!DOCTYPE html>
			<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${this.language}" lang="${this.language}">
			<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
			<title>${this.escapeXML(this.title)}</title>
			<link rel="stylesheet" type="text/css" href="styles.css"/>
			</head>
			${bodyXhtml}
			</html>`;
        return xhtml;
    }

    getMimetype() {
        return 'application/epub+zip';
    }

    getContainer() {
        return `<?xml version="1.0" encoding="UTF-8"?>
				<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
				<rootfiles>
				<rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
				</rootfiles>
				</container>`;
    }

    getContentOPF() {
        return `<?xml version="1.0" encoding="UTF-8"?>
				<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uuid_id">
				<metadata xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:opf="http://www.idpf.org/2007/opf">
				<dc:identifier id="uuid_id">urn:uuid:${this.uuid}</dc:identifier>
				<dc:title>${this.escapeXML(this.title)}</dc:title>
				<dc:creator>${this.escapeXML(this.author)}</dc:creator>
				<dc:description>${this.escapeXML(this.description)}</dc:description>
				<dc:language>${this.language}</dc:language>
				<dc:date>${this.date}</dc:date>
				<meta property="dcterms:modified">${this.date}</meta>
				</metadata>
				<manifest>
				<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
				<item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
				<item id="content" href="content.xhtml" media-type="application/xhtml+xml"/>
				<item id="css" href="styles.css" media-type="text/css"/>
				</manifest>
				<spine toc="ncx">
				<itemref idref="content"/>
				</spine>
				</package>`;
    }
    
	// Source - https://stackoverflow.com/a/187946
	// Posted by Ateş Göral, modified by community. See post 'Timeline' for change history
	// Retrieved 2026-03-26, License - CC BY-SA 4.0

	buildToc(doc) {
		this.tocItems = [];
		var level = 0;
		var maxLevel = 2;
		
		doc.getElementById("tinymce").innerHTML =
		    doc.getElementById("tinymce").innerHTML.replace(
		        /<h([\d])[^>]*>([^<]+)<\/h([\d])>/gi,
		        function (str, openLevel, titleText, closeLevel) {
		            if (openLevel != closeLevel) {
		                return str;
		            }
		            
		            // Skip headings deeper than maxLevel
		            if (parseInt(openLevel) > maxLevel) {
		                return str;
		            }
					
		            var anchor = titleText.replace(/ /g, "_");
		            this.tocItems.push({ anchor, titleText });

		            return "<h" + openLevel + " id=\"" + anchor + "\">"
		                + titleText + "</h" + closeLevel + ">";
		        }.bind(this)
		    );
	}
	
	getEditorNav() {
		var ol = this.tocItems.map(item =>
		    `<li><a href="content.xhtml#${item.anchor}">${item.titleText}</a></li>`
		).join("\n");

		return `<?xml version="1.0" encoding="UTF-8"?>
		    <!DOCTYPE html>
		    <html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
		    <head>
		        <meta charset="utf-8"/>
		        <title>Table of Contents</title>
		    </head>
		    <body>
		        <nav epub:type="toc" id="toc">
		            <ol>
		                ${ol}
		            </ol>
		        </nav>
		    </body>
		    </html>`;
	}
	
	getTocNCX() {
		var navPoints = this.tocItems.map((item, index) =>
		    `<navPoint id="navPoint-${index + 1}" playOrder="${index + 1}">
		        <navLabel>
		            <text>${this.escapeXML(item.titleText)}</text>
		        </navLabel>
		        <content src="content.xhtml#${item.anchor}"/>
		    </navPoint>`
		).join("\n");

		return `<?xml version="1.0" encoding="UTF-8"?>
		    <ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
		    <head>
		        <meta name="dtb:uid" content="urn:uuid:${this.uuid}"/>
		        <meta name="dtb:depth" content="1"/>
		        <meta name="dtb:totalPageCount" content="0"/>
		        <meta name="dtb:maxPageNumber" content="0"/>
		    </head>
		    <docTitle>
		        <text>${this.escapeXML(this.title)}</text>
		    </docTitle>
		    <navMap>
		        ${navPoints}
		    </navMap>
		    </ncx>`;
	}
    
	extractCSS(doc) {
	  const styles = document.querySelectorAll('style');
	  let css = '';

	  styles.forEach(styleTag => {
		css += styleTag.textContent + '\n\n';
	  });

	  return css;
	}
	
    async generate(doc) {
        const zip = new JSZip();

        // 1. Add mimetype (must be first, uncompressed)
        zip.file('mimetype', this.getMimetype(), { compression: 'STORE' });

        // 2. Add META-INF/container.xml
        zip.folder('META-INF').file('container.xml', this.getContainer());

        // 3. Add OEBPS folder with content files
        const oebps = zip.folder('OEBPS');
        oebps.file('content.opf', this.getContentOPF());
        this.buildToc(doc); 
        oebps.file('nav.xhtml', this.getEditorNav());
        oebps.file('toc.ncx', this.getTocNCX());
        oebps.file('content.xhtml', this.htmlToXHTML(doc));
		// Collect all CSS: start with extracted styles
		let allCSS = this.extractCSS();

		// Append external stylesheets
		const links = doc.querySelectorAll('link[rel="stylesheet"]');
		for (const link of links) {
			const href = link.getAttribute('href');
			if (!href) continue;

			try {
				const response = await fetch(href);
				const cssText = await response.text();
				allCSS += '\n' + cssText;
				// Point all links to the single bundled stylesheet
				link.setAttribute('href', 'styles.css');
			} catch (err) {
				console.error('Failed to fetch CSS:', href, err);
			}
		}
		// Strip ALL @font-face rules
		allCSS = allCSS.replace(/@font-face\s*(\/\*.*?\*\/\s*)?{[^}]*}/gis, '');
			
		oebps.file('styles.css', allCSS);
		
        // 4. Generate the zip file
        const blob = await zip.generateAsync({ type: 'blob' });
        return blob;
    }
}

// used to debug
function downloadFile(doc) {
	// Convert the document to full HTML
	var source = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;

	// Create file
	var blob = new Blob([source], { type: "text/html;charset=utf-8" });

	var a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = "index.html";
	a.click();

	URL.revokeObjectURL(a.href);
}

window.generateEPUB = async function(info) {
	var documentCopy = document.cloneNode(true);
	
    const generator = new EPUBGenerator(
        info.title,
        info.author,
        info.description,
        info.language
    );
    
    // Generate EPUB
    const epubBlob = await generator.generate(documentCopy);
	
    // Download the file
    const a = document.createElement('a');
    a.href = URL.createObjectURL(epubBlob);
    a.download = 'document.epub';
    a.click();
    URL.revokeObjectURL(a.href);
	// downloadFile(doc);
}	

