import {NOTIFY_USER} from './types'

export const notifyUser = (message ,messageType) => {
    return{
        type: NOTIFY_USER,
        message, // same as message:message
        messageType //same as messageType: messageType
    }
}