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

const emptyGrid = () => Array.from({ length: 5 }).map((_) => ".....".split(""));

const isBug = (tile) => tile === "#";

const getBugCount = (topTile, leftTile, rightTile, bottomTile) => {
  let count = isBug(topTile) ? 1 : 0;
  count += isBug(leftTile) ? 1 : 0;
  count += isBug(rightTile) ? 1 : 0;
  count += isBug(bottomTile) ? 1 : 0;
  return count;
};

const countBugsInARow = (row) =>
  row.join("").split("").reduce((sum, tile) => isBug(tile) ? sum++ : sum);

const getNewTile = (prevTile, { cell, referenceTiles, row, col }) => {
  const leftTile = col === 0 ? referenceTiles.leftTile : cell[row][col - 1];
  const rightTile = col === 4 ? referenceTiles.rightTile : cell[row][col + 1];
  const topTile = row === 0 ? referenceTiles.topTile : cell[row - 1][col];
  const bottomTile = row === 4 ? referenceTiles.bottomTile : cell[row + 1][col];
  const bugCount = getBugCount(topTile, leftTile, rightTile, bottomTile);

  if (prevTile === "#") {
    return bugCount === 1 ? "#" : ".";
  }

  return bugCount <= 2 && bugCount > 0 ? "#" : ".";
};

const getRow = (cell, referenceTiles, rowIndex) => {
  let row = "";
  for (let i = 0; i < 5; i++) {
    row += getNewTile(cell[rowIndex][i], {
      cell,
      referenceTiles,
      row: rowIndex,
      col: i,
    });
  }

  return row;
};

const updateCell = (cell, referenceTiles) => {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    rows.push(getRow(cell, referenceTiles, i));
  }

  return rows;
};

const updateInnerCells = (grids, maxRange) => {
  for (let i = 0; i < maxRange; i++) {
    const innerCell = grids[i];
    const outerCell = grids[i + 1];
    const leftTile = outerCell[2][1];
    const rightTile = outerCell[2][3];
    const topTile = outerCell[1][2];
    const bottomTile = outerCell[3][2];

    grids[i] = updateCell(innerCell, {
      leftTile,
      topTile,
      bottomTile,
      rightTile,
    });
  }
};

const diveIntoLevels = (grid, mins = 4) => {
  const grids = [grid];
  for (let i = 1; i <= Math.ceil(mins / 2); i++) {
    grids.unshift(emptyGrid());
    updateInnerCells(grids, i);
    // updateOuterCells(grids, i);
  }

  return grids.map((x) => x.join("\n")).join("\n\n");
};

const main = (fn = getRating) => {
  const input = Deno.readTextFileSync("input.txt").split("\n");
  const example = `....#
#..#.
#.?##
..#..
#....`.split("\n");

  return fn(example);
};

console.log(main(diveIntoLevels));
