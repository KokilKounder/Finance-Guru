import React, { useState, useContext } from "react";
import styles from "./expenseDataSelector.module.css"
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";
import DatePicker, { utils } from "@amir04lm26/react-modern-calendar-date-picker";
import Dropdown from "../../Assets/images/Dropdown.svg";
import { UserContext } from "../../Context/UserContext";
import RenderInBrowser from 'react-render-in-browser';


const maximumDate = {
  year: 2030,
  month: 12,
  day: 31
};

const minimumDate = {
  year: 2020,
  month: 1,
  day: 1
}

function ExpenseDataSelector() {
  const userCtx = useContext(UserContext);
  const [selectedDay, setSelectedDay] = useState(utils().getToday());
  return (
    <>
      <RenderInBrowser except safari>
        <div className={styles["Date-Selector"]}>
          <span>Amount Spent on {userCtx.Date}<DatePicker
            calendarPopperPosition="bottom"
            value={selectedDay}
            onChange={async (data) => {
              userCtx.changeDate(data)
            }}
            colorPrimary="#4431D1"
            renderInput={({ ref }) => {
              return (
                <button ref={ref} className={styles["Selector_Button"]}>
                  <img ref={ref} src={Dropdown}></img>
                </button>

              )
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          /></span>
        </div>
      </RenderInBrowser>
      <RenderInBrowser safari only>

        <div className={styles["Date-Selector"]}>
          <span>Amount Spent on { }<DatePicker
            calendarPopperPosition="bottom"
            onChange={async (data) => {
              userCtx.changeDate(data)
            }}
            colorPrimary="#4431D1"
            renderInput={({ ref }) => {
              { console.log("This should execute") }
              return (
                <>
                  <input className={styles["DateSelectorInput"]} ref={ref} value={userCtx.Date}></input>
                </>

              )
            }}
            maximumDate={maximumDate}
            minimumDate={minimumDate}
          /></span>
        </div>
      </RenderInBrowser>
    </>
  )
}



export default ExpenseDataSelector