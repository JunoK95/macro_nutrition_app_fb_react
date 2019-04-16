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

const LoginContainer = () => {
  return(
    <div>
      <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
      <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
    </div>
  )
}

const DefaultContainer = () => {
  return(
    <div>
      <AppNavbar />
      <Route exact path="/" component={UserIsAuthenticated(FoodSearcher)} />
      <Route exact path="/foodInfo/:ndbno" component={UserIsAuthenticated(FoodInfo)} />
      <Route exact path="/profile/:id" component={UserIsAuthenticated(Profile)} />
      <Route exact path="/pantry/:id" component={UserIsAuthenticated(Pantry)} />
    </div>
  )
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <React.Fragment>
              <div className="App">
                <Route exact path="/(login)" component={LoginContainer}/>
                <Route component={DefaultContainer}/>
              </div>
            </React.Fragment>
          </Switch>   
        </Router>
      </Provider>
    );
  }
}

export default App;
