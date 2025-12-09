const parsePositions = (rawPositions) => {
  const moons = rawPositions.split("\n").map((x) =>
    x.replace("<", "").replace(">", "").match(/=[^,]+/g).join(",").replaceAll(
      "=",
      "",
    ).split(",").map((y) => +y)
  );
  return moons;
};

const changeVelocities = (moon1, moon2, velocity1, velocity2) => {
  const newVelocities = [velocity1, velocity2];
  for (let i = 0; i <= 2; i++) {
    if (moon1[i] > moon2[i]) {
      newVelocities[0][i] -= 1;
      newVelocities[1][i] += 1;
      continue;
    } else if (moon1[i] === moon2[i]) continue;

    newVelocities[0][i] += 1;
    newVelocities[1][i] -= 1;
  }

  return newVelocities;
};

const addVelocity = (moon, velocity) => moon.map((pos, i) => pos + velocity[i]);
const sumOf = (arr) => arr.reduce((sum, ele) => sum + Math.abs(ele), 0);

const calculateTE = (positions, velocities) => {
  const result = [];
  for (let i = 0; i < positions.length; i++) {
    result.push(sumOf(positions[i]) * sumOf(velocities[i]));
  }

  return sumOf(result);
};

const rotateMoons = (initialPositions, steps = 1) => {
  const postitonsOfMoons = parsePositions(initialPositions);
  const velocities = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [
    0,
    0,
    0,
  ]];

  for (let i = 0; i < steps; i++) {
    for (let moon1 = 0; moon1 < postitonsOfMoons.length - 1; moon1++) {
      for (let moon2 = moon1 + 1; moon2 < postitonsOfMoons.length; moon2++) {
        const [a, b] = changeVelocities(
          postitonsOfMoons[moon1],
          postitonsOfMoons[moon2],
          velocities[moon1],
          velocities[moon2],
        );
        velocities[moon1] = a;
        velocities[moon2] = b;
      }
      postitonsOfMoons[moon1] = addVelocity(
        postitonsOfMoons[moon1],
        velocities[moon1],
      );
    }
    postitonsOfMoons[3] = addVelocity(
      postitonsOfMoons.at(-1),
      velocities.at(-1),
    );
  }

  return [postitonsOfMoons, velocities];
};

const totalEnegyInSystem = (initialPosition, steps) => {
  return calculateTE(...rotateMoons(initialPosition, steps));
};

const changeVelocityAt = (moon1Axis, moon2Axis, velocity1, velocity2) => {
  const newVelocities = [velocity1, velocity2];
  if (moon1Axis < moon2Axis) {
    newVelocities[0] += 1;
    newVelocities[1] -= 1;
    return newVelocities;
  } else if (moon1Axis === moon2Axis) return newVelocities;

  newVelocities[0] -= 1;
  newVelocities[1] += 1;
  return newVelocities;
};

const repetetionCountToRevertBack = (moonPositions, axis) => {
  const velocities = [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]];
  const initialPosition = `${moonPositions[0][axis]}0${
    moonPositions[1][axis]
  }0${moonPositions[2][axis]}0${moonPositions[3][axis]}0`;
  let iterations = 0;
  let newPosition = "";
  while (newPosition !== initialPosition) {
    newPosition = "";
    for (let i = 0; i < moonPositions.length - 1; i++) {
      for (let j = i + 1; j < moonPositions.length; j++) {
        const [a, b] = changeVelocityAt(
          moonPositions[i][axis],
          moonPositions[j][axis],
          velocities[i][axis],
          velocities[j][axis],
        );
        velocities[i][axis] = a;
        velocities[j][axis] = b;
      }
      moonPositions[i][axis] += velocities[i][axis];
      newPosition += `${moonPositions[i][axis]}${velocities[i][axis]}`;
    }
    moonPositions.at(-1)[axis] += velocities.at(-1)[axis];
    newPosition += `${moonPositions.at(-1)[axis]}${velocities.at(-1)[axis]}`;
    iterations++;
  }

  return iterations;
};

const lcm = (a, b) => {
  let lcmValue = 0;
  if (a !== 0 && b !== 0) {
    let multipleOfA = a;
    let multipleOfB = b;

    while (multipleOfA !== multipleOfB) {
      if (multipleOfA > multipleOfB) {
        multipleOfB += b;
      } else {
        multipleOfA += a;
      }
    }
    lcmValue = multipleOfA;
  }

  return lcmValue;
};

const part2 = (initialPosition) => {
  const postitonsOfMoons = parsePositions(initialPosition);
  const tx = repetetionCountToRevertBack(postitonsOfMoons, 0);
  const ty = repetetionCountToRevertBack(postitonsOfMoons, 1);
  const tz = repetetionCountToRevertBack(postitonsOfMoons, 2);

  return lcm(lcm(tx, ty), tz);
};

const example1 = `<x=-1, y=0, z=2>
<x=2, y=-10, z=-7>
<x=4, y=-8, z=8>
<x=3, y=5, z=-1>`;

const example2 = `<x=-8, y=-10, z=0>
<x=5, y=5, z=10>
<x=2, y=-7, z=3>
<x=9, y=-8, z=-3>`;

const input = Deno.readTextFileSync("input.txt");

// console.log(totalEnegyInSystem(input, 1000));

console.log(part2(input));
