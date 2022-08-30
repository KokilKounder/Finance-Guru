import React, { useState, useEffect, useContext, } from 'react';
import styles from "./expenseCardList.module.css";
import IconButton from "../../SharedComponents/IconButton";
import Pencil from "../../../Assets/images/Pencil.svg";
import Trash from "../../../Assets/images/Trash.svg";
import PlusSign from "../../../Assets/images/Plus-Sign.svg";
import { UserContext } from '../../../Context/UserContext';
import { catMatch } from "../../../Helpers/catMatch";
import Modal from '../../SharedComponents/Modal';
import ExpenseDeleteOverlay from '../../Overlays/ExpenseDeleteOverlay';
import ExpenseEditOverlay from "../../Overlays/ExpenseEditOverlay";








export default function ExpenseCardList() {
  const usrCtx = useContext(UserContext);



  let renderExpenseList = (expenses) => {
    let arr = [];
    for (let key in expenses) {
      arr.push(
        <React.Fragment key={key}>
          <ExpenseCard id={key} name={expenses[key].Name} expense={"$" + expenses[key].Amount} cat={expenses[key].Cat} />
        </React.Fragment>
      )
    }
    return arr;
  }


  useEffect(() => {
    usrCtx.retrieveExpenseList(usrCtx.Date).catch(err => console.log(err));
  }, [usrCtx.Date,])




  return (
    <div className={styles["Expense-Card-List"]}>
      {renderExpenseList(usrCtx.expenseList)}
      <IconButton onClick={() => usrCtx.setModalState(true)} icon={PlusSign} style={styles["Plus-Button"]}></IconButton>
    </div>

  )
}



function ExpenseCard(props) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);



  let color = catMatch(props.cat);
  return (
    <>
      <div className={styles["Expense-Card"]}>
        <div className={styles["Card-Tag"]} style={{ 'backgroundColor': color }}></div>
        <div className={styles["Card-Body"]}>
          <p className={styles["Name-Sec"]}>{props.name}</p>
          <p className={styles["Price-Sec"]}>{props.expense}</p>
          <CardOperations deleteModalFunction = {setIsDeleteModalOpen} updateModalFunction = {setIsUpdateModalOpen} id={props.id}></CardOperations>
        </div>
      </div>
      <Modal state={isDeleteModalOpen} stateFunction={setIsDeleteModalOpen}>
        <ExpenseDeleteOverlay stateFunction = {setIsDeleteModalOpen}id={props.id}></ExpenseDeleteOverlay>
      </Modal>
      <Modal state={isUpdateModalOpen} stateFunction={setIsUpdateModalOpen}>
        <ExpenseEditOverlay stateFunction = {setIsUpdateModalOpen} create = {false} cardData = {{id: props.id, name:props.name, expense:props.expense, cat:props.cat}}></ExpenseEditOverlay>
      </Modal>
    </>
  )
}

function CardOperations(props) {


  const deleteCard = () => {
   props.deleteModalFunction(true)
  }

  const updateCard = () => {
    props.updateModalFunction(true)
  }
  
  return (
    <div className={styles["Card-Operations"]}>
      <IconButton onClick={updateCard} icon={Pencil} style={styles["Card-Button"]} ></IconButton>
      <IconButton onClick={deleteCard} icon={Trash} style={styles["Card-Button"]} ></IconButton>
    </div>
  )
}



