tinymce.PluginManager.add('openfromgdrive', function(editor, url) {
    let pickerOpen = false;
    
    editor.ui.registry.addButton('openfromgdrive', {
        text: 'Open from Drive',
        onAction: function() {
            openGoogleDrivePicker();
        }
    });

    editor.ui.registry.addMenuItem('openfromgdrive', {
        text: 'Google Drive',
        onAction: function() {
            openGoogleDrivePicker();
        }
    });

    function restoreEditorFocus() {
        setTimeout(() => {
            editor.focus();
            editor.fire('focus');
        }, 0);
    }

	async function openGoogleDrivePicker() {
		// Prevent multiple pickers from opening
		if (pickerOpen) {
		    return;
		}
		
		let pickerLoaded = false;
		
		// Use the global authentication system
		const authenticated = await window.requireCloudAuth('google', function(provider) {
		    // This callback runs after successful authentication
		    loadGooglePicker(provider);
		    pickerLoaded = true;
		});
		
		// If already authenticated and callback didn't load the picker, load it now
		if (authenticated && !pickerLoaded) {
		    loadGooglePicker(window.cloudProviders.google);
		}
	}

    function showSignInDialog() {
        const dialogConfig = {
            title: 'Sign In Required',
            size: 'normal',
            body: {
                type: 'panel',
                items: [
                    {
                        type: 'htmlpanel',
                        html: `
                            <div style="text-align: center; padding: 40px 20px;">
								<div style="margin-bottom: 20px;">
									<img src="https://www.gstatic.com/images/branding/product/2x/drive_2020q4_64dp.png" 
										 alt="Google Drive" 
										 style="width: 64px; height: 64px;">
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
                },
                {
                    type: 'custom',
                    text: 'Sign In with Google',
                    name: 'signin',
                    primary: true
                }
            ],
            onAction: function(api, details) {
                if (details.name === 'signin') {
                    api.close();
                    // Open sign-in popup
                    openSignInPopup();
                }
            }
        };

        editor.windowManager.open(dialogConfig);
    }

    function openSignInPopup() {
        const width = 600;
        const height = 700;
        const left = (screen.width - width) / 2;
        const top = (screen.height - height) / 2;
        
        const popup = window.open(
            '/auth/google',
            'GoogleAuth',
            `width=${width},height=${height},left=${left},top=${top},toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes`
        );
        
        if (!popup) {
            editor.notificationManager.open({
                text: 'Popup blocked! Please allow popups for this site.',
                type: 'error',
                timeout: 5000
            });
        }
    }

    function loadGooglePicker(provider) {
        // Ensure gapi is loaded
        if (typeof gapi === 'undefined') {
            editor.notificationManager.open({
                text: 'Google API is loading... Please try again.',
                type: 'info',
                timeout: 2000
            });
            return;
        }
        
        // Wait for gapi.client to be ready
        if (!gapi.client || !gapi.client.setToken) {
            editor.notificationManager.open({
                text: 'Google API not ready. Please wait and try again.',
                type: 'info',
                timeout: 2000
            });
            return;
        }
        
        // Set token
        gapi.client.setToken({ access_token: provider.token });

        // Load Google Picker
        gapi.load('picker', function() {
            pickerOpen = true;
            const picker = new google.picker.PickerBuilder()
                .addView(google.picker.ViewId.DOCS)
                .setOAuthToken(provider.token)
                .setDeveloperKey(provider.apiKey)
                .setCallback(pickerCallback)
                .setTitle('Open from Google Drive')
                .build();
            picker.setVisible(true);
        });
    }

    function pickerCallback(data) {
        if (data.action === google.picker.Action.PICKED) {
            const file = data.docs[0];
            loadFileContent(file.id, file.name);
            restoreEditorFocus();
        } 
        else if (data.action === google.picker.Action.CANCEL) {
            editor.notificationManager.open({
                text: 'Selection cancelled',
                type: 'info',
                timeout: 2000
            });
            restoreEditorFocus();
        }
        
        // Reset picker flag when closed
        pickerOpen = false;
    }

    async function loadFileContent(fileId, fileName) {
        try {
			const extension = fileName.substring(fileName.lastIndexOf('.')).toLowerCase();
		    // Convert to HTML based on file type
		    if (extension === '.html') {
		        const response = await gapi.client.drive.files.get({
		            fileId: fileId,
		            alt: 'media'
		        });		    
		    	editor.setContent(response.body);
		    } else {
				if (extension === '.docx') {
				  // For binary files, use fetch to get as blob
				    const accessToken = gapi.auth.getToken().access_token;
				    const fetchResponse = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
				        headers: {
				            'Authorization': `Bearer ${accessToken}`
				        }
				    });
				    
				    if (!fetchResponse.ok) {
				        throw new Error('Failed to download file');
				    }
				    
				    const blob = await fetchResponse.blob();
				    htmlContent = await window.fileConverter.convertToHtml(blob, extension);
				} else {
				    const response = await gapi.client.drive.files.get({
				        fileId: fileId,
				        alt: 'media'
				    });				
				    // For text files, read as text first
				    htmlContent = await window.fileConverter.convertToHtml(response.body, extension);
				}
				
				// Recalculate pages
				setTimeout(() => {
				    if (window.reapplyPageView) {
				        window.reapplyPageView(htmlContent);
				    }
				}, 100);		    
		    }
            
            window.currentGDriveFile = {
                id: fileId,
                name: fileName
            };

            editor.notificationManager.open({
                text: 'Opened: ' + fileName,
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

    return {
        getMetadata: function() {
            return {
                name: 'Open from Google Drive',
                url: 'http://yoursite.com'
            };
        }
    };
});
