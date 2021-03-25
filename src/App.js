import './App.css';
import "firebase/auth";
// import firebase from "firebase/app"
// import firebaseConfig from './firebase.config';
import Google from './Component/Google/Google';
import Facebook from './Component/Facebook/Facebook';
import SignInSignUp from './Component/SignInSignUp/SignInSignUp';


// firebase.initializeApp(firebaseConfig);
// if (!firebase.apps.length) {
  // firebase.initializeApp(firebaseConfig);
// }

function App() {

  return (
    <div className="App">

      <Google/>
      <SignInSignUp />
      <Facebook/>
    </div>
  );
}

export default App;
