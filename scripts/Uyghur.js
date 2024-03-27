var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

tinymce.init({
  selector: 'textarea#mytextarea',
  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons spellchecker suggestions',
	search_function: async ( keyword ) => {
			const response = await fetch(window.location.origin+`/autocompleter/suggestion.php?keyword=${keyword}`);
			if(response.ok){
					const jsonResponse = await response.json();
					return Object.values(jsonResponse);
			}
	},  
	imagetools_cors_hosts: ['picsum.photos'],
	menu: { custom: { title: 'File', items: 'newdocument | open | save | preview | print' },
					tools: { title: 'Tools', items: 'spellchecker | screenshot | code wordcount' }
	},
	menubar: 'custom edit view insert format tools table help',
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
  content_style: "@font-face { font-family: UKIJEkranRegular; src: url(./assets/fonts/UKIJEkran.ttf); } @font-face { font-family: UKIJChiwerKesmeRegular; src: url(./assets/fonts/UKIJChiK.ttf); } @font-face { font-family: UKIJCJKRegular; src: url(./assets/fonts/UKIJCJK.ttf); } @font-face { font-family: UKIJKufiRegular; src: url(./assets/fonts/UKIJKu.ttf); } body { font-family: UKIJEkranRegular,UKIJ,sans-serif; }",
	spellchecker_languages: 'Bulgarian=bg,Catalan=ca,Czech=cs,Croatian=hr,Danish=da,Dutch=nl,English=en,French=fr_FR,German=de,Georgian=ka,Greek=el,Hebrew=he,Hungarian=hu,Italian=it,Korean=ko,Lithuanian=lt,Polish=pl,Portuguese=pt_PT,Persian=fa,Romanian=ro,Russian=ru,Spanish=es,Swedish=sv,Slovak=sk,Slovenian=sl,Turkish=tr,Uyghur=ug,Ukrainian=uk',
	spellchecker_rpc_url: window.location.origin+'/tinymce_spellchecker/spellchecker.php',
	font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Microsoft Uighur=Microsoft Uighur; UKIJEkranRegular=UKIJEkranRegular; UKIJChiwerKesmeRegular=UKIJChiwerKesmeRegular; UKIJCJKRegular=UKIJCJKRegular; UKIJKufiRegular=UKIJKufiRegular; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
	language: 'ug',
	templates : [
			{
							title : "باغاق",
							url : "templates/Uyghur/باغاق.html",
							description : ""
			},	
			{
							title : "تۇنۇشتۇرۇش",
							url : "templates/Uyghur/تونۇشتۇرۇش.html",
							description : ""
			},
			{
							title : "تەبرىك كارتىسى",
							url : "templates/Uyghur/تەبرىك_كارتىسى.html",
							description : ""
			},
			{
							title : "تەبرىكنامە",
							url : "templates/Uyghur/تەبرىكنامە.html",
							description : ""
			},
			{
							title : "تەكلىپ قىلىش خېتى",
							url : "templates/Uyghur/تەكلىپ_قىلىش_خېتى.html",
							description : ""
			},
			{
							title : "تەكلىپنامە",
							url : "templates/Uyghur/تەكلىپنامە.html",
							description : ""
			},
			{
							title : "سالام خەت",
							url : "templates/Uyghur/سالام_خەت.html",
							description : ""
			},
			{
							title : "كۈندىلىك خاتىرە",
							url : "templates/Uyghur/كۈندىلىك_خاتىرە.html",
							description : ""
			},
			{
							title : "ئارىيەت ئېلىش خېتى",
							url : "templates/Uyghur/ئارىيەت_ئېلىش_خېتى.html",
							description : ""
			},
			{
							title : "ئۇقتۈرۈش",
							url : "templates/Uyghur/ئۇقتۈرۈش.html",
							description : ""
			},
			{
							title : "ئىلتىماس",
							url : "templates/Uyghur/ئىلتىماس.html",
							description : ""
			}			
	],
	setup: function(editor) {
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