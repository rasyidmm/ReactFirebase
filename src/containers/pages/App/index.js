import React from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Dasboard from '../Dashboard';
import Login from '../Login';
import Resgister from '../Register';
import {Provider} from 'react-redux'
import {storeRedux} from '../../../config/redux'




function App() {
  return (
    <Provider store={storeRedux}>
      <Router>
        <div>
          <Route path="/" exact component={Dasboard}/>
          <Route path="/login"  component={Login}/>
          <Route path="/register"  component={Resgister}/>
        </div>
      </Router>
    </Provider>

  );
}

export default App;
