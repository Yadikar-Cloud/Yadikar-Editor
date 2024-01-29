var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

tinymce.init({
  selector: 'textarea#mytextarea',
  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons spellchecker',
  imagetools_cors_hosts: ['picsum.photos'],
	menu: { custom: { title: 'File', items: 'newdocument | open | save | preview | print' },languages: { title: 'Language', items: 'Albanian Arabic Azerbaijani Bulgarian Catalan Czech Danish German Greek Spanish Persian Finnish French Hebrew Croatian Hungarian Indonesian Italian Japanese Georgian Kabyle Kazakh Korean Lithuanian Dutch Polish Portuguese Romanian Russian Slovak Slovenian Swedish Tamil Tajik Thai Turkish Uzbek Uyghur Ukrainian Chinese_Simplified Chinese_Traditional'}},
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
  content_style: "@import url('https://fontlibrary.org//face/ukij-ekran'); @import url('https://fontlibrary.org//face/ukij-chiwer-kesme'); @import url('https://fontlibrary.org//face/ukij-cjk'); @import url('https://fontlibrary.org//face/ukij-kufi'); body { font-family: Verdana,UKIJ,sans-serif; }",
	spellchecker_languages: 'Bulgarian=bg,Catalan=ca,Czech=cs,Croatian=hr,Danish=da,Dutch=nl,English=en,French=fr_FR,German=de,Georgian=ka,Greek=el,Hebrew=he,Hungarian=hu,Italian=it,Korean=ko,Lithuanian=lt,Polish=pl,Portuguese=pt_PT,Persian=fa,Romanian=ro,Russian=ru,Spanish=es,Swedish=sv,Slovak=sk,Slovenian=sl,Turkish=tr,Uyghur=ug,Ukrainian=uk',
	spellchecker_rpc_url: 'https://editor.yadikar.it/tinymce_spellchecker/spellchecker.php',
	font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Microsoft Uighur=Microsoft Uighur; UKIJEkranRegular=UKIJEkranRegular; UKIJChiwerKesmeRegular=UKIJChiwerKesmeRegular; UKIJCJKRegular=UKIJCJKRegular; UKIJKufiRegular=UKIJKufiRegular; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
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
		// language menu items registry
    editor.ui.registry.addMenuItem('Arabic', {
      text: 'Arabic',
      onAction: function () {
        window.open("https://editor.yadikar.it/Arabic","_self")
      }
    });
    editor.ui.registry.addMenuItem('Albanian', {
      text: 'Albanian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Albanian","_self")
      }
    });		
    editor.ui.registry.addMenuItem('Azerbaijani', {
      text: 'Azerbaijani',
      onAction: function () {
        window.open("https://editor.yadikar.it/Azerbaijani","_self")
      }
    });
    editor.ui.registry.addMenuItem('Bulgarian', {
      text: 'Bulgarian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Bulgarian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Catalan', {
      text: 'Catalan',
      onAction: function () {
        window.open("https://editor.yadikar.it/Catalan","_self")
      }
    });		
    editor.ui.registry.addMenuItem('Czech', {
      text: 'Czech',
      onAction: function () {
        window.open("https://editor.yadikar.it/Czech","_self")
      }
    });
    editor.ui.registry.addMenuItem('Danish', {
      text: 'Danish',
      onAction: function () {
        window.open("https://editor.yadikar.it/Danish","_self")
      }
    });
    editor.ui.registry.addMenuItem('German', {
      text: 'German',
      onAction: function () {
        window.open("https://editor.yadikar.it/German","_self")
      }
    });
    editor.ui.registry.addMenuItem('Greek', {
      text: 'Greek',
      onAction: function () {
        window.open("https://editor.yadikar.it/Greek","_self")
      }
    });
    editor.ui.registry.addMenuItem('Spanish', {
      text: 'Spanish',
      onAction: function () {
        window.open("https://editor.yadikar.it/Spanish","_self")
      }
    });		
    editor.ui.registry.addMenuItem('Persian', {
      text: 'Persian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Persian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Finnish', {
      text: 'Finnish',
      onAction: function () {
        window.open("https://editor.yadikar.it/Finnish","_self")
      }
    });	
    editor.ui.registry.addMenuItem('Hebrew', {
      text: 'Hebrew',
      onAction: function () {
        window.open("https://editor.yadikar.it/Hebrew","_self")
      }
    });
    editor.ui.registry.addMenuItem('Croatian', {
      text: 'Croatian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Croatian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Hungarian', {
      text: 'Hungarian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Hungarian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Indonesian', {
      text: 'Indonesian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Indonesian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Japanese', {
      text: 'Japanese',
      onAction: function () {
        window.open("https://editor.yadikar.it/Japanese","_self")
      }
    });
    editor.ui.registry.addMenuItem('Georgian', {
      text: 'Georgian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Georgian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Kabyle', {
      text: 'Kabyle',
      onAction: function () {
        window.open("https://editor.yadikar.it/Kabyle","_self")
      }
    });
    editor.ui.registry.addMenuItem('Kazakh', {
      text: 'Kazakh',
      onAction: function () {
        window.open("https://editor.yadikar.it/Kazakh","_self")
      }
    });
    editor.ui.registry.addMenuItem('Korean', {
      text: 'Korean',
      onAction: function () {
        window.open("https://editor.yadikar.it/Korean","_self")
      }
    });
    editor.ui.registry.addMenuItem('Lithuanian', {
      text: 'Lithuanian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Lithuanian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Polish', {
      text: 'Polish',
      onAction: function () {
        window.open("https://editor.yadikar.it/Polish","_self")
      }
    });
    editor.ui.registry.addMenuItem('Portuguese', {
      text: 'Portuguese',
      onAction: function () {
        window.open("https://editor.yadikar.it/Portuguese","_self")
      }
    });
    editor.ui.registry.addMenuItem('Romanian', {
      text: 'Romanian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Romanian","_self")
      }
    });		
    editor.ui.registry.addMenuItem('Russian', {
      text: 'Russian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Russian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Slovak', {
      text: 'Slovak',
      onAction: function () {
        window.open("https://editor.yadikar.it/Slovak","_self")
      }
    });
    editor.ui.registry.addMenuItem('Slovenian', {
      text: 'Slovenian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Slovenian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Swedish', {
      text: 'Swedish',
      onAction: function () {
        window.open("https://editor.yadikar.it/Swedish","_self")
      }
    });	
    editor.ui.registry.addMenuItem('Tamil', {
      text: 'Tamil',
      onAction: function () {
        window.open("https://editor.yadikar.it/Tamil","_self")
      }
    });
    editor.ui.registry.addMenuItem('Tajik', {
      text: 'Tajik',
      onAction: function () {
        window.open("https://editor.yadikar.it/Tajik","_self")
      }
    });		
    editor.ui.registry.addMenuItem('Thai', {
      text: 'Thai',
      onAction: function () {
        window.open("https://editor.yadikar.it/Thai","_self")
      }
    });
    editor.ui.registry.addMenuItem('Uzbek', {
      text: 'Uzbek',
      onAction: function () {
        window.open("https://editor.yadikar.it/Uzbek","_self")
      }
    });		
    editor.ui.registry.addMenuItem('English', {
      text: 'English',
      onAction: function () {
        window.open("https://editor.yadikar.it/English","_self")
      }
    });	
    editor.ui.registry.addMenuItem('Uyghur', {
      text: 'Uyghur',
      onAction: function () {
        window.open("https://editor.yadikar.it/Uyghur","_self")
      }
    });
    editor.ui.registry.addMenuItem('French', {
      text: 'French',
      onAction: function () {
        window.open("https://editor.yadikar.it/French","_self")
      }
    });
    editor.ui.registry.addMenuItem('Italian', {
      text: 'Italian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Italian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Dutch', {
      text: 'Dutch',
      onAction: function () {
        window.open("https://editor.yadikar.it/Dutch","_self")
      }
    });
    editor.ui.registry.addMenuItem('Turkish', {
      text: 'Turkish',
      onAction: function () {
        window.open("https://editor.yadikar.it/Turkish","_self")
      }
    });
    editor.ui.registry.addMenuItem('Ukrainian', {
      text: 'Ukrainian',
      onAction: function () {
        window.open("https://editor.yadikar.it/Ukrainian","_self")
      }
    });
    editor.ui.registry.addMenuItem('Welsh', {
      text: 'Welsh',
      onAction: function () {
        window.open("https://editor.yadikar.it/Welsh","_self")
      }
    });
    editor.ui.registry.addMenuItem('Chinese_Simplified', {
      text: 'Chinese Simplified',
      onAction: function () {
        window.open("https://editor.yadikar.it/Chinese_Simplified","_self")
      }
    });
    editor.ui.registry.addMenuItem('Chinese_Traditional', {
      text: 'ChineseTraditional',
      onAction: function () {
        window.open("https://editor.yadikar.it/Chinese_Traditional","_self")
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