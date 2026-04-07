tinymce.PluginManager.add('file', function(editor, url) {
    
    window.fileHandle = null;

    // Add button to toolbar
    editor.ui.registry.addButton('open', {
        icon: "browse",
        tooltip: 'Open',
        onAction: function() {
            openFile();
        }
    });

    // Add menu item
    editor.ui.registry.addMenuItem('open', {
        text: 'Open',
        icon: "browse",
        shortcut: 'Ctrl+O',
        onAction: function() {
            openFile();
        }
    });

	editor.addCommand('mceOpen', function () {
		openFile();
	});
    
    editor.addShortcut('Meta+O', '', 'mceOpen');
    
    // Add button to toolbar
    editor.ui.registry.addButton('save', {
        icon: "save",
        tooltip: 'Save',
        onAction: function() {
            saveFile();
        }
    });    
    
    // Add menu item
    editor.ui.registry.addMenuItem('save', {
        text: 'Save',
        icon: "save",
        shortcut: 'Ctrl+S',
        onAction: function() {
            saveFile();
        }
    });

    editor.ui.registry.addMenuItem('saveas', {
        text: 'Save As...',
        icon: "save",
        onAction: function() {
            saveFile(true);
        }
    });
    
    editor.ui.registry.addMenuItem('share', {
        text: 'Share',
        icon: 'export',
        onAction: function() {
            shareFile();
        }
    });

    editor.ui.registry.addMenuItem('information', {
        text: 'File information',
        icon: 'info',
        onAction: function() {
        	if(window.fileHandle || window.tauriFilePath) {
            	fileAttributes();
            } else {
		        editor.notificationManager.open({
		            text: `Please open a file to show file information!`,
		            type: 'info',
		            timeout: 3000
		        }); 	
            }
        }
    });

	editor.ui.registry.addToggleMenuItem("exportpdf", {
	    text: 'Export as PDF',
	    icon: 'exportpdf',
		onAction: async function() {
			var iframeWindow = editor.getWin();
			await iframeWindow.generatePDF();
		}
	});
	
	editor.ui.registry.addToggleMenuItem("exportepub", {
		text: 'Export as ePUB',
		icon: 'exportepub',
		onAction: async function() {
			// Open a simple TinyMCE dialog
			const result = await editor.windowManager.open({
			    title: 'Add Book Metadata',
			    body: {
			        type: 'panel',
			        items: [
			            {
			                type: 'input',
			                name: 'title',
			                label: 'Title',
			            },
			            {
			                type: 'input',
			                name: 'author',
			                label: 'Author'
			            },
			            {
			                type: 'textarea',
			                name: 'description',
			                label: 'Description',
			                height: '300px',
			            },				            
			            {
			                type: 'input',
			                name: 'language',
			                label: 'Language (e.g., en)'
			            }
			        ]
			    },
			    buttons: [
			        {
			            type: 'cancel',
			            text: 'Cancel'
			        },
			        {
			            type: 'submit',
			            text: 'Export'
			        }
			    ],
			    onSubmit: async function(api) {
			        const data = api.getData(); // { title, author, language }

			        // Get the iframe window
			        const iframeWindow = editor.getWin();

			        // Call your EPUB generation function, passing the metadata object
			        await iframeWindow.generateEPUB(data);

			        api.close();
			    }
			});
		}
	});
	       
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

	async function saveBlob(asNew, blob, isBinary, opts) {
	  // 1) Tauri desktop environment
		if (window.__TAURI__) {
			const { save: saveDialog } = window.__TAURI__.dialog;
			const { writeFile, writeTextFile } = window.__TAURI__.fs;
			const extension = Object.values(opts.types[0].accept)[0][0].slice(1);
			// Pick a new path if no path saved yet, or asNew is requested
			//console.log(opts.suggestedName);
			if (!window.tauriFilePath || asNew) {
				const filePath = await saveDialog({
					defaultPath: opts.suggestedName,
					filters: [{ name: opts.types[0].description, extensions: [extension] }]
				});

				if (!filePath) return; // user cancelled

				if(isBinary)
					await writeFile(filePath, blob);
				else
					await writeTextFile(filePath, blob);
				return;
			}
			if(isBinary)
				await writeFile(window.tauriFilePath, blob);
			else
				await writeTextFile(window.tauriFilePath, blob);
			return;
		}
		// 2) Chromium File System Access API
		else if (window.showOpenFilePicker) {
			if(!window.fileHandle || asNew)
			{
				const fileHandle = await window.showSaveFilePicker(opts);
				await writeFile(fileHandle, blob);
				return;
			}

			await writeFile(window.fileHandle, blob);
			return;
		}

		// 3) Firefox / Safari fallback
		const rblob = new Blob([blob], { type: 'text/html' });
		const url = URL.createObjectURL(rblob);
		const a = document.createElement('a');
		a.href = url;
		a.download = opts.suggestedName;
		a.click();
		URL.revokeObjectURL(url);
	}

	async function saveFile(asNew) {
		const htmlDoc = editor.getDoc();
		const htmlString = '<!DOCTYPE html>\n' + htmlDoc.documentElement.outerHTML;
		const types = window.getFilePickerOption();
		saveBlob(asNew, htmlString, false, types[0]);
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

	async function openFile() {
		const types = window.getFilePickerOption();
		const options = types[0]; // html
		// 1) tauri environment
		let fileName = null;
		let content = null;
		if (window.__TAURI__) {
		    const { open: openDialog } = window.__TAURI__.dialog;
		    const { readTextFile } = window.__TAURI__.fs;
			const extension = Object.values(options.types[0].accept)[0][0].slice(1);
		    // Opens a native file picker dialog
		    const filePath = await openDialog({
		        multiple: false,
		        filters: [{ name: options.types[0].description, extensions: [extension] }]
		    });

		    if (!filePath) return null; // user cancelled
			window.tauriFilePath = filePath;
			fileName = window.tauriFilePath.split(/[\\/]/).pop();
			
		    content = await readTextFile(filePath);	  
		}
		// 2) browser File System API
		else if(window.showOpenFilePicker) {
			const [fileHandle] = await window.showOpenFilePicker(options);  
			window.fileHandle = fileHandle;	// use global variable to save to the file later
			fileName = window.fileHandle.name;
			const file = await fileHandle.getFile();
			content = await file.text();
		}
		else {
			// 3) legacy file access on Firefox
			const file = await openFilePicker();
			fileName = file.name;
			content = await readFile(file);
		}
		const doc = new DOMParser().parseFromString(content, 'text/html');
		editor.setContent(doc.body.innerHTML);
		titleUpdate._setTitle(fileName + '-Yadikar Editor');
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
	async function fileAttributes() {
		var object = {};
		if (window.__TAURI__) {
			const { stat, BaseDirectory } = window.__TAURI__.fs;
			const metadata = await stat(window.tauriFilePath, {
				baseDir: BaseDirectory.AppLocalData,  // required if path is relative
			});
			//console.log(metadata);

			object.name = window.tauriFilePath.split(/[\\/]/).pop();
			const extension  = object.name.split('.').pop().toLowerCase();
			object.type = window.getMimeType('.' + extension);
			object.size = metadata.size;
			object.lastModified = metadata.mtime;
		}
		else if (window.showOpenFilePicker) {
			const file = await window.fileHandle.getFile();
			object.name = file.name;
			object.type = file.type;
			object.size = file.size;
			object.lastModified = file.lastModified;
		}
		
		const formatSize = (bytes) => {
		    if (bytes < 1024) return `${bytes} B`;
		    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
		};

		const formatDate = (timestamp) => {
		    return new Date(timestamp).toLocaleString();
		};

		editor.windowManager.open({
		    title: 'File Information',
		    size: 'normal',
		    body: {
		        type: 'panel',
		        items: [
		            {
		                type: 'grid',
		                columns: 2,
		                items: [
		                    { type: 'htmlpanel', html: '<strong>Name:</strong>' },
		                    { type: 'htmlpanel', html: object.name },

		                    { type: 'htmlpanel', html: '<strong>Type:</strong>' },
		                    { type: 'htmlpanel', html: object.type || 'unknown' },

		                    { type: 'htmlpanel', html: '<strong>Size:</strong>' },
		                    { type: 'htmlpanel', html: formatSize(object.size) },

		                    { type: 'htmlpanel', html: '<strong>Last Modified:</strong>' },
		                    { type: 'htmlpanel', html: formatDate(object.lastModified) },
		                ]
		            }
		        ]
		    },
		    buttons: [
		        {
		            type: 'cancel',
		            text: 'Close'
		        }
		    ]
		});
	}

	titleUpdate = {
		unsavedMessage: '*[Unsaved]-',
		savedMessage: '[Saved]-',

		_isTauri: () => typeof window.__TAURI__ !== 'undefined',
		
		_getTitle: function () {
			if (window.tauriFilePath) {
				// Extract filename from full path (handles both / and \ separators)
				return window.tauriFilePath.split(/[\\/]/).pop();
			}
			if (window.fileHandle) {
				return window.fileHandle.name;
			}
			return null;
		},
		
		_setTitle: async function (fullTitle) {
			document.title = fullTitle;
			if (this._isTauri()) {
				try {
					const { getCurrentWindow } = window.__TAURI__.window;
					await getCurrentWindow().setTitle(fullTitle);
				} catch (e) {
					console.warn('Tauri setTitle failed:', e);
				}
			}
		},

		addUnsavedMsg: function () {
			if (!document.title.includes(this.unsavedMessage) && (window.fileHandle || window.tauriFilePath)) {
				this._setTitle(this.unsavedMessage + this._getTitle() + '-Yadikar Editor');
			}
		},

		addSavedMsg: function () {
			if (!document.title.includes(this.savedMessage) && (window.fileHandle || window.tauriFilePath)) {
				this._setTitle(this.savedMessage + this._getTitle() + '-Yadikar Editor');
			}
		}
	};
	
	editor.on('init', function() {
		editor.saveFile = saveFile;
		window.saveBlob = saveBlob;
		window.titleUpdate = titleUpdate;
	});

	// unsaved change handler
	editor.on('dirty', function() {
		// Your custom function here
		// console.log('Editor is now dirty');
		titleUpdate.addUnsavedMsg();
	});
	
	// autosave handler
	editor.on('StoreDraft', function() {
		if((window.fileHandle || window.tauriFilePath) && editor.isDirty()) {
			editor.execCommand('mceSave'); // or your custom save logic
		}
		titleUpdate.addSavedMsg();
	});	
	
    return {
        getMetadata: function() {
            return {
                name: 'Open from Computer',
                url: 'http://yoursite.com'
            };
        }
    };
});
