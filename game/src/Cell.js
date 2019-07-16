import React from "react";

import styles from "./styles.module.scss";

function Cell({ isAlive, position: { x, y } }) {
  return (
    <div
      className={styles.cell}
      style={{ backgroundColor: isAlive ? "white" : "black" }}
    />
  );
}

export default Cell;
