import com.google.appengine.api.datastore.*
import com.google.appengine.api.blobstore.*

// Render JSON
response.contentType = 'application/json'

def filekey = datastore.execute {
    select all from filekey
    limit 1
}

log.info("filekey=$filekey")

def blob = new BlobKey(filekey[0].keyString)
def first = true
def linecount = 0

print("[")
blob.withReader { Reader r ->
    r.eachLine { line ->
        if (linecount > 1000) return
        if (!first) print(',')
        if (first) first = false

        print("$line")
        linecount++
    }
}
print("]")