// Shared file type configurations
const FILE_TYPES = [
    {
        extension: '.html',
        name: 'HTML Document',
        mimeType: 'text/html',
        description: 'HTML file'
    },
    {
        extension: '.txt',
        name: 'Text Document',
        mimeType: 'text/plain',
        description: 'Text file'
    },
    {
        extension: '.md',
        name: 'Markdown',
        mimeType: 'text/markdown',
        description: 'Markdown file'
    },
    {
        extension: '.docx',
        name: 'Word Document',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        description: 'Word file'
    },
    {
        extension: '.pdf',
        name: 'PDF',
        mimeType: 'application/pdf',
        description: 'PDF document'
    },
    {
        extension: '.epub',
        name: 'EPUB',
        mimeType: 'application/epub+zip',
        description: 'EPUB ebook'
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
