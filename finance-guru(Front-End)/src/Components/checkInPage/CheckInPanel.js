import React from 'react'
import LogoSide from './LogoSide'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import ForgotPasswordForm from './ForgotPasswordForm'
import { Route, Switch } from 'react-router-dom';
import ResetPasswordForm from './ResetPasswordForm'


import styles from "./Styles/checkInPanel.module.css"

function CheckInPanel() {
    return (
        <div className={styles.Panel}>
            <LogoSide></LogoSide>
            <Switch>
                <Route path="/Login" exact>
                    <LoginForm></LoginForm>
                </Route>
                <Route path="/Sign-Up" exact>
                    <SignUpForm></SignUpForm>
                </Route>
                <Route path="/Forgot-Password" exact>
                    <ForgotPasswordForm/>
                </Route>
                <Route path="/Reset-Password/:id/:token" exact>
                    <ResetPasswordForm></ResetPasswordForm>
                </Route>
            </Switch>
        </div>
    )
}

export default CheckInPanel
