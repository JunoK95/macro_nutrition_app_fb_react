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
                <div className="col-md-6">
                    <div className={`c100 p${value} ${color} ${this.props.big}`} onMouseEnter={() => this.setState({hovered:true})} onMouseLeave={() => this.setState({hovered:false})}> 
                        {this.state.hovered ? <span>{Number(this.props.today).toFixed(0)}/{this.props.dietLimits.toFixed(0)}</span> : <span>{name}</span>}
                        <div className="slice">    
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>                       
                </div>
            )
        } else{
            return(
                <div className="col-md-6">
                    <div className={`c100 p100 red ${this.props.big}`} onMouseEnter={() => this.setState({hovered:true})} onMouseLeave={() => this.setState({hovered:false})}> 
                        {this.state.hovered ? <span>{Number(this.props.today).toFixed(0)}/{this.props.dietLimits.toFixed(0)}</span> : <span>{name}</span>} 
                        <div className="slice">    
                            <div className="bar"></div>
                            <div className="fill"></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default CircleGauge