import React from 'react'
import styles from "./Styles/logoside.module.css"
import logo from "../../Assets/images/Logo.svg"


function LogoSide() {
    return (
        <div className={styles.Welcome}>
             <h1>Welcome</h1>
            
            <div className={styles.Logo}>
                <img src={logo}/>
        </div>
       
        </div>
    )
}

export default LogoSide
