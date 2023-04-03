import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AccountContext } from './Account'
import { useNavigate } from 'react-router'
import Pool from './UserPool'
import Header from './Header'



export const Status = (props) => {
    const [status, getStatus] = useState(false);
    const {getSession, logout} = useContext(AccountContext);
    const user = Pool.getCurrentUser()
    const [loggedIn, setLoggedIn] = useState(user)

    const navigate = useNavigate();

    const handleLogout = () => {
        logout().then(() => {
          navigate("/");
          window.location.reload();
        }
        );
    }

    useEffect(() => {
        getSession()
        .then((session) => {
            console.log("Logged in", session)
            getStatus(true)
        });
    }, [getSession])

  return (
    <div >
        <div>{status ? 
        <section>
          <Header text={props.text}/>
          <div className='flex justify-end'>
          <button className='bg-dark-navy p-4 rounded-b-lg text-white font-salsa' onClick={handleLogout}>{user.username},  LOGOUT </button> 


          </div>

        </section>
        : '' }</div>

    </div>
  )
}
