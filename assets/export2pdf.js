const FONT_REGISTRY = {
	"UKIJEkranRegular": "/editor/assets/fonts/UKIJEkran.ttf",
	"UKIJChiwerKesmeRegular": "/editor/assets/fonts/UKIJKesme.ttf",
	"UKIJCJKRegular": "/editor/assets/fonts/UKIJCJK.ttf",
	"UKIJKufiRegular": "/editor/assets/fonts/UKIJKu.ttf"
};
function getFontsUsed(root) {
	const fonts = new Set();

	root.querySelectorAll("*").forEach(el => {
	    const style = window.getComputedStyle(el);
	    const family = style.fontFamily.split(",")[0].replace(/['"]/g, "").trim();
	    if (family) fonts.add(family);
	});

	return [...fonts];
}

async function fontToBase64(url) {
	const res = await fetch(url);
	const buffer = await res.arrayBuffer();

	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;

	for (let i = 0; i < len; i++) {
	    binary += String.fromCharCode(bytes[i]);
	}

	return btoa(binary);
}

async function getSystemFontBase64(family) {
	if (!window.queryLocalFonts) return null;
	const font = (await window.queryLocalFonts()).find(f => f.fullName === family);
	if (!font) return null;
	const blob = await font.blob();
	return await new Promise(r => {
	    const fr = new FileReader();
	    fr.onloadend = () => r(fr.result.split(",")[1]);
	    fr.readAsDataURL(blob);
	});
}

async function registerFonts(pdf, fonts) {
	for (const family of fonts) {
	    const url = FONT_REGISTRY[family];
	    if (url) {
	    	// get hosted fonts
			const base64 = await fontToBase64(url);

			pdf.addFileToVFS(family + ".ttf", base64);
			pdf.addFont(family + ".ttf", family, "normal");
			//console.log("registered font:",url);
			//console.log(base64);
	    } else {
	    	// get system fonts
	        const base64 = await getSystemFontBase64(family);
	        if (base64) {
	            pdf.addFileToVFS(family + ".ttf", base64);
	            pdf.addFont(family + ".ttf", family, "normal");
	        } else {
	            console.warn(`Font ${family} not found on system`);
	        }		    	
	    }
	}
}

function applyBidiEngine(root, bidi) {
	// Select all elements explicitly marked as RTL
	root.querySelectorAll("[dir='rtl']").forEach(el => {

	    // Walk all text nodes inside this element
	    const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
	    let node;
	    while ((node = walker.nextNode())) {
	        const text = node.nodeValue.trim();

	        if (text) {
	            // Set BiDi engine options for RTL processing
	            bidi.setOptions({
	                isInputVisual: false,
	                isOutputVisual: true,
	                isInputRtl: true,
	                isOutputRtl: true,
	                isSymmetricSwapping: true
	            });

	            // Apply BiDi reordering (mirrors brackets, reorders text)
	            node.nodeValue = bidi.doBidiReorder(text);
	        }
	    }
	});
}

function downloadFile(blob, extension) {
	var a = document.createElement("a");
	a.href = URL.createObjectURL(blob);
	a.download = "Untitled"+extension;
	a.click();

	URL.revokeObjectURL(a.href);
}

async function exportFile(blob, extension) {
	if (!window.showSaveFilePicker) {
		 await downloadFile(blob, extension);
		 return;
	}
	let docType=null;
	let desc=null;
	if(extension === ".pdf")
	{
		docType = "application/pdf";
		desc = "PDF document"
	}
	else if(extension === ".epub")
	{
		docType = "application/epub+zip";
		desc = "EPUB ebook";
	}
	else 
	{
		console.error('Unsupported file type!');
		return;
	}
	const opts = {
		types: [
		  {
			description: desc,
			accept: { [docType]: [extension] },
		  },
		],
	};
	// create a new handle
	const newHandle = await window.showSaveFilePicker(opts);

	// create a FileSystemWritableFileStream to write to
	const writableStream = await newHandle.createWritable();

	// write our file
	await writableStream.write(blob);

	// close the file and write the contents to disk.
	await writableStream.close();
}

window.generatePDF = async function() {
	const { jsPDF } = window.jspdf;
	var pdf = new jsPDF('p', 'pt', 'a4');
	pdf.__bidiEngine__ = new jsPDF.__bidiEngine__();
	var doc = document.body;
	//console.log(doc);
	// Register font in jsPDF vFS
	const fonts = getFontsUsed(doc);
	await registerFonts(pdf, fonts);
	
	const pages = document.getElementsByClassName("page");
	//page.style.margin = "0";
	// real DOM width in px
	const windowWidth = pages[0].offsetWidth;
	// convert px -> pt
	const pdfWidth = windowWidth * 0.75;
	//console.log("PDF width:", pdfWidth);
	//console.log("Window width:", windowWidth);
	//downloadFile(document);

	const addPageToPDF = (index) => {
		return new Promise((resolve) => {	
			pdf.html(pages[index], {
				callback: resolve,
				x: 0,
				y: 0,
				width: pdfWidth,
				windowWidth: windowWidth,
				autoPaging: false,
				html2canvas: {
					ignoreElements: function (element) {
						return element.id === "ignorePDF";
					},
					onclone: function(clonedDoc) {
						const style = clonedDoc.createElement("style");
						style.innerHTML = `
						  .page {
							margin: 0 !important;
						  }
						`;
						clonedDoc.head.appendChild(style);
						
						const bidi = pdf.__bidiEngine__;
						// Apply BiDi only to elements with dir="rtl"
						applyBidiEngine(clonedDoc, bidi);
						
						// Disable default bullets ONLY in cloned DOM
						const style1 = clonedDoc.createElement("style");
						style1.innerHTML = `
							ul { list-style: none !important; padding-right: 1.2em; }
						`;
						clonedDoc.head.appendChild(style1);

						// Inject manual bullets
						clonedDoc.querySelectorAll("li").forEach(li => {
							if (!li.dataset.bulletAdded) {
								li.innerHTML = "• " + li.innerHTML;
								li.dataset.bulletAdded = "true";
							}
						});
					}
				}		
			});
		});
	};
	// Process pages sequentially
	let chain = addPageToPDF(0);
	for (let i = 1; i < pages.length; i++) {
		const index = i;
		chain = chain.then(() => {
		    pdf.addPage();
		    return addPageToPDF(index);
		});
	}

	chain = chain.then(async () => {
		const arrayBuffer = pdf.output("arraybuffer");	
		const uint8 = new Uint8Array(arrayBuffer);
		// exportFile(pdfBlob,".pdf");
		const types = window.parent.getFilePickerOption();
		window.parent.saveBlob(true, uint8, true, types[4]);
	});	
}	

