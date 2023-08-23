import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'


export const firebaseConfig = {
    apiKey: "AIzaSyDm9tWqn0nzl9atyMV8jSLiUnU6oobOq6g",
    authDomain: "authphone-a6d0f.firebaseapp.com",
    projectId: "authphone-a6d0f",
    storageBucket: "authphone-a6d0f.appspot.com",
    messagingSenderId: "315395265566",
    appId: "1:315395265566:web:3f570f248089a08c684a0f",
    measurementId: "G-BBB4E75KJZ"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}