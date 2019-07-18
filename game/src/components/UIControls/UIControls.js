import React, { useState } from "react";

import styles from "./styles.module.scss";

function UIControls({ state, dispatch }) {
  const [rows, setRows] = useState(state.rows);
  const [columns, setColumns] = useState(state.columns);
  const [time, setTime] = useState(state.time);
  return (
    <fieldset
      disabled={state.isRunning}
      style={{ opacity: state.isRunning ? 0.5 : 1 }}
    >
      <form
        onSubmit={e => {
          e.preventDefault();
          dispatch({ type: "FORM_SUBMIT", payload: { rows, columns, time } });
        }}
      >
        <div>
          <label>Rows:</label>
          <input
            type="number"
            value={rows}
            onChange={e => setRows(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Columns:</label>
          <input
            type="number"
            value={columns}
            onChange={e => setColumns(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label>Speed (ms)</label>
          <input
            type="number"
            step="10"
            value={time}
            onChange={e => setTime(parseInt(e.target.value, 10))}
          />
        </div>
        <button className={state.isRunning ? "" : styles.active} type="submit">
          Save {"&"} Reseed
        </button>
      </form>
    </fieldset>
  );
}

export default UIControls;
