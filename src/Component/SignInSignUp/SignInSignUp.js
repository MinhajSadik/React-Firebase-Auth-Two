import "firebase/auth";
import firebase from "firebase/app"
import React, { useState } from 'react';
import firebaseConfig from '../../firebase.config';

// firebase.initializeApp(firebaseConfig);

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const SignInSignUp = () => {
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: ' ',
        email: ' ',
        password: ' ',
        photo: ' ',
        error: ' ',
        success: false
    })
    const handleBlur = (e) => {
        // debugger;
        let isFieldValid = true;
        if (e.target.name === 'email') {
            // eslint-disable-next-line no-unused-vars
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);

        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length >= 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;
        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
    }

    const handleSubmit = (e) => {
        if ( newUser && user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = ' ';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    updateUserName(user.name)
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    // ..
                });
        }
        if (!newUser && user.email && user.password) {
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = ' ';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                    console.log('user updated', res.user);
                })
                .catch(error => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
            })
        }

        e.preventDefault();
    }

    const updateUserName = name => {
        const user = firebase.auth().currentUser;
        user.updateProfile({
            displayName: name,
        }).then(res => {
            console.log('user name updated successfully');
        }).catch(error => {
            console.dir(error);
        })

    }
    return (
        <div>
            <h1> Sign in And Sign up</h1>
            <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
            <label htmlFor="newUser">NewUser Registration</label>

            <form onSubmit={handleSubmit}>
                {
                    newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" required />
                }
                <br/>
                <input type="text" onBlur={handleBlur} name="email" id="" placeholder="Write Your Email Address! " required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter Your Password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign In ' : 'Sign Up'} />
            </form>
            {user.error && <p style={{ color: 'red' }}>{user.error}</p>}
            {user.success && <p style={{ color: 'green' }}>User {newUser ? "Created" : "Loged In"} Successfully</p>}
        </div>
    );
};

export default SignInSignUp;