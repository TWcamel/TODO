import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyB2Ekjo3IKCC3LpYQm_yXBRU5EsStXMsjo",
    authDomain: "todo-app-eb208.firebaseapp.com",
    projectId: "todo-app-eb208",
    storageBucket: "todo-app-eb208.appspot.com",
    messagingSenderId: "828545272589",
    appId: "1:828545272589:web:85c0848e9ccd3293fa7e44",
    measurementId: "G-18M7G8EXQP",

    hosting: {
        public: "dist",
        rewrites: [
            {
                source: "**",
                destination: "/index.html"
            }
        ]
    }
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection("users")
const todosCollection = db.collection("todos")

export { db, auth, usersCollection, todosCollection }
