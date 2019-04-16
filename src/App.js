import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {UserIsAuthenticated, UserIsNotAuthenticated} from './helpers/auth'

import { Provider } from 'react-redux';
import store from './store';
import './App.css';

import FoodSearcher from './components/foodsearcher/FoodSearcher';
import FoodInfo from './components/foodsearcher/FoodInfo';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import Pantry from './components/profile/Pantry';
import AppNavbar from './components/layout/AppNavbar';
import Register from './components/login/Register';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <AppNavbar />
              <Switch>
                  <Route exact path="/" component={FoodSearcher} />
                  <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                  <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                  <Route exact path="/foodInfo/:ndbno" component={FoodInfo} />
                  <Route exact path="/profile/:id" component={UserIsAuthenticated(Profile)} />
                  <Route exact path="/pantry/:id" component={UserIsAuthenticated(Pantry)} />
              </Switch>   
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
