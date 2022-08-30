
import styles from "./checkInPage.module.css"
import CheckInPanel from "../Components/checkInPage/CheckInPanel"
import React, { useState } from "react";
import "@amir04lm26/react-modern-calendar-date-picker/lib/DatePicker.css";

function CheckInPage() {
    return (
        <div className={styles.mainFrame} >
            <CheckInPanel></CheckInPanel>
        </div>
    )
};



export default CheckInPage
