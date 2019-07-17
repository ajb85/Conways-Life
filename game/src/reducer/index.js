import getStarterGrid from "js/generateGrid.js";

const rows = 100;
const columns = rows;

export const initialState = {
  rows,
  columns,
  grid: getStarterGrid(rows, columns, true),
  generation: 0,
  time: 10,
  changes: {}
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "FINISH_CYCLE":
      return {
        ...state,
        grid: action.grid,
        generation: state.generation + 1,
        changes: action.changes
      };
    case "UPDATE_SIZE":
      return {
        ...state,
        rows: action.payload.rows || state.rows,
        columns: action.payload.columns || state.columns
      };
    default:
      return state;
  }
};
