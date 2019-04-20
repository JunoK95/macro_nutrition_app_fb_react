import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect ,firebaseConnect} from 'react-redux-firebase'
import LoadingGif from '../layout/LoadingGif'
import { setUser } from '../../actions/userActions'
import PantryItem from './PantryItem';

class Pantry extends Component {
    state = {
        foodList: [],
    }

    deleteClicked = (e) => {
        const value = e.target.getAttribute('value')
        console.log(value, " was clicked")
        const {firestore, userInfo} = this.props
        let collectionRef = firestore.collection('pantries')
        let documentRef = collectionRef.doc(userInfo.uid)
        documentRef.update({foods: firestore.FieldValue.arrayRemove(value)})
            .then(() => {
                let newFoodList = [...this.state.foodList]
                console.log(newFoodList)
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
        if(this.props.userInfo.uid === ""){
            const {email, uid} = firebase.auth().currentUser
            console.log(firebase.auth().currentUser)
            this.props.setUser({email : email ,uid : uid })
            documentRef = collectionRef.doc(uid)
        } else{
            documentRef = collectionRef.doc(this.props.userInfo.uid)
        }
         
        documentRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists){   
                    const {foods} = docSnapshot.data()   
                    console.log(foods)         
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
                        return(<PantryItem key={food.food.desc.ndbno} value={food.food} deleteClicked={this.deleteClicked} />)
                    }
                }
            )
        }
        
        const {userInfo} = this.props
        
        if(userInfo){
            /* const faveFoodList = userInfo.favoriteFoods.map(x => {
                return(
                    <div key={x}>
                        {x}
                    </div>
                )}
            ) */
            
            return(
                <div className="container card">
                    {pantryList}
                </div>
            )
        }
        else{
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
    userInfo: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    firestoreConnect(),
    connect((state, props) => ({
        userInfo: state.user
    }),{setUser})
)(Pantry)