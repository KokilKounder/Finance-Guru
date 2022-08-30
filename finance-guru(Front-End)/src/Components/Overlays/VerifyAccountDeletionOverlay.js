import React, {useContext} from 'react'
import { UserContext } from '../../Context/UserContext';
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios"
import styles from "./verifyAccountDeletion.module.css"

function VerifyAccountDeletionOverlay() {
const authCtx = useContext(AuthContext); 
const usrCtx = useContext(UserContext); 
    let submitHandler = async () => {
        try{
        await axios.delete("auth/deleteAccount"); 
        usrCtx.setVerifyAccountDeletionModal(false); 
        authCtx.logoutHandler();

       }
       catch(err){
           console.log(err); 
       }
        
    }
    
    
    return (
        <div className={styles["Overlay"]}>
            <p>Are you Sure you want to Delete your Account?</p>
            <div>
            <button className = {styles["Yes-btn"]} onClick = {submitHandler}>Yes</button>
            <button className = {styles["No-btn"]} onClick={() => usrCtx.setVerifyAccountDeletionModal(false)}>No</button>
            </div>
           
        </div>

    )
}

export default VerifyAccountDeletionOverlay