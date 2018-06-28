var events = require('events');

// Create an eventEmitter object
var eventEmitter = new events.EventEmitter();

// Create an event handler as follows
var connectHandler = function connected() {
    console.log('connection succesful.');

    // Fire the data_received event 
    eventEmitter.emit('data_received');
}

// Bind the connection event with the handler
eventEmitter.on('connection', connectHandler);

// Bind the data_received event with the anonymous function
eventEmitter.on('data_received', function() {
    console.log('data received succesfully.');
});

// Fire the connection event 
eventEmitter.emit('connection');

console.log("Program Ended.");

// Note that event emitters .emit doesn't register the 
//      event handler to the task queue! (it doesn't use the "event loop" at all)
//      Instead, all registered handlers run synchronously when the event is emitted!
//      See: https://github.com/nodejs/node-v0.x-archive/issues/8470

// Result:
// connection successful.
// data received successfully.
// Program Ended.