const applyModes = (modes, memory, result, threshold) => {
  const indices = [];
  const modeIndex = {
    0: (i) => memory[result.pointerPos + i],
    1: (i) => result.pointerPos + i,
    2: (i) => result.rb + memory[result.pointerPos + i],
  };
  for (let i = 1; i <= threshold; i++) {
    indices.push(modeIndex[modes[i - 1]](i));
  }
  for (let i = 0; i < indices.length; i++) {
    if (memory[indices[i]] === undefined) memory[indices[i]] = 0;
  }
  return indices;
};

const add = (addend, augend) => addend + augend;
const mul = (multiplier, multiplicand) => multiplier * multiplicand;
const isZero = (value) => value === 0;
const isNotZero = (value) => !isZero(value);
const areEqual = (number1, number2) => number1 === number2;
const isLessThan = (number1, number2) => number1 < number2;

const storeInput = (result, memory, modes) => {
  const index = applyModes(modes, memory, result, 1)[0];
  memory[index] = result.inputs[result.index++];
  result.pointerPos += 2;
};
const showData = (result, memory, modes) => {
  const index = applyModes(modes, memory, result, 1)[0];
  result.outputs.push(memory[index]);
  result.pointerPos += 2;
};
const jmp = (func, result, memory, modes) => {
  const indices = applyModes(modes, memory, result, 2);
  result.pointerPos = func(memory[indices[0]])
    ? memory[indices[1]]
    : result.pointerPos + 3;
};
const algebra = (func, result, memory, modes) => {
  const indices = applyModes(modes, memory, result, 3);
  memory[indices[2]] = func(memory[indices[0]], memory[indices[1]]) ? 1 : 0;
  result.pointerPos += 4;
};

const perform = (func, result, memory, modes) => {
  const indices = applyModes(modes, memory, result, 3);
  memory[indices[2]] = func(memory[indices[0]], memory[indices[1]]);
  result.pointerPos += 4;
};

const changeBase = (result, memory, modes) => {
  const index = applyModes(modes, memory, result, 1)[0];
  result.rb = result.rb + memory[index];
  result.pointerPos += 2;
};

export const sprint = (corruptedMemory, inputs, pointer = 0) => {
  const rawMemory = corruptedMemory.split(",");
  const execute = {
    "01": perform.bind(null, add),
    "02": perform.bind(null, mul),
    "03": storeInput,
    "04": showData,
    "05": jmp.bind(null, isNotZero),
    "06": jmp.bind(null, isZero),
    "07": algebra.bind(null, isLessThan),
    "08": algebra.bind(null, areEqual),
    "09": changeBase,
    "99": (result) => (result.canContinue = false),
  };

  const memory = rawMemory.map((x) => parseInt(x));
  memory[0] = 2;

  const result = {
    pointerPos: pointer,
    canContinue: true,
    index: 0,
    inputs,
    outputs: [],
    rb: 0,
  };

  while (result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    const opCode = cmd.slice(3);
    execute[opCode](result, memory, modes);
  }

  return result.outputs.at(-1);
};

const getObectsInTheField = (program) => sprint(program)[1];

const visualize = (program) => {
  const grid = getObectsInTheField(program.replace("2", "1"));
  const rows = [];
  let row = [];
  const objects = {
    35: "#",
    46: ".",
    10: "\n",
    94: "^",
  };

  for (let i = 0; i < grid.length; i++) {
    if (grid[i] === 10) {
      rows.push(row);
      row = [];
      continue;
    }
    row.push(objects[grid[i]]);
  }

  return rows.map((x) => x.join("")).join("\n");
};

const areInRange = ([x, y], field) =>
  x <= 0 || y <= 0 || x >= field.length - 1 || y >= field[0].length - 1;

const isAnIntersection = (pos, field) => {
  let i = 0;
  const directions = {
    0: [0, 1],
    1: [0, -1],
    2: [1, 0],
    3: [-1, 0],
  };
  while (i < 4) {
    const [x, y] = directions[i];
    const [starX, starY] = pos;
    const pos = [starX + x, starY + y];
    if (!areInRange(pos, field)) break;
    if (field[posX][posY] !== "35") break;
    i++;
  }

  return i === 4;
};

const parse = (rawField) =>
  rawField.join(",").split("10").map((x) =>
    x.split(",").filter((x) => x.trim() !== "")
  );

const findInterSections = (program) => {
  const field = parse(getObectsInTheField(program));
  const intersections = [];
  const rows = field.length - 2;
  const cols = field[0].length;
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (field[i][j] === "35" && isAnIntersection([i, j], field)) {
        intersections.push([i, j]);
      }
    }
  }

  return intersections.reduce((sum, pos) => sum + pos[0] * pos[1], 0);
};

const getRobot = (field) => {
  const robo = { path: [] };
  let isPosFound = false;
  for (let i = 0; i < field.length && !isPosFound; i++) {
    for (let j = 0; j < field[0].length; j++) {
      if (field[i][j] === "94") {
        isPosFound = true;
        robo.pos = [j, i];
        robo.direction = "N";
        break;
      }
    }
  }

  return robo;
};

const directions = {
  "N": { L: "W", R: "E", offset: [0, -1] },
  "S": { L: "E", R: "W", offset: [0, 1] },
  "E": { L: "N", R: "S", offset: [1, 0] },
  "W": { L: "S", R: "N", offset: [-1, 0] },
};

const isInPath = ([x, y], field) => field[y][x] === "35";

const rotate = (robo, field) => {
  const left = directions[robo.direction]["L"];
  const right = directions[robo.direction]["R"];
  const [lx, ly] = directions[left]["offset"];
  const [x, y] = robo.pos;
  const leftPos = [x + lx, y + ly];
  const [rx, ry] = directions[right]["offset"];
  const rightPos = [x + rx, y + ry];

  if (isInPath(leftPos, field)) {
    robo.pos = leftPos;
    robo.direction = left;
    robo.path.push("L");
    robo.path.push(1);
    return false;
  } else if (isInPath(rightPos, field)) {
    robo.pos = rightPos;
    robo.direction = right;
    robo.path.push("R");
    robo.path.push(1);
    return false;
  }
  return true;
};

const isNotInRange = ([x, y], field) =>
  x < 0 || y < 0 || x > field[0].length - 1 || y > field.length - 1;

const getRouteMap = (program) => {
  const field = parse(getObectsInTheField(program.replace("2", "1")));
  const robo = getRobot(field);
  let isEnd = false;
  while (!isEnd) {
    const [offSetX, offSetY] = directions[robo.direction]["offset"];
    const [x, y] = robo.pos;
    const newPos = [offSetX + x, offSetY + y];
    if (isNotInRange(newPos, field) || !isInPath(newPos, field)) {
      isEnd = rotate(robo, field);
      continue;
    }

    robo.pos = newPos;
    robo.path[robo.path.length - 1] = (robo.path.at(-1) || 0) + 1;
  }

  return robo.path.join(",");
};

const format = (sequence) => sequence.split("").flatMap((x) => x.charCodeAt(0));

const runRoutines = (program) => {
  const sequences = "A,B,A,C,A,C,B,C,C,B\n" +
    "L,4,L,4,L,10,R,4\n" +
    "R,4,L,4,L,4,R,8,R,10\n" +
    "R,4,L,10,R,10\n" + "n\n";

  const routines = format(sequences);
  const result = sprint(program, routines);
  console.log(result);
};

const input = Deno.readTextFileSync("input.txt");
// console.log(visualize(input));
// console.log(findInterSections(input));
// console.log(getRouteMap(input));

runRoutines(input);
