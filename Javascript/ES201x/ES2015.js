// ************************* Variable Declaration: "var" VS "let" *********************

// "var" problems:
// 1. Valid for the whole scope (function, module etc.) - even if was declared inside a "if" or "for" block, it may be used outside of it.

function varScope(shouldInitialize) {
    if (shouldInitialize) {
        var x = 10;
    }

    return x;
}

varScope(true);  // returns '10'
varScope(false); // returns 'undefined'

// 2. It's legal to use var with the same variable name (in the same scope) multiple times, and all of them refer to the same variable - overwriting it!
var varVariable1 = 1;
var varVariable1 = 2;

// 3. Variable capturing quirks
for (var i = 0; i < 10; i++) {
    setTimeout(function() { console.log(i); }, 100 * i);
}
// will print: 10,10,10,10,10,10,10,10,10,10 since all the setTimeouts capture the same reference to i, and all of them will have the same value for i.
// the way to fix it with var is:
for (var i = 0; i < 10; i++) {
    (function(i) {
        setTimeout(function() { console.log(i); }, 100 * i);
    })(i);
}
// i variable in the anonymous function (IIFE - Immediately Invoked Function Expression) is a copy of the current for's i value, 
// and every call to the anonymous function will copy i's CURRENT value.


// "lets" advantages:
// 1. code block scoping













let root = {};

// *****************************
// Iterators / Iterables / For..of / Generators

// http://2ality.com/2013/06/iterators-generators.html#generators-as-threads
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// Advantages: A. Decouple logical mechanisms (like map, filter etc.) from the underlying data structure. 
//             B. Enables lazy loading of data. No need to have the day=ta in-memory. Enables working with disk data.
//                The iterator can have it internal logic of getting the next chunk of data.


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator






// Symbol:
// *******
//
// https://developer.mozilla.org/en-US/docs/Glossary/Symbol
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol
// In the JavaScript run-time environment, a symbol value is created by invoking the function Symbol, 
// which dynamically produces an anonymous, unique value. A symbol may be used as an object property. 
// Symbol can have an optional description, but for debugging purposes only. 
// The method Symbol.for("tokenString") returns a symbol value from the registry, and Symbol.keyFor(symbolValue)
// returns a token string from the registry; each is the other's inverse, so the following is true:

Symbol.keyFor(Symbol.for("tokenString")) == "tokenString"; // true