import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'


class Profile extends Component {
    render(){
        console.log(this.props)
        const {user} = this.props
        if(user){
            const faveFoodList = user.favoriteFoods.map(x => {
                return(
                    <div key={x}>
                        {x}
                    </div>
                )}
            )
            return(
                <div>
                    <div>
                        {user.email}
                    </div>
                    <div>
                        {faveFoodList}
                    </div>
                </div>
            )
        }
        else{
            return(
                <div>
                    ...loading
                </div>
            )
        }

    }
}

Profile.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [{ collection: "users", storeAs: "user", doc: props.match.params.id } ]),
    connect(({firestore: {ordered}}, props) => ({
        user: ordered.user && ordered.user[0]
    }))
)(Profile)