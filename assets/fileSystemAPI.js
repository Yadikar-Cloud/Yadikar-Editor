const editor = tinymce.activeEditor;
const options = {
    types: [
        {
            description: 'HTML file',
            accept: { 'text/html': ['.html', '.htm'] }
        }
    ],
    multiple: false,
    excludeAcceptAllOption: true
};

async function writeFile(fileHandle, contents) {
  // Create a FileSystemWritableFileStream to write to.
  const writable = await fileHandle.createWritable();

  // Write the contents of the file to the stream.
  await writable.write(contents);

  // Close the file and write the contents to disk.
  await writable.close();
}

export async function saveBlob(asNew, blob: Blob, filename: string, opts?: any) {
  // 1) save to existing file
  if(window.fileHandle && !asNew)
  {
  	await writeFile(window.fileHandle, blob);
  	return;
  }
  // 2) Chromium File System Access API
  if ('showSaveFilePicker' in window) {
    const handle = await (window as any).showSaveFilePicker(opts);
	await writeFile(handle, blob);
    return;
  }

  // 3) Tauri desktop environment
  if ((window as any).__TAURI__) {
    const { save } = await import('@tauri-apps/api/dialog');
    const { writeBinaryFile } = await import('@tauri-apps/api/fs');

    const path = await save({ defaultPath: filename });
    if (!path) return;

    const bytes = new Uint8Array(await blob.arrayBuffer());
    await writeBinaryFile(path, bytes);
    return;
  }

  // 4) Firefox / Safari fallback
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function saveFile(asNew) {
	const htmlContent = editor.getContent();
	saveBlob(asNew, htmlContent, "Untitle.html", options);
}

openFilePicker = () => {
  return new Promise((resolve, reject) => {
	const filePicker = document.createElement('input');
	filePicker.type = 'file';
	filePicker.multiple = false;
	filePicker.accept = '.html,.htm,text/html';
	
	filePicker.onchange = (e) => {
	  const file = filePicker.files[0];
	  if (file) {
	    resolve(file);
	    return;
	  }
	  reject(new Error('AbortError'));
	};

	filePicker.click();
  });
};

const readFile = (file) => {
  return new Promise((resolve, reject) => {
	const reader = new FileReader();
	reader.onload = (e) => resolve(e.target.result);
	reader.onerror = (e) => reject(e);
	reader.readAsText(file);
  });
};

async function openFile(filePath) {
	const fileHandle = await openFilePicker();
	const content = await readFile(fileHandle); 
	editor.execCommand('mceNewDocument');
	editor.setContent(content);
	window.fileHandle = fileHandle;
}

async function shareFile() {
	// Check if sharing files is supported
	if (navigator.canShare) {
		// Create file content
		const htmlContent = editor.getContent();
		const blob = new Blob([htmlContent], { type: 'text/html' });		

		// Create a File object
		const file = new File([blob], "document.html", {
			type: "text/html",
			lastModified: new Date().getTime()
		});		
		try {
		  await navigator.share({
			title: "My Shared File",
			text: "Check out this document!",
			files: [file]
		  });
		  console.log("File shared successfully");
		} catch (err) {
		  console.error("Share failed:", err.message);
		}
	} else {
        editor.notificationManager.open({
            text: 'File sharing not supported in your browser!',
            type: 'info',
            timeout: 5000
        });			
	}	
}
