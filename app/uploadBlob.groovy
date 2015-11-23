def blobs = blobstore.getUploadedBlobs(request)
def blob = blobs["fileUpload"]

response.status = 302

if (blob) {
    redirect "/success?key=${blob.keyString}"
} else {
    redirect "/failure"
}