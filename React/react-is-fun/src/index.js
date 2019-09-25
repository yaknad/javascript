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