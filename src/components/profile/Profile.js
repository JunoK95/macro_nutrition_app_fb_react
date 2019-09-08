import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect, firebaseConnect} from 'react-redux-firebase'
import LoadingGif from '../layout/LoadingGif';
import CircleGauge from './CircleGauge';
import { GetDate, toPercent, ConfigDate } from '../../helpers';
import '../layout/diamondGrid.css'
import Pantry from './Pantry';
import FoodHistory from './FoodHistory';

class Profile extends Component {
    state = {
        email: '',
        date: '',
        dayAway: 0,
        favoriteFoods: [],
        todayFood: {},
        todayNut: null,
        dietLimits: {
            calorie: 2265,
            carb: 277,
            protein: 120,
            fat: 75
        }
    }

    onLeftClick = (e) => {
        e.preventDefault()
        const {dayAway} = this.state
        const newDayAway = dayAway - 1
        let today = new Date()
        today.setDate(today.getDate()+newDayAway)
        today = ConfigDate(today)
        this.setState({...this.state, date: today, dayAway: newDayAway})

        //get today's nutrition
        const {auth} = this.props
        const {firestore} = this.props
        let collectionRef = firestore.collection('users')
        let documentRef = collectionRef.doc(auth.uid)
        const nutritionDoc = documentRef.collection('mealsAte').doc(today)

        nutritionDoc.get().then((docSnapshot) => {
            if (docSnapshot.exists){   
                const {food, nutrition} = docSnapshot.data()     
                this.setState({...this.state, todayFood: food, todayNut: nutrition})
            }else{
                nutritionDoc.set({food:{}, nutrition: {calories:0,carbs:0,fats:0,protein:0}})
                this.setState({todayNut: {calories:0,carbs:0,fats:0,protein:0}})
            }
        })
    }

    onRightClick = (e) => {
        e.preventDefault()
        const {dayAway} = this.state
        const newDayAway = dayAway + 1
        let today = new Date()
        today.setDate(today.getDate()+newDayAway)
        today = ConfigDate(today)
        this.setState({...this.state, date: today, dayAway: newDayAway})
        
        //get today's nutrition
        const {auth} = this.props
        const {firestore} = this.props
        let collectionRef = firestore.collection('users')
        let documentRef = collectionRef.doc(auth.uid)
        const nutritionDoc = documentRef.collection('mealsAte').doc(today)

        nutritionDoc.get().then((docSnapshot) => {
            if (docSnapshot.exists){   
                const {food, nutrition} = docSnapshot.data()     
                this.setState({...this.state, todayFood: food, todayNut: nutrition})
            }else{
                nutritionDoc.set({food:{}, nutrition: {calories:0,carbs:0,fats:0,protein:0}})
                this.setState({todayNut: {calories:0,carbs:0,fats:0,protein:0}})
            }
        })

    }

    componentDidMount(){
        const {auth} = this.props
        const {firestore} = this.props
        let collectionRef = firestore.collection('users')
        let documentRef = collectionRef.doc(auth.uid)
        documentRef.get()
            .then((docSnapshot) => {
                if (docSnapshot.exists){  
                    //set State with data from firestore             
                    documentRef.onSnapshot((doc) => {
                        console.log("document get",doc)
                        this.setState({...this.state, email: doc.data().email})})
                } else {
                    console.log("doesn't exist")
                    //if the data doesn't exist
                    const newUser = {
                        email: auth.email,
                        favoriteFoods: []
                    }
                    documentRef.set(newUser)
                    this.setState({...this.state, email: newUser.email})
                }
            })

        //get today's nutrition
        const nutritionDoc = documentRef.collection('mealsAte').doc(GetDate())
        
        nutritionDoc.get().then((docSnapshot) => {
            if (docSnapshot.exists){   
                const {food, nutrition} = docSnapshot.data()     
                this.setState({...this.state, date: GetDate(), todayFood: food, todayNut: nutrition})
            }else{
                nutritionDoc.set({food:{}, nutrition: {calories:0,carbs:0,fats:0,protein:0}})
                this.setState({date: GetDate(), todayNut: {calories:0,carbs:0,fats:0,protein:0}})
            }
        })
    }

    render(){
        if(this.state.email !== '' && this.state.todayNut){
            const faveFoodList = this.state.favoriteFoods.map(x => {
                return(
                    <div key={x}>
                        {x}
                    </div>
                )}
            )

            //const {userInfo} = this.props
            const {todayNut, dietLimits} = this.state

            return(
                <div>
                    <div className="card container">
                        <div className="card-header">
                            <div className="text-center">
                                <h4>Profile</h4>
                                <ul className="nav justify-content-center">
                                    <li className="nav-item">
                                        <i className="fas fa-caret-left" style={{paddingRight:'12px', fontSize:'120%', cursor:"pointer"}} onClick={this.onLeftClick} />
                                    </li>
                                    <li className="nav-item">
                                        {this.state.dayAway === 0 ? <h6>Today</h6> : <h6>{this.state.date}</h6>}
                                    </li>
                                    <li className="nav-item">
                                        <i className="fas fa-caret-right" style={{paddingLeft:'12px', fontSize:'120%', cursor:"pointer"}} onClick={this.onRightClick} />
                                    </li>
                                </ul>
                            </div>          
                        </div>
                        
                        <div className="card-body">
                            <div className="row centered">
                                <div className="col-md-2">
                                    <div className="col-md-3"><CircleGauge big='small' name="Cal" value={toPercent(todayNut.calories/dietLimits.calorie)} today={todayNut.calories} dietLimits={dietLimits.calorie} color="orange" /></div>
                                </div>
                                <div className="col-md-2">
                                    <div className="col-md-3"><CircleGauge big="small" name="Carbs" value={toPercent(todayNut.carbs/dietLimits.carb)} today={todayNut.carbs} dietLimits={dietLimits.carb} color="green" /></div>
                                    <div className="col-md-3"><CircleGauge big="small" name="Fats" value={toPercent(todayNut.fats/dietLimits.fat)} today={todayNut.fats} dietLimits={dietLimits.fat} color="gold" /></div>
                                    <div className="col-md-3"><CircleGauge big="small" name="Protein" value={toPercent(todayNut.protein/dietLimits.protein)} today={todayNut.protein} dietLimits={dietLimits.protein} color="indigo" /></div>                                              
                                </div>
                                <div className="col-md-8">
                                    <FoodHistory date={this.state.date} />
                                </div>
                            </div>
                        </div>
                    </div>
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

Profile.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    firestoreConnect(),
    connect(({firestore: {ordered}}, props) => ({
        user: ordered.user && ordered.user[0]
    })),
    connect((state, props) => ({
        auth: state.firebase.auth,
        userInfo: state.user
    }))
)(Profile)