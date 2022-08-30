
import ReactDom from 'react-dom'
import IconButton from './IconButton';
import styles from "./styles/modal.module.css";
import closeIcon from "../../Assets/images/Close.svg";







function Modal(props) {

 

  if (props.state) {
    console.log("Overflow should be hidden")
    document.body.style.overflow = 'hidden'
  }
  else {
    console.log("Overflow should be visible")
    document.body.style.overflow = '';
  }

  if (!props.state) {
    return null;
  }

  return ReactDom.createPortal(
    <>
      <div className={styles["Modal-Overaly"]} />
      <div className={styles["Modal"]}>
        <div className={styles["Modal-Header"]}>
          <IconButton onClick={() => props.stateFunction(false)} style={styles["Close-Button"]} icon={closeIcon}></IconButton>
        </div>
        {props.children}
      </div>
    </>,
    document.getElementById("portal")
  )
}

export default Modal