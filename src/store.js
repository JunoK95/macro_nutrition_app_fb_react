import { createStore, combineReducers, compose } from 'redux'
import firebase from 'firebase'
import 'firebase/firestore'
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase'
import { reduxFirestore, firestoreReducer} from 'redux-firestore'

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API_KEY}`,
  authDomain: "macro-nutrition-app-e472e.firebaseapp.com",
  databaseURL: "https://macro-nutrition-app-e472e.firebaseio.com",
  projectId: "macro-nutrition-app-e472e",
  storageBucket: "macro-nutrition-app-e472e.appspot.com",
  messagingSenderId: "967508520633"
}

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true  // Firestore for Profile instead of Realtime DB
}

// init firebase instance
firebase.initializeApp(firebaseConfig)

// eslint-disable-next-line
const firestore = firebase.firestore()

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
    reduxFirestore(firebase) // <- needed if using firestore
  )(createStore)


// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer // <- needed if using firestore
  })

// Create store with reducers and initial state
const initialState = {}

// Create Store
const store = createStoreWithFirebase(rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store