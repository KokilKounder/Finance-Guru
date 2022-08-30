import { React, useState, useReducer, useContext } from 'react'
import sharedStyles from "./Styles/checkInPanel.module.css"
import styles from "./Styles/signUpForm.module.css"
import { Link, useHistory} from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';



const registerData = {};

//Dispatch Function for Reducer Hook 
const registerReducer = (state, action) => {
   if(action === "Email Duplicate"){
    return { errMsg: "Email Already in Use", emailFieldError: true, usernameFieldError: false, passwordFieldError: false}
   }
   else if(action === "Username Duplicate"){
    return { errMsg: "Username Already in Use", emailFieldError: false, usernameFieldError: true, passwordFieldError: false}
   }
   else if (action.emailVal && !action.emailVal.includes("@")) {

        return { errMsg: "Please Enter Valid Email", emailFieldError: true, usernameFieldError: false }
    }
    else if (action.userNameVal && (action.userNameVal.includes(" ") || action.userNameVal.length < 3)) {

        return { errMsg: "Username must contain at least 3 characters, and no spaces", emailFieldError: false, usernameFieldError: true }
    }
    else if (action.password && !(/\d/.test(action.password) && /[a-zA-Z]/.test(action.password) && action.password.length > 7)) {
        return {
            errMsg: "Password must be at least 8 characters long and must contain at least one number and letter",
            passwordFieldError: true
        }
    }
    else if (action.confirmPassword && action.confirmPassword !== action.password) {
        return { errMsg: "Passwords must match", confirmPasswordFieldError: true }
    }
    else {
        if (action.emailVal && action.userNameVal && action.password && action.confirmPassword) {
            return { errMsg: "", buttonDisable: true }
        }
        else {
            return { errMsg: "", buttonDisable: false }
        }

    }

}





//Component Function 
function SignUpForm() {
    const ctx = useContext(AuthContext);
    const history = useHistory(); 

    console.log(ctx);
    const [registerState, dispatch] = useReducer(registerReducer, { errMsg: "", buttonDisable: false })

    //Event Handler Functions 
    const emailEventHandler = (event) => {
        registerData.emailVal = event.target.value;
        dispatch(registerData);
    }

    const userNameEventHandler = (event) => {
        registerData.userNameVal = event.target.value;
        dispatch(registerData)
    }

    const passwordEventHandler = (event) => {
        registerData.password = event.target.value
        dispatch(registerData);
    }

    const confirmPasswordEventHandler = (event) => {
        registerData.confirmPassword = event.target.value
        dispatch(registerData);
    }

    const registerButtonHandler = () => {
        axios.post("/register/submit", 
        {
            Email: registerData.emailVal, 
            Username: registerData.userNameVal, 
            Password: registerData.password, 
        }).then(() => {
            console.log("Successfuly Registered");
            alert("Your account has successfully been created")
            history.push("/Login");
        }).catch((err) => {
            console.log(err.response.data);
            dispatch(err.response.data); 
        })
    }

    return (
        <div className={sharedStyles.Form}>
            <h1>Register</h1>
            <Link to="/Login">Already Registered</Link>
            <p className={sharedStyles["Error-Msg"]}>{registerState.errMsg}</p>
            <form>
                <input className={registerState.emailFieldError ? sharedStyles.InputFieldError : ""} type="email" onBlur={emailEventHandler} placeholder='Email'></input>
                <input className={registerState.usernameFieldError ? sharedStyles.InputFieldError : ""} type="text" placeholder="Username" onBlur={userNameEventHandler}></input>
                <div className={styles["Password-Fields"]}>
                    <input className={registerState.passwordFieldError ? sharedStyles.InputFieldError : ""} type="password" onBlur={passwordEventHandler} placeholder='Password'></input>
                    <input className={registerState.confirmPasswordFieldError ? sharedStyles.InputFieldError : ""} type="password" onBlur={confirmPasswordEventHandler} placeholder='Confirm Password'></input>
                </div>

            </form>
            <button disabled={!registerState.buttonDisable} onClick={registerButtonHandler}>Register</button>

        </div>
    )
}

export default SignUpForm

