import React, { useContext, useState } from 'react'
import { AuthContext } from '../../Context/AuthContext';
import { UserContext } from '../../Context/UserContext';
import styles from "./SettingsOverlay.module.css"




function MenuOverlay() {

  const authCtx = useContext(AuthContext);
  const usrCtx = useContext(UserContext);

  const openVerifyPasswordModal = (del) => {
    if(del){
      usrCtx.setVerifyModalDelete(true);
   
    }
    else{
      usrCtx.setVerifyModalEdit(true);
    }
    usrCtx.setIsMenuModalOpen(false);
    
  }

  const logOutHandler = () => {
    usrCtx.setIsMenuModalOpen(false); 
    authCtx.logoutHandler();

  }

  return (
    <>
      <div className={styles["Overlay"]}>
        <p>Menu</p>
        <button className={styles["Username-Button"]} onClick={() => openVerifyPasswordModal(false)}>Change Username</button>
        <button className = {styles["Logout-Button"]} onClick={logOutHandler}>Logout</button>
        <button className = {styles["Deleteaccount-Button"]} onClick={() => openVerifyPasswordModal(true)}>Delete Account</button>
      </div>
    </>

  )
}

export default MenuOverlay