import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect, firestoreConnect} from 'react-redux-firebase'
import {notifyUser} from '../../actions/notifyActions'
import Alert from '../layout/Alert'
import store from '../../store'

class Register extends Component {
    state = {
        email: '',
        password: ''
    }

    onChange = (event) => {
        const {name, value} = event.target
        this.setState({[name]:value})
    }

    onSubmit = (event) => {
        event.preventDefault()
        const {firebase} = this.props;
        const {firestore} = this.props;
        const {email, password} = this.state

        //Register
        firebase.createUser({ email, password })
            .catch(err => {console.log(err)
                return(this.props.notifyUser(err.message,'error'))})
            .then(()=> this.props.history.push('/firstTimeSetup'))
    }

    render() {
        const {message, messageType} = this.props.notify
        

        return(
            
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <div className="row">
                            <div className="col-md-6 text-left">
                                <Link to="/login" className="btn btn-link">
                                    <i className="fas fa-arrow-circle-left" /> Login
                                </Link>
                            </div>
                        </div>
                        <div className="card-body">
                            {message ? <Alert message={message} messageType={messageType}/> : null}
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock" /> {''}
                                    Register
                                </span>
                            </h1>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" name="email" required value={this.state.email} onChange={this.onChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" name="password" required value={this.state.password} onChange={this.onChange} />
                                </div>
                                <input type="submit" value="Register" className="btn btn-primary btn-block" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    firebase: PropTypes.object.isRequired,
    notify: PropTypes.object.isRequired,
    notifyUser: PropTypes.func.isRequired
}

export default compose(
    firestoreConnect(),
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify
    }), {notifyUser})
)(Register)