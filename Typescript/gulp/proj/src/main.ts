import { sayHello } from "./greet"; // needs browserify to convert to "require" syntax

let showHello = (divName: string, name: string) =>  showHelloImpl(divName, name); // needs Babel to convert this to es5

function showHelloImpl(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);  
}

showHello("greeting", "TypeScript");