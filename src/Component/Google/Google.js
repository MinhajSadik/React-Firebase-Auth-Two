import "firebase/auth";
import firebase from "firebase/app"
import firebaseConfig from '../../firebase.config';
import { useState } from "react";

// firebase.initializeApp(firebaseConfig);
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Google = () => {
    const [user, setUser] = useState({
        isSignedIn: false,
        name: ' ',
        email: ' ',
        password: ' ',
        photo: ' '
    })

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleSingIn = () => {

        firebase.auth().signInWithPopup(googleProvider)
            .then(res => {
                const { displayName, email, photoURL } = res.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL

                }
                setUser(signedInUser)
            })
            .catch(err => {
                console.log(err);
                console.log(err.message);
            })
    }
    const handleSingOut = () => {
        firebase.auth().signOut()
            .then(res => {
                const signOutUser = {
                    isSignedIn: false,
                    name: ' ',
                    email: ' ',
                    photo: ' '

                }
                setUser(signOutUser);
            })
    }
    return (
        <div>
            {
                user.isSignedIn
                    ?
                    <button onClick={handleSingOut}>Sign Out With Google</button>
                    :
                    <button onClick={handleSingIn}>Sign In With Google</button>
            }

            {
                user.isSignedIn && <div>
                    <p>Welcome, {user.name}</p>
                    <p>Your Email: {user.email}</p>
                    <img src={user.photo} alt="" />
                </div>
            }
        </div>
    );
};

export default Google;