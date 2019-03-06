import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyC5GsTsLZFdi_bSJScD3Xrc3NIbvzSul-0",
    authDomain: "react-chat-7091f.firebaseapp.com",
    databaseURL: "https://react-chat-7091f.firebaseio.com",
    projectId: "react-chat-7091f",
    storageBucket: "react-chat-7091f.appspot.com",
    messagingSenderId: "1083790438734"
}

const firebaseApp = firebase.initializeApp(config)

const base = Rebase.createClass(firebase.database())

const storage = firebase.storage()

export { firebaseApp, storage }

export default base