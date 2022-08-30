import React from 'react';


function IconButton(props) {
  return (
    <button  disabled = {props.disable} ref ={props.ref} className={props.style} onClick={props.onClick}>
    <img ref ={props.ref} src={props.icon}/>
    </button>   
  );
}

export default IconButton;
