import store from '../store'
import { setUser } from '../actions/userActions'


export function SetupReduxUser(){
    const {email, uid} = store.firebase.auth().currentUser
    setUser({email : email ,uid : uid })
    return({email,uid})
}
