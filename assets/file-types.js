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
        extension: '.pdf',
        name: 'PDF Document',
        mimeType: 'application/pdf',
        description: 'PDF file'
    },
    {
        extension: '.docx',
        name: 'Word Document',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        description: 'Word file'
    }
];

// Helper functions
window.getSelectOptions = function() {
    return FILE_TYPES.map(type => ({
        text: type.name + ' (' + type.extension + ')',
        value: type.extension
    }));
};

window.getFilePickerTypes = function() {
    return FILE_TYPES.map(type => ({
        description: type.description,
        accept: {
            [type.mimeType]: [type.extension]
        }
    }));
};

window.getMimeType = function(extension) {
    const fileType = FILE_TYPES.find(type => type.extension === extension);
    return fileType ? fileType.mimeType : 'text/plain';
};
