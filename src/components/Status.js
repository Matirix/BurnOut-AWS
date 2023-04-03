import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AccountContext } from './Account'
import { useNavigate } from 'react-router'
import Pool from './UserPool'



export const Status = () => {
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
    <div className='flex justify-end'>
        <div>{status ? <button className='bg-dark-navy p-4 rounded-b-lg text-white font-salsa' onClick={handleLogout}>{user.username},  LOGOUT </button> : '' }</div>

    </div>
  )
}
