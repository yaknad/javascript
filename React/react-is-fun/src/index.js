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
// import ReactDOM from 'react-dom';

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
setTimeout(()=>{
  globalMinutes++;
}, 3000);

class Message extends Component {
    render(){
      console.log(this.props);
      return (
        <div>
          <h1 style={{color: this.props.color}}>{this.props.msg}</h1>
          <p>I'll check back in {this.props.minutes} minutes</p>
          <p>or in {globalMinutes} minutes - THIS IS NOT REFRESHING (one way binding!)</p>  
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

const Book = ({title, author, pages}) => {
  return(
  <section>
    <h2>{title}</h2>
    <p>by: {author}</p>
    <p>pages: {pages} pages</p>
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

const Library = ({books}) => {
  return(
    <section>
        {books.map(
           book => <Book title={book.title} author={book.author} pages={book.pages}></Book>
        )}    
    </section>
  );
}



/*ReactDOM.*/render(
  <Library books={bookList}/>, 
  document.getElementById('root4')
);