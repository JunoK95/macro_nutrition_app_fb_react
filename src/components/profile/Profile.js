import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect, firebaseConnect} from 'react-redux-firebase'
import LoadingGif from '../layout/LoadingGif';
import '../layout/percentageBar/css/circle.css'

class Profile extends Component {
    state = {
        email: '',
        favoriteFoods: [],
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
                        this.setState({...this.state, email: doc.data().email, favoriteFoods: doc.data().favoriteFoods})})
                } else {
                    console.log("doesn't exist")
                    //if the data doesn't exist
                    const newUser = {
                        email: auth.email,
                        favoriteFoods: []
                    }
                    documentRef.set(newUser)
                    this.setState({...this.state, email: newUser.email, favoriteFoods: newUser.favoriteFoods})
                }
            })
    }

    render(){
        if(this.state.email !== ''){
            const faveFoodList = this.state.favoriteFoods.map(x => {
                return(
                    <div key={x}>
                        {x}
                    </div>
                )}
            )
            const {userInfo} = this.props

            return(
                <div>
                    <div className="card container">
                        <div className="card-header">
                            <h2>Profile</h2>
                        </div>
                        
                        <div className="card-body">
                            <div className="row">
                                <div className="c100 p25 red"> 
                                <span>{userInfo.calorie}%</span>  
                                <div className="slice">    
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                                </div>
                                <div className="c100 p25 orange">
                                <span>25%</span>
                                <div className="slice">    
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                                </div>
                                <div className="c100 p25 green">
                                <span>25%</span>  
                                <div className="slice">    
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                                </div>
                                <div className="c100 p25 indigo">
                                <span>25%</span>  
                                <div className="slice">    
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                                </div>
                                <div className="c100 p25">
                                <span>25%</span>  
                                <div className="slice">    
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                                </div>
                                <div className="c100 p25 gold">
                                <span>25%</span>  
                                <div className="slice">    
                                    <div className="bar"></div>
                                    <div className="fill"></div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            {faveFoodList}
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