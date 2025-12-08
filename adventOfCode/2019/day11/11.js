let relativeBase = 0;
const compass = {
  N: { 1: "E", 0: "W", offset: [0, 1] },
  E: { 1: "S", 0: "N", offset: [1, 0] },
  S: { 1: "W", 0: "E", offset: [0, -1] },
  W: { 1: "N", 0: "S", offset: [-1, 0] },
};
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

const outputs = [];
let outputIndex = 0;
const showData = (arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1)[0];
  result.pointerPos += 2;
  outputs[outputIndex++] = arr[index];
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
  input = 0,
  pointer = 0,
) => {
  const rawMemory = program.split(",");
  outputIndex = 0;
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
    console.log("memory -> ", memory);
    console.log("pointer -> ", result.pointerPos);
    console.log("o/p -> ", outputs);
    if (outputIndex === 2) {
      return { pointer: result.pointerPos, outputs, program: memory };
    }
  }

  return "halted";
};

const runRobot = (program) => {
  let [input, pointer] = [0, 0];
  let [lastKey, direction] = ["0,0", "N"];
  const paintedLocs = {};
  let result = intCode(program);
  while (typeof result === "object") {
    console.log("result -> ", result);
    pointer = result.pointer;
    const [color, turn] = result.outputs;
    paintedLocs[lastKey] = {
      color,
    };

    direction = compass[direction][turn];
    const offSet = compass[direction].offset;
    const [x, y] = lastKey.split(",").map((x) => +x);
    lastKey = `${x + offSet[0]},${y + offSet[1]}`;
    const object = paintedLocs[lastKey];
    input = object ? object.color : 0;
    console.log("painted locs -> ", paintedLocs);
    result = intCode(result.program.join(""), input, pointer);
  }

  return paintedLocs;
};

const input = Deno.readTextFileSync("input.txt");
// console.log(runRobot(input));
console.log(
  runRobot(
    "104,0,104,1,103,0,4,5,104,1,3,20,104,19,104,0,104,0,4,17,104,1,104,0,99",
  ),
);

// console.log(
//   runRobot(
//     "3,30,1008,30,0,31,1005,31,16,104,0,104,1,1105,1,0,104,1,104,0,1105,1,0,99",
//   ),
// );

// const input = Deno.readTextFileSync("input.txt");
// sprint(input);
