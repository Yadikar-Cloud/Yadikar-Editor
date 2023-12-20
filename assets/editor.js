const useDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
const isSmallScreen = window.matchMedia('(max-width: 1023.5px)').matches;

tinymce.init({
  selector: 'textarea#mytextarea',
  plugins: 'preview importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap pagebreak nonbreaking anchor insertdatetime advlist lists wordcount help charmap quickbars emoticons accordion',
  editimage_cors_hosts: ['picsum.photos'],
  menubar: 'file edit view insert format tools table help',
  toolbar: "undo redo | accordion accordionremove | blocks fontfamily fontsize | bold italic underline strikethrough ltr rtl | align numlist bullist | link image | table media | lineheight outdent indent| forecolor backcolor removeformat | charmap emoticons | code fullscreen preview | save print | pagebreak anchor codesample",
  autosave_ask_before_unload: true,
  autosave_interval: '30s',
  autosave_prefix: '{path}{query}-{id}-',
  autosave_restore_when_empty: false,
  autosave_retention: '2m',
  image_advtab: true,
  height: 600,
  image_caption: true,
  quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
  noneditable_class: 'mceNonEditable',
  toolbar_mode: 'sliding',
  contextmenu: 'link image table',
  skin: useDarkMode ? 'oxide-dark' : 'oxide',
  content_css: useDarkMode ? 'dark' : 'default',
	font_family_formats: "Andale Mono=andale mono,times; Arial=arial,helvetica,sans-serif; Arial Black=arial black,avant garde; Book Antiqua=book antiqua,palatino; Comic Sans MS=comic sans ms,sans-serif; Courier New=courier new,courier; Georgia=georgia,palatino; Helvetica=helvetica; Impact=impact,chicago; Microsoft Uighur=Microsoft Uighur; UKIJEkranRegular=UKIJEkranRegular; UKIJChiwerKesmeRegular=UKIJChiwerKesmeRegular; UKIJCJKRegular=UKIJCJKRegular; UKIJKufiRegular=UKIJKufiRegular; Symbol=symbol; Tahoma=tahoma,arial,helvetica,sans-serif; Terminal=terminal,monaco; Times New Roman=times new roman,times; Trebuchet MS=trebuchet ms,geneva; Verdana=verdana,geneva; Webdings=webdings; Wingdings=wingdings,zapf dingbats",
	content_style: "@import url('https://fontlibrary.org//face/ukij-ekran'); @import url('https://fontlibrary.org//face/ukij-chiwer-kesme'); @import url('https://fontlibrary.org//face/ukij-cjk'); @import url('https://fontlibrary.org//face/ukij-kufi'); body { font-family: Arial; }",
});

function visitYadikar() {
	window.location = "https://cloud.yadikar.it/"
}