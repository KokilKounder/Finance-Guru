import React, {useContext} from 'react';
import styles from "./expenseListPanel.module.css"
import IconButton from "../../SharedComponents/IconButton"
import sortIcon from "../../../Assets/images/Sortby.svg"
import ExpenseCardList from './ExpenseCardList';
import { UserContext } from '../../../Context/UserContext';

export default function ExpenseListPanel() {
 const usrCtx = useContext(UserContext);

  return <div className={styles.ExpLPanel}>
      <p>Expenses for {usrCtx.Date}</p>
      <IconButton icon={sortIcon} style={styles["ExpL-Panel-button"]}></IconButton>
      <ExpenseCardList></ExpenseCardList>

  </div>;
}


function ExpenseList() {
  return <div></div>;
}
