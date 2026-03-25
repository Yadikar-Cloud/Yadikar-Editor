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
	const doc = document;
	//console.log(doc);
	
	downloadFile(doc);
}	

