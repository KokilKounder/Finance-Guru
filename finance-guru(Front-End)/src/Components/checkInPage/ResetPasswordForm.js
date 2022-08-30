import React, {useReducer, useEffect, useState, useContext} from 'react'
import styles from "./Styles/resetPasswordForm.module.css" 
import { Link, useParams, useHistory} from "react-router-dom";
import { PasswordResetContext } from '../../Context/PasswordResetContext';
import axios from 'axios';


const passwordErrMsgText = "Password must be at least 8 characters long and must contain at least one number and letter"; 
const diffPasswordErrMsgText = "Passwords must match"


const formReducer = (state, action) => {
    if(action.act === "pswdInput"){  
        if(action.data && !(/\d/.test(action.data) && /[a-zA-Z]/.test(action.data) && action.data.length > 7)){
            return ({...state, buttonDisable:  true, passwordInput: action.data, isError:true, errMsg: passwordErrMsgText})
        }
        return ({...state, buttonDisable: !(action.data && state.verifyPasswordInput), passwordInput: action.data, isError:false, errMsg:""});
    }
    else if(action.act === "verifyInput"){
        if(action.data && action.data !== state.passwordInput){
            return ({...state, buttonDisable: true, verifyPasswordInput: action.data, isError:true, errMsg: diffPasswordErrMsgText})
        }
        return ({...state, buttonDisable: !(action.data && state.passwordInput), verifyPasswordInput: action.data, isError:false, errMsg:""});
    }
}


function ResetPasswordForm() {
 
    const ctx = useContext(PasswordResetContext); 
    const history = useHistory(); 
    const {id, token} = useParams();
    
    useEffect(() => {
        let fetchData = async (id, token) => {
           await ctx.checkResetStatus(id, token)
           
        }

        fetchData(id, token).catch((err) => {
            console.log("Error");
        })


    }, []);


   

    const [formState, dispatch] = useReducer(formReducer, {isError:false, errMsg: "", buttonDisable: true, passwordInput: "", verifyPasswordInput: ""})

   const passwordInputHandler = (event) => {
        dispatch({act: "pswdInput", data:event.target.value})
    }
    const verifyInputHandler = (event) => {
        dispatch({act: "verifyInput", data:event.target.value})
    }

    const submitHandler = async () => {
        try{
            await axios.post(("/auth/reset-password"), {
                id, 
                token, 
                newPassword: formState.passwordInput, 
                newPasswordVerify: formState.verifyPasswordInput,
            })
            alert("Your Password has been changed")
            history.push("/login", {isSuccessful: "yes"})
            
            
        }
        catch(err){
            alert("We were unable to change your password please try again later")
            history.push("/login", {isSuccessful: "no"})
        }
    }
    
    if(!!ctx.data){
        console.log(ctx.data.username)
        return (
            <div className = {styles["ResetPasswordPanel"]}>
                <h1>Reset Password</h1>
                    <div className={styles["ResetPasswordForm"]}>
                        <form className={styles["EmailInput"]}>
                            <label>Enter your new password</label>
                            {formState.isError ? <p className={styles["ErrorMsg"]}>{formState.errMsg}</p> : null}
                            <input style = {(formState.errMsg === passwordErrMsgText) ? {borderColor:"red"} : {}} onChange={passwordInputHandler} type="password" placeholder="Enter New Password" value = {formState.passwordInput}/>
                            <input  style ={(formState.errMsg === diffPasswordErrMsgText) ? {borderColor:"red"} : {}}onChange={verifyInputHandler} type="password" placeholder='Verify Password' value = {formState.verifyPasswordInput}/>
                            <Link to="/Login">Back to Login?</Link>
                        </form>  
                    </div>
                    <button onClick = {submitHandler} disabled={formState.buttonDisable}>Submit</button>
                    
                </div>
          )
    }
    else{
        return(
            <div className={styles["ResetPasswordPanel"]}>
                  
            </div>
        )
        
       
       
    }
  
}

export default ResetPasswordForm




