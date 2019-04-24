import React, {Component} from 'react'
import '../layout/percentageBar/css/circle.css'

class CircleGauge extends Component{
    state = {
        hovered: false
    }

    render(){
        const {color, value, name} = this.props
        if (value <= 100){
            return(
                <div className={`c100 p${value} ${color}`} onMouseEnter={() => this.setState({hovered:true})} onMouseLeave={() => this.setState({hovered:false})}> 
                    {this.state.hovered ? <span>{name}</span> : <span>{value}%</span>}
                    <div className="slice">    
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                </div>
            )
        } else{
            return(
                <div className={`c100 p100 red`} onMouseEnter={() => this.setState({hovered:true})} onMouseLeave={() => this.setState({hovered:false})}> 
                    {this.state.hovered ? <span>{name}</span> : <span>{value}%</span>} 
                    <div className="slice">    
                        <div className="bar"></div>
                        <div className="fill"></div>
                    </div>
                </div>
            )
        }
    }
}

export default CircleGauge