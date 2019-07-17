import React, { useReducer, useEffect, memo } from "react";

import { initialState, reducer } from "./reducer/";
import updateChangesWithNeighbors from "js/addAllNeighbors.js";
import isCellAlive from "js/isCellAlive.js";

import styles from "./styles.module.scss";

const Cell = memo(function Cell({ isAlive }) {
  return (
    <div
      className={styles.cell}
      style={{ backgroundColor: isAlive ? "white" : "black" }}
    />
  );
});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
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

        changedCoordinates.forEach(([x, y], i) => {
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

    const interval = setInterval(calcNextGrid, state.time);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <div className="App">
      {state.grid.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((_, x) => (
            <Cell key={`${x}, ${y}`} isAlive={state.grid[y][x]} />
          ))}
        </div>
      ))}
      <p>Generation: {state.generation}</p>
    </div>
  );
}

export default App;
