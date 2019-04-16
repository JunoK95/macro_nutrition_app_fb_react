import React, {Component} from 'react'
import LoadingGif from '../layout/LoadingGif';

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
            /* const calNut = nutrients.filter(x => x.nutrient_id === "208")
            const carbNut = nutrients.filter(x => x.nutrient_id === "205")
            const fatNut = nutrients.filter(x => x.nutrient_id === "204")
            const proNut = nutrients.filter(x => x.nutrient_id === "203") */
            
            const allNut = nutrients.map(x => {
                let serveSizeValue = null
                try{
                    serveSizeValue = x.measures[0].value
                }catch(e){
                    console.log("measure no value")
                }

                return(
                    <tr key={x.nutrient_id}>
                        <th scope="row">{x.name} ({x.unit})</th>
                        <td>{x.value}</td>
                        <td>{serveSizeValue}</td>
                    </tr>
                )
            })  
            let servingSize = null
            try{
                servingSize = String(nutrients[0].measures[0].label) + "(" + String(nutrients[0].measures[0].eqv) + String(nutrients[0].measures[0].eunit) + ")"
            }catch(e){

            }
    
            return(
                <div className="card container" style={{marginTop:"5px"}}>
                    <div className="card-header">
                        <h5 className="card-title">{desc.name}</h5>
                        <button type="button" className="btn btn-sm btn-outline-danger float-right"><i className="fas fa-plus"/>  ADD</button>
                        <h6 className="card-subtitle text-muted">{desc.manu}</h6>
                    </div> 
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Nutrition Facts</th>
                                <th scope="col">per 100g</th>
                                <th scope="col">{servingSize}</th>
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
                <LoadingGif />
            )
        }
        
    }
}

export default FoodInfo