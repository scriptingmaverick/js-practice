const compass = {
  N: { 1: "E", 0: "W", offset: [0, 1] },
  E: { 1: "S", 0: "N", offset: [1, 0] },
  S: { 1: "W", 0: "E", offset: [0, -1] },
  W: { 1: "N", 0: "S", offset: [-1, 0] },
};

const outputs = [];
const grid = [];
let outputIndex = 0;
let relativeBase = 0;

const applyModes = (modes, arr, pointer, threshold) => {
  const indices = [];
  for (let i = 1; i <= threshold; i++) {
    switch (+modes[i - 1]) {
      case 0:
        indices.push(arr[pointer + i]);
        break;
      case 1:
        indices.push(pointer + i);
        break;
      case 2:
        indices.push(relativeBase + arr[pointer + i]);
        break;
    }
  }
  for (let i = 0; i < indices.length; i++) {
    if (!arr[indices[i]]) arr[indices[i]] = 0;
  }
  return indices;
};

const add = (addend, augend) => addend + augend;

const mul = (multiplier, multiplicand) => multiplier * multiplicand;

const isZero = (value) => value === 0;

const isNotZero = (value) => !isZero(value);

const areEqual = (number1, number2) => number1 === number2;

const isLessThan = (number1, number2) => number1 < number2;

const storeInput = (input, arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1)[0];
  arr[index] = input;
  result.pointerPos += 2;
};

const showData = (arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1)[0];
  outputs[outputIndex++] = arr[index];
  result.pointerPos += 2;
};

const jmp = (func, memory, modes, result) => {
  const indices = applyModes(modes, memory, result.pointerPos, 2);
  result.pointerPos = func(memory[indices[0]])
    ? memory[indices[1]]
    : result.pointerPos + 3;
};

const algebra = (func, arr, modes, result) => {
  const indices = applyModes(modes, arr, result.pointerPos, 3);
  arr[indices[2]] = func(arr[indices[0]], arr[indices[1]]) ? 1 : 0;
  result.pointerPos += 4;
};

const perform = (func, memory, modes, result) => {
  const indices = applyModes(modes, memory, result.pointerPos, 3);
  memory[indices[2]] = func(memory[indices[0]], memory[indices[1]]);
  result.pointerPos += 4;
};

const changeBase = (result, memory, modes) => {
  const index = applyModes(modes, memory, result.pointerPos, 1)[0];
  relativeBase = relativeBase + memory[index];
  result.pointerPos += 2;
};

export const intCode = (
  program,
  input = 1,
  pointer = 0,
  opIndex = 0,
) => {
  const rawMemory = program.split(",");
  outputIndex = opIndex;
  const execute = {
    "01": (result, memory, modes) => perform(add, memory, modes, result),
    "02": (result, memory, modes) => perform(mul, memory, modes, result),
    "03": (result, memory, modes) => storeInput(input, memory, modes, result),
    "04": (result, memory, modes) => showData(memory, modes, result),
    "05": (result, memory, modes) => jmp(isNotZero, memory, modes, result),
    "06": (result, memory, modes) => jmp(isZero, memory, modes, result),
    "07": (result, memory, modes) => algebra(isLessThan, memory, modes, result),
    "08": (result, memory, modes) => algebra(areEqual, memory, modes, result),
    "09": (result, memory, modes) => changeBase(result, memory, modes),
    "99": (result) => (result.canContinue = false),
  };

  const memory = rawMemory.map((x) => parseInt(x));

  const result = {
    pointerPos: pointer,
    canContinue: true,
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.slice(3, 5)](result, memory, modes);
    if (outputIndex === 2) {
      console.log(result.pointerPos, outputs);
      return { pointer: result.pointerPos, outputs };
    }
  }

  return "halted";
};

const moveRobot = ([color, turn], path, lastKey) => {
  const [x, y] = lastKey.split(",").map((x) => +x);
  const direction = path[lastKey].facing;
  const newDirection = compass[direction][turn];
  const offset = compass[direction].offset;
  const newKey = `${x + offset[0]},${y + offset[1]}`;
  const lastStepCount = path[lastKey].steps;
  path[newKey] = { steps: lastStepCount + 1, facing: newDirection };
  return newKey;
};

const runRobot = (program) => {
  let input = 0;
  let pointer = 0;
  let result = intCode(program, input, pointer, 0);
  let lastPostion = "0,0";
  const roboPath = { "0,0": { steps: "1", facing: "N" } };
  while (result !== "halted") {
    pointer = result.pointer;
    input = result.outputs[0];
    lastPostion = moveRobot(result.outputs, roboPath, lastPostion);
    result = intCode(program, input, pointer, 0);
    console.log(roboPath);
  }

  return roboPath;
};

console.log(
  runRobot(
    "3,30,1008,30,0,31,1005,31,16,104,0,104,1,1105,1,0,104,1,104,0,1105,1,0,99",
  ),
);

// const input = Deno.readTextFileSync("input.txt");
// sprint(input);
