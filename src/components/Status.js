import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { AccountContext } from './Account'
import { useNavigate } from 'react-router'
import Pool from './UserPool'
import Header from './Header'
import Navbar from './Navbar'



export const Status = (props) => {
    const [status, getStatus] = useState(false);
    const {
      getSession,
      logout
    } = useContext(AccountContext);
    const user = Pool.getCurrentUser()

    const navigate = useNavigate();

    /**
     * This function logs the user out and then redirects them to the home page.
     */
    const handleLogout = () => {
      logout().then(() => {
        navigate("/");
        window.location.reload();
      });
    }

    /**
     * This useEffect checks if the user is logged in or not. If they are logged in, then it will display the header.
     */
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
            {/* Checks if status is logged in, if it isn't then don't display the header */}
            <Header text={props.text}/>
              <div className='flex justify-end'>
                <button className='bg-dark-navy p-4 rounded-b-lg text-white font-salsa' onClick={handleLogout}>{user.username},  LOGOUT </button> 
              </div>
              <nav className="navbar block md:hidden">
          <Navbar/>
        </nav>  
          </section>
        : '' }</div>

    </div>
  )
}
