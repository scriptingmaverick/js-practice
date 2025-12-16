const distance = {
  0: [0, 1],
  1: [1, 0],
  2: [0, -1],
  3: [-1, 0],
};

const recognizePath = (parents, targetKey) => {
  const path = [];
  while (targetKey !== null) {
    path.push(targetKey);
    targetKey = parents[targetKey];
  }
  return path.reverse();
};

const findMinPath = (grid, start) => {
  const rows = grid.length;
  const cols = grid[0].length;
  const parents = {};
  parents[start] = null;
  const queue = [start];
  let targetKey = null;
  const visitedNodes = {};
  visitedNodes[start] = true;
  while (queue.length > 0) {
    const key = queue.shift();
    const [keyX, keyY] = key.split(",");
    if (grid[+keyX][+keyY] === "2") {
      targetKey = key;
      break;
    }
    let direction = 0;
    while (direction <= 3) {
      const [x, y] = distance[direction++];
      const [newX, newY] = [+keyX + +x, +keyY + +y];
      const newKey = `${newX},${newY}`;
      if (newX < 0 || newX >= rows || newY < 0 || newY >= cols) continue;
      if (newKey in visitedNodes || grid[newX][newY] === "0") continue;
      visitedNodes[newKey] = true;
      queue.push(newKey);
      parents[newKey] = key;
    }
  }
  return recognizePath(parents, targetKey);
};

const example = [["1", "1", "0"], ["1", "0", "1"], ["1", "1", "2"]];

console.log(findMinPath(example, "0,0"));
