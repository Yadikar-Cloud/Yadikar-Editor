tinymce.PluginManager.add('exportpdf', function(editor, url) {
	let pdfScriptsReady; // Promise that resolves when all scripts are injected

	
    // Add button to toolbar
    editor.ui.registry.addButton('exportpdf', {
        text: 'Export as PDF',
        icon: 'exportpdf',
        tooltip: 'Export as PDF',
        onAction: async function() {
            generatePDF();
        }
    });

    // Add menu item
    editor.ui.registry.addMenuItem('exportpdf', {
        text: 'Export as PDF',
        icon: 'exportpdf',
        onAction: async function() {
            generatePDF();
        }
    });	
	
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

	async function embedFontsInDoc(doc, fonts) {

		const style = doc.createElement("style");
		style.type = "text/css";

		let css = "";

		for (const family of fonts) {

			const url = FONT_REGISTRY[family];
			if (!url) continue;

			const base64 = await fontToBase64(url);

			css += `
			@font-face {
				font-family: '${family}';
				src: url(data:font/ttf;base64,${base64}) format('truetype');
				font-weight: normal;
				font-style: normal;
			}
			`;
		}

		style.appendChild(doc.createTextNode(css));
		doc.head.appendChild(style);
	}	

	function registerFontsFromEditorDoc(pdf, doc) {
		// Read <style> tags from the editor iframe document
		const styles = doc.querySelectorAll("style");

		styles.forEach(style => {
		    const css = style.textContent;
		    const regex = /@font-face\s*{[^}]*font-family:\s*['"]?([^;'"]+)['"]?;[^}]*src:\s*url\(data:font\/[^;]+;base64,([^)]*)\)/g;
		    let match;
		    while ((match = regex.exec(css)) !== null) {
		        const family = match[1].trim();
		        const base64 = match[2].trim();
		        const filename = family + ".ttf";
		        console.log("Registering font from editor doc:", family);
		        pdf.addFileToVFS(filename, base64);
		        pdf.addFont(filename, family, "normal");
		    }
		});
	}	

	
	
	async function generatePDF() {
		const { jsPDF } = window.jspdf;
		var pdf = new jsPDF('p', 'pt', 'a4');

		var doc = editor.getDoc();
		const fonts = getFontsUsed(doc.body);
		//console.log("Used fonts:", fonts);

		// Step 1: Embed fonts into the EDITOR iframe doc (for layout rendering)
		await embedFontsInDoc(doc, fonts);
		
        //downloadFile(doc);
		// Trigger the function that's already living inside the iframe
		var iframeWindow = editor.getWin();
		await iframeWindow.generatePDF();
	}

	editor.on('init', function() {
		var doc = editor.getDoc();

		pdfScriptsReady = new Promise((resolve) => {
		    var s1 = doc.createElement('script');
		    s1.src = 'https://html2canvas.hertzen.com/dist/html2canvas.js';
		    doc.head.appendChild(s1);

		    s1.onload = function() {
		        var s2 = doc.createElement('script');
		        s2.src = '/editor/assets/jspdf.umd.min.js';
		        doc.head.appendChild(s2);

		        s2.onload = function() {
		            var s3 = doc.createElement('script');
		            s3.textContent = `
		                function registerFontsFromStyles(pdf) {
		                    const styles = document.querySelectorAll("style");
		                    styles.forEach(style => {
		                        const css = style.textContent;
		                        const regex = /@font-face\\s*{[^}]*font-family:\\s*['"]?([^;'"]+)['"]?;[^}]*src:\\s*url\\(data:font\\/[^;]+;base64,([^)]*)\\)/g;
		                        let match;
		                        while ((match = regex.exec(css)) !== null) {
		                            const family = match[1];
		                            const base64 = match[2];
		                            const filename = family + ".ttf";
		                            pdf.addFileToVFS(filename, base64);
		                            pdf.addFont(filename, family, "normal");
		                        }
		                    });
		                }

		                window.generatePDF = async function() {
		                    const { jsPDF } = window.jspdf;
		                    var pdf = new jsPDF('p', 'pt', 'a4');
		                    registerFontsFromStyles(pdf);
		                    
							const page = document.getElementsByClassName("page")[0];
							const originalMargin = page.style.margin;
							page.style.margin = "0";
							// real DOM width in px
							const windowWidth = page.offsetWidth;

							// convert px -> pt
							const pdfWidth = windowWidth * 0.75;

							pdf.html(page, {
								callback: function(pdf) {
								  pdf.output("dataurlnewwindow");
								},
								x: 0,
								y: 0,
								width: pdfWidth,
								windowWidth: windowWidth
							});
		                };
		            `;
		            doc.body.appendChild(s3);
		            resolve(); // all scripts injected and ready
		        };
		    };
		});
	});

    return {
        getMetadata: function() {
            return {
                name: 'Export as PDF',
                url: 'http://yoursite.com'
            };
        }
    };
});
