import React, { useReducer, useContext } from 'react'
import styles from "./ExpenseEditOverlay.module.css";
import Select from 'react-select'
import IconButton from '../SharedComponents/IconButton';
import checkMark from "../../Assets/images/Checkmark.svg";
import { catMatch } from '../../Helpers/catMatch';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { AuthContext } from '../../Context/AuthContext';


const formReducer = (state, action) => {

    if (action.act === "submit") {

    }
    else if (action.act === "expenseName") {
        return {
            ...state,
            enteredName: action.data, 
            submitBtnDisable: !(action.data && state.enteredAmt)
        };
    }
    else if (action.act === "expenseAmt") {
        return {
           ...state,
            enteredAmt: action.data,
            submitBtnDisable: !(action.data && state.enteredName)
        };
    } 
    else if(action.act === "categorySelect"){
        
        console.log(action.data)
        return {
            ...state, 
            selectorColor: catMatch(action.data.value),
            enteredCategory: action.data.value,

        }
    }
}



//Selector Component Options
const options = [
    { value: "Utilities", label: "Utilities" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Food", label: "Food" },
    { value: "Housing", label: "Housing" },
    { value: "Transportation", label: "Transportation" },
    { value: "Loans/Debts", label: "Loans/Debts" },
    { value: "Insurance", label: "Insurance" },
    { value: "Other", label: "Other" },

]

//Styles for Selector Component

const customStyles = {
    container: (provided, state) => ({
        ...provided,
        fontFamily: "sans-serif",

    }),
    
    control: (provided, state) => {
        return{
                 ...provided,
        borderRadius: "3px",
        backgroundColor: state.selectProps.color,
        width: "170px",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "20px",
        marginBottom: "40px",
        border: "none",
        }
    },

    dropdownIndicator: (provided, state) => ({
        ...provided,
        color: "white",

    }),

    input: (provided, state) => ({
        display: "none",

    }),

    indicatorSeparator: (provided, state) => ({
        ...provided,
        backgroundColor: "white",
    }),

    singleValue: (provided) => ({
        ...provided,
        color: 'white',
        fontSize: "15px",
        lineHeight: "normal",
    }),


}


function ExpenseEditOverlay(props) {
    const usrCtx = useContext(UserContext);
    const authCtx = useContext(AuthContext);
    const [formState, dispatch] = useReducer(formReducer, props.create ?{
        enteredName: "", 
        enteredAmt: "",
        enteredCategory: "Utilities", 
        submitBtnDisable: true, 
        selectorColor: "Brown",
    }: {
        enteredName: props.cardData.name + "", 
        enteredAmt: (Math.round(parseFloat(props.cardData.expense.replace("$", "")) * 100) / 100).toFixed(2), 
        //(Math.round(parseFloat(props.cardData.expense.replace("$", "")) * 100) / 100).toFixed(2)
        enteredCategory: props.cardData.cat + "", 
        submitBtnDisable: false, 
        selectorColor: catMatch(props.cardData.cat),
    })
    //Prevents User from entering Negative Values: 
    const preventNeg = (event) => {
        if (event.key === "-") {
            event.preventDefault();
        }
    }

    //Event Handlers 
    const expenseNameHandler = (event) => {
        dispatch({ act: "expenseName", data: event.target.value });
    }
    const expenseAmtHandler = (event, normalize) => {
        if(normalize){
            event.target.value ? dispatch({ act: "expenseAmt", data: ((Math.round(event.target.value * 100) / 100).toFixed(2) + "") })
            : dispatch({ act: "expenseAmt", data: "" });
        }
        else{
            dispatch({act: "expenseAmt", data: event.target.value});
        }
        
       
    }
    const categorySelectHandler = (data, action) => {
     
        dispatch({act: "categorySelect", data})
        
        
    }

    const submitHandler = async () => {
        try{
            if(props.create){
                await axios.post("/expenses/add", {
                    date: usrCtx.Date, 
                    expense:{
                        Name: formState.enteredName, 
                        Cat: formState.enteredCategory, 
                        Amount: formState.enteredAmt,
                    }
                })
                await usrCtx.retrieveExpenseList(usrCtx.Date);
            usrCtx.setModalState(false);
            }
            else{
                await axios.put("/expenses/update", {
                    date: usrCtx.Date, 
                    id: props.cardData.id,
                    expense:{
                        Name: formState.enteredName, 
                        Cat: formState.enteredCategory, 
                        Amount: formState.enteredAmt,
                    }
                })
                await usrCtx.retrieveExpenseList(usrCtx.Date);
                props.stateFunction(false);

            }
          
        }
        catch(err){
            usrCtx.setModalState(false);
            authCtx.logoutHandler();
        }
        
    }

    
    return (
        <div className={styles['Form']}>
            <p className={styles["Header"]}>{props.create ? "Add new Expense" : "Update Expense"}</p>
            <div className={styles["NameLabel"]}>
                <div></div>
                <input onChange={expenseNameHandler} className={styles["Input"]} type="text" placeholder='Expense-Name' value={formState.enteredName}></input>
            </div>
            <div className={styles["AmtLabel"]}>
                <p>$</p>
                <input onChange={(e) => expenseAmtHandler(e, false)} onBlur={(e) => {expenseAmtHandler(e, true)}} onKeyDown={preventNeg} className={styles["Input"]} type="number" placeholder='Amount' value={formState.enteredAmt} min="0" onWheel={(e) => {
                    e.target.blur();
                }}></input>

            </div>
            <div>
                <Select color = {formState.selectorColor} onChange={categorySelectHandler} defaultValue={{ value: formState.enteredCategory, label:  formState.enteredCategory}} options={options} styles={customStyles}></Select>
            </div>
            <IconButton onClick={submitHandler} disable={formState.submitBtnDisable} style={styles["Submit"]} icon={checkMark}></IconButton>
        </div>




    )
}

export default ExpenseEditOverlay