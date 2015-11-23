import groovy.json.JsonOutput

// Render JSON
response.contentType = 'application/json'

def objects = (1..1000).collect { it as float }

out.println(JsonOutput.toJson(objects))