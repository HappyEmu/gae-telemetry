import com.google.appengine.api.datastore.Entity

def blobs = blobstore.getUploadedBlobs(request)
def blob = blobs["fileUpload"]

// Delete all entities first
datastore.execute {
    select all from filekey
}.each { it.delete() }

// Insert new blobkey
def uploadedKey = new Entity("filekey")
uploadedKey.keyString = blob.keyString
uploadedKey.save()

response.status = 302

if (blob) {
    redirect "/?result=success"
} else {
    redirect "/?result=failed"
}