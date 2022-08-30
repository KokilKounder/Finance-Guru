import React from 'react'
import style from "./graphSelection.module.css"



function GraphSection(props) {
    const styles = {

        backgroundColor: props.color, 
        height: `${props.percentage}%`,


    }
  return (
    <>
     <div data-tip data-for={props.tooltipId} className={style["Section"]} style={styles}></div>
    </>
  )
}

export default GraphSection