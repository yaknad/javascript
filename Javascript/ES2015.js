let root = {};

// *****************************
// Iterators / Iterables / For..of / Generators

// http://2ality.com/2013/06/iterators-generators.html#generators-as-threads
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols

// Advantages: A. Decouple logical mechanisms (like map, filter etc.) from the underlying data structure. 
//             B. Enables lazy loading of data. No need to have the day=ta in-memory. Enables working with disk data.
//                The iterator can have it internal logic of getting the next chunk of data.


// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator