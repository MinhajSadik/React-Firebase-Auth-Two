import React, { useState } from 'react';
import "firebase/auth";
import firebase from "firebase/app"
import firebaseConfig from '../../firebase.config';

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const Facebook = () => {
    const [user, setUser] = useState({})
    const FbProvider = new firebase.auth.FacebookAuthProvider();
    
    const handleFbSignIn = () => {
        firebase.auth().signInWithPopup(FbProvider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // The signed-in user info.
                var user = result.user;
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var accessToken = credential.accessToken;
                setUser(user)
                // ...
            })
            .catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;

                // ...
            });
    }
    return (
        <div>
            <h1>Login With Facebook</h1>
            <h3>Email: {user.email}</h3>
            <img src={user.photoURL} alt=""/>
            <button onClick={handleFbSignIn}>Sign In With Facebook</button>
        </div>
    );
};

export default Facebook;