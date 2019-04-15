import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import FoodSearcher from './components/foodsearcher/FoodSearcher';
import FoodInfo from './components/foodsearcher/FoodInfo';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Pantry from './components/profile/Pantry';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
                <Route exact path="/" component={FoodSearcher} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/foodInfo/:ndbno" component={FoodInfo} />
                <Route exact path="/profile/:id" component={Profile} />
                <Route exact path="/pantry/:id" component={Pantry} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
