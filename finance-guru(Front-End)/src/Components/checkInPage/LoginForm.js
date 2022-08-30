import { React, useReducer, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Context/AuthContext';
import sharedStyles from "./Styles/checkInPanel.module.css"
import { Link, useHistory, useLocation } from "react-router-dom";
import ErrMsg from '../SharedComponents/ErrMsg';

const loginData = {};


//Function Hook to manage the state of all Login Errors 

const loginReducer = (state, action) => {
    if (action.act === "username") {
        loginData.username = action.data;
        return {authErr: state.authErr, disableButton: !(state.password && loginData.username), username:action.data, password:state.password}
    }
    else if (action.act === "password") {
        loginData.password = action.data;
        return {authErr: state.authErr,  disableButton: !(state.username && loginData.password), username:state.username, password:action.data}
    }
    if(action.act === "AuthErr"){
        return {authErr: true, disableButton: state.disableButton, username:state.username, password:""}
    }
}

//Event Handler Functions 


function LoginForm() {
    const [loginState, dispatch] = useReducer(loginReducer, {authErr: false, disableButton: true, username:"", password:""})
    const ctx = useContext(AuthContext);
    const history = useHistory();
    

    //Event Listners that check if the user has entered valid data 

    const userNameEvent = (event) => {
        dispatch({ act: "username", data: event.target.value})
    }


    const passwordEvent = (event) => {
        dispatch({ act: "password", data: event.target.value})
    }

    const loginHandler = async () => {
        try{
            await axios.post("/Login/Verify", {Username: loginData.username, Password: loginData.password})
            ctx.loginHandler(); 
            history.push("/Dashboard");

        }
        catch(err){
            dispatch({act:"AuthErr", })
        }
        
       
    }

 
    return (
        <div className={sharedStyles.Form}>
            <h1>Login</h1>
            <Link to="/Sign-Up">Don't have an account?</Link>
            {loginState.authErr ? <ErrMsg msg="Invalid Login"/> : null}
            <form>
                <input type="text" onChange={userNameEvent} placeholder="Username"  value={loginState.username}/>
                <input onChange={passwordEvent} type="password" placeholder="Password" value={loginState.password} />
            </form>
            <Link to="/Forgot-Password">Forgot Password?</Link>
            <button disabled={loginState.disableButton} onClick={loginHandler}>Login</button>
        </div>
    )
}

export default LoginForm
