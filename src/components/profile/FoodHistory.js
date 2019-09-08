import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect ,firebaseConnect} from 'react-redux-firebase'
import LoadingGif from '../layout/LoadingGif'
import { setUser } from '../../actions/userActions'
import {Link} from 'react-router-dom'
import FoodHistoryItem from './FoodHistoryItem';
import {objIsEmpty} from '../../helpers'

class FoodHistory extends Component {
    state = {
        foodList: [],
    }

    getFoodInfo = (ndbnolist) => {
        const api_key = (process.env.REACT_APP_NDBNO_API_KEY)
        let ndbno = ''
        ndbnolist = Object.keys(ndbnolist)
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
        const {firestore, firebase, date} = this.props
        let collectionRef = firestore.collection('users')
        let documentRef = null

        //if redux state isn't set from page refreshing/whatnot get uid/email from firebase.auth() and set it again
        if(firebase.auth().currentUser){
            const {email, uid} = firebase.auth().currentUser
            this.props.setUser({email : email ,uid : uid })
            documentRef = collectionRef.doc(uid).collection('mealsAte').doc(date)
        } else{
            documentRef = collectionRef.doc(firebase.auth().currentUser.uid).collection('mealsAte').doc(date)
        }
         
        documentRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists){   
                    const {food} = docSnapshot.data()   
                    this.setState({...this.state, foodList: Object.keys(food)})
                    this.getFoodInfo(food)
                }
            })
    }

    componentWillReceiveProps(){
        const {firestore, firebase, date} = this.props
        let collectionRef = firestore.collection('users')
        let documentRef = null

        //if redux state isn't set from page refreshing/whatnot get uid/email from firebase.auth() and set it again
        documentRef = collectionRef.doc(firebase.auth().currentUser.uid).collection('mealsAte').doc(date)

        documentRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists){   
                    const {food} = docSnapshot.data()
                    if(!objIsEmpty(food)){
                        this.setState({...this.state, foodList: Object.keys(food)})
                        this.getFoodInfo(food)
                    }
                    else{
                        this.setState({...this.state, foodList: Object.keys(food)})
                    }
                }
            })      
    }

    render(){
        let historyList;
        if(this.state.foodValues){
            historyList = this.state.foodValues.foods.map(
                food => {
                    if(this.state.foodList.includes(food.food.desc.ndbno)){
                        return(<FoodHistoryItem key={food.food.desc.ndbno} id={food.food.desc.ndbno} value={food.food} deleteClicked={this.deleteClicked} />)
                    } return null
                }
            )
        } else {
            historyList = []
        }
        console.log(historyList)
        if(historyList){
            if (historyList.length > 0){
                return(
                    <div className="container card" style={{width: '60%', float: 'right'}}>
                        {historyList}
                    </div>
                )
            } else {
                return(
                    <div className="container card" style={{width: '60%', float: 'right'}}>
                        You haven't eaten
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

FoodHistory.propTypes = {
    firestore: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
}

export default compose(
    firebaseConnect(),
    firestoreConnect(),
    connect((state, props) => ({
        userInfo: state.user
    }),{setUser})
)(FoodHistory)