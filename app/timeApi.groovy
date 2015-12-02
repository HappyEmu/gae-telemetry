import com.google.appengine.api.datastore.*

// Render JSON
response.contentType = 'application/json'

def offset = datastore.execute {
    select all from OffsetData
    limit 1
}

log.info("Offset=$offset.seconds")

print(offset.seconds)