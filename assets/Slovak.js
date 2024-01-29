var useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

tinymce.init({
  selector: 'textarea#mytextarea',
  plugins: 'print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons spellchecker',
  imagetools_cors_hosts: ['picsum.photos'],
	menu: { custom: { title: 'File', items: 'newdocument | open | save | preview | print'}},
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
  content_style: "@import url('https://fontlibrary.org//face/ukij-ekran'); @import url('https://fontlibrary.org//face/ukij-chiwer-kesme'); @import url('https://fontlibrary.org//face/ukij-cjk'); @import url('https://fontlibrary.org//face/ukij-kufi'); body { font-family: Verdana,UKIJ,sans-serif; }",
	spellchecker_languages: 'Bulgarian=bg,Catalan=ca,Czech=cs,Croatian=hr,Danish=da,Dutch=nl,English=en,French=fr_FR,German=de,Georgian=ka,Greek=el,Hebrew=he,Hungarian=hu,Italian=it,Korean=ko,Lithuanian=lt,Polish=pl,Portuguese=pt_PT,Persian=fa,Romanian=ro,Russian=ru,Spanish=es,Swedish=sv,Slovak=sk,Slovenian=sl,Turkish=tr,Uyghur=ug,Ukrainian=uk',
	spellchecker_rpc_url: 'http://tinyeditor.com/tinymce_spellchecker/spellchecker.php',
	font_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Microsoft Uighur=Microsoft Uighur; UKIJEkranRegular=UKIJEkranRegular; UKIJChiwerKesmeRegular=UKIJChiwerKesmeRegular; UKIJCJKRegular=UKIJCJKRegular; UKIJKufiRegular=UKIJKufiRegular; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
	language: 'sk',
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