import React,{useState, useContext} from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { UserContext } from '../../Context/UserContext';
import styles from "./editAccountOverlay.module.css"
import axios from "axios"; 


function EditAccountOverlay() {
 const [input, setInput] = useState(""); 
 const authCtx = useContext(AuthContext); 
 const usrCtx = useContext(UserContext); 

 
 const submitHandler = async () => {
     try{
         await axios.put("auth/updateUsername", {
               updatedUsername: input
           })
          usrCtx.setEditAccountModal(false); 
     }
     catch(err){
          usrCtx.setEditAccountModal(false);
          authCtx.logoutHandler();
     }
    
 }


     return (
   <div className={styles["Overlay"]}>
        <p>Enter New Username</p>
   <form>
        <input onChange={(e) => setInput(e.target.value)} value = {input} placeholder='New Username' type="text"></input>
        <button onClick={submitHandler}>Submit</button>
    </form>
   </div>
  

  )
}

export default EditAccountOverlay