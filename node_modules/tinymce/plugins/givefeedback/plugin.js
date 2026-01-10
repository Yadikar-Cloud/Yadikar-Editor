/**
 * TinyMCE 5 Give Feedback Plugin
 * Version: 1.0.0
 */
(function() {
  'use strict';

  tinymce.PluginManager.add('givefeedback', function(editor, url) {
    
    // Register the button
    editor.ui.registry.addButton('givefeedback', {
      text: 'Give Feedback',
      icon: 'comment',
      tooltip: 'Send Feedback',
      onAction: function() {
        openDialog();
      }
    });

    // Register menu item
    editor.ui.registry.addMenuItem('givefeedback', {
      text: 'Give Feedback',
      icon: 'comment',
      onAction: function() {
        openDialog();
      }
    });
    
    // Inject CSS for textarea height (do this once)
    if (!document.getElementById('givefeedback-style')) {
      var style = document.createElement('style');
      style.id = 'givefeedback-style';
      style.innerHTML = `
        .tox-dialog__body-content .tox-form__group:last-child textarea {
          min-height: 150px !important;
          height: 150px !important;
        }
      `;
      document.head.appendChild(style);
    }
    
    // Open dialog function
    function openDialog() {
      editor.windowManager.open({
        title: 'Give Feedback',
        size: 'normal',
        body: {
          type: 'panel',
          items: [
            {
              type: 'input',
              name: 'title',
              label: 'Title',
              placeholder: 'Enter feedback title'
            },
            {
              type: 'textarea',
              name: 'message',
              label: 'Message',
              placeholder: 'Enter your feedback message',
              height: '300px',  
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
            text: 'Send',
            primary: true
          }
        ],
        onSubmit: function(api) {
          var data = api.getData();
          
          // Validate inputs
          if (!data.title || !data.message) {
            editor.notificationManager.open({
              text: 'Please fill in all fields',
              type: 'error',
              timeout: 3000
            });
            return;
          }

          // Show loading notification
          var notification = editor.notificationManager.open({
            text: 'Sending feedback...',
            type: 'info',
            timeout: 0
          });

          // Send POST request
          var xhr = new XMLHttpRequest();
          xhr.open('POST', '/feedback/send', true);
          xhr.setRequestHeader('Content-Type', 'application/json');
          
          xhr.onload = function() {
            notification.close();
            
            if (xhr.status === 200) {
              try {
                var response = JSON.parse(xhr.responseText);
                
                if (response.success) {
                  editor.notificationManager.open({
                    text: 'Feedback sent successfully!',
                    type: 'success',
                    timeout: 3000
                  });
                  api.close();
                } else {
                  editor.notificationManager.open({
                    text: 'Error: ' + (response.message || 'Failed to send feedback'),
                    type: 'error',
                    timeout: 5000
                  });
                }
              } catch (e) {
                editor.notificationManager.open({
                  text: 'Error parsing response',
                  type: 'error',
                  timeout: 3000
                });
              }
            } else {
              editor.notificationManager.open({
                text: 'Server error: ' + xhr.status,
                type: 'error',
                timeout: 3000
              });
            }
          };
          
          xhr.onerror = function() {
            notification.close();
            editor.notificationManager.open({
              text: 'Network error. Please try again.',
              type: 'error',
              timeout: 3000
            });
          };
          
          // Send the data
          xhr.send(JSON.stringify({
            title: data.title,
            message: data.message,
            editor_content: editor.getContent()
          }));
        }
      });
    }

    // Return plugin metadata
    return {
      getMetadata: function() {
        return {
          name: 'Give Feedback Plugin',
          url: 'https://example.com'
        };
      }
    };
  });
})();
