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
//      It's like browser's javascript when triggering am event from js code - like element.click(),
//      or when dispatching an event programmatically, all the handlers are called synchrnously - just like
//      calling the handler functions explicitly. They are not registered to the "task queue" to be called b
//      the "event loop". Note that even if a "micro task" (like aresolved promise) is waiting in the
//      "micro tasks queue" (that has proirity over the regular "task queue"), still the handlers will
//      run before the "micro task", since they are called synchronously by the running function and 
//      not registered to the tasks queue.
//      See: https://github.com/nodejs/node-v0.x-archive/issues/8470
//           https://medium.com/technoetics/node-js-event-emitter-explained-d4f7fd141a1a
//

// In order to run the handlers async, use one of the following:
eventEmitter.on("event1", function(a, b, c) {
    // like browser javascript's setTimeout(function, 0);
    setImmediate(() => console.log("This callback is called async by the event loop when its turn has arrived. " +
        "It was called with the following params: a=" + a + ", b=" + b + ", c=" + c));
});
eventEmitter.on("event1", function(a, b, c) {
    // like borwser javascript's promise.resolve().then(function) - enters the "micro tasks queue" and 
    // performed before the regular tasks in the "tasks queue".
    process.nextTick(() => console.log("This callback is called async before the event loop queue. " +
        "It was called with the following params: a=" + a + ", b=" + b + ", c=" + c));
});
eventEmitter.on("event1", function(a, b, c) {
    console.log("This callback is called sync - not async!");
});

eventEmitter.emit("event1", "aaa", "bbb", "ccc");

/*
 Output:
 This callback is called sync - not async!
 This callback is called async before the event loop queue. It was called with the following params: a=aaa, b=bbb, c=ccc
 This callback is called async by the event loop when its turn has arrived. It was called with the following params: a=aaa, b=bbb, c=ccc
*/

// How regular event loop callbacks are implemented? maybe any fired event calls all its registered callbacks 
// with setImmediate(). Another option is that a fired event that gets into the event loop is not fired with
// .emit("event"), but the event is only registered on the event loop, and when its turn arrives, only then
// the .emit("event") is called and all its callbacks are called immediately...???


eventEmitter.once("event1", () => console.log("eventEmitter.once will call the callback only on the first time" +
    "the event is fired. eventEmitter.on will call the callback anytime the event is fired."));



var eventEmitter2 = new events.EventEmitter();
var eventEmitter3 = new events.EventEmitter();
eventEmitter2.on("customEvent2", function() { console.log('eventEmitter2.customEvent2'); });
eventEmitter2.on("customEvent3", function() { console.log('eventEmitter2.customEvent3'); });
eventEmitter3.on("customEvent2", function() { console.log('eventEmitter3.customEvent2'); });
eventEmitter3.on("customEvent3", function() { console.log('eventEmitter3.customEvent3'); });
eventEmitter2.emit('customEvent2');
// will call only the handlers registered to 'customEvent2' event on eventEmitter2 - not on customEvent3!
// just like the "click" event of a specific button doesn't call the handlers that are registered to "click" on another button. 



// MORE ABOUT EVENT EMITTERS:
// 1. When an EventEmitter instance faces any error, it emits an 'error' event. 
// 2. When a new listener is added, 'newListener' event is fired and when a listener is removed, 'removeListener' event is fired.
// 3.