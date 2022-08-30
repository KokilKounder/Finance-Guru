import React, { useEffect, useState, useContext } from 'react'
import styles from "./dashBoardPage.module.css"
import Navbar from '../Components/Dashboard/Navbar'
import ExpenseCard from '../Components/Dashboard/ExpenseCard'
import ExpenseSpecificsCard from '../Components/Dashboard/ExpenseSpecifcsCard/ExpenseSpecificsCard'
import { AuthContext } from '../Context/AuthContext'
import { UserContext } from '../Context/UserContext'
import axios from 'axios'
import Modal from '../Components/SharedComponents/Modal'
import ExpenseEditOverlay from '../Components/Overlays/ExpenseEditOverlay'



function DashBoardPage() {

    const ctx = useContext(AuthContext);
    const usrCtx = useContext(UserContext);
    const [data, setData] = useState();
    

    useEffect(() => {
        let fetchData = async () => {
            try {
                setData((await axios.get("/auth/getUserData")).data);
            }
            catch {
                ctx.logoutHandler();
            }
        }

        fetchData().catch((err) => {
            console.log(err);
        })


    }, []);

    if (!!data) {
        return (
            <div className={styles.DashBoardFrame}>
                <Navbar></Navbar>
                <h1>{data.Username}'s Dashboard</h1>
                <ExpenseCard></ExpenseCard>
                <ExpenseSpecificsCard></ExpenseSpecificsCard>
                <Modal state={usrCtx.isModalOpen} stateFunction = {usrCtx.setModalState}>
                    <ExpenseEditOverlay create={true}></ExpenseEditOverlay>
                </Modal>
               

            </div>)
    }
    else {
        return <h1>Loading...</h1>
    }
}

export default DashBoardPage
