const cache = {};

export default (x, y, changes, { rows, cols }) => {
  const key = `${x} ${y}`;
  if (cache[key])
    cache[key].forEach(([nextX, nextY]) => {
      if (!changes[`${nextX} ${nextY}`])
        changes[`${nextX} ${nextY}`] = [nextX, nextY];
    });
  else {
    for (let i = -1; i < 2; i++) {
      for (let j = -1; j < 2; j++) {
        const nextY = (rows + y + i) % rows;
        const nextX = (cols + x + j) % cols;
        const strCoor = `${nextX} ${nextY}`;
        if (!cache[key]) cache[key] = [[nextX, nextY]];
        else cache[key].push([nextX, nextY]);
        if (!changes[strCoor]) changes[strCoor] = [nextX, nextY];
      }
    }
  }
};
