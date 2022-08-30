import React, { useState, createContext, useEffect } from 'react';
import axios from "axios"

const PasswordResetContext = createContext({
    resetAuth: false,
    setResetAuth:() => {}, 
    data: false,
    setData: () => {},
    checkResetStatus: () => {}, 
    // isSuccess:false,
    // isErr: false,
})

function PasswordResetContextProvider(props) {
const [resetAuth, setResetAuth] = useState(true); 
const [data, setData] = useState(); 
// const [isSuccess, setIsSuccess] = useState(false); 
// const [isErr, setIsErr] = useState(false); 


const checkResetStatus = async (id, token) => {
    try {
        setData((await axios.post(("/auth/verifyToken"), {id, token})));
    }
    catch(err) {
        setResetAuth(false)
    }
}


const contextValue = {
    resetAuth, 
    setResetAuth,
    data, 
    setData,
    checkResetStatus,

}

  return (
    <PasswordResetContext.Provider value={contextValue}>
        {props.children}
    </PasswordResetContext.Provider>
  )
}

export {PasswordResetContext, PasswordResetContextProvider}