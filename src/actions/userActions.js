import {SET_USER} from './types'

export const setUser = (payload) => {
    console.log(payload)
    return{
        type: SET_USER,
        payload: payload
    }
}