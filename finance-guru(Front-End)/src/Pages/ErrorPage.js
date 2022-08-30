import React from 'react'
import styles from "./errorpage.module.css"

function ErrorPage() {
  return (
    <div className = {styles["ErrorPage"]}>
        <p>The Link you have entered has either expired or is invalid</p>
    </div>
  )
}

export default ErrorPage