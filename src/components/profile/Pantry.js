import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect ,firebaseConnect} from 'react-redux-firebase'
import LoadingGif from '../layout/LoadingGif'
import { setUser } from '../../actions/userActions'
import PantryItem from './PantryItem';
import {Link} from 'react-router-dom'

class Pantry extends Component {
    state = {
        foodList: [],
    }

    deleteClicked = (e) => {
        e.preventDefault()
        const value = e.target.getAttribute('value')
        const {firestore, userInfo} = this.props
        let collectionRef = firestore.collection('pantries')
        let documentRef = collectionRef.doc(userInfo.uid)
        documentRef.update({foods: firestore.FieldValue.arrayRemove(value)})
            .then(() => {
                let newFoodList = [...this.state.foodList]
                newFoodList.splice(newFoodList.indexOf(value),1)
                this.setState({...this.state,foodList: newFoodList})
            })
    }

    getFoodInfo = (ndbnolist) => {
        const api_key = (process.env.REACT_APP_NDBNO_API_KEY)
        let ndbno = ''
        for (let i = 0; i < ndbnolist.length; i++){
            let x = ndbnolist[i]
            ndbno =  ndbno + "ndbno="+String(x)+"&"
        }

        const apiLink = `https://api.nal.usda.gov/ndb/V2/reports?${ndbno}type=b&format=json&api_key=${api_key}`
        fetch(apiLink)
            .then(response => response.json())
            .then((data) => {
                this.setState({foodValues: data})
            })
    }

    componentDidMount(){
        const {firestore, firebase} = this.props
        let collectionRef = firestore.collection('pantries')
        let documentRef = null

        //if redux state isn't set from page refreshing/whatnot get uid/email from firebase.auth() and set it again
        if(firebase.auth().currentUser){
            const {email, uid} = firebase.auth().currentUser
            this.props.setUser({email : email ,uid : uid })
            documentRef = collectionRef.doc(uid)
        } else{
            documentRef = collectionRef.doc(firebase.auth().currentUser.uid)
        }
         
        documentRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists){   
                    const {foods} = docSnapshot.data()   
                    this.setState({...this.state, foodList: foods})
                    this.getFoodInfo(foods)
                }
            })
    }

    render(){
        let pantryList;
        if(this.state.foodValues){
            pantryList = this.state.foodValues.foods.map(
                food => {
                    if(this.state.foodList.includes(food.food.desc.ndbno)){
                        return(<PantryItem key={food.food.desc.ndbno} id={food.food.desc.ndbno} value={food.food} deleteClicked={this.deleteClicked} />)
                    } return null
                }
            )
        } else {
            pantryList = []
        }

        if(pantryList){
            if (pantryList.length > 0){
                return(
                    <div className="container card">
                        {pantryList}
                    </div>
                )
            } else {
                return(
                    <div className="container card">
                        Your Pantry seems to be Empty
                        <Link to='/search'>Add Food Items</Link>
                    </div>
                )
            }         
        } else{
            return(
                <div>
                    <LoadingGif />
                </div>
            )
        }
    }
}

Pantry.propTypes = {
    firestore: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
}

export default compose(
    firebaseConnect(),
    firestoreConnect(),
    connect((state, props) => ({
        userInfo: state.user
    }),{setUser})
)(Pantry)