// The gravity assist was successful, and you're well on your way to the Venus refuelling station. During the rush back on Earth, the fuel management system wasn't completely installed, so that's next on the priority list.
// Opening the front panel reveals a jumble of wires. Specifically, two wires are connected to a central port and extend outward on a grid. You trace the path each wire takes as it leaves the central port, one wire per line of text (your puzzle input).
// The wires twist and turn, but the two wires occasionally cross paths. To fix the circuit, you need to find the intersection point closest to the central port. Because the wires are on a grid, use the Manhattan distance for this measurement. While the wires do technically cross right at the central port where they both start, this point does not count, nor does a wire count as crossing with itself.
// For example, if the first wire's path is R8,U5,L5,D3, then starting from the central port (o), it goes right 8, up 5, left 5, and finally down 3:
// ...........
// ...........
// ...........
// ....+----+.
// ....|....|.
// ....|....|.
// ....|....|.
// .........|.
// .o-------+.
// ...........
// Then, if the second wire's path is U7,R6,D4,L4, it goes up 7, right 6, down 4, and left 4:
// ...........
// .+-----+...
// .|.....|...
// .|..+--X-+.
// .|..|..|.|.
// .|.-X--+.|.
// .|..|....|.
// .|.......|.
// .o-------+.
// ...........
// These wires cross at two locations (marked X), but the lower-left one is closer to the central port: its distance is 3 + 3 = 6.
// Here are a few more examples:
// R75,D30,R83,U83,L12,D49,R71,U7,L72
// U62,R66,U55,R34,D71,R55,D58,R83 = distance 159
// R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51
// U98,R91,D20,R16,D67,R40,U7,R15,U6,R7 = distance 135
// What is the Manhattan distance from the central port to the closest intersection?
const repeat = (char, length) => char.repeat(length);

const destruct = (direction) =>
  repeat(direction.slice(0, 1), direction.slice(1));

const getPath = (wire) => {
  const path = wire.map(destruct).join("").split("");
  const offSets = {
    "U": { x: 0, y: 1 },
    "R": { x: 1, y: 0 },
    "L": { x: -1, y: 0 },
    "D": { x: 0, y: -1 },
  };
  const firstValue = offSets[path[0]];
  const firstPoint = `${firstValue.x},${firstValue.y}`;
  const result = {};
  result[firstPoint] = 1;
  const pathPoints = path.slice(1).reduce(({ result, lastKey }, direction) => {
    const input = lastKey.split(",");
    const points = { x: +input[0], y: +input[1] };
    const offSet = offSets[direction];
    const newKey = `${points.x + offSet.x},${points.y + offSet.y}`;
    const lastStep = result[lastKey];
    result[newKey] = lastStep + 1;
    return { result, lastKey: newKey };
  }, { result, lastKey: firstPoint });

  return pathPoints.result;
};

const getIntersections = (rawSequence) => {
  const [wire1, wire2] = rawSequence.split("\n");
  const [wire1Path, wire2Path] = [
    getPath(wire1.split(",")),
    getPath(wire2.split(",")),
  ];

  const intersections = [];
  for (const key in wire1Path) {
    if (key in wire2Path) {
      const points = key.split(",");
      intersections.push({
        value: points,
        steps: wire1Path[key] + wire2Path[key],
        addition: +points[0] + +points[1],
        manhattanDistance: Math.abs(+points[0]) + Math.abs(+points[1]),
      });
    }
  }
  return intersections;
};

const part_1 = (
  rawSequence,
  key = "manhattanDistance",
  result = "addition",
) => {
  const intersections = getIntersections(rawSequence);
  const thresholds = intersections.map((point) => point[key]);
  const min = Math.min(...thresholds);
  return intersections.filter((point) => point[key] === min)[0][result];
};

const input = Deno.readTextFileSync("input.txt");

console.log(part_1(input));

const part_2 = (rawSequence) => {
  return part_1(rawSequence, "steps", "steps");
};

console.log(part_2(input))
// console.log(part_2("R8,U5,L5,D3\nU7,R6,D4,L4"));
