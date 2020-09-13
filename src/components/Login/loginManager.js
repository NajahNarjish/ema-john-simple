import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = ()=>{
    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
}

export const handleGoogleSignIn = ()=>{
  const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
    .then(res=>{
      const {displayName, photoURL, email} = res.user;
     //  console.log(displayName, photoURL, email);
      const singedInUser = {
        isSignedIn: true,
        name: displayName, 
        email: email,
        photo: photoURL,
        success: true
      }
      return singedInUser;
    })
    .catch(err=>{
      console.log(err);
      console.log(err.message);
    })
   }

   export const handleFBLogin = () => {
    const fbprovider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbprovider).then(function(result) {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      user.success = true;
      return user;
      // ...
    }).catch(function(error) {
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

  export const handleSignOut = () => {
    return firebase.auth().signOut()
    .then(res =>{
      const signedOutUser  = {
        isSignedIn: false,
        name: '',
        photo: '',
        email: '',
        password: '',
        error: '',
        success: false
      }
      return signedOutUser;
    })
    .catch(err =>{
    })
  }

  export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo  = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      updateUserName(name);
      return newUserInfo;
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo  = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      
    });
  }

  export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res =>{
      const newUserInfo  = res.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      return newUserInfo;
      // console.log("sign in user info", res.user);
    })
    .catch(error => {
      // Handle Errors here.
      const newUserInfo  = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
    });
      
  }

  const updateUserName = name => {
    const user = firebase.auth().currentUser;
  
    user.updateProfile({
      displayName: name
    }).then(function() {
     console.log("username updated successfully");
    }).catch(function(error) {
      console.log(error);
    });
  }