html.html {
    form(action: "${blobstore.createUploadUrl('/uploadBlob.groovy')}", method: 'post', enctype: 'multipart/form-data') {
        input(type: 'file', name: 'fileUpload')
        input(type: 'submit', text: "Upload")
    }
}