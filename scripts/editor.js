var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

tinymce.init({
  selector: 'textarea#mytextarea',
  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons spellchecker suggestions',
	search_function: async ( keyword ) => {
			const response = await fetch(`https://restcountries.com/v2/name/${keyword}?fields=name`);
			if(response.ok){
					const jsonResponse = await response.json();
					return Object.values(jsonResponse)[0]['name'];
			}else{
				 throw new Error("ERR")
			}
	},  
	imagetools_cors_hosts: ['picsum.photos'],
	menu: { custom: { title: 'File', items: 'newdocument | open | save | preview | print' },
					tools: { title: 'Tools', items: 'spellchecker | screenshot | code wordcount' },
					languages: { title: 'Language', items: 'Albanian Arabic Azerbaijani Bulgarian Catalan Czech Danish German Greek Spanish Persian Finnish French Hebrew Croatian Hungarian Indonesian Italian Japanese Georgian Kabyle Kazakh Korean Lithuanian Dutch Polish Portuguese Romanian Russian Slovak Slovenian Swedish Tamil Tajik Thai Turkish Uzbek Uyghur Ukrainian Chinese_Simplified Chinese_Traditional'}
	},
	menubar: 'custom edit view insert format tools table languages help',
  toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify  | ltr rtl | spellchecker | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | outdent indent | numlist bullist',
  toolbar_sticky: true,
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  height: 600,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image imagetools table spellchecker',
  skin: useDarkMode ? 'oxide-dark' : 'oxide',
  content_css: useDarkMode ? 'dark' : 'default',
  content_style: "body { font-family: Verdana,UKIJ,sans-serif; }",
	spellchecker_languages: 'Bulgarian=bg,Catalan=ca,Czech=cs,Croatian=hr,Danish=da,Dutch=nl,English=en,French=fr_FR,German=de,Georgian=ka,Greek=el,Hebrew=he,Hungarian=hu,Italian=it,Korean=ko,Lithuanian=lt,Polish=pl,Portuguese=pt_PT,Persian=fa,Romanian=ro,Russian=ru,Spanish=es,Swedish=sv,Slovak=sk,Slovenian=sl,Turkish=tr,Uyghur=ug,Ukrainian=uk',
	spellchecker_rpc_url: window.location.origin+'/tinymce_spellchecker/spellchecker.php',
	font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
	language: 'en',
  setup: function(editor) {
		// custom file menu item registry
    editor.ui.registry.addToggleMenuItem('open', {
      text: 'Open',
      icon: 'browse',
      onAction: function() {
        openFile();
      },
    });
    editor.ui.registry.addToggleMenuItem('save', {
      text: 'Save',
      icon: 'save',
      onAction: function() {
        saveFile();
      },
    });
    editor.ui.registry.addToggleMenuItem('screenshot', {
      text: 'Screenshot',
      icon: 'edit-image',
      onAction: function() {
        saveAsImage();
      },
    });		
		// language menu items registry
    editor.ui.registry.addMenuItem('Arabic', {
      text: 'Arabic',
      onAction: function () {
				const url = window.location.href+'Arabic';
        window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Albanian', {
      text: 'Albanian',
      onAction: function () {
				const url = window.location.href+'Albanian';
				window.open(url,"_self")
      }
    });		
    editor.ui.registry.addMenuItem('Azerbaijani', {
      text: 'Azerbaijani',
      onAction: function () {
				const url = window.location.href+'Azerbaijani';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Bulgarian', {
      text: 'Bulgarian',
      onAction: function () {
				const url = window.location.href+'Bulgarian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Catalan', {
      text: 'Catalan',
      onAction: function () {
				const url = window.location.href+'Catalan';
				window.open(url,"_self")
      }
    });		
    editor.ui.registry.addMenuItem('Czech', {
      text: 'Czech',
      onAction: function () {
				const url = window.location.href+'Czech';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Danish', {
      text: 'Danish',
      onAction: function () {
				const url = window.location.href+'Danish';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('German', {
      text: 'German',
      onAction: function () {
				const url = window.location.href+'German';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Greek', {
      text: 'Greek',
      onAction: function () {
				const url = window.location.href+'Greek';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Spanish', {
      text: 'Spanish',
      onAction: function () {
				const url = window.location.href+'Spanish';
				window.open(url,"_self")
      }
    });		
    editor.ui.registry.addMenuItem('Persian', {
      text: 'Persian',
      onAction: function () {
				const url = window.location.href+'Persian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Finnish', {
      text: 'Finnish',
      onAction: function () {
				const url = window.location.href+'Finnish';
				window.open(url,"_self")
      }
    });	
    editor.ui.registry.addMenuItem('Hebrew', {
      text: 'Hebrew',
      onAction: function () {
				const url = window.location.href+'Hebrew';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Croatian', {
      text: 'Croatian',
      onAction: function () {
				const url = window.location.href+'Croatian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Hungarian', {
      text: 'Hungarian',
      onAction: function () {
				const url = window.location.href+'Hungarian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Indonesian', {
      text: 'Indonesian',
      onAction: function () {
				const url = window.location.href+'Indonesian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Japanese', {
      text: 'Japanese',
      onAction: function () {
				const url = window.location.href+'Japanese';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Georgian', {
      text: 'Georgian',
      onAction: function () {
				const url = window.location.href+'Georgian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Kabyle', {
      text: 'Kabyle',
      onAction: function () {
				const url = window.location.href+'Kabyle';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Kazakh', {
      text: 'Kazakh',
      onAction: function () {
				const url = window.location.href+'Kazakh';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Korean', {
      text: 'Korean',
      onAction: function () {
				const url = window.location.href+'Korean';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Lithuanian', {
      text: 'Lithuanian',
      onAction: function () {
				const url = window.location.href+'Lithuanian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Polish', {
      text: 'Polish',
      onAction: function () {
				const url = window.location.href+'Polish';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Portuguese', {
      text: 'Portuguese',
      onAction: function () {
				const url = window.location.href+'Portuguese';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Romanian', {
      text: 'Romanian',
      onAction: function () {
				const url = window.location.href+'Romanian';
				window.open(url,"_self")
      }
    });		
    editor.ui.registry.addMenuItem('Russian', {
      text: 'Russian',
      onAction: function () {
				const url = window.location.href+'Russian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Slovak', {
      text: 'Slovak',
      onAction: function () {
				const url = window.location.href+'Slovak';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Slovenian', {
      text: 'Slovenian',
      onAction: function () {
				const url = window.location.href+'Slovenian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Swedish', {
      text: 'Swedish',
      onAction: function () {
				const url = window.location.href+'Swedish';
				window.open(url,"_self")
      }
    });	
    editor.ui.registry.addMenuItem('Tamil', {
      text: 'Tamil',
      onAction: function () {
				const url = window.location.href+'Tamil';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Tajik', {
      text: 'Tajik',
      onAction: function () {
				const url = window.location.href+'Tajik';
				window.open(url,"_self")
      }
    });		
    editor.ui.registry.addMenuItem('Thai', {
      text: 'Thai',
      onAction: function () {
				const url = window.location.href+'Thai';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Uzbek', {
      text: 'Uzbek',
      onAction: function () {
				const url = window.location.href+'Uzbek';
				window.open(url,"_self")
      }
    });		
    editor.ui.registry.addMenuItem('English', {
      text: 'English',
      onAction: function () {
				const url = window.location.href+'English';
				window.open(url,"_self")
      }
    });	
    editor.ui.registry.addMenuItem('Uyghur', {
      text: 'Uyghur',
      onAction: function () {
				const url = window.location.href+'Uyghur';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('French', {
      text: 'French',
      onAction: function () {
				const url = window.location.href+'French';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Italian', {
      text: 'Italian',
      onAction: function () {
				const url = window.location.href+'Italian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Dutch', {
      text: 'Dutch',
      onAction: function () {
				const url = window.location.href+'Dutch';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Turkish', {
      text: 'Turkish',
      onAction: function () {
				const url = window.location.href+'Turkish';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Ukrainian', {
      text: 'Ukrainian',
      onAction: function () {
				const url = window.location.href+'Ukrainian';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Welsh', {
      text: 'Welsh',
      onAction: function () {
				const url = window.location.href+'Welsh';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Chinese_Simplified', {
      text: 'Chinese Simplified',
      onAction: function () {
				const url = window.location.href+'Chinese_Simplified';
				window.open(url,"_self")
      }
    });
    editor.ui.registry.addMenuItem('Chinese_Traditional', {
      text: 'ChineseTraditional',
      onAction: function () {
				const url = window.location.href+'Chinese_Traditional';
				window.open(url,"_self")
      }
    });		
  }	
 });

let fileHandle;

async function openFile() {
	// open file picker, destructure the one element returned array
	const options = {
	 types: [
		 {
			 description: "Text files",
			 accept: {
				 "text/plain": [".txt"],
			 },
		 },
	 ],
	};			
	[fileHandle] = await window.showOpenFilePicker(options);
	// run code with our fileHandle
	 
	const file = await fileHandle.getFile();
	const content = await file.text();
	
	tinymce.get("mytextarea").setContent(content);
	
	return content;
}


async function saveFile() {
 const options = {
	 types: [
		 {
			 description: "Text files",
			 accept: {
				 "text/plain": [".txt"],
			 },
		 },
	 ],
 };
 
 const handle = await window.showSaveFilePicker(options);
 const writable = await handle.createWritable();
 
 const content = tinymce.get("mytextarea").getContent();
 await writable.write(content);
 await writable.close();
 
 return handle;
}

var FileSaver = require('file-saver');
var html2canvas = require('html2canvas');
async function saveAsImage() {
	// add empty line offset
	var content = tinymce.get("mytextarea").getContent()+'<p>&nbsp;</p>';
	tinymce.get("mytextarea").setContent(content);
	
	var elem = tinymce.get("mytextarea").contentDocument.body;
	html2canvas(elem).then(function(canvas) {
			canvas.toBlob(function(blob) {
					saveAs(blob, "my-doc.png");
			});
	});
}