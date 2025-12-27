const directionalOffsets = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
};

const changeCoOrdinates = (position, offset, units) => {
  position.x += offset[0] * units;
  position.y += offset[1] * units;
};

const execute = (instrcution, threshold, flyerObj) => {
  const instrcutions = {
    L: (degrees, flyerObj) => {
      const left = { 90: 3, 180: 2, 270: 1 };
      flyerObj.facing = (flyerObj.facing + left[degrees]) % 4;
    },
    R: (degrees, flyerObj) => {
      const right = { 90: 1, 180: 2, 270: 3 };
      flyerObj.facing = (flyerObj.facing + right[degrees]) % 4;
    },
    F: (units, flyerObj) => {
      const direction = flyerObj.facing;
      const directions = {
        0: "N",
        1: "E",
        2: "S",
        3: "W",
      };

      const offset = directionalOffsets[directions[direction]];
      changeCoOrdinates(flyerObj.position, offset, units);
    },
    N: (units, flyerObj) =>
      changeCoOrdinates(flyerObj.position, directionalOffsets["N"], units),
    S: (units, flyerObj) =>
      changeCoOrdinates(flyerObj.position, directionalOffsets["S"], units),
    E: (units, flyerObj) =>
      changeCoOrdinates(flyerObj.position, directionalOffsets["E"], units),
    W: (units, flyerObj) =>
      changeCoOrdinates(flyerObj.position, directionalOffsets["W"], units),
  };

  instrcutions[instrcution](threshold, flyerObj);
};

const calcManhattanDist = ({ x, y }) => Math.abs(x) + Math.abs(y);

const calculateDistance = (instrcutions) => {
  const flyerObj = { facing: 1, position: { x: 0, y: 0 } };
  for (let i = 0; i < instrcutions.length; i++) {
    const [instrcuction, threshold] = [
      instrcutions[i].slice(0, 1),
      instrcutions[i].slice(1),
    ];
    console.log("\n\nbeffore -> ", flyerObj, "\n");
    execute(instrcuction, +threshold, flyerObj);
    console.log(instrcuction, +threshold, flyerObj);
  }

  return calcManhattanDist(flyerObj.position);
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `F10
N3
F7
R90
F11`.split("\n");
  return calculateDistance(input);
};

console.log(main());
