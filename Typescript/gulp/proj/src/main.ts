// ****************** Chapter 1: Basic Types ***************** 


// ---------- Quick overview ----------

import { sayHello } from "./greet"; // needs browserify to convert to "require" syntax


//-----------    Local objects    ---------

let showString = (divName: string, name: string) =>  showStringImpl(divName, name); // needs Babel to convert this to es5

function showStringImpl(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);  
}

let showArray = (divName: string, content: number[]) =>  showArrayImpl(divName, content); // needs Babel to convert this to es5

function showArrayImpl(divName: string, content: number[]) {
    const elt = document.getElementById(divName);
    elt.innerText = content.toString();
}

class Student {

    fullName: string;
    
    constructor(public firstName: string, public middleName: string, public lastName: string) {
        this.fullName = firstName + " " + middleName + " " + lastName;
    } 
}

interface Person {
    firstName: string,
    lastName: string
}

function greeter2(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = new Student("Yakov", "David", "Nadler");

function greeter3(person: Student) {
    return "Hello, " + person.fullName;
}


// ---------    Flow    -----------------

showString("greeting1", "TypeScript");
showString("greeting2", greeter2(user));
showString("greeting3", greeter3(user));







// ---------- Handbook -----------


// ---- TYPES -----
let isDone: boolean;
isDone = true;
let isDone2: boolean = true;

let decimal: number = 2;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o766;

let color: string = "blue";
let background_color = 'red'; // works, even though it doesn't declare the type
let background_color2: string = "red";
// !!! Note the multi-line syntax
let sentence: string = `Hi, my color is ${color}!
My bckground color is ${background_color2}`;

let numbersArray: number[] = [1,2,3];
let numberArray2: number[] = [1, 1.5, 0xf00d];

showString("sentence", sentence);
showArray("array", numberArray2);

let tupple1: [string, number] = ["I'm a string", 1];
// let tupple2: [number, string] = ["1", 1]; // compile error
let str : string = tupple1[0];
// let num : number = tupple1[0]; // compile error



enum Colors { Red, Yellow, Blue }; // values numbering is default (0,1,2)
enum Colors2 { Red = 1, Yellow, Blue }; // values numbering will start with 1, and continue incrementally
enum Colors3 { Red = 1, Yellow = 2, Blue = 4 };  // manually setting all values  

let color_1 : Colors = Colors.Red; 
let color_2: string = Colors[0]; // Red --> Note the type is string, not Color! (see color_3 later)
color_2 = Colors2[1]; // Red
color_2 = Colors3[4]; // Blue
let color_3 : Colors = Colors["Red"]; // Note the type is Color (not like in color_2 above)



let unknown : any = "any";
unknown = 12;
unknown = true;
// unknown.getSomething(); // "any" may be anything, so it may have any method (like "getSomething")

let obj : Object = "any";
obj = 12;
obj = true;
// obj.getSomething(); - Error: on "object" we may call only "object"'s methods
// SEE LATER more about "Object"

let listAny : any[] = [1, true, "any"];
listAny[1] = 2;

function returnsNothing() : void {
    console.log("return nothing!");
}

let voidVariable : void = undefined;
voidVariable = null;
// voidVariable = new Object(); - void variable may be assigned only undefined or null values!
let nullVariable : null = null; // null type may be assigned only null as value
let undefinedVariable : undefined = undefined; // undefined type may be assigned only undefined as value
let number1 : number = null;
number1 = undefined; // null and undefined are subtypes of all other types, besides being a type of their own (like seen before), 
                     // and therefore may be assigned as values to all types, unless when using the --strictNullChecks flag 
                     // that enforces using null and undeifined values only to void, null, undefined types. Using this flag prevents 
                     // many unexpected errors (but backward compatibility with old javascript is problematic)


// Function returning never must have unreachable end point
function error(message: string) : never {
    throw new Error(message);
}

// Inferred return type is never
function fail() : never { 
    return error("error!");
}

function neverReturns() : never {
    while(true){
    }
}

function voider() : void {

}

let neverVariable: never = error("error!!!");
// neverVariable = 10;     
// neverVariable = voider();      // never type can be assigned only a never value - not even any, void, undefined or null
let neverNumber : number = error("error!!!!!!"); // never value may be assigned to all types (as with null and undefined)



// Object is a type that represents the non-primitive type, i.e. any thing that is not
// number, string, boolean, symbol, null, or undefined.

// Type assertions - or Casts
let anyValue : any = "this is actually a string!";
let stringValue : number = anyValue; // ***** NOTE : that the compiler agrees with this!!!
let strLength : number = anyValue.length; // Also possible
// strLength = (<string>anyValue;    // casting - Compile Error!!!
strLength = (<string>anyValue).length;  // form #1
strLength = (anyValue as string).length;  // form #2









// **************** Chapter 2: Variable Declarations ****************
// see javascript.Core.ES2015.js
 

