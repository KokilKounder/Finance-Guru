import React, {useReducer} from 'react';
import styles from "./Styles/forgotPasswordForm.module.css";
import { Link, useHistory } from "react-router-dom";
import axios from "axios"

const formReducer = (state, action) => {
    
    if(action.act === "emailInput"){
        if(action.data && !action.data.includes("@")){
            return {...state, emailSent:false, inputVal:action.data, isError:true, buttonDisabled:true, statusMsg: "Please Enter Valid Email"}
        }
        if(action.data){
            return {...state, emailSent:false, inputVal:action.data, isError:false, buttonDisabled: false, statusMsg: ""}
        }
        return {...state, emailSent:false, inputVal:action.data, isError:false, buttonDisabled: true}
    }
    else if(action.act === "Non-existent Email"){
        return{...state, emailSent:false, isError:true, statusMsg: "No Account Exists with that Email"}
    }
    else if(action.act === "Server Error"){
        return{...state,  emailSent:false, isError:true, statusMsg: "Unknown Server Error Please Try again Later"}
    }
    else if(action.act === "Email Sent"){
        return{...state, emailSent:true, isError:false, statusMsg: "A Link to Reset your Password has been Sent to your Email", }
    }
   
    
    
    
}

function ForgotPasswordForm() {
   
    const [formState, dispatch] = useReducer(formReducer, {inputVal: "",isError:false, statusMsg: "", buttonDisabled: true, emailSent: false}); 
    const emailInputHandler = (event) => {
        dispatch({act: "emailInput", data: event.target.value})
    }

    const submitHandler = async () => {
       try{
        let result = await axios.post("/auth/forgotPassword", {
            email: formState.inputVal
        })
        dispatch({act: "Email Sent",})
       }
       catch(err){
        if(err.response.status === 404){
            
            dispatch({act: "Non-existent Email"})
        }
        else{
            dispatch({act: "Server Error"})
        }
       }
       
        
    }

    return (
        <div className={styles["ForgotPasswordPanel"]}>
           <h1>Forgot Password</h1>
            <div className={styles["ForgotPasswordForm"]}>
                <form className={styles["EmailInput"]}>
                    <label>Enter The Email Associated with your Account</label>
                    {formState.isError ? <p className={styles["ErrorMsg"]}>{formState.statusMsg}</p> : null}
                    {formState.emailSent ? <p className={styles["SuccessMsg"]}>{formState.statusMsg}</p>: null}
                    <input style ={(formState.isError) ? {borderColor:"red"} : {}} value={formState.inputVal} onChange={emailInputHandler} type="text" placeholder="Account Email" />
                    <Link to="/Login">Back to Login?</Link>
                <Link to="/Sign-Up">Don't have an account?</Link>
                </form>  
            </div>
            <button onClick={submitHandler} disabled={formState.buttonDisabled}>Submit</button>
        </div>
    )
}

export default ForgotPasswordForm