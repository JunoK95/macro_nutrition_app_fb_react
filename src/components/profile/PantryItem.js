import React from 'react'
import {Link} from 'react-router-dom'


function PantryItem(props){
    const cal = props.value.nutrients.filter(x => x.nutrient_id === "208")
    const prot = props.value.nutrients.filter(x => x.nutrient_id === "203")
    const fat = props.value.nutrients.filter(x => x.nutrient_id === "204")
    const carb = props.value.nutrients.filter(x => x.nutrient_id === "205")
    return(
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col col-md-8">
                        <Link to={`/foodinfo/${props.value.desc.ndbno}`} >
                            <h6 className="card-title" style={{overflow: "hidden"}}>{props.value.desc.name}</h6>
                        </Link>
                        <h6 className="card-subtitle text-muted" style={{fontSize: "80%", overflow: "hidden"}}>{props.value.desc.manu ? props.value.desc.manu : null}</h6>
                    </div>
                    <div className="col col-md-3 list-inline">
                        <h6 className="text-muted list-inline-item" style={{fontSize: "70%"}}>{cal[0].value}kcal</h6>
                        <h6 className="text-muted list-inline-item" style={{fontSize: "70%"}}>p {prot[0].value}g</h6>
                        <h6 className="text-muted list-inline-item" style={{fontSize: "70%"}}>f {fat[0].value}g </h6>
                        <h6 className="text-muted list-inline-item" style={{fontSize: "70%"}}>c {carb[0].value}g</h6>
                    </div>
                    <div className="col-md-1 list-inline">
                        <i className="fas fa-trash float-right list-inline-item" value={props.value.desc.ndbno} style={{color:"red", cursor:"pointer", textAlign:"center", fontSize:"110%"}} onClick={props.deleteClicked}></i>
                    </div>
                </div> 
            </div>
        </div>
    )
}

export default PantryItem