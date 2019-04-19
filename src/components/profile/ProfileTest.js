import React from 'react';
import {firestoreConnect, firebaseConnect} from 'react-redux-firebase'


class ProfileTest extends React.Component {

    addUser = e =>{
        e.preventDefault();
        const newUser = {
            email: 'testtest@testtest123.com'
        }
        const {firestore} = this.props
        let collectionRef = firestore.collection('users')
        let documentRef = collectionRef.doc('test123')
        console.log(`Reference with auto-id: ${documentRef}`);
        documentRef.set(newUser).then(documentReference => {
            console.log(`Added ${documentReference}`);
          });
    }
    render() {
        return (
            <button onClick={this.addUser}>addUser</button>
        )
    }
}
export default firestoreConnect()(ProfileTest);