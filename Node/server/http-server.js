var http = require("http");
var events = require('events');

var eventEmitter = new events.EventEmitter();

http.createServer(function(request, response) {

    eventEmitter.emit('getRequested');
    // Send the HTTP header: HTTP Status: 200 : OK, Content Type: text/plain
    response.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send the response body as "Hello World"
    response.end('Hello World\n');
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');

var getRequestedHandler = function(event) {
    // TODO: check why this event handler is fired twice???
    console.log('received GET request');
}
eventEmitter.on('getRequested', getRequestedHandler);

// TODO - return file - how to wait for completion and then return???