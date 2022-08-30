import React,{useContext, useState} from 'react';
import MenuIcon from "../../Assets/images/Menu.svg"
import styles from "./navbar.module.css"
import IconButton from '../SharedComponents/IconButton';
import { UserContext } from '../../Context/UserContext';
import Modal from '../SharedComponents/Modal';
import MenuOverlay from '../Overlays/SettingsOverlay';
import {VerifyOverlayToDelete, VerifyOverlayToEdit} from '../Overlays/VerifyOverlay';
import VerifyAccountDeletionOverlay from '../Overlays/VerifyAccountDeletionOverlay';
import EditAccountOverlay from '../Overlays/EditAccountOverlay';

function Navbar() {
    const usrCtx = useContext(UserContext); 
    return (
       <>
       <div className={styles.Navbar}>
            <IconButton onClick={() => usrCtx.setIsMenuModalOpen(true)} icon={MenuIcon} width = {30} height = {30} style = {styles["Navbar-Icon-button"]}></IconButton>
        </div>
        <Modal state = {usrCtx.isMenuModalOpen} stateFunction = {usrCtx.setIsMenuModalOpen}>
            <MenuOverlay></MenuOverlay>
        </Modal>
        <Modal state = {usrCtx.verifyModalEdit} stateFunction = {usrCtx.setVerifyModalEdit}>
        <VerifyOverlayToEdit/>
        </Modal>
        <Modal state = {usrCtx.editAccountModal} stateFunction = {usrCtx.setEditAccountModal}>
        <EditAccountOverlay></EditAccountOverlay>
        </Modal>
        <Modal state = {usrCtx.verifyAccountDeletionModal} stateFunction = {usrCtx.setVerifyAccountDeletionModal}>
            <VerifyAccountDeletionOverlay/>
        </Modal>
        <Modal state = {usrCtx.verifyModalDelete} stateFunction = {usrCtx.setVerifyModalDelete}>
            <VerifyOverlayToDelete/>
        </Modal>
       </>
       
    )
}

export default Navbar;
