import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"


const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection("users")
const todosCollection = db.collection("todos")

export { db, auth, usersCollection, todosCollection }
