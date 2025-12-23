const isBug = (grid, i, j) => {
  if (i < 0 || j < 0 || i >= 5 || j >= 5) return false;
  return grid[i][j] === "#";
};

const noOfAdjBugs = (i, j, grid) => {
  let bugCount = 0;
  bugCount = isBug(grid, i + 1, j) ? 1 : 0;
  bugCount += isBug(grid, i - 1, j) ? 1 : 0;
  bugCount += isBug(grid, i, j + 1) ? 1 : 0;
  bugCount += isBug(grid, i, j - 1) ? 1 : 0;
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

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `....#
#..#.
#..##
..#..
#....`.split("\n");

  return getRating(input);
};

console.log(main());
