def blobs = blobstore.getUploadedBlobs(request)
def blob = blobs["fileUpload"]

response.status = 302

if (blob) {
    redirect "/?key=${blob.keyString}"
} else {
    redirect "/"
}