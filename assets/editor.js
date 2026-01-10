const savedLang = localStorage.getItem('tinymce_language') || 'en_US';

function initializeTinyMCE(customSettings = {}, initialContent = '') {	
  // scripts/editor.js
  const editorHeight = window.innerHeight - 20; 
  var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
	// Get saved settings
	const savedSettings = window.getTinyMCESettings ? window.getTinyMCESettings() : {};
	const settings = { ...savedSettings, ...customSettings };
	const PAGE_MARGIN = 40; // Margin in pixels
	
  tinymce.init({
    selector: "textarea#mytextarea",
    mobile: {
      menubar: "custom edit insert format tools", // Mobile-specific menubar
      menu: {
        custom: { title: "File", items: "newdocument | open | save | preview | print" },
        tools: { title: "Tools", items: "spellchecker | screenshot | code wordcount" }
      }    
    },
    plugins: "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons spellchecker suggestions grammerchecker cloudsignin openfromcomputer savetocomputer universaldrive screenshot settings pageview givefeedback",
    imagetools_cors_hosts: ["picsum.photos"],
    menu: {
      custom: { title: "File", items: "pageview | opensubmenu | savesubmenu | preview | print" },
      tools: { title: "Tools", items: "spellchecker grammerchecker | screenshot | code wordcount | settings" },
      help: { title: "help", items: "help givefeedback | privacy terms" },
    },
    menubar: "custom edit view insert format tools table languages help",
    toolbar: "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify  | ltr rtl | spellchecker | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | outdent indent | numlist bullist",
    toolbar_sticky: true,
    autosave_ask_before_unload: true,
    autosave_interval: "30s",
    autosave_prefix: "{path}{query}-{id}-",
    autosave_restore_when_empty: false,
    autosave_retention: "2m",
    help_version_major: '3',
    help_version_minor: '1.1',
    image_advtab: true,
    height: editorHeight,
    image_caption: true,
    quickbars_selection_toolbar: "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
    noneditable_noneditable_class: "mceNonEditable",
    toolbar_mode: "sliding",
    contextmenu: "link image imagetools table spellchecker grammerchecker",
    skin: settings.skin || 'oxide',
    content_css: [ useDarkMode ? "dark" : "default", '/editor/assets/style.css' ],
    content_style: `body { font-family: ${settings.contentFontType || 'arial'}; font-size: ${settings.contentFontSize || '16px'}; } .page { padding: ${(settings.topBottomPadding || 40) + 'px'} ${(settings.leftRightPadding || 40 ) + 'px'}; background-color: ${settings.pageBackgroundColor || '#FFFFFF'}} .page::after {left: ${settings.pageNumberPosition || '50%'} }`,
    spellchecker_languages: "Bulgarian=bg,Catalan=ca,Czech=cs,Croatian=hr,Danish=da,Dutch=nl,English=en,French=fr_FR,German=de,Georgian=ka,Greek=el,Hebrew=he,Hungarian=hu,Italian=it,Korean=ko,Lithuanian=lt,Polish=pl,Portuguese=pt_PT,Persian=fa,Romanian=ro,Russian=ru,Spanish=es,Swedish=sv,Slovak=sk,Slovenian=sl,Turkish=tr,Uyghur=ug,Ukrainian=uk",
    spellchecker_rpc_url: window.location.origin+'/editor/tinymce_spellchecker/spellchecker.php',
    grammerchecker_language: "auto",
	  grammerchecker_rpc_url: 'https://api.languagetool.org/v2/check',
	font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Microsoft Uighur=Microsoft Uighur; UKIJ Ekran=UKIJEkranRegular; UKIJ Chiwer Kesme=UKIJChiwerKesmeRegular; UKIJ CJK=UKIJCJKRegular; UKIJ Kufi=UKIJKufiRegular; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
    language: settings.language !== 'en_US' ? settings.language : undefined,
    language_url: settings.language !== 'en_US' ? '/editor/langs/' + settings.language + '.js' : undefined,
	search_function: settings.language === 'en_US' ? async (keyword) => {
	  const response = await fetch(`https://restcountries.com/v2/name/${keyword}?fields=name`);
	  if (response.ok) {
		const jsonResponse = await response.json();
		return Object.values(jsonResponse)[0]["name"];
	  }
	} : undefined,    
    setup: function(editor) {
		editor.ui.registry.addNestedMenuItem('opensubmenu', {
				text: 'Open',
				icon: "browse",
				getSubmenuItems: function() {
					  return 'openfromcomputer googledriveopen onedriveopen';
				}
		});
		// Save submenu
		editor.ui.registry.addNestedMenuItem('savesubmenu', {
		  text: 'Save',
		  icon: "save",
		  getSubmenuItems: function() {
			  return 'savetocomputer googledrivesave onedrivesave';
		  }
		});			      
		editor.ui.registry.addToggleMenuItem("screenshot", {
		text: "Screenshot",
		icon: "edit-image",
		onAction: function() {
		  saveAsImage();
		}
		});
        editor.ui.registry.addMenuItem('privacy', {
            text: 'Privacy Policy',
            onAction: function() {
                window.open('editor/privacy_policy.html', '_blank');
            }
        });
        
        editor.ui.registry.addMenuItem('terms', {
            text: 'Terms and Conditions',
            onAction: function() {
                window.open('editor/terms_and_conditions.html', '_blank');
            }
        });		
		editor.on('init', function() {
		  // Apply UI font size
				// Remove old style if exists
				const oldStyle = document.getElementById('tinymce-ui-fontsize');
				if (oldStyle) oldStyle.remove();

				// Add new style
				const style = document.createElement('style');
				style.id = 'tinymce-ui-fontsize';
				style.textContent = `
						.tox .tox-toolbar,
						.tox .tox-toolbar__primary,
						.tox .tox-toolbar__group,
						.tox .tox-menubar,
						.tox .tox-statusbar,
						.tox .tox-tbtn,
						.tox .tox-dialog,
						.tox .tox-menu,
						.tox .tox-collection__item,
						.tox .tox-collection__item-label,
						.tox .tox-mbtn__select-label {
								font-size: ${settings.fontSize} !important;
						}
				`;
				document.head.appendChild(style);
		  
		  // Set initial content if provided
		  if (initialContent) {
			  editor.setContent(initialContent);
		  }
		});      
    }
  });
 }
 // Run the function when the document is ready
document.addEventListener('DOMContentLoaded', initializeTinyMCE);

// used to change UI language dynamically
function changeLanguage(newLang) {
  localStorage.setItem('tinymce_language', newLang);
  tinymce.remove();
  initializeTinyMCE(); // Reads from localStorage
}

// Optional: Reinitialize TinyMCE when the window is resized
window.addEventListener('load', function() {
  tinymce.remove(); // Remove the existing instance
  initializeTinyMCE(); // Reinitialize with the new height
});

