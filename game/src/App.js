import React, { useReducer, useEffect } from "react";

import Cell from "./Cell.js";
import { initialState, reducer } from "./reducer/";
// import newGrid from "js/generateGrid.js";

/*
dispatch({ type: "UPDATE_GRID", payload: nextGrid });
}
*/
import styles from "./styles.module.scss";

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
            recordChanges(cell !== isAlive, x, y, state.grid, changes);
            return isAlive;
          })
        );
      } else {
        // Otherwise, only look at the cells that have changed or have changed neighbors
        const changedCoordinates = Object.values(state.changes).sort(
          ([x1, y1], [x2, y2]) => {
            if (y1 < y2) return -1;
            else if (y1 > y2) return 1;
            else {
              if (x1 < x2) return -1;
              else return 1;
            }
          }
        );
        // console.log(changedCoordinates);
        nextGrid = state.grid.map(arr => [...arr]);
        let isAlive;
        changedCoordinates.forEach(([x, y], i) => {
          // if (x === 2 && y === 5) {
          //   console.log("Found 2 and 5");
          //   recordChanges(
          //     nextGrid[y][x] !== isAlive,
          //     x,
          //     y,
          //     state.grid,
          //     changes,
          //     1
          //   );
          // } else {
          recordChanges(nextGrid[y][x] !== isAlive, x, y, state.grid, changes);
          // }
          isAlive = isCellAlive([x, y], state.grid);
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
            <Cell
              key={`${x}, ${y}`}
              isAlive={state.grid[y][x]}
              position={{ x, y }}
            />
          ))}
        </div>
      ))}
      {/* <button onClick={() => calcNextGrid()}>Next</button> */}
      <p>Generation: {state.generation}</p>
    </div>
  );
}

export default App;

// function checkForChange(x, y, state) {
//   const rows = state.grid.length;
//   const cols = state.grid[0].length;
//   for (let i = -1; i < 2; i++) {
//     for (let j = -1; j < 2; j++) {
//       const nextY = (rows + y + i) % rows;
//       const nextX = (cols + x + j) % cols;
//       const strCoor = `${nextX} ${nextY}`;
//       if (state.changes[strCoor]) return true;
//     }
//   }
//   return false;
// }

function addNeighborsToChange(x, y, grid, changes, diag) {
  const rows = grid.length;
  const cols = grid[0].length;
  if (diag) console.log("R&C: ", rows, cols, changes);
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const nextY = (rows + y + i) % rows;
      const nextX = (cols + x + j) % cols;
      const strCoor = `${nextX} ${nextY}`;
      if (diag) console.log("Adding: ", strCoor, changes[strCoor]);
      if (!changes[strCoor]) changes[strCoor] = [nextX, nextY];
    }
  }
}

function isCellAlive([x, y], grid) {
  const cell = grid[y][x];
  const [up, left, down, right] = getDirections(x, y, grid);

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
    const add = grid[y][x] ? 1 : 0;
    return acc + add;
  }, 0);
  return (cell && localPopulation === 2) || localPopulation === 3;
}

function getDirections(x, y, grid) {
  const rows = grid.length;
  const cols = grid[0].length;

  const left = (cols + x - 1) % cols;
  const right = (cols + x + 1) % cols;
  const up = (rows + y - 1) % rows;
  const down = (rows + y + 1) % rows;

  return [up, left, down, right];
}

function recordChanges(changed, x, y, grid, changes, diag) {
  // let madeChange = false;
  // const [up, left] = getDirections(x, y, state);
  if (diag) console.log("Checking for change");
  if (changed) {
    // madeChange = true;
    if (diag) console.log("Value changed");
    addNeighborsToChange(x, y, grid, changes, diag);
  }

  // const upperLeft = `${left} ${up}`;
  // const upperLeftEvaluated = (y > 0 && x > 1) || y > 1;
  // if (upperLeftEvaluated && !changed) {
  // Check upper left cell if it was unchanged for any changed neighbors

  // Currently ignores the first row and first cell of second row
  // Eventually need to go back at the end and check them
  // if (checkForChange(left, up, state)) {
  //   madeChange = true;
  //   changes[upperLeft] = [left, up];
  // }

  // }
}
