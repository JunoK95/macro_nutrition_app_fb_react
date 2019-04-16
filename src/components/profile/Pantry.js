import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'


class Pantry extends Component {
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
                    {faveFoodList}
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

Pantry.propTypes = {
    firestore: PropTypes.object.isRequired
}

export default compose(
    firestoreConnect(props => [{ collection: "users", storeAs: "user", doc: props.match.params.id } ]),
    connect(({firestore: {ordered}}, props) => ({
        user: ordered.user && ordered.user[0]
    }))
)(Pantry)