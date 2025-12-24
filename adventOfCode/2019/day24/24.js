const isBugForPart1 = (grid, i, j) => {
  if (i < 0 || j < 0 || i >= 5 || j >= 5) return false;
  return grid[i][j] === "#";
};

const noOfAdjBugs = (i, j, grid) => {
  let bugCount = 0;
  bugCount = isBugForPart1(grid, i + 1, j) ? 1 : 0;
  bugCount += isBugForPart1(grid, i - 1, j) ? 1 : 0;
  bugCount += isBugForPart1(grid, i, j + 1) ? 1 : 0;
  bugCount += isBugForPart1(grid, i, j - 1) ? 1 : 0;
  return bugCount;
};

const createNewGrid = (prevGrid) => {
  let grid = "";
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      const tile = prevGrid[i][j];
      const adjacentBugs = noOfAdjBugs(i, j, prevGrid);
      if (tile === "#") {
        grid += adjacentBugs === 1 ? "#" : ".";
        continue;
      }

      grid += adjacentBugs <= 2 && adjacentBugs > 0 ? "#" : ".";
    }
    grid += "\n";
  }

  return grid.split("\n");
};

const calculateRating = (grid) =>
  grid.join("").split("").reduce(
    (sum, tile, i) => tile === "#" ? sum + Math.pow(2, i) : sum,
    0,
  );

const getRating = (grid) => {
  const grids = {};
  let currentGrid = grid;
  while (!(currentGrid.join("") in grids)) {
    grids[currentGrid.join("")] = true;
    currentGrid = createNewGrid(currentGrid);
    console.log(currentGrid.join("\n"));
  }
  return calculateRating(currentGrid);
};
const getTileAt = (grids, level, r, c) => {
  if (r === 2 && c === 2) return 0;
  if (!grids[level]) return 0;
  return grids[level][r][c] === "#" ? 1 : 0;
};

const countNeighbors = (grids, L, r, c) => {
  let count = 0;

  if (r === 0) count += getTileAt(grids, L - 1, 1, 2);
  else if (r === 3 && c === 2) {
    for (let i = 0; i < 5; i++) count += getTileAt(grids, L + 1, 4, i);
  } else count += getTileAt(grids, L, r - 1, c);

  if (r === 4) count += getTileAt(grids, L - 1, 3, 2);
  else if (r === 1 && c === 2) {
    for (let i = 0; i < 5; i++) count += getTileAt(grids, L + 1, 0, i);
  } else count += getTileAt(grids, L, r + 1, c);

  if (c === 0) count += getTileAt(grids, L - 1, 2, 1);
  else if (c === 3 && r === 2) {
    for (let i = 0; i < 5; i++) count += getTileAt(grids, L + 1, i, 4);
  } else count += getTileAt(grids, L, r, c - 1);

  if (c === 4) count += getTileAt(grids, L - 1, 2, 3);
  else if (c === 1 && r === 2) {
    for (let i = 0; i < 5; i++) count += getTileAt(grids, L + 1, i, 0);
  } else count += getTileAt(grids, L, r, c + 1);

  return count;
};

const createRow = (currentLevel, grids, L, r) => {
  let newRow = "";
  for (let c = 0; c < 5; c++) {
    if (r === 2 && c === 2) {
      newRow += ".";
      continue;
    }

    const bugCount = countNeighbors(grids, L, r, c);
    const isCurrentlyBug = currentLevel[r][c] === "#";
    if (isCurrentlyBug && bugCount === 1) {
      newRow += "#";
    } else if (!isCurrentlyBug && (bugCount === 1 || bugCount === 2)) {
      newRow += "#";
    } else {
      newRow += ".";
    }
  }
  return newRow;
};

const createNewLevel = (currentLevel, grids, L) => {
  const nextLevel = [];
  for (let r = 0; r < 5; r++) {
    nextLevel.push(createRow(currentLevel, grids, L, r));
  }

  return nextLevel;
};

const simulate = (initialGrid, minutes = 200) => {
  let grids = { 0: initialGrid };

  for (let m = 0; m < minutes; m++) {
    const nextGrids = {};
    const minL = Math.min(...Object.keys(grids).map(Number)) - 1;
    const maxL = Math.max(...Object.keys(grids).map(Number)) + 1;

    for (let L = minL; L <= maxL; L++) {
      const currentLevel = grids[L] || Array(5).fill(".....");
      nextGrids[L] = createNewLevel(currentLevel, grids, L);
    }
    grids = nextGrids;
  }

  return countTotalBugs(grids);
};

const countTotalBugs = (grids) =>
  Object.values(grids).map((x) => x.join("")).join("").split("").filter((x) =>
    x === "#"
  ).length;

const main = (fn = getRating) => {
  const input = Deno.readTextFileSync("input.txt").split("\n");
  const example = `....#
#..#.
#.?##
..#..
#....`.split("\n");

  return fn(input);
};

console.log(main(simulate));
