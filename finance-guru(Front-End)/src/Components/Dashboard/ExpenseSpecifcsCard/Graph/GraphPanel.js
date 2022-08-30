import React, { useContext } from 'react';
import styles from "./graphPanel.module.css"
import IconButton from '../../../SharedComponents/IconButton';
import barchart from "../../../../Assets/images/Bar-Chart.svg"
import GraphSection from './GraphSection';
import { UserContext } from '../../../../Context/UserContext';
import { catMatch, capitalizeFirstLetter } from '../../../../Helpers/catMatch';
import ReactTooltip from "react-tooltip";

const generateSections = (data) => {
  let arr = [];
  let total = parseFloat(data["mainTotal"]);
  let firstSec = null;
  let lastSec = null;
  arr.push(<GraphSection roundedCornersTop={true} roundedCornersBottom={true} percentage={(total === 0) ? 100 : 0} key={""} color={"white"}></GraphSection>)

  for (let key in data) {
    if (data[key] !== 0 && firstSec === null && key !== "mainTotal") {
      firstSec = key;
    }
    if (data[key] !== 0 && key !== "mainTotal") {
      lastSec = key;
    }
  }

  for (let key in data) {
    if (key !== "mainTotal") {
      let percentage = 100 * (parseFloat(data[key]) / total)
      arr.push(
        <>
          <ReactTooltip id={key+""} place="right" effect="solid">
            {`${capitalizeFirstLetter(key.replace("Total",""))} ${parseFloat([data[key]])}$ (${Math.round(percentage * 100) / 100}%)`}
          </ReactTooltip>
          <GraphSection tooltipId = {key+""} roundedCornersTop={firstSec === key} roundedCornersBottom={lastSec === key} percentage={percentage || 0} key={key} color={catMatch(key.replace("Total", ""))}></GraphSection>
        </>
      )
    }



  }

  return arr;

}


function GraphPanel() {
  //div just place holder for graph
  const usrCtx = useContext(UserContext);

  return (
    <div className={styles["graph-panel"]}>
      <p>Distribution</p>
      <IconButton icon={barchart} style={styles["Graph-Panel-button"]}></IconButton>
      <div className={styles.graph}>
        {generateSections(usrCtx.Total)}
      </div>
    </div>
  )

}

export default GraphPanel;
