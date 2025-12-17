let relativeBase = 0;
const applyModes = (modes, memory, pointer, threshold) => {
  const indices = [];
  const modeIndex = {
    0: (i) => memory[pointer + i],
    1: (i) => pointer + i,
    2: (i) => relativeBase + memory[pointer + i],
  };
  for (let i = 1; i <= threshold; i++) {
    indices.push(modeIndex[modes[i - 1]](i));
  }
  for (let i = 0; i < indices.length; i++) {
    if (!memory[indices[i]]) memory[indices[i]] = 0;
  }
  return indices;
};

const add = (addend, augend) => addend + augend;
const mul = (multiplier, multiplicand) => multiplier * multiplicand;
const isZero = (value) => value === 0;
const isNotZero = (value) => !isZero(value);
const areEqual = (number1, number2) => number1 === number2;
const isLessThan = (number1, number2) => number1 < number2;

const storeInput = (input, result, memory, modes) => {
  const index = applyModes(modes, memory, result.pointerPos, 1)[0];
  memory[index] = input;
  result.pointerPos += 2;
};
const showData = (result, memory, modes) => {
  const index = applyModes(modes, memory, result.pointerPos, 1)[0];
  result.outputs.push(memory[index]);
  result.pointerPos += 2;
};
const jmp = (func, result, memory, modes) => {
  const indices = applyModes(modes, memory, result.pointerPos, 2);
  result.pointerPos = func(memory[indices[0]])
    ? memory[indices[1]]
    : result.pointerPos + 3;
};
const algebra = (func, result, memory, modes) => {
  const indices = applyModes(modes, memory, result.pointerPos, 3);
  memory[indices[2]] = func(memory[indices[0]], memory[indices[1]]) ? 1 : 0;
  result.pointerPos += 4;
};

const perform = (func, result, memory, modes) => {
  const indices = applyModes(modes, memory, result.pointerPos, 3);
  memory[indices[2]] = func(memory[indices[0]], memory[indices[1]]);
  result.pointerPos += 4;
};

const changeBase = (result, memory, modes) => {
  const index = applyModes(modes, memory, result.pointerPos, 1)[0];
  relativeBase = relativeBase + memory[index];
  result.pointerPos += 2;
};

export const sprint = (corruptedMemory, pointer = 0, input = 0) => {
  const rawMemory = corruptedMemory.split(",");
  const execute = {
    "01": perform.bind(null, add),
    "02": perform.bind(null, mul),
    "03": storeInput.bind(null, input),
    "04": showData,
    "05": jmp.bind(null, isNotZero),
    "06": jmp.bind(null, isZero),
    "07": algebra.bind(null, isLessThan),
    "08": algebra.bind(null, areEqual),
    "09": changeBase,
    99: (result) => (result.canContinue = false),
  };

  const memory = rawMemory.map((x) => parseInt(x));

  const result = {
    pointerPos: pointer,
    canContinue: true,
    outputs: [],
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.slice(3, 5)](result, memory, modes);
    // if (result.outputs.length === 3) {
    //   return {
    //     outputs: result.outputs,
    //     program: memory.join(","),
    //     pointer: result.pointerPos,
    //   };
    // }
  }

  // return "halted";
  return ["halted", result.outputs];
};

const directions = {
  0: [0, 1],
  1: [0, -1],
  2: [1, 0],
  3: [-1, 0],
};

const getObectsInTheField = (program) => sprint(program)[1];

const visualize = (program) => {
  const grid = getObectsInTheField(program);
  console.log(grid);
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

const areNotInRange = (x, y, field) =>
  x <= 0 || y <= 0 || x >= field.length - 1 || y >= field[0].length - 1;

const isAnIntersection = (pos, field) => {
  let i = 0;
  while (i < 4) {
    const [x, y] = directions[i];
    const [starX, starY] = pos;
    const [posX, posY] = [starX + x, starY + y];
    if (areNotInRange(posX, posY, field)) break;
    if (field[posX][posY] !== "35") break;
    i++;
  }

  return i === 4;
};

const findInterSections = (program) => {
  const rawField = getObectsInTheField(program);
  const field = rawField.join(",").split("10").map((x) =>
    x.split(",").filter((x) => x.trim() !== "")
  );

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

const ex1 = [
  "46",
  "46",
  "35",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "10",
  "46",
  "46",
  "35",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "46",
  "10",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "46",
  "46",
  "46",
  "35",
  "35",
  "35",
  "10",
  "35",
  "46",
  "35",
  "46",
  "46",
  "46",
  "35",
  "46",
  "46",
  "46",
  "35",
  "46",
  "35",
  "10",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "35",
  "10",
  "46",
  "46",
  "35",
  "46",
  "46",
  "46",
  "35",
  "46",
  "46",
  "46",
  "35",
  "46",
  "46",
  "10",
  "46",
  "46",
  "35",
  "35",
  "35",
  "35",
  "35",
  "46",
  "46",
  "46",
  "94",
  "46",
  "46",
  "10",
];

const input = Deno.readTextFileSync("input.txt");
// console.log(visualize(input));
console.log(findInterSections(input));
