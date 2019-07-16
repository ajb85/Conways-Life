const rows = 40;
const columns = rows;

export const initialState = {
  rows,
  columns,
  grid: getBlankGrid(rows, columns),
  time: 10
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_GRID":
      return { ...state, grid: action.payload };
    case "UPDATE_SIZE":
      return { ...state, [action.key]: action.payload };
    default:
      return state;
  }
};

function getBlankGrid(rows, columns) {
  const grid = [];
  for (let i = 0; i < columns; i++) {
    const row = [];
    for (let j = 0; j < rows; j++) {
      row.push(Math.random() > 0.9);
      //   row.push(
      //     (i === 2 && j === 5) || (i === 3 && j === 5) || (i === 4 && j === 5)
      //   );
    }
    grid.push(row);
  }
  return grid;
}
