import React, {Component} from 'react'

class FoodInfo extends Component{
    
    state = {
        ndbno : '',
        info: null
    }

    componentDidMount(){
        const api_key = (process.env.REACT_APP_NDBNO_API_KEY)
        const ndbno = this.props.match.params.ndbno
        const apiLink = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}+&type=b&format=json&api_key=${api_key}`
        
        fetch (apiLink)
            .then(response => response.json())
            .then(data => {
                    console.log(data.foods[0].food)
                    this.setState({ndbno: ndbno, info: data.foods[0].food})
                }
            )
    }

    render(){    
        if(this.state.info){ 
            console.log(this.state.info)
            const name = this.state.info.desc.name
            const calNut = this.state.info.nutrients.filter(x => x.nutrient_id === "208")
            const carbNut = this.state.info.nutrients.filter(x => x.nutrient_id === "205")
            const fatNut = this.state.info.nutrients.filter(x => x.nutrient_id === "204")
            const proNut = this.state.info.nutrients.filter(x => x.nutrient_id === "203")  
    
            return(
            <div className='container card col-sm-6'>
                <div className="card-body">
                    <h5 className="card-subtitle mb-2 text-muted">Current NDBNO: {this.state.ndbno}</h5>
                    <h5 className="card-subtitle mb-2 text-muted">Current name: {name} </h5>
                    <h5 className="card-subtitle mb-2 text-muted">Current kCal: {calNut[0].value + calNut[0].unit} </h5>
                    <h5 className="card-subtitle mb-2 text-muted">Current CF: {carbNut[0].value + carbNut[0].unit}</h5>
                    <h5 className="card-subtitle mb-2 text-muted">Current FF: {fatNut[0].value + fatNut[0].unit} </h5>
                    <h5 className="card-subtitle mb-2 text-muted">Current PF: {proNut[0].value + proNut[0].unit}</h5>
                </div>
            </div>
            )
        }
        else{
            return(
                <h1>Loading...</h1> 
            )
        }
        
    }
}

export default FoodInfo