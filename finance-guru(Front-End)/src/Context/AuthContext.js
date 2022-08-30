import React, { useState, createContext, useEffect } from 'react';

const AuthContext = createContext(
  {
    isLoggedIn: false,
    loginHandler: () => { },
    logoutHandler: () => { },
  }
);

function AuthContextProvider(props) {
  if (!localStorage.getItem("auth")) {
    localStorage.setItem("auth", JSON.stringify({ isLoggedIn: false }))
  }
  const [isLoggedIn, setisLoggedIn] = useState(JSON.parse(localStorage.getItem("auth")).isLoggedIn);

  useEffect(() => {
    if (isLoggedIn == true) {
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: true }))
    }
    else if (isLoggedIn == false) {
      localStorage.setItem("auth", JSON.stringify({ isLoggedIn: false }))
    }
  }, [isLoggedIn])

  const loginHandler = () => {
    setisLoggedIn(true);
  }
  const logoutHandler = () => {
    setisLoggedIn(false);
  }

  const contextValue = {
    isLoggedIn,
    loginHandler,
    logoutHandler,
  }
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider };