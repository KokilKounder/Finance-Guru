import React, { useContext, useState, useReducer } from 'react'
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import styles from "./verifyOverlay.module.css"

const formReducer = (state, action) => {
    if(action.act === "input"){
        return{input: action.data, btnDisabled: action.data ? false : true, error:state.error}
    }
    else if(action.act === "verify"){
        if(action.data === "true"){
            return{error:false, ...state}
        }
        else{
            return{input: "", error:true, btnDisabled:false}
        }
    }
    return state; 
}



function VerifyOverlayToDelete(props) {
    const usrCtx = useContext(UserContext);
    const [formState, dispatch] = useReducer(formReducer,{input: "", btnDisabled: true, error:false })

    

    const submitHandler = async () => {

        try {
            const result = await axios.post("auth/verifyPassword", {
                password: formState.input
            })
            if (result.status = 200) {
                usrCtx.setVerifyModalDelete(false);
                usrCtx.setVerifyAccountDeletionModal(true);
                dispatch({act:"verify", data: true});
            }
            else {
                console.log("Unable to Verify Password");
                dispatch({act:"verify", data: false});
            }
        }
        catch(err){
            dispatch({act:"verify", data:false});
        }
       

    }

    return (
        <div className={styles["verifyOverlay"]}>
            <p>Verify your Password</p>
            {formState.error ? <p className={styles["Errmsg"]}>Incorrect Password</p> : null}
            <input type="password" onChange={(e) => { dispatch({act: "input", data: e.target.value}) }} placeholder='Password' value={formState.input} autoComplete="Off"></input>
            <button disabled = {formState.btnDisabled} onClick={submitHandler}>Submit</button>
        </div>
    )
}

function VerifyOverlayToEdit() {
    const usrCtx = useContext(UserContext);
    const [formState, dispatch] = useReducer(formReducer,{input: "", btnDisabled: true, error:false });

    const submitHandler = async () => {

        try {
            const result = await axios.post("auth/verifyPassword", {
                password: formState.input
            })
            if (result.status = 200) {
                usrCtx.setVerifyModalEdit(false);
                usrCtx.setEditAccountModal(true); 
                dispatch({act:"verify", data: true});
            }
            else {
                console.log("Unable to Verify Password");
                dispatch({act:"verify", data: false});
            }
        }
        catch(err){
            dispatch({act:"verify", data:false});
        }
       

    }
   


    
    return (
        <div className={styles["verifyOverlay"]}>
            <p>Verify your Password</p>
            {formState.error ? <p className={styles["Errmsg"]}>Incorrect Password</p> : null}
            <input type="password" onChange={(e) => { dispatch({act: "input", data: e.target.value}) }} placeholder='Password' value={formState.input} autoComplete="Off"></input>
            <button disabled = {formState.btnDisabled} onClick={submitHandler}>Submit</button>
            
        </div>
    )
}

export { VerifyOverlayToEdit, VerifyOverlayToDelete }