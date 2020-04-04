import React from 'react';
import './App.css';
import LandingHeader from './components/LandingHeader/LandingHeader'
import LandingBody from './components/LandingBody/LandingBody'


function App() {
  return (
    <div className="App">
      <LandingHeader></LandingHeader>
      <LandingBody></LandingBody>
    </div>
  );
}

export default App;
