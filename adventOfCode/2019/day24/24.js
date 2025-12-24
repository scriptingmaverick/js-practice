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

const makeEmptyGrid = () =>
  Array.from({ length: 5 }).map((_) => ".....".split(""));

const isBug = (tile) => tile === "#";

const getBugCount = (topTile, leftTile, rightTile, bottomTile) => {
  let count = isBug(topTile) ? 1 : 0;
  count += isBug(leftTile) ? 1 : 0;
  count += isBug(rightTile) ? 1 : 0;
  count += isBug(bottomTile) ? 1 : 0;
  return count;
};

const getNewTile = (prevTile, bugCount) => {
  if (prevTile === "#") {
    if (bugCount === 1) return "#";
    return ".";
  }

  if (bugCount <= 2 && bugCount > 0) return "#";
  return ".";
};

const getEdgeTiles = (innerCell, outerCell, edge = 0) => {
  const edgeTile = edge === 0 ? outerCell[1][2] : outerCell[3][2];
  const nextRow = edge === 0 ? edge + 1 : edge - 1;
  const leftTile = outerCell[2][1], rightTile = outerCell[2][3];
  const bugCounts = {};
  bugCounts[0] = getBugCount(
    edgeTile,
    leftTile,
    innerCell[edge][1],
    innerCell[nextRow][0],
  );

  for (let i = 1; i < 4; i++) {
    bugCounts[i] = getBugCount(
      edgeTile,
      innerCell[edge][i - 1],
      innerCell[edge][i + 1],
      innerCell[nextRow][i],
    );
  }

  bugCounts[4] = getBugCount(
    edgeTile,
    innerCell[edge][3],
    rightTile,
    innerCell[nextRow][4],
  );

  for (let i = 0; i < 5; i++) {
    innerCell[edge][i] = getNewTile(innerCell[edge][i], bugCounts[i]);
  }
};

const changeCells = (grids, mainIndex, referring = "parent") => {
  if (referring === "parent") {
    let i = 0;
    while (i < mainIndex) {
      const outerCell = grids[i + 1];
      const innerCell = grids[i];
      getEdgeTiles(innerCell, outerCell);
      for (let i = 1; i < 4; i++) {
        innerCell[i][0] = getNewTile(
          innerCell[i][0],
          getBugCount(
            innerCell[i - 1][0],
            outerCell[2][1],
            innerCell[i][1],
            innerCell[i + 1][0],
          ),
        );
        for (let j = 1; j < 4; j++) {
          if (i === 2 && j === 2) continue;
          const bugCount = getBugCount(
            innerCell[i - 1][j],
            innerCell[i][j - 1],
            innerCell[i][j + 1],
            innerCell[i + 1][j],
          );
          
          innerCell[i][j] = getNewTile(innerCell[i][j], bugCount);
        }
        innerCell[i][4] = getNewTile(
          innerCell[i][4],
          getBugCount(
            innerCell[i - 1][4],
            innerCell[i][3],
            outerCell[2][3],
            innerCell[i + 1][4],
          ),
        );
      }
      getEdgeTiles(innerCell, outerCell, 4);
      i++;
    }
  }
};

const calculateBugsInGrid = (grid) =>
  grid.join("").split("").reduce((sum, tile) => tile === "#" ? sum++ : sum);

const calculateBugs = (grids) => {
  let bugs = 0;
  for (let i = 0; i < grids.length; i++) {
    bugs += calculateBugsInGrid(grids[i]);
  }

  return bugs;
};

const diveIntoLevels = (grid, maxMinutes = 10) => {
  const grids = [grid];
  for (let i = 1; i <= Math.ceil(maxMinutes / 2); i++) {
    grids.unshift(makeEmptyGrid());
    grids.push(makeEmptyGrid());
    changeCells(grids, i);
    // changeCells(grids, i, "child");
    break;
  }

  console.log(grids.map((x) => x.join("\n").replaceAll(",", "")).join("\n\n"));

  return calculateBugs(grids);
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
