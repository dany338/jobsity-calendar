import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Content from './components/Content';

function App() {
  return (
    <div className="app">
      <div className="app__body">
        <Sidebar />
        <Content />
      </div>
    </div>
  );
}

export default App;
