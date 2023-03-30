
import React, {createContext} from 'react'
import Pool from './UserPool'
import {CognitoUser, AuthenticationDetails} from 'amazon-cognito-identity-js'
import {useNavigate} from 'react-router-dom'

const AccountContext = createContext()


export const Account = (props) => {
    const navigate = useNavigate();

    const getSession = async () => {
        return await new Promise((resolve, reject) => {
            const user = Pool.getCurrentUser()
            if (user) {
                user.getSession((err, session) => {
                    if (err) {
                        reject()
                    } else {
                        resolve(session)
                    }
                })
            } else {
                reject()
            }
        })
    }
    
    const authenticate = async (Username, Password) => {
        return await new Promise((resolve, reject) => {

            const user = new CognitoUser({
                Username,
                Pool
            });

            const authDetails = new AuthenticationDetails({
                Username,
                Password
            });

            user.authenticateUser(authDetails, {
                onSuccess: (data) => {
                    console.log("onSuccess:", data);
                    resolve(data)
                },
                onFailure: (err) => {
                    console.error("onFailure:", err);
                    reject(err)
                },
                newPasswordRequired: (data) => {
                    console.log("newPasswordRequired:", data);
                    resolve(data)
                }
            })
        })
    }

    const logout = async () => {
        const user = Pool.getCurrentUser()

        if (user) {
            console.log("Logging out")
            await user.signOut()
            navigate('/login')

        }
    }


    return (
        <AccountContext.Provider value={{authenticate, getSession, logout}}>
            {props.children}
        </AccountContext.Provider>
    )

}

export {AccountContext}