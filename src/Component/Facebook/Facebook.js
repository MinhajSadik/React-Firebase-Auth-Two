import React, { useState } from 'react';
import "firebase/auth";
import firebase from "firebase/app"
// import firebaseConfig from './firebase.config';
// firebase.initializeApp(firebaseConfig);

// /\S+@\S+\.\S+/.test()

const Facebook = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: ' ',
        email: ' ',
        password: ' ',
        photo: ' ',
        error: ' ',
        success: ' '
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
        if (user.email && user.password) {
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = ' ';
                    newUserInfo.success = true;
                    setUser(newUserInfo);
                })
                .catch((error) => {
                    const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo)
                    // ..
                });
        }
        e.preventDefault();
    }
    return (
        <div>
            <h1>This Is Facebook Login</h1>
           
            <form onSubmit={handleSubmit}>
                <input type="text" onBlur={handleBlur}name="name" placeholder="Your Name" required />
                <br/>
                <input type="text" onBlur={handleBlur} name="email" id="" placeholder="Write Your Email Address! " required />
                <br />
                <input type="password" onBlur={handleBlur} name="password" id="" placeholder="Enter Your Password" required />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <p style={{ color: 'red' }}>{user.error}</p>
            {user.success && <p style={{ color: 'green' }}>User Created successfully</p>}
        </div>
    );
};

export default Facebook;