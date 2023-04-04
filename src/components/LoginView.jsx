import React, { useEffect, useState } from 'react'
import '../login-signup.css'
import { useNavigate } from "react-router-dom";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import { AccountContext, Account } from './Account';
import { data } from 'autoprefixer';
import { useContext } from 'react';



function LoginView(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const { authenticate } = useContext(AccountContext);

  const navigate = useNavigate();
  /**
   *  Handles the submit button and authenticates the user
   * @param {*} e 
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticate(email, password).then(() => {
      navigate("/home");
      console.log(data)
    }
    );

  }
  /**
   * Checks if the user is logged in
   */
  useEffect(() => {
    if (user) {
      console.log(data)
    }
  }, [user]);



  return (
    <div className="h-screen justify-center flex flex-col bg-dark-navy">
      <div className="flex flex-col bg-dark-navy m-5">
        <div className="flex md:w-1/3 m-auto flex-col border-2 border-white">
          <div className="font-saira mb-10 mt-10 text-white text-8xl text-center">Burn Out</div>
          <br></br>
          <h1>---------------------OR--------------------</h1>
          <form className="flex flex-col bg-dark-navy m-4 p-4" onSubmit={handleSubmit}>
            <label htmlfor="email">Username </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="name" placeholder="Enter username" name="email"></input>
            <label htmlfor="password">Password </label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter password" name="password"></input>
            <br></br>
            <button className="login-button text-white text-15 font-bold border-none bg-1A508B py-20 px-20 rounded-10 cursor-pointer" type="submit">Log In</button>
          </form>
          <button className="link-btn text-white underline mt-3" onClick={() => navigate("/signup")}>Don't have an account? Register here.</button>
          <br></br>
        </div>
      </div>
    </div>
  )
}

export default LoginView