import { minBy, runningReduce } from "jsr:@std/collections";

const createLine = (x1, y1, xOffset, yOffset, type) => {
  return { type, x1, y1, x2: x1 + xOffset, y2: y1 + yOffset };
};

const lineCreators = {
  U: (x1, y1, distance) => createLine(x1, y1, 0, distance, "V"),
  D: (x1, y1, distance) => createLine(x1, y1, 0, -distance, "V"),
  L: (x1, y1, distance) => createLine(x1, y1, -distance, 0, "H"),
  R: (x1, y1, distance) => createLine(x1, y1, distance, 0, "H"),
};

const processInstruction = ({ x2, y2 }, instruction) => {
  const [_, direction, distanceStr] = instruction.match(/^(.)(\d+)/);
  const distance = parseInt(distanceStr);
  return lineCreators[direction](x2, y2, distance);
};

const parse = (input) => {
  const origin = { x2: 0, y2: 0, type: "H" };
  const lines = input.split("\n");
  return lines
    .map((x) => x.split(","))
    .map((l) => runningReduce(l, processInstruction, origin).slice(1));
};

const isBetween = (x, y, z) => x <= y && y <= z;
const isAbsBetween = (x, y, z) => isBetween(x, y, z) || isBetween(z, y, x);

const intersectionPoint = (horizontal, vertical) => {
  const isXBetween = isAbsBetween(horizontal.x1, vertical.x1, horizontal.x2);
  const isYBetween = isAbsBetween(vertical.y1, horizontal.y1, vertical.y2);
  return isXBetween && isYBetween ? [{ x: vertical.x1, y: horizontal.y1 }] : [];
};

const intersectionPoints = (wire1, wire2) =>
  wire1
    .filter((x) => x.type === "H")
    .flatMap((horizontal) => {
      return wire2
        .filter((x) => x.type === "V")
        .flatMap((vertical) => intersectionPoint(horizontal, vertical));
    });

const manhattanDistanceFromOrigin = ({ x, y }) => Math.abs(x) + Math.abs(y);
const isNotOrigin = ({ x, y }) => x !== 0 && y !== 0;

const wireIntersectionPoints = (wire1, wire2) => {
  const intersection1 = intersectionPoints(wire1, wire2);
  const intersection2 = intersectionPoints(wire2, wire1);
  return intersection1.concat(intersection2);
};

const part1 = (input) => {
  const [wire1, wire2] = parse(input);
  const points = wireIntersectionPoints(wire1, wire2);
  const withoutOrigin = points.filter(isNotOrigin);
  const closestPoint = minBy(withoutOrigin, manhattanDistanceFromOrigin);

  return manhattanDistanceFromOrigin(closestPoint);
};

const main = (input) => {
  console.log(part1(input));
};

const instruction = `R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
U98,R91,D20,R16,D67,R40,U7,R15,U6,R7`;

const data = Deno.readTextFileSync("input.txt");
main(data);
