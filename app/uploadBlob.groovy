import com.google.appengine.api.datastore.Entity

def blobs = blobstore.getUploadedBlobs(request)
def blob = blobs["fileUpload"]

def uploadedKey = new Entity("filekey")
uploadedKey.keyString = blob.keyString
uploadedKey.save()

response.status = 302

if (blob) {
    redirect "/?key=${uploadedKey.keyString}"
} else {
    redirect "/"
}