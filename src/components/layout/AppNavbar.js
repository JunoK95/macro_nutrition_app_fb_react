import React, {Component} from 'react'
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

    render(){

        return(<div>
                <CheeseburgerMenu isOpen={this.state.menuOpen} closeCallback={this.closeMenu.bind(this)}>
                    <MenuContent closeCallback={this.closeMenu.bind(this)}/>
                </CheeseburgerMenu>

                <i className='fas fa-bars' onClick={this.openMenu.bind(this)} style={{marginLeft:'16px',marginTop:'12px', fontSize:'24px', position:'fixed'}} />
            </div>      
        )
    }
}

export default AppNavbar