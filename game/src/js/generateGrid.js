export default (rows, columns, seed) => {
  const grid = [];
  for (let i = 0; i < columns; i++) {
    const row = [];
    for (let j = 0; j < rows; j++) {
      if (seed) row.push(Math.random() > 0.8);
      else row.push(false);
    }
    grid.push(row);
  }
  return grid;
};

// Diagnostic array
// export default () => [
//   [false, false, false, false, false, false, true, false, false, false],
//   [false, true, false, false, false, false, true, false, true, false],
//   [false, false, false, false, false, false, false, false, true, false],
//   [false, false, true, true, false, false, false, false, false, true],
//   [false, false, false, false, false, true, true, false, false, false],
//   [false, false, false, false, false, false, false, false, false, false],
//   [false, true, true, true, false, false, false, false, false, false],
//   [false, false, false, false, false, false, false, false, false, false],
//   [false, false, false, false, false, false, true, true, false, false],
//   [false, true, false, false, false, false, true, false, false, false]
// ];
