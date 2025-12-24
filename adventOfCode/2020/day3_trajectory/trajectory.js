const walkTrough = (grid, [offSetY, offSetX]) => {
  let trees = 0,
    j = 0;
  for (let i = offSetY; i < grid.length; i += offSetY) {
    j = (j + offSetX) % grid[0].length;
    if (grid[i][j] === "#") trees++;
  }

  return trees;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#`.split("\n");

  const slopes = [
    [1, 1],
    [1, 3],
    [1, 5],
    [1, 7],
    [2, 1],
  ];

  return slopes
    .map((slope) => walkTrough(input, slope))
    .reduce((prod, count) => prod * count, 1);
};

console.log(main());
