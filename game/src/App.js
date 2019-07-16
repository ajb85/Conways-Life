import React, { useReducer, useEffect } from "react";

import Cell from "./Cell.js";
import { initialState, reducer } from "./reducer/";

import styles from "./styles.module.scss";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const calcNextGrid = () => {
      const nextGrid = state.grid.map((row, y) =>
        row.map((cell, x) => {
          const rows = state.grid.length;
          const cols = row.length;
          const left = (cols + x - 1) % cols;
          const right = (cols + x + 1) % cols;
          const up = (rows + y - 1) % rows;
          const down = (rows + y + 1) % rows;

          const localPopulation = [
            [left, up],
            [x, up],
            [right, up],
            [left, y],
            [right, y],
            [left, down],
            [x, down],
            [right, down]
          ].reduce((acc, [x, y]) => {
            const add = state.grid[y][x] ? 1 : 0;
            return acc + add;
          }, 0);

          // console.log(
          //   `Currently at: [${x}, ${y}]  |  Value: ${
          //     state.grid[y][x]
          //   }  |  Local Pop: ${localPopulation}`
          //   // }  |  Direction: ${up} ${right} ${down} ${left}`
          // );
          return (
            (cell && localPopulation === 2) ||
            localPopulation === 3 ||
            (!cell && localPopulation === 3)
          );
        })
      );
      dispatch({ type: "UPDATE_GRID", payload: nextGrid });
    };

    const interval = setInterval(calcNextGrid, state.time);
    return () => clearInterval(interval);
  }, [state.grid, state.time]);

  return (
    <div className="App">
      {state.grid.map((row, y) => (
        <div key={y} className={styles.row}>
          {row.map((_, x) => (
            <Cell
              key={`${x}, ${y}`}
              isAlive={state.grid[y][x]}
              position={{ x, y }}
            />
          ))}
        </div>
      ))}
      {/* <button onClick={() => calcNextGrid()}>Next</button> */}
    </div>
  );
}

export default App;
