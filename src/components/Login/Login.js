import React, { useState, useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import { initializeLoginFramework, handleGoogleSignIn, handleSignOut, handleFBLogin, createUserWithEmailAndPassword, signInWithEmailAndPassword } from './loginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '', 
    email: '', 
    photo: '',
    password: '',
  });

  initializeLoginFramework();

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then (res => {
      handleResponse(res, true);
    })
  }

  const signOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);

    })
  }
  const fbSignIn = () => {
    handleFBLogin()
    .then(res => {
      handleResponse(res, true);

    })
  }
 
const handleSubmit = (event)=>{
  // console.log(user.email && user.password);
  if (newUser && user.email && user.password){
    createUserWithEmailAndPassword(user.name, user.email, user.password)
    .then (res=>{
      handleResponse(res, true);
    }) 
  }

  if (!newUser && user.email && user.password){
    signInWithEmailAndPassword(user.email, user.password)
    .then (res=>{
      handleResponse(res, true);
    }) 
  }
  event.preventDefault();
};

const handleResponse  = (res, redirect) =>{
  setUser(res);
  setLoggedInUser(res);
  if (redirect){
    history.replace(from);
  }

}

const handleBlur = (event)=>{
  let isFieldValid = true;
  if (event.target.name === "email"){
    isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
  }
  if(event.target.name === "password"){
    const isPasswordValid = event.target.value.length>6;
    const passHasNumber = /\d{1}/.test(event.target.value);
    isFieldValid = isPasswordValid && passHasNumber;
  }
  if (isFieldValid){
    const newUserInfo = {...user};
    newUserInfo[event.target.name] = event.target.value;
    setUser(newUserInfo);
  }
}
  return (
    <div style = {{textAlign: "center"}}>
      {/* small signin signout button */}
      {
        user.isSignedIn? <button onClick = {signOut}>Sign out</button>:
        <button onClick = {googleSignIn}>Sign in</button>
      }
      <br/>
      <button onClick = {fbSignIn}>log in using facebook</button>
      

      {
        user.isSignedIn && <div>
          <p>Welcome {user.name}</p>
          <p>Your email is {user.email}</p>
          <img src={user.photo} alt=""/>
        </div>
      }

      {/* submit button with form */}
      <h1>Our own authentication</h1>
      <p>email:{user.email}</p>
      <p>pass:{user.password}</p>

      <input type="checkbox" onChange = {()=> setNewUser(!newUser)}name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>

      <form onSubmit={handleSubmit}> 
         {newUser && <input type="text" name='name' onBlur = {handleBlur}placeholder="Your name" />}   
        <br/>
        <input type="text" name="email" onBlur = {handleBlur} placeholder="Your email" required/>
        <br/>
        <input type="password" name="password" onBlur = {handleBlur} placeholder="Your password" required/>
        <br/>
        <input type="submit" value = {newUser? "Sign up" : "Sign in"}/>
      </form>
      <p style = {{color: "red"}}>{user.error}</p>
      {user.success && <p style = {{color: "green"}}>User {newUser? "created" : "logged in"} successfully!</p>}
    
    </div>
  );
}

export default Login;
