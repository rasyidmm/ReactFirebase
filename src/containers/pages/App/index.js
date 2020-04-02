import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Dasboard from '../Dashboard';
import Login from '../Login';
import Resgister from '../Register';


function App() {
  return (
    <Router>
      <div>
        <Route path="/" exact component={Dasboard}/>
        <Route path="/login"  component={Login}/>
        <Route path="/register"  component={Resgister}/>
      </div>
    </Router>
  );
}

export default App;
