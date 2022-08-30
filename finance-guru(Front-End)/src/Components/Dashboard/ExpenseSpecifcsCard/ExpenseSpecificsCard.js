import React from 'react';
import cardStyle from "../../SharedComponents/styles/card.module.css";
import styles from "./ExpenseSpecificsCard.module.css"
import GraphPanel from './Graph/GraphPanel';
import ExpenseListPanel from './ExpenseListPanel';

function ExpenseSpecificsCard() {
  return (
        <div className={`${styles.Specifics} ${cardStyle.Style1}`}> 
          <GraphPanel></GraphPanel>
          <ExpenseListPanel></ExpenseListPanel>
        </div>
    );
}



export default ExpenseSpecificsCard;
