import getStarterGrid from "js/generateGrid.js";

const rows = 40;
const columns = 50;

export const initialState = {
  rows,
  columns,
  grid: getStarterGrid(rows, columns, true),
  generation: 0,
  time: 10,
  changes: {},
  isRunning: false,
  width: window.innerWidth
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
    case "RESIZE":
      return {
        ...state,
        width: window.innerWidth
      };
    case "FORM_SUBMIT":
      const rows =
        action.payload.rows > 0 && action.payload.rows < 101
          ? action.payload.rows
          : 50;
      const columns =
        action.payload.columns > 0 && action.payload.columns < 101
          ? action.payload.columns
          : 50;
      const time = state.time > 0 ? action.payload.time : 100;
      return {
        ...state,
        rows,
        columns,
        time,
        grid: getStarterGrid(rows, columns, true),
        changes: {},
        generation: 0
      };
    case "TOGGLE_RUN":
      return {
        ...state,
        isRunning: !state.isRunning
      };
    case "RESEED":
      return {
        ...state,
        grid: getStarterGrid(state.rows, state.columns, true),
        changes: {},
        generation: 0
      };
    default:
      return state;
  }
};
