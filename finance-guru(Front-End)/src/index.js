import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {AuthContextProvider} from "./Context/AuthContext";
import {UserContextProvider} from "./Context/UserContext";
import {PasswordResetContextProvider} from "./Context/PasswordResetContext"


ReactDOM.render(
  <AuthContextProvider>
  <UserContextProvider>
    <PasswordResetContextProvider>
      <BrowserRouter>
    <App/>
  </BrowserRouter>
  </PasswordResetContextProvider>
  </UserContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
