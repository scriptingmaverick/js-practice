const offsets = {
  "^": [0, 1],
  ">": [1, 0],
  v: [0, -1],
  "<": [-1, 0],
};

const makeHouseKey = ({ x, y }) => `${x},${y}`;

const deliver = (sledge, direction, visitedHouses) => {
  const [xOff, yOff] = offsets[direction];

  sledge.x += xOff;
  sledge.y += yOff;

  const house = makeHouseKey(sledge);
  if (!(house in visitedHouses)) visitedHouses[house] = 0;

  visitedHouses[house]++;
};

// const input = `^v\n^>v<\n^v^v^v^v^v`;
const input = Deno.readTextFileSync("input.txt");

const routes = input.split("\n");

const visitedHouses = { "0,0": 2 };

const sledges = { robo: { x: 0, y: 0 }, santa: { x: 0, y: 0 } };

const route = routes[0];

for (let i = 0; i < route.length; i += 2) {
  deliver(sledges.robo, route[i], visitedHouses);
}

for (let i = 1; i < route.length; i += 2) {
  deliver(sledges.santa, route[i], visitedHouses);
}

console.log(Object.values(visitedHouses).length);
