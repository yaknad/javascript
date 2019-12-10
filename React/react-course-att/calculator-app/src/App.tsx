import React from 'react';
import logo from './logo.svg';
import './App.scss';
import { Calculator } from './components/calculator/calculator';

const App: React.FC = () => {
  return (
    <div className="App">
      <Calculator></Calculator>
    </div>
  );
}

export default App;

// *************** check: www.codesandbox.io ****************
// It's a js sandbox. Play with React and other libraries.a1