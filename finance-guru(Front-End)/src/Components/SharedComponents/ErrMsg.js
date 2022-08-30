import React from 'react'; 
import styles from "./styles/errmsg.module.css";

function ErrMsg(props) {
  return (
    <p className={styles.errMsg}>{props.msg}</p>
  )
}

export default ErrMsg