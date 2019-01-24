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


