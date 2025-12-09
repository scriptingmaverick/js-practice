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
  result.outputs.push(arr[index]);
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

export const sprint = (corruptedMemory, pointer = 0, input = 0) => {
  const rawMemory = corruptedMemory.split(",");
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
    outputs: [],
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.slice(3, 5)](result, memory, modes);
    if (result.outputs.length === 3) {
      return {
        outputs: result.outputs,
        program: memory.join(","),
        pointer: result.pointerPos,
      };
    }
  }

  return "halted";
};

const createGameField = (program) => {
  let pointer = 0;
  let result = sprint(program);
  const gameField = {};
  while (result !== "halted") {
    const [x, y, tileId] = result.outputs;
    const key = `${x},${y}`;
    gameField[key] = tileId;
    pointer = result.pointer;
    const newProgram = result.program.split(",").map((x) => +x || 0).join(",");
    result = sprint(newProgram, pointer);
  }

  return Object.values(gameField).filter((x) => x === 2).length;
};

const runGame = (program) => {
  const quarteredProgram = "2" + program.slice(1);
  let pointer = 0;
  let result = sprint(quarteredProgram);
  const gameField = {};
  let score = 0;
  let input = 0;
  const ballPos = { x: 0, y: 0 };
  const paddlePos = { x: 0, y: 0 };
  while (result !== "halted") {
    const [x, y, tileId] = result.outputs;
    const key = `${x},${y}`;

    if (key === "-1,0") score = tileId;
    else gameField[key] = tileId;

    if (tileId === 4) {
      ballPos.x = x;
      ballPos.y = y;
    } else if (tileId === 3) {
      paddlePos.x = x;
      paddlePos.y = y;
    }

    pointer = result.pointer;
    const newProgram = result.program.split(",").map((x) => +x || 0).join(",");

    if (paddlePos.x < ballPos.x) input = 1;
    else if (paddlePos.x === ballPos.x) input = 0;
    else input = -1;

    result = sprint(newProgram, pointer, input);
  }

  return score;
};

const input = Deno.readTextFileSync("input.txt");
const example = "104,1,104,2,104,2,104,3,104,0,104,4,104,5,104,5,104,2,99";

// console.log(createGameField(example));

const example2 =
  "104,-1,104,0,104,5,3,100,1001,100,0,100,104,2,104,3,104,3,104,4,104,3,104,4,104,-1,104,0,104,7,99";
console.log(runGame(input));
