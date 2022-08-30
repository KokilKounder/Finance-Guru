import React, {useState, useContext} from 'react'
import { UserContext } from '../../Context/UserContext'
import { AuthContext } from '../../Context/AuthContext'
import styles from "./expenseDeleteOverlay.module.css"





function ExpenseDeleteOverlay(props) {
  const usrCtx = useContext(UserContext); 
  const authCtx = useContext(AuthContext);
  const deleteExpense = async() => {
    try{
      await axios.delete("/expenses/remove", {data: {
        date: `${usrCtx.Date}`, 
        id: `${props.id}`
      }})
      console.log("Expense Deleted")
      await usrCtx.retrieveExpenseList(usrCtx.Date)
     
    }
    catch(err){
      usrCtx.setModalState(false);
      authCtx.logoutHandler();
    }
   
  }


    return (
        <div className = {styles["DeleteOverlay"]}>
          <p className = {styles["Header"]}>Are You Sure You want to Delete This Expense</p>
          <div className = {styles["Buttons"]}>
          <button className = {styles["YesButton"]} onClick = {() => deleteExpense()}>Yes</button>
          <button className = {styles["NoButton"]} onClick = {() => props.stateFunction(false)}>No</button>
          </div>

        </div>
  )
}

export default ExpenseDeleteOverlay