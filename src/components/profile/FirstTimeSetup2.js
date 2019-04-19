import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect, firebaseConnect} from 'react-redux-firebase';
import LoadingGif from '../layout/LoadingGif'

class FirstTimeSetup2 extends Component {
    state = {
        firstName: '',
        lastName: '',
        sex: '',
        weight: '',
        height: '',
        waistLength: '',
        age: '',
    }

    onChange = (e) => {
        e.preventDefault()
        const {name,value} = e.target    
        this.setState({[name]:value})   
    }

    onSubmit = (e) => {
        e.preventDefault()
        console.log(this.state)
        const {auth} = this.props
        const {firestore} = this.props
        let collectionRef = firestore.collection('users')
        let documentRef = collectionRef.doc(auth.uid)
        documentRef.get()
            .then((docSnapshot) => {
                    console.log("doesn't exist")
                    const newUser = {
                        ...this.state,
                        email: auth.email,
                        favoriteFoods: []
                    }
                    documentRef.update(newUser)
                        .catch(err => {console.log(err)
                            return(this.props.notifyUser(err.message,'error'))})
                        .then(()=> this.props.history.push('/profile'))
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
                    documentRef.onSnapshot((doc) => {
                        console.log("document get",doc)
                        this.setState({...this.state, email: doc.data().email, favoriteFoods: doc.data().favoriteFoods})})
                } else {
                    console.log("doesn't exist")
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
        if (this.props.auth){
            return(
                <form className="container">
                    <div className="card">
                        <div className="card-body">
                            <div className="form-row">
                                <div className="form-group col-md-5">
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" name="firstName" value={this.state.firstName} className="form-control" id="inputfirstName" placeholder="First Name" onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-5">
                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" name="lastName" value={this.state.lastName} className="form-control" id="inputlastName" placeholder="Last Name"  onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputSex">Sex</label>
                                    <select name="sex" defaultValue="" id="inputSex" className="form-control" onChange={this.onChange}>
                                        <option value="">---</option>
                                        <option value="M">M</option>
                                        <option value="F">F</option>
                                    </select>
                                </div>   
                            </div>
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label htmlFor="inputWeight">Weight(lb)</label>
                                    <input type="number" name="weight" className="form-control" id="inputWeight" onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputHeight">Height(in)</label>
                                    <input type="number" name="height" className="form-control" id="inputHeight" onChange={this.onChange} />
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputWaist">Waist(in)</label>
                                    <input type="number" name="waistLength" value={this.state.waistLength} className="form-control" id="inputWaist" onChange={this.onChange} />     
                                </div>
                                <div className="form-group col-md-2">
                                    <label htmlFor="inputAge">Age</label>
                                    <input type="number" name="age" className="form-control" id="inputAge" onChange={this.onChange} />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={this.onSubmit}>Submit</button>
                            </div>
                        </div>
                    </div>
                </form>
            )
        }
        
        else{
            return(<LoadingGif />)      
        }
 
    }
}

export default compose(
    firestoreConnect(),
    firebaseConnect(),
    connect((state, props) => ({
        auth: state.firebase.auth
    }))
)(FirstTimeSetup2)