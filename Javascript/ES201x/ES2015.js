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









//*************************** prototype and class trials ****************************************************/

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields

// classes are the same protoype model but with syntsctic sugar.
// all members are becoming instance members.
// all functions are becoming prototype functions.
// static functions are declared on the class object itself.
// to add members (not functions) to the prototype, do it outside the class' body: class.prototype.member = ""


let childClass = function() {
  
    this.state = { open: true }
    this.protoPrintState = function(name) {
      this.printState(name + " from protoPrintState"); // NOTE: this will work although "printState"
      // is declared later in the prototype, since eventually, the instance does have such a function as a member (inherited from the prototype)
    }
  }
  
  childClass.prototype = {
    printState: function(name) {
      console.log("name: " + name);
      console.log(this.state);
      console.log('my constructor: ' + this.constructor); // see comment regarding this - when using this function
    }
  }
  
  let child1 = new childClass();
  console.log(child1.constructor); // prints "child" function - as expected.
  child1.printState("child1"); // this prints the Object function as the constructor (it's the prototype's constructor).
  // why isn't it the childClass function - like in "child1.constructor"?
  // ANSWER: when there's a prototype - it will always give the prototype's constructor!!!
  // NOTE: adding prototype after instansiating an instance will not affect existing instances - only ne once,
  // but adding members to existing prototype will affect also the existing instances (that already reference this prototype).
  
  child1.protoPrintState("child1");
  
  
  
  
  class childClass2 {
  
    // NOTE that state2 is considered an instance member and not a "class" (prototype?) member and 
    // it's not part of the prototype! See later - although it was not declared as "this.state2"!
    state2 = { open: true }
  
    constructor() {
      this.state = { open: true };
    }
  
    printState(name) {
      console.log(name);
      console.log("state: " + this.state.open);
      console.log("state2: " + this.state2.open);
      console.log("*********");
      // console.log('my constructor: ' + this.constructor); // here it's the constructor is the current instance's constructor, i.e this class - not the prototype's constructor
      // it means that a Class does not use prototype 
    }
  
    static staticMethod(){
      console.log("this is a static method");
    }
  }
  
  let child2 = new childClass2();
  let child2a = new childClass2();
  child2.printState("child2");
  child2.state2.open = false;
  child2.printState("child2");
  child2a.printState("child2a");
  
  // TODO: NOTE that state2 is considered an instance member - not a "class" (static) member and it's also not part of the prototype!
  // childClass2.state2.open = "unknown?";  
  // child2.printState();
  // child2a.printState();
  // TODO: when we print the prototype we will not find there state2!
  console.log(childClass2.prototype);
  // TODO: but the functions does go to the prototype, and changing them will change the function in the instances!
  childClass2.prototype.printState = null;
  // child2.printState(); - throws an error since the function is deleted
  // TODO: static methods are called on the class itself:
  childClass2.staticMethod();
  // child2.staticMethod(); - throws an error!
  console.log("child2 constructor: ", child2.constructor);  // the class's constructor
  
  
  
  class Parent {
  
    constructor(){
      this.parent1Name = "Parent1";
      this.parent2Name = "Parent2";
    }
  }
  
  class ChildClass3 extends Parent {
  
      constructor() {
        super();
        this.state = { open: true };
      }
  }
  
  let child3 = new  ChildClass3();
  console.log("child3 parent member: ", child3.parent1Name);
  console.log("child3 constructor: ", child3.constructor); // the actual ("ChildClass3") class's constructor - 
  // although it also has a "super", the constructor is the child's constructor. 
  console.log("child3 instance of ChildClass3 class: ", child3 instanceof ChildClass3);
  
  function ParentFunc(){
    this.parent = "Parent";
  }
  function ChildFunc(){
    ParentFunc.call(this);
    this.name = "child!!!";
  } 
  let funcChild = new ChildFunc();
  console.log("funcChild parent member: ", funcChild.parent);
  console.log("funcChild constructor: ", funcChild.constructor); // the actual ("ChildFunc") function - although is also calls a "super" function.
  console.log("funcChild instance of ChildFunc function: ", funcChild instanceof ChildFunc);
  
  
  //---- this (and some static stuff)-----
  
  class thisTrial {
  
    static maxAge = "120";
  
    constructor(name){
      this.name = name;
    }
  
    // this.lastName = "last";  - Error: can't declare a member using the "this" keyword outside the constructor;
  
    lastName = "last"; // it is automatically referred as "this.lastName"!
  
    printLastName() { // goes to the prototype
      // console.log(lastName); Error - we must refer it as this.lastName 
      console.log(this.lastName);
    }
  
    static doSomethingStatic(){
      console.log(this); // "this" is not the instance since it's a static function.
      // it should have been the object that the function was called from (e.g. the "thisTrial" class object or "window"),
      // but see later that for any other object then the class, it will be "undefined", since class blocks are using strict mode.
      // see MDN documentation for javascript classes.
    }
  }
  
  let thisTrialInstance = new thisTrial();
  console.log(thisTrial.prototype); // prints the constructor and any other method: printLastName
  // thisTrial.printLastName(); - Error: it's not a static function!
  console.log(thisTrialInstance.maxAge); //- undefined in the instance since the field is static
  console.log(thisTrial.maxAge);
  thisTrial.doSomethingStatic();
  console.log(thisTrial.maxAge);
  let refToStaticFunc = thisTrial.doSomethingStatic;
  refToStaticFunc(); // prints undefined instead of "window"
  
  //-------  instanceof and constructor -----------------
  
  // instanceof is the function that created the instance.
  // constructor is the function that created the prototype?
  
  function func1(){
    this.name = "func1";
  }
  let func1_1 = new func1();
  console.log("func1_1 constructor: ", func1_1.constructor);
  console.log("func1_1 instanceof func1: ", func1_1 instanceof func1);
  
  func1.prototype = { primeMinister: "BIBI"}
  let func1_2 = new func1();
  console.log("func1_2 constructor: ", func1_2.constructor);  // will print the Objct function - that created the prototpye
  console.log("func1_2 instanceof func1: ", func1_2 instanceof func1); // will print func1 that is the actual creator of the instance
  
  
  class class1 {
    
    constructor() {
      this.name = "func1";
    }
  
    getName() {
      return this.name;
    }
  }
  let class1_1 = new class1();
  console.log("class1_1 constructor: ", class1_1.constructor);
  console.log("class1_1 instanceof class1: ", class1_1 instanceof class1);
  
  class1.prototype.primeMinister = "BIBI";
  let class1_2 = new class1();
  console.log("class1_2 constructor: ", class1_2.constructor); // will also print class1 - since the prototype was created 
  // by the same "class1" function (that is behind the class inner implementation). See class1_3 below! 
  console.log("class1_2 instanceof class1: ", class1_2 instanceof class1);
  
  class1.prototype = {primeMinister: "BIBI"};
  let class1_3 = new class1();
  console.log("class1_3 constructor: ", class1_3.constructor); // will print Object - since the prototype was replaced with a simple Object.
  console.log("class1_3 instanceof class1: ", class1_3 instanceof class1);
  
  
  // ------------ getters / setters -------------
  
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
  
  const getterObj = {
    log: ['example'],
    count: 0,
    get latest() {
      let val = this.log[0];
      this.count++;
      val += this.count;
      return val;
    }
  }
  
  console.log("getterObj.latest #1 call: ", getterObj.latest);
  console.log("getterObj.latest #2 call: ", getterObj.latest);
  
  
  //----------------------------------------------
  
  // function test() {
  
  //   console.log(aa);
  //   var bb = foo();
  //   console.log(bb);
    
  //   var aa = 1;
  //   var foo = function() {
  //   	return 2;
  //   }
    
  //   // function foo() {
  //   // 	return 2;
  //   // }
  // }
  // test();