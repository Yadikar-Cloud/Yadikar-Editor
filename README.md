# Yadikar Text Editor
Yadikar Text Editor is a free, modern and privacy-first text editor with document generation and editing capabilities.
Freatures:
* Mobile-friendly design
* Share document with others
* Extract text from PDF/image using OCR
* Write meeting/lecture notes with Speech Recognition
* Supports HTML/TXT/Markdown/DOCX document formats
* Supports upload/download to cloud drives
* Save/Open documents on local device
* Spellcheck and grammar check
* Auto-complete for quicker writing
* Screenshot text area
* Supports over 40 languages
* Best for privacy and security

# Dependency
The editor is based on HTML/JavaScript/PHP. So it should be served from web server such as Apache, Nginx. If these servers are insalled on local machine, It can also be served locally.

1. Web Server

Install web server on your prefered Operating System. On Ubuntu:
`apt -y install apache2` or `apt -y install nginx`

2. PHP Modules

The Editor mostly works as a static page except for one case in which the spellchecking plugin is enabled. To enable the spell checking plugin, enable the following php modules:
`apt -y install php php-common php-enchant #install prefered php version such as 7.4, 8.3 etc`

3. Spellchecking Dictionaries

The Editor needs spellchecking dictionaries to enable spellchecking. The dictionaries are installed from the following source by default:
1. for Uyghur language: https://extensions.libreoffice.org/en/extensions/show/42016
2. for all the other languages: https://github.com/wooorm/dictionaries

Update the dictionaries located in tinymce_spellchecker/dics/ directory if you want to use latest version of the dictionaries or for regular update. The dictionaries are based un Hunspell format. So each dictionary is consisted upon two files: .aff and .dic;

# Bug reports
Please use the [issue tracker](https://github.com/Yadikar-Cloud/Yadikar-Editor/issues) provided by GitHub to send us bug reports or feature requests. Follow the template's instructions or the issue will likely be ignored or closed as invalid.

# License
The software is released under AGPL. See [details](https://github.com/Yadikar-Cloud/Yadikar-Editor?tab=AGPL-3.0-1-ov-file#readme).
