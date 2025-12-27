const directionalOffsets = {
  N: [0, 1],
  S: [0, -1],
  E: [1, 0],
  W: [-1, 0],
};

const changeCoOrdinates = ({ wayPoint }, offset, units) => {
  wayPoint.x += offset[0] * units;
  wayPoint.y += offset[1] * units;
};

const rotate = ({ wayPoint }, cmd, val) => {
  const turns = (cmd === "R" ? val : 360 - val) / 90;
  for (let i = 0; i < turns; i++)
    [wayPoint.x, wayPoint.y] = [wayPoint.y, -wayPoint.x];
};

const execute = (instrcution, threshold, flyerObj) => {
  const instrcutions = {
    L: (degrees, flyerObj) => rotate(flyerObj, "L", degrees),
    R: (degrees, flyerObj) => rotate(flyerObj, "R", degrees),
    F: (units, flyerObj) => {
      const { x, y } = flyerObj.wayPoint;
      flyerObj.shipPos.x += x * units;
      flyerObj.shipPos.y += y * units;
    },
    N: (units, flyerObj) =>
      changeCoOrdinates(flyerObj, directionalOffsets["N"], units),
    S: (units, flyerObj) =>
      changeCoOrdinates(flyerObj, directionalOffsets["S"], units),
    E: (units, flyerObj) =>
      changeCoOrdinates(flyerObj, directionalOffsets["E"], units),
    W: (units, flyerObj) =>
      changeCoOrdinates(flyerObj, directionalOffsets["W"], units),
  };

  instrcutions[instrcution](threshold, flyerObj);
};

const calcManhattanDist = ({ x, y }) => Math.abs(x) + Math.abs(y);

const calculateDistance = (instrcutions) => {
  const flyerObj = {
    shipPos: { x: 0, y: 0 },
    wayPoint: { x: 10, y: 1 },
  };

  for (let i = 0; i < instrcutions.length; i++) {
    const [instrcuction, threshold] = [
      instrcutions[i].slice(0, 1),
      instrcutions[i].slice(1),
    ];
    execute(instrcuction, +threshold, flyerObj);
  }

  return calcManhattanDist(flyerObj.shipPos);
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
