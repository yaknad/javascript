// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './App';
// import './index.css';

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );



import React, {Component} from 'react';
import {render} from 'react-dom';
// import React from 'react';

var style = {
    backgroundColor: 'orange',
    color: 'white',
    fontFamily: 'Arial'
};

//const font = React.createElement('font', {color: 'red'}, 'Hello World');

const title = React.createElement(
    'h1',
    {id: 'title', className: 'header', style: style},
    'Hello World' // or: font (variable) // here we place child elements (or text - will be treated as child element)
);

// ReactDOM.render(
//   title,
//   document.getElementById('root')
// );

const ul = React.createElement('ul', 
    {id: 'ul'},
    React.createElement('li', { key:'unique1' }, 'item on our list') // why is it throwing error?
);

// const container = React.createElement('div',{id:"div2"},[title, ul]);

// ReactDOM.render(
//   container,
//   document.getElementById('root')
// );

/*ReactDOM.*/render(
  title,
  document.getElementById('root')
);

/*ReactDOM.*/render(
  ul,
  document.getElementById('root1')
);



// ReactDOM.render(
//   <div style={style}>
//     <h1 id="header-elmnt">Hello World!</h1>
//     <p>We're glad your'e here!</p>
//   </div>,
//   document.getElementById('root')
// );

let globalMinutes = 0;
setInterval(()=>{
  globalMinutes++;
}, 3000);

class Message extends Component {

    constructor(props){
        super(props);
        this.localMinutes = 0;
        this.timeout = setInterval(()=>{this.localMinutes++;}, 3000);
    }

    render(){
      console.log(this.props);
      return (
        <div>
          <h1 style={{color: this.props.color}}>{this.props.msg}</h1>
          <p>I'll check back in {this.props.minutes} minutes</p>
          <p>or in {globalMinutes} minutes - THIS IS NOT REFRESHING (it is not binded. Should use the state for binding! See later in the Library????)</p> 
          <p>or in {this.localMinutes} minutes - THIS IS NOT REFRESHING (it is not binded. Should use the state for binding! See later in the Library????)</p>  
        </div>
      )
    }
}

/*ReactDOM.*/render(
  <Message msg="how are you" color="blue" minutes={5}/>,  // minutes={x} - the braces are requierd for types that are not String
  document.getElementById('root2')
);

let skiData = {
  total: 50,
  powder: 20,
  backcountry: 10,
  goal: 100
};



const getPercent = decimal => decimal * 100 + "%";

const calcGoalProgress = (total, goal) => getPercent(total/goal);

// class SkiDayCounter extends Component{   

//     getPercent = decimal => decimal * 100 + "%";

//     calcGoalProgress = (total, goal) => this.getPercent(total/goal);

//     render(){
//       const { total, powder, backcountry, goal} = this.props;
//       return (
//         <section>
//             Ski Days:
//             <div>
//               <p>Total: {/*this.props.*/total}</p>
//               <p>Powder: {/*this.props.*/powder}</p>
//               <p>Backcountry: {/*this.props.*/backcountry}</p>
//               <p>Goal Progress: {this.calcGoalProgress(total, goal)}</p>
//             </div>
//         </section>
//       ) 
//     }
// } 


// thin Component - only a rendering function instead of a whole Component class extension. (note that function gets props as parameter)
const SkiDayCounter = ({ total, powder, backcountry, goal}) => {  
      return (
        <section>
            Ski Days:
            <div>
              <p>Total: {/*this.props.*/total}</p>
              <p>Powder: {/*this.props.*/powder}</p>
              <p>Backcountry: {/*this.props.*/backcountry}</p>
              <p>Goal Progress: {calcGoalProgress(total, goal)}</p>
            </div>
        </section>
      ) 
}


/*ReactDOM.*/render(
  <SkiDayCounter total={skiData.total}
                 powder={skiData.powder}
                 backcountry={skiData.backcountry}
                 goal={skiData.goal} />,
  document.getElementById('root3')
);

let bookList = [
  {"title": "The Sun Also Rises", "author": "Ernest Hemingway", "pages":"260"},
  {"title": "Home and Away", "author": "Auzie", "pages":"159"},
  {"title": "Ulisses", "author": "Boring Guy", "pages":"1260"}
];

const Book = ({title, author, pages, freeBookMark}) => {
  return(
  <section>
    <h2>{title}</h2>
    <p>by: {author}</p>
    <p>pages: {pages} pages</p>
    <p>Free Bookmark Today: {freeBookMark ? 'yes!' : 'no!'}</p>
  </section>
  );
}

// const Library = () => {
//   return(
//     <section>
//       <hr/>
//       <div>Welcome to the Library</div>
//       <Book title="The Sun Also Rises" author="Ernest Hemingway" pages={260}></Book>
//       <Book title="Home and Away" author="Auzie" pages={159}></Book>
//       <Book title="Ulisses" author="Boring Guy" pages={1260}></Book>
//       <hr/>
//     </section>
//   );
// }

// /*ReactDOM.*/render(
//   <Library/>, 
//   document.getElementById('root4')
// );

// const Library = ({books}) => {
//   return(
//     <section>
//       <hr/>
//       <div>Current number of books: {books.length}</div>
//       <br/>        
//         {books.map(
//            (book, i) => 
//                 <div key={i}> 
//                   <hr/>
//                   <Book                         
//                         title={book.title} 
//                         author={book.author} 
//                         pages={book.pages}>
//                   </Book>
                  
//                 </div>
//         )}    
//     </section>
//   );
// }


const Hiring = () =>
  <div>
    <p>The Library is hiring. Go to www.library.com/jobs for more.</p>
  </div>

const NotHiring = () =>
  <div>
    <p>The Library is not hiring. Check again later.</p>
  </div>

class Library extends React.Component {

  constructor(props) {
    super(props);

    // we may declare this member outside the constructor - it's still an instance member - see later Class and prototype trials 
    // IMPORTANT: keep the state at the root (even state that is required for the children!) "Source of Truth!"
    this.state = {
      open: true,
      seconds: 0,
      freeBookMark: true,
      hiring: true
    };

    // we may replace this with the version #2 of toggleOpenClosed (arrow functions automatically bind the current "this" to the function!!!)
    this.toggleOpenClosed = this.toggleOpenClosed.bind(this);
  
    this.interval = setInterval(()=> {
      // console.log(this.state.seconds);
      this.setState(prevState => ({
        // open: this.state.open,
        seconds: ++prevState.seconds
      }))
    }, 1000);
  }

  // version #1:
  toggleOpenClosed() {

    // Why the usage of "this" requires the "bind" in the constructor (see this.toggleOpenClosed block in the constructor above)?
    // this should be recognized as in any prototype's function refereing the current "this"
    // AS it works in "render" method???
    // ANSWER: when the calling context is a Library instance, it does recognize it.
    // the problem is with external code calling this method directly (not throught the instance.toggleOpenClosed()).
    // that's what is happening when the rendered dom is calling the toggleOpenClosed.
    // see: https://medium.com/@vijay.j.shekhawat/javascript-why-var-self-this-bbbaf98ab9d9

    // BUT HOW does "render" does work? (as explained later, arrow functions bind "this"
    // in compile time, but "render" is not always an arrow function - see later examples?)
    // ANSWER: it is always used in the context of the component (from within the component),
    // and therefore the "this" is the component, but toggleOpenClosed is "returned"/binded to the dom object
    // and is called on the dom object, and the "this" is now the dom object. If the "render" 
    // func would have been used the same, it would have caused the same problem.

    // version 1.1: set by sending a new state object
    // this.setState({
    //   open: !this.state.open
    // });

    // version 1.2: send a callback function that sets the new state (it gets the existing state as a parameter)
    this.setState(prevState => ({
      open: !prevState.open
    }));

  }

  // version #2: doesn't require binding (see explanation above in the constructor)
  // toggleOpenClosed = () => {
  //   this.setState(prevState => ({
  //     open: !prevState.open
  //   }));
  // }

  render() {
    
    // const books = this.props.books;
    const { books } = this.props;

    return(
      <section>
        <hr/>
        {this.state.hiring ? <Hiring/> : <NotHiring/>}
        <hr/>
        <div>Current number of books: {books.length}</div>
        <br/>
        <div>The library is: { this.state.open ? 'open' : 'closed' }</div>
        <br/>        
        <div>You're already: { this.state.seconds } seconds in the library</div>
        <br/>        
        <button onClick={this.toggleOpenClosed}>Change</button>   
        <br/>
          {books.map(
             (book, i) => 
                  <div key={i}> 
                    <hr/>
                    <Book                         
                          title={book.title} 
                          author={book.author} 
                          pages={book.pages}
                          freeBookMark={this.state.freeBookMark}> //this is passed to the Book child as props!!
                    </Book>                    
                  </div>
          )} 
          
      </section>
    );
  }
}

/*ReactDOM.*/render(
  <Library books={bookList}/>, 
  document.getElementById('root4')
);


//*************************** prototype and class trials ****************************************************/


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

//--------

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



//---- this -----

class thisTrial {

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
thisTrial.doSomethingStatic(); 
let refToStaticFunc = thisTrial.doSomethingStatic;
refToStaticFunc(); // prints undefined instead of "window"

//-----------------------------------------

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