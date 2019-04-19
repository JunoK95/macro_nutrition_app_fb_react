import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firebaseConnect} from 'react-redux-firebase'
import {notifyUser} from '../../actions/notifyActions'
import Alert from '../layout/Alert'

class Login extends Component {
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
        const {email, password} = this.state

        firebase.login({
            email,
            password
        }).catch(error => this.props.notifyUser('Invalid Login Credentials', 'error'))
    }

    render() {
        const {message, messageType} = this.props.notify

        return(
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <div className="card">
                        <br/>
                        <div className="card-body">
                            {message ? <Alert message={message} messageType={messageType}/> : null}
                            <h1 className="text-center pb-4 pt-3">
                                <span className="text-primary">
                                    <i className="fas fa-lock" /> {''}
                                    Login
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
                                <input type="submit" value="Login" className="btn btn-primary btn-block mb-1" />
                                <Link to="/register"><input type="button" value="Register" className="btn btn-primary btn-block mb-2" /></Link>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    firebase: PropTypes.object.isRequired
}

export default compose(
    firebaseConnect(),
    connect((state, props) => ({
        notify: state.notify
    }), {notifyUser})
)(Login)