import com.google.appengine.api.datastore.*
import com.google.appengine.api.blobstore.*

// Render JSON
response.contentType = 'application/json'

def filekey = datastore.execute {
    select all from filekey
    limit 1
}

log.info("filekey=$filekey")

BlobKey blob = new BlobKey(filekey[0].keyString)
out.print("[")
blob.withReader { Reader r ->
    r.eachLine { line -> print("${line},") }
}
out.print("]")