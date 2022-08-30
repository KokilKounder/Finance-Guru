import './App.css';
import React, { createContext, useContext, useEffect } from "react";
import CheckInPage from './Pages/CheckInPage';
import DashBoardPage from './Pages/DashBoardPage';
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from './Context/AuthContext';
import ProtectedRoute from './Components/SharedComponents/ProtectedRoute';
import {PasswordResetContext} from "./Context/PasswordResetContext"; 
import ErrorPage from './Pages/ErrorPage';

function App() {
  const ctx = useContext(AuthContext);
  const ctx2 = useContext(PasswordResetContext);
  

  return (
    <Switch>
      <ProtectedRoute auth={false} path="/Sign-Up" state={ctx.isLoggedIn}>
        <CheckInPage />
      </ProtectedRoute>
      <ProtectedRoute auth={false} path="/Login" state={ctx.isLoggedIn}>
        <CheckInPage />
      </ProtectedRoute>
      <ProtectedRoute auth={true} path="/Dashboard" state={ctx.isLoggedIn}>
        <DashBoardPage />
      </ProtectedRoute>
      <ProtectedRoute auth={false} path="/Forgot-Password" state={ctx.isLoggedIn}>
        <CheckInPage></CheckInPage>
      </ProtectedRoute>
      {ctx2.resetAuth ?  <ProtectedRoute auth={false} path="/Reset-Password/:id/:token" state={ctx.isLoggedIn}>
        <CheckInPage></CheckInPage>
      </ProtectedRoute>  : 
      <Route path="/Reset-Password/:id/:token">
        <ErrorPage></ErrorPage>
        </Route>}
      <Route path="/" exact>
        <Redirect to="/Login" />
      </Route>
      <Route path="/">
        <ErrorPage></ErrorPage>
      </Route>
      
    </Switch>

  );
}

export default App;
