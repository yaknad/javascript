var events = require('events');

// Create an eventEmitter object
// Note: a custom event emitter enables to register to it's custom events, 
// not to any general events or events created by other emitters 
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

// Result:
// connection successful.
// data received successfully.
// Program Ended. ---->

// Note that event emitters .emit doesn't register the 
//      event handler to the task queue! (it doesn't use the "event loop" at all)
//      Instead, all registered handlers run synchronously when the event is emitted!
//      See: https://github.com/nodejs/node-v0.x-archive/issues/8470
//           https://medium.com/technoetics/node-js-event-emitter-explained-d4f7fd141a1a
//

// In order to run the handlers async, use one of the following:
eventEmitter.on("event1", function(a, b, c) {
    setImmediate(() => console.log("This callback is called async by the event loop when its turn has arrived. " +
        "It was called with the following params: a=" + a + ", b=" + b + ", c=" + c));
});
eventEmitter.on("event1", function(a, b, c) {
    process.nextTick(() => console.log("This callback is called async before the event loop queue. " +
        "It was called with the following params: a=" + a + ", b=" + b + ", c=" + c));
});
eventEmitter.on("event1", function(a, b, c) {
    console.log("This callback is called synch - not async!");
});

eventEmitter.emit("event1", "aaa", "bbb", "ccc");

/*
 Output:
 This callback is called synch - not async!
 This callback is called async before the event loop queue. It was called with the following params: a=aaa, b=bbb, c=ccc
 This callback is called async by the event loop when its turn has arrived. It was called with the following params: a=aaa, b=bbb, c=ccc
*/

// How regular event loop callbacks are implemented? maybe any fired event calls all its registered callbacks 
// with setImmediate(). Another option is that a fired event that gets into the event loop is not fired with
// .emit("event"), but the event is only registered on the event loop, and when its turn arrives, only then
// the .emit("event") is called and all its callbacks are called immediately...???


eventEmitter.once("event1", () => console.log("eventEmitter.once will call the callback only on the first time" +
    "the event is fired. eventEmitter.on will call the callback anytime the event is fired."));