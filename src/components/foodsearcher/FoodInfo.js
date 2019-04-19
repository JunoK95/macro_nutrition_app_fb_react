import React, {Component} from 'react'
import LoadingGif from '../layout/LoadingGif';
import {firestoreConnect, firebaseConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {connect} from 'react-redux'

class FoodInfo extends Component{
    
    state = {
        added : false,
        ndbno : '',
        info: null,
        foodAmount: 0
    }

    addToPantry = (e) => {
        e.preventDefault()
        const {firestore, auth} = this.props
        let collectionRef = firestore.collection('pantries')
        let documentRef = collectionRef.doc(auth.uid)
        documentRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists){               
                    documentRef.update({
                        foods: firestore.FieldValue.arrayUnion(this.state.ndbno)
                    })
                } else {
                    console.log("doesn't exist")
                    const newPantry = {
                        foods: [this.state.ndbno]
                    }
                    documentRef.set(newPantry)
                }
            })
        this.setState({added: true})
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]:value})
    }

    componentDidMount(){
        const api_key = (process.env.REACT_APP_NDBNO_API_KEY)
        const ndbno = this.props.match.params.ndbno
        const apiLink = `https://api.nal.usda.gov/ndb/V2/reports?ndbno=${ndbno}+&type=b&format=json&api_key=${api_key}`
        
        fetch (apiLink)
            .then(response => response.json())
            .then(data => {
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
                        <h6 className="card-subtitle text-muted mb-2">{desc.manu}</h6>
                        <div className="row container">
                            <form className="form-inline">
                                <input name="foodAmount" className="form-control form-control-sm" type="number" placeholder="grams" value={this.state.foodAmount} onChange={this.onChange} />
                                <button className="btn btn-sm btn-outline-success" type="submit"><i className="fas fa-cookie-bite" /> EAT</button>
                            </form>
                            {this.state.added ? 
                                <button type="button" className="btn btn-sm btn-success float-right" style={{marginLeft:"auto"}}>
                                    <i className="fas fa-check"/>  ADDED
                                </button> : 
                                <button type="button" className="btn btn-sm btn-outline-danger float-right" style={{marginLeft:"auto"}} onClick={this.addToPantry}>
                                    <i className="fas fa-heart"/>  ADD
                                </button>}
                            
                        </div>
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

export default compose(
    firestoreConnect(),
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(FoodInfo)