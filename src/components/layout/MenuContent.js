import React, { Component } from 'react'
import './MenuContent.css'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import food_logo from './food_logo.png'

class MenuContent extends Component {
    
    render() {
        //const {auth} = this.props
        return (
            <div className="menu">
                <div className="menu-item menu-item-brand">
                    <Link to={`/profile`} onClick={this.props.closeCallback}>
                        <img src={food_logo} alt="foodLogo" style={{width: '40%', marginLeft: "auto", marginRight: "auto", display: "block"}} />
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to={`/profile`} onClick={this.props.closeCallback}>
                        About
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to={`/profile`} onClick={this.props.closeCallback}>
                        Profile
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to={`/pantry`} onClick={this.props.closeCallback}>
                        Pantry
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to='/search' onClick={this.props.closeCallback}>
                        Search
                    </Link>
                </div>
                <div className="menu-item">
                    <Link to={`/profile`} onClick={this.props.closeCallback}>
                        Support
                    </Link>
                </div>
            </div>
        )
    }
    }

MenuContent.propTypes = {
    closeCallback: PropTypes.func.isRequired,
    firebase: PropTypes.object.isRequired
}


export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth,
    }))
)(MenuContent)