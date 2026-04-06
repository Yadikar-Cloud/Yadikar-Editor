// Shared file type configurations
const FILE_TYPES = [
    {
        extension: '.html',
        name: 'HTML Document',
        suggestedName: 'Untitle.html',
        mimeType: 'text/html',
        description: 'HTML file'
    },
    {
        extension: '.txt',
        name: 'Text Document',
        suggestedName: 'Untitle.txt',
        mimeType: 'text/plain',
        description: 'Text file'
    },
    {
        extension: '.md',
        name: 'Markdown',
        suggestedName: 'Untitle.md',
        mimeType: 'text/markdown',
        description: 'Markdown file'
    },
    {
        extension: '.docx',
        name: 'Word Document',
        suggestedName: 'Untitle.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        description: 'Word file'
    },
    {
        extension: '.pdf',
        name: 'PDF',
        suggestedName: 'Untitle.pdf',
        mimeType: 'application/pdf',
        description: 'PDF document'
    },
    {
        extension: '.epub',
        name: 'EPUB',
        suggestedName: 'Untitle.epub',
        mimeType: 'application/epub+zip',
        description: 'EPUB ebook'
    },
    {
        extension: '.png',
        name: 'PNG Image',
        suggestedName: 'Untitle.png',
        mimeType: 'image/png',
        description: 'PNG Image file'
    },    
];

// Helper functions
window.getSelectOptions = function() {
    return FILE_TYPES.map(type => ({
        text: type.name + ' (' + type.extension + ')',
        value: type.extension
    }));
};

window.getFilePickerOption = function() {
    return FILE_TYPES.map(type => ({
    	suggestedName: type.suggestedName,
        types: [
            {
                description: type.description,
                accept: {
                    [type.mimeType]: [type.extension]
                }
            }
        ],
        multiple: false,
        excludeAcceptAllOption: true
    }));
};

window.getName = function(extension) {
    const fileType = FILE_TYPES.find(type => type.extension === extension);
    return fileType ? fileType.name : 'Document';
};
window.getMimeType = function(extension) {
    const fileType = FILE_TYPES.find(type => type.extension === extension);
    return fileType ? fileType.mimeType : 'text/plain';
};
window.getDescription = function(extension) {
    const fileType = FILE_TYPES.find(type => type.extension === extension);
    return fileType ? fileType.description : 'Document';
};
