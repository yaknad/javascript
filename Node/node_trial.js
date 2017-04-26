// use local dependency:

var _ = require('lodash');
var arr = _.without([1, 2, 3], 2);
console.log(arr);

// export a module

exports.printMsg = function() {
    console.log("This is a message from the demo package");
}