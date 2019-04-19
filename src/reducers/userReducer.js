import {SET_USER} from '../actions/types'

const initialState = {
    water: 0,
    calorie: 0,
    protein: 0,
    carb: 0,
    fat: 0,
}

export default function(state = initialState, payload) {
    switch(payload.type){
        case SET_USER:
            return{
                ...state,
                
            }
            default:
                return state
    }
}