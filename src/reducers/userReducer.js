import {SET_USER} from '../actions/types'

const initialState = {
    uid: '',
    email: '',
    water: 0,
    calorie: 0,
    protein: 0,
    carb: 0,
    fat: 0,
}

export default function(state = initialState, payload) {
    switch(payload.type){
        case SET_USER:
            console.log("inReducer",payload)
            console.log({...state,payload})
            return{
                ...state,
                email: payload.payload.email,
                uid: payload.payload.uid
            }
            default:
                return state
    }
}