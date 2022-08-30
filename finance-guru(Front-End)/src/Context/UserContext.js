import React, { useState, createContext, useContext } from 'react';
import { utils } from '@amir04lm26/react-modern-calendar-date-picker';
import { dateFormat } from "../Helpers/dateFormatter";
import { AuthContext } from './AuthContext';

const UserContext = createContext({
    Date: "",
    changeDate: () => {}, 
    isModalOpen: false,
    setModalState: () => {},
    expenseList: null,
    retrieveExpenseList: () => {},
    mainTotal: null, 
    isMenuModalOpen: false,
    setIsMenuModalOpen: () => {},
    verifyModalDelete: false, 
    setVerifyModalDelete: () => {}, 
    verifyModalEdit: false, 
    setVerifyModalEdit: () => {}, 
    verifyAccountDeletionModal: false, 
    setVerifyAccountDeletionModal: () => {},
    editAccountModal: false, 
    setEditAccountModal: () => {}

})


function UserContextProvider(props) {
  const authCtx = useContext(AuthContext);
    const[Date, setDate] = useState(dateFormat(utils().getToday()));
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [expenseList, setExpenseList] = useState(); 
    const [Total, setTotal] = useState({});
   
    //Menu Modal
    const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

    //Modals that require user to verify password before going on
    const [verifyModalDelete, setVerifyModalDelete] = useState(false);
    const [verifyModalEdit, setVerifyModalEdit] = useState(false);
    
    //Delete and Edit Account Modals
    const [verifyAccountDeletionModal, setVerifyAccountDeletionModal] = useState(false);
    const [editAccountModal, setEditAccountModal] = useState(false); 


 
    
 
    
   
    const changeDate = (date) => {
        setDate(dateFormat(date)); 
    }

    const setModalState = (state) => {
      setIsModalOpen(state);
    }



    const retrieveExpenseList = async (date) => {
      try{
        const totals = (await axios.get("/expenses/retrieve/" + encodeURIComponent(date))).data.totals
        setTotal(() => totals)

        return setExpenseList((await axios.get("/expenses/retrieve/" + encodeURIComponent(date))).data.main);
      }
      catch(err){
        console.log(err);
        authCtx.logoutHandler();
        return err;
      }
    }

    const contextValue = {
        Date, 
        changeDate, 
        isModalOpen, 
        setModalState,
        expenseList,
        retrieveExpenseList, 
        Total,
        isMenuModalOpen,
        setIsMenuModalOpen,
        verifyModalDelete,
        setVerifyModalDelete, 
        verifyModalEdit, 
        setVerifyModalEdit, 
        verifyAccountDeletionModal,
        setVerifyAccountDeletionModal, 
        editAccountModal, 
        setEditAccountModal,

        
        
    }
  
    return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  )
}

export {UserContext, UserContextProvider};