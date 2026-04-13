const makeHouseKey = ({ x, y }) => `${x},${y}`;

// const input = `>\n^>v<\n^v^v^v^v^v`;
const input = Deno.readTextFileSync('input.txt')

const routes = input.split("\n");

const visitedHouses = { "0,0": 1 };

const offsets = {
  "^": [0, 1],
  ">": [1, 0],
  v: [0, -1],
  "<": [-1, 0],
};

const sledge = { x: 0, y: 0 };

routes[0].split("").forEach((direction) => {
  const [xOff, yOff] = offsets[direction];

  sledge.x += xOff;
  sledge.y += yOff;

  const house = makeHouseKey(sledge);
  if (!(house in visitedHouses)) visitedHouses[house] = 0;

  visitedHouses[house]++;
});

console.log(Object.values(visitedHouses).length);
