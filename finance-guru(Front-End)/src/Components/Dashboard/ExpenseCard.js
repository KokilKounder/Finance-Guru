import React, {useContext} from 'react';
import cardStyle from "../SharedComponents/styles/card.module.css"
import styles from "./expenseCard.module.css"
import ExpenseDataSelector from './ExpenseDataSelector';
import { UserContext } from '../../Context/UserContext';


function ExpenseCard() {

  const usrCtx = useContext(UserContext);
  return(
      <div className={`${styles["Expense-Card"]} ${cardStyle.Style1}`}>
          <ExpenseDataSelector></ExpenseDataSelector>
          <p className={styles["Exp-Amnt"]}>${(Math.round(usrCtx.Total.mainTotal * 100) / 100).toFixed(2)}</p>
      </div>
  )
}

export default ExpenseCard;
