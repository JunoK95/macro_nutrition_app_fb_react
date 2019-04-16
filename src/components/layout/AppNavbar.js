import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'

import CheeseburgerMenu from 'cheeseburger-menu'
import MenuContent from './MenuContent'

class AppNavbar extends Component{
    constructor(props) {
        super(props)
    
        this.state = {
          menuOpen: false,
        }
      }
    
    openMenu = () => {
        this.setState({ menuOpen: true })
      }
    
    closeMenu = () => {
        this.setState({ menuOpen: false })
    }

    onLogoutClick = (event) => {
        event.preventDefault()
        const {firebase} = this.props
        this.setState({ menuOpen: false })
        firebase.logout()
    }

    render(){

        return(<div>
                <CheeseburgerMenu isOpen={this.state.menuOpen} closeCallback={this.closeMenu.bind(this)}>
                    <MenuContent closeCallback={this.closeMenu.bind(this)}/>
                    <i className="fas fa-sign-out-alt" onClick={this.onLogoutClick} style={{position:'absolute', bottom:'24px', right:'24px', fontSize:'24px', cursor:'pointer'}}></i>
                </CheeseburgerMenu>

                <i className='fas fa-bars' onClick={this.openMenu.bind(this)} style={{marginLeft:'16px',marginTop:'12px', fontSize:'24px', position:'fixed', cursor:'pointer'}} />
            </div>      
        )
    }
}

export default firebaseConnect()(AppNavbar)