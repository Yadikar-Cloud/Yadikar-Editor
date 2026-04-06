tinymce.PluginManager.add('openfromdrive', function(editor, url) {
    editor.ui.registry.addMenuItem('opengoogledrive', {
        text: 'Google Drive',
        onAction: function() {
            openDrivePicker('google');
        }
    });
    
    editor.ui.registry.addMenuItem('openonedrive', {
        text: 'OneDrive',
        onAction: function() {
            openDrivePicker('onedrive');
        }
    });

	async function openDrivePicker(provider) {
		let pickerLoaded = false;
		
		// Use the global authentication system
		const authenticated = await window.requireCloudAuth(provider, function(provider) {
		    // This callback runs after successful authentication
		    showFileSelectionDialog(provider);
		    pickerLoaded = true;
		});
		
		// If already authenticated and callback didn't load the picker, load it now
		if (authenticated && !pickerLoaded) {
		    showFileSelectionDialog(window.cloudProviders[provider]);
		}
	}

	function showFileSelectionDialog(provider) {
		// Clean up any previous dialog state
		if (window.selectDriveFileToOpen) {
		    delete window.selectDriveFileToOpen;
		}
		if (window.openDriveFolderInOpenDialog) {
		    delete window.openDriveFolderInOpenDialog;
		}
		if (window.navigateToDriveBreadcrumbInOpen) {
		    delete window.navigateToDriveBreadcrumbInOpen;
		}

		// Initialize folder navigation
		let currentFolderId = 'root';
		let folderStack = [{id: 'root', name: 'My Drive'}];
		let dialogInstance = null;

		const dialogConfig = {
		    title: 'Open from Drive',
		    size: 'medium',
		    body: {
		        type: 'panel',
		        items: [
		            {
		                type: 'htmlpanel',
		                html: `
		                    <div id="onedrive-open-dialog-container" style="min-height: 400px !important;">
		                        <div id="onedrive-open-breadcrumb" style="padding: 10px; background: #f5f5f5; border-bottom: 1px solid #ddd; font-size: 13px;">
		                            <span>☁️ My Drive</span>
		                        </div>
		                        <div id="onedrive-open-item-list" style="padding: 10px; max-height: 400px; overflow-y: auto;">
		                            <div style="text-align: center; padding: 20px; color: #666;">
		                                Loading...
		                            </div>
		                        </div>
		                    </div>
		                `
		            }
		        ]
		    },
		    buttons: [
		        {
		            type: 'cancel',
		            text: 'Cancel'
		        }
		    ],
		    onClose: function() {
		        if (window.selectDriveFileToOpen) {
		            delete window.selectDriveFileToOpen;
		        }
		        if (window.openDriveFolderInOpenDialog) {
		            delete window.openDriveFolderInOpenDialog;
		        }
		        if (window.navigateToDriveBreadcrumbInOpen) {
		            delete window.navigateToDriveBreadcrumbInOpen;
		        }
		    }
		};

		dialogInstance = editor.windowManager.open(dialogConfig);

		// Load items after dialog opens
		setTimeout(() => {
		    if (dialogInstance) {
		        loadDriveItems(provider, currentFolderId);
		    }
		}, 100);

		// Helper function to load items (files and folders)
		async function loadDriveItems(provider, folderId) {
		    const itemListEl = document.getElementById('onedrive-open-item-list');
		    if (!itemListEl) return;

		    itemListEl.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">Loading...</div>';

		    try {
		    	let url;
		    	if (provider.name === 'Google Drive')
		    	{
					const query = folderId === 'root' 
						? "'root' in parents and trashed=false"
						: `'${folderId}' in parents and trashed=false`;

					url = 'https://www.googleapis.com/drive/v3/files?' + new URLSearchParams({
						q: query,
						fields: 'files(id,name,mimeType)',
						pageSize: 100
					});		    		
		    	}
		    	else if(provider.name === 'OneDrive')
		    	{
				    url = folderId === 'root' 
				        ? 'https://graph.microsoft.com/v1.0/me/drive/root/children'
				        : `https://graph.microsoft.com/v1.0/me/drive/items/${folderId}/children`;
				}
				else 
				{
				    editor.notificationManager.open({
				        text: 'Unkonwn Drive Provider:' + '${provider}',
				        type: 'error',
				        timeout: 5000
				    });
				    return;					
				}
		        const response = await fetch(url, {
		            headers: {
		                'Authorization': 'Bearer ' + provider.token
		            }
		        });

		        if (!response.ok) {
		            throw new Error('Failed to load items');
		        }

		        const data = await response.json();
		        renderItems(data.value || data.files || [], provider);

		    } catch (error) {
		        console.error('Error loading items:', error);
		        itemListEl.innerHTML = `<div style="text-align: center; padding: 20px; color: #ea4335;">Failed to load items: ${error.message}</div>`;
		    }
		}

		function renderItems(items, provider) {
			const itemListEl = document.getElementById('onedrive-open-item-list');
			if (!itemListEl) return;
			
			// Check provider and filter accordingly
			let folders, textFiles;
			
			if (provider.name === 'Google Drive') {
				// Google Drive filtering
				folders = items.filter(item => 
				    item.mimeType === 'application/vnd.google-apps.folder'
				);
				textFiles = items.filter(item => 
				    item.mimeType !== 'application/vnd.google-apps.folder' && (
				        item.name.endsWith('.txt') || 
				        item.name.endsWith('.html') || 
				        item.name.endsWith('.htm') ||
				        item.name.endsWith('.md') ||
				        item.name.endsWith('.json') ||
				        item.name.endsWith('.doc') ||
				        item.name.endsWith('.docx')
				    )
				);
			} else {
				// OneDrive filtering
				folders = items.filter(item => item.folder);
				textFiles = items.filter(item => 
				    item.file && (
				        item.name.endsWith('.txt') || 
				        item.name.endsWith('.html') || 
				        item.name.endsWith('.htm') ||
				        item.name.endsWith('.md') ||
				        item.name.endsWith('.json') ||
				        item.name.endsWith('.doc') ||
				        item.name.endsWith('.docx')
				    )
				);
			}
			
			if (folders.length === 0 && textFiles.length === 0) {
				itemListEl.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">No folders or supported files in this location</div>';
				return;
			}
			
			let html = '<div style="display: flex; flex-direction: column; gap: 5px;">';
			
			// Add folders first
			folders.forEach(folder => {
				html += `
				    <div class="onedrive-item" data-id="${folder.id}" data-name="${escapeHtml(folder.name)}" data-is-folder="true"
				         style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s;"
				         onmouseover="this.style.background='#f0f0f0'" 
				         onmouseout="this.style.background='white'"
				         ondblclick="window.openDriveFolderInOpenDialog('${folder.id}', '${escapeHtml(folder.name)}')">
				        <span style="font-size: 24px;">📁</span>
				        <div>
				            <div style="font-weight: 500; color: #333;">${escapeHtml(folder.name)}</div>
				            <div style="font-size: 11px; color: #666;">Folder</div>
				        </div>
				    </div>
				`;
			});
			
			// Add files
			textFiles.forEach(file => {
				html += `
				    <div class="onedrive-item" data-id="${file.id}" data-name="${escapeHtml(file.name)}" data-is-folder="false"
				         style="padding: 10px; border: 1px solid #ddd; border-radius: 4px; cursor: pointer; display: flex; align-items: center; gap: 10px; transition: background 0.2s;"
				         onmouseover="this.style.background='#f0f0f0'" 
				         onmouseout="this.style.background='white'"
				         onclick="window.selectDriveFileToOpen('${file.id}', '${escapeHtml(file.name)}')">
				        <span style="font-size: 24px;">📄</span>
				        <div>
				            <div style="font-weight: 500; color: #333;">${escapeHtml(file.name)}</div>
				            <div style="font-size: 11px; color: #666;">${formatFileSize(file.size)}</div>
				        </div>
				    </div>
				`;
			});
			
			html += '</div>';
			itemListEl.innerHTML = html;
		}

		// Global function for selecting and opening a file
		window.selectDriveFileToOpen = function(fileId, fileName) {
		    dialogInstance.close();
		    const file = { id: fileId, name: fileName };
		    loadFileContent(file, provider);
		};

		// Global function for double-click to open folder
		window.openDriveFolderInOpenDialog = function(folderId, folderName) {
		    currentFolderId = folderId;
		    folderStack.push({id: folderId, name: folderName});
		    updateBreadcrumb();
		    loadDriveItems(provider, folderId);
		};

		function updateBreadcrumb() {
		    const breadcrumbEl = document.getElementById('onedrive-open-breadcrumb');
		    if (!breadcrumbEl) return;

		    let html = '<span>☁️</span> ';
		    folderStack.forEach((folder, index) => {
		        if (index > 0) html += ' / ';
		        html += `<a href="#" onclick="window.navigateToDriveBreadcrumbInOpen(${index}); return false;" style="color: #0078d4; text-decoration: none;">${escapeHtml(folder.name)}</a>`;
		    });

		    breadcrumbEl.innerHTML = html;
		}

		window.navigateToDriveBreadcrumbInOpen = function(index) {
		    folderStack = folderStack.slice(0, index + 1);
		    currentFolderId = folderStack[index].id;
		    updateBreadcrumb();
		    loadDriveItems(provider, currentFolderId);
		};
	}

    async function loadFileContent(file, provider) {
        try {
            // Get download URL
            if (provider.name === 'Google Drive')
            {
            	const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
            }
            else if (provider.name === 'OneDrive')
            {
            	const url = `https://graph.microsoft.com/v1.0/me/drive/items/${file.id}/content`;
            }
            const response = await fetch(url, {
                headers: {
                    'Authorization': 'Bearer ' + provider.token
                }
            });

            if (!response.ok) {
                throw new Error('Failed to download file');
            }

			const extension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
		    // Convert to HTML based on file type
		    if (extension === '.html') {
		    	const content = await response.text();
		    	editor.setContent(content);
		    } else {
				if (extension === '.docx') {
				    // For binary files, pass the blob
				    const blob = await response.blob();
				    htmlContent = await window.fileConverter.convertToHtml(blob, extension);
				} else {
				    // For text files, read as text first
				    const content = await response.text();
				    htmlContent = await window.fileConverter.convertToHtml(content, extension);
				}
				
				// Recalculate pages
				setTimeout(() => {
				    if (window.reapplyPageView) {
				        window.reapplyPageView(htmlContent);
				    }
				}, 100);		    
		    }			
            
            window.currentDriveFile = {
                id: file.id,
                name: file.name
            };

            editor.notificationManager.open({
                text: 'Opened: ' + file.name,
                type: 'success',
                timeout: 3000
            });

        } catch (error) {
            console.error('Error loading file:', error);
            editor.notificationManager.open({
                text: 'Failed to open file: ' + error.message,
                type: 'error',
                timeout: 5000
            });
        }
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    }

    return {
        getMetadata: function() {
            return {
                name: 'Open from Drive',
                url: 'http://yoursite.com'
            };
        }
    };
});
