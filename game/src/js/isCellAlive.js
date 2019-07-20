export default function([x, y], grid) {
  const [up, left, down, right] = _getDirections(x, y, grid);

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

  return (grid[y][x] && localPopulation === 2) || localPopulation === 3;
}
const cache = {};

function _getDirections(x, y, grid) {
  const key = `${x} ${y}`;
  if (cache[key]) return cache[key];
  const rows = grid.length;
  const cols = grid[0].length;

  const left = (cols + x - 1) % cols;
  const right = (cols + x + 1) % cols;
  const up = (rows + y - 1) % rows;
  const down = (rows + y + 1) % rows;

  cache[key] = [up, left, down, right];

  return [up, left, down, right];
}
