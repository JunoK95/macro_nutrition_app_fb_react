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
            const {desc , nutrients} = this.state.info
            const calNut = nutrients.filter(x => x.nutrient_id === "208")
            const carbNut = nutrients.filter(x => x.nutrient_id === "205")
            const fatNut = nutrients.filter(x => x.nutrient_id === "204")
            const proNut = nutrients.filter(x => x.nutrient_id === "203")
            
            const allNut = nutrients.map(x => {
                return(
                    <tr key={x.nutrient_id}>
                        <th scope="row">{x.name} ({x.unit})</th>
                        <td>{x.value}</td>
                        <td>{x.measures[0].value}</td>
                    </tr>
                )
            })  
    
            return(
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title">{desc.name}</h5>
                        <button type="button" className="btn btn-outline-danger float-right"><i className="fas fa-plus"/>  ADD</button>
                        <h6 className="card-subtitle text-muted">{desc.manu}</h6>
                    </div> 
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nutrition Facts</th>
                                <th scope="col">per 100g</th>
                                <th scope="col">{nutrients[0].measures[0].label}</th>
                            </tr>    
                        </thead>
                        <tbody>
                            {allNut}
                        </tbody>
                    </table>
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