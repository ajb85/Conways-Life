import React, { useReducer, useEffect, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faSync } from "@fortawesome/free-solid-svg-icons";

import UIControls from "./components/UIControls";
import { initialState, reducer } from "./reducer/";
import updateChangesWithNeighbors from "js/addAllNeighbors.js";
import isCellAlive from "js/isCellAlive.js";

import styles from "./styles.module.scss";

const Cell = memo(function Cell({ isAlive, size }) {
  const pxSize = `${size}px`;
  return (
    <div
      style={{
        minWidth: pxSize,
        maxWidth: pxSize,
        minHeight: pxSize,
        maxHeight: pxSize,
        backgroundColor: isAlive ? "white" : "black"
      }}
      className={styles.cell}
    />
  );
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const cellSize = Math.floor((state.width * 0.8) / state.columns);

  useEffect(() => {
    const updateSize = () => {
      dispatch({
        type: "RESIZE"
      });
    };
    window.addEventListener("resize", updateSize);

    const calcNextGrid = () => {
      let nextGrid;
      const changes = {};

      if (state.generation === 0) {
        // There are no changes on the first generation so every cell must be recalculated
        nextGrid = state.grid.map((row, y) =>
          row.map((cell, x) => {
            const isAlive = isCellAlive([x, y], state.grid);
            if (cell !== isAlive)
              updateChangesWithNeighbors(x, y, changes, {
                rows: state.rows,
                cols: state.columns
              });

            return isAlive;
          })
        );
      } else {
        // Otherwise, only look at the cells that have changed and their neighbors
        const changedCoordinates = Object.values(state.changes);
        nextGrid = state.grid.map(arr => [...arr]);
        let isAlive;

        changedCoordinates.forEach(([x, y]) => {
          isAlive = isCellAlive([x, y], state.grid);
          if (nextGrid[y][x] !== isAlive)
            updateChangesWithNeighbors(x, y, changes, {
              rows: state.rows,
              cols: state.columns
            });
          nextGrid[y][x] = isAlive;
        });
      }
      dispatch({ type: "FINISH_CYCLE", grid: nextGrid, changes });
    };

    let interval;
    if (state.isRunning) interval = setInterval(calcNextGrid, state.time);
    else clearInterval(interval);

    // Clean up
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", updateSize);
    };
  }, [state]);

  return (
    <div className="App">
      <UIControls state={state} dispatch={dispatch} />

      <div className={styles.game}>
        <div className={styles.buttonGroup}>
          <button onClick={() => dispatch({ type: "TOGGLE_RUN" })}>
            {state.isRunning ? (
              <FontAwesomeIcon icon={faPause} />
            ) : (
              <FontAwesomeIcon icon={faPlay} />
            )}
          </button>
          <button
            disabled={state.isRunning}
            className={state.isRunning ? "" : styles.active}
            style={{ opacity: state.isRunning ? 0.5 : 1 }}
            onClick={() => dispatch({ type: "RESEED" })}
          >
            <FontAwesomeIcon icon={faSync} />
          </button>
        </div>

        {state.grid.map((row, y) => (
          <div key={y} className={styles.row}>
            {row.map((_, x) => (
              <Cell
                key={`${x}, ${y}`}
                size={cellSize}
                isAlive={state.grid[y][x]}
              />
            ))}
          </div>
        ))}
        {/* <p>Generation: {state.generation}</p> */}
      </div>
    </div>
  );
}

export default App;
