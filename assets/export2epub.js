class EPUBGenerator {
    constructor(title, author, language = 'en') {
        this.title = title;
        this.author = author;
        this.language = language;
        this.uuid = this.generateUUID();
        this.date = new Date().toISOString();
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

    htmlToXHTML(doc) {
    	const html = doc.getElementById("tinymce").innerHTML;
        const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${this.language}">
			<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
			<title>${this.escapeXML(this.title)}</title>
			<link rel="stylesheet" type="text/css" href="styles.css"/>
			</head>
			<body>
			${html}
			</body>
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
				<dc:language>${this.language}</dc:language>
				<dc:date>${this.date}</dc:date>
				<meta property="dcterms:modified">${this.date}</meta>
				</metadata>
				<manifest>
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

	getEditorTocNCX(doc) {
		var toc = "";
		var level = 0;
		var maxLevel = 3;

		doc.getElementById("tinymce").innerHTML =
		    doc.getElementById("tinymce").innerHTML.replace(
		        /<h([\d])>([^<]+)<\/h([\d])>/gi,
		        function (str, openLevel, titleText, closeLevel) {
		            if (openLevel != closeLevel) {
					 c.log(openLevel)
		                return str + ' - ' + openLevel;
		            }

		            if (openLevel > level) {
		                toc += (new Array(openLevel - level + 1)).join("<ol>");
		            } else if (openLevel < level) {
		                toc += (new Array(level - openLevel + 1)).join("</ol>");
		            }

		            level = parseInt(openLevel);

		            var anchor = titleText.replace(/ /g, "_");
		            toc += "<li><a href=\"#" + anchor + "\">" + titleText
		                + "</a></li>";

		            return "<h" + openLevel + "><a name=\"" + anchor + "\">"
		                + titleText + "</a></h" + closeLevel + ">";
		        }
		    );

		if (level) {
		    toc += (new Array(level + 1)).join("</ol>");
		}

		return toc;
	}

    getTocNCX() {
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
				<navPoint id="navPoint-1" playOrder="1">
					<navLabel>
						<text>${this.escapeXML(this.title)}</text>
					</navLabel>
					<content src="content.xhtml"/>
				</navPoint>
				</navMap>
				</ncx>`;
    }
    
	extractCSS(doc) {
	  const styles = document.querySelectorAll('style');
	  let css = '';

	  styles.forEach(styleTag => {
		css += styleTag.textContent + '\n\n';
		//styleTag.remove(); // remove from HTML
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
        oebps.file('content.xhtml', this.htmlToXHTML(doc));
        oebps.file('toc.ncx', this.getTocNCX());
        oebps.file('styles.css', this.extractCSS());
        // add other external stylesheets
        /*
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (const link of links) {
			const href = link.getAttribute('href');
			if (!href) continue;    
			
			try {
			  const response = await fetch(href);
			  const cssText = await response.text();

			  // Extract filename
			  const fileName = href.split('/').pop().split('?')[0];

			  // Save into OEBPS
			  oebps.file(`styles/${fileName}`, cssText);

			  // Update HTML to point to local file (important for EPUB)
			  link.setAttribute('href', `styles/${fileName}`);

			} catch (err) {
			  console.error('Failed to fetch CSS:', href, err);
			}			    
        }
		*/
        // 4. Generate the zip file
        const blob = await zip.generateAsync({ type: 'blob' });
        return blob;
    }
}

async function generateEPUB() {
    const statusDiv = document.getElementById('status');
    const button = event.target;

    try {
        button.disabled = true;
        button.textContent = '⏳ Generating EPUB...';
        statusDiv.style.display = 'none';

        // Get article content
        const articleElement = document.getElementById('article');
        const htmlContent = articleElement.innerHTML;

        // Create EPUB generator
        const generator = new EPUBGenerator(
            'The Art of JavaScript Programming',
            'Jane Developer',
            'en'
        );

        // Generate EPUB
        const epubBlob = await generator.generate(htmlContent);

        // Download the file
        const url = URL.createObjectURL(epubBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'javascript-programming.epub';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        // Show success message
        statusDiv.textContent = '✅ EPUB file downloaded successfully!';
        statusDiv.className = 'status success';
        statusDiv.style.display = 'block';

    } catch (error) {
        console.error('Error generating EPUB:', error);
        statusDiv.textContent = '❌ Error generating EPUB: ' + error.message;
        statusDiv.className = 'status error';
        statusDiv.style.display = 'block';
    } finally {
        button.disabled = false;
        button.textContent = '📥 Download as EPUB';
    }
}
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

window.generateEPUB = async function() {
	var documentCopy = document.cloneNode(true);
	
    const generator = new EPUBGenerator(
        'The Art of JavaScript Programming',
        'Jane Developer',
        'en'
    );
    // Generate EPUB
    const epubBlob = await generator.generate(documentCopy);
	
    // Download the file
    const url = URL.createObjectURL(epubBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.epub';
    document.body.appendChild(a);
    a.click();
	// downloadFile(doc);
}	

