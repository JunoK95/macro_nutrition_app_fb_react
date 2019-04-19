import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import {UserIsAuthenticated, UserIsNotAuthenticated} from '../../helpers/auth'

import Login from '../login/Login';
import Register from '../login/Register';

class WithoutNavbar extends Component{
    render(){
        return(
            <div>
            <Route exact path="/login" component={UserIsNotAuthenticated(Login)} />
            <Route exact path="/register" component={UserIsNotAuthenticated(Register)} />
            </div>
        )
    }
}

export default WithoutNavbar