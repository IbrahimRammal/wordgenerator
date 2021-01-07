/**
 * File Manager sample with Node.js service
 */
$(document).ready(function () {
    var hostUrl = '/api/admin/filemanager/';
    var fileObject = new ej.filemanager.FileManager({
            ajaxSettings: {
                url: hostUrl,
                getImageUrl: hostUrl + 'GetImage',
                uploadUrl: hostUrl + 'Upload',
                downloadUrl: hostUrl + 'Download'
            }
    });
    fileObject.appendTo('#filemanager');
});