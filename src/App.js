import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
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
import ProfileTest from './components/profile/ProfileTest';
import FirstTimeSetup2 from './components/profile/FirstTimeSetup2';
import Header from './components/layout/Header'



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
                <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
                <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
                <Route exact path="/firsttimesetup" component={UserIsAuthenticated(FirstTimeSetup2)} /> 
                <Route exact path="/testprofile" component={ProfileTest} /> 
                <Route component={DefaultContainer} />                
            </Switch>
          </div>   
        </Router>
      </Provider>
    );
  }
}

/* const LoginContainer = () => {
  return(
    <div>
      <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
      <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
    </div>
  )
} */

const DefaultContainer = () => {
  return(
    <div>
      <Header />
      <AppNavbar/>
        <Switch>
          <Route exact path="/search" component={UserIsAuthenticated(FoodSearcher)} />
          <Route exact path="/foodInfo/:ndbno" component={UserIsAuthenticated(FoodInfo)} />
          <Route exact path="/profile" component={UserIsAuthenticated(Profile)} />       
          <Route exact path="/pantry" component={UserIsAuthenticated(Pantry)} />
          <Redirect to="/profile" /> 
        </Switch>
    </div>
  )
}

export default App;
