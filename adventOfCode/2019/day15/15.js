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
  result.output = memory[index];
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
    output: 0,
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.slice(3)](result, memory, modes);
    if (cmd.slice(3) === "04") {
      return {
        output: result.output,
        program: memory.join(","),
        pointer: result.pointerPos,
      };
    }
  }

  return "halted";
};

const distance = {
  0: [0, 1],
  1: [1, 0],
  2: [0, -1],
  3: [-1, 0],
};

const recognizePath = (parents, targetKey) => {
  const path = [];
  while (targetKey !== null) {
    path.push(targetKey);
    targetKey = parents[targetKey];
  }
  return path.reverse();
};

const findMinPath = (memory, start) => {
  const parents = {};
  parents[start] = null;
  const queue = [start];
  let targetKey = null;
  const visitedNodes = {};
  visitedNodes[start] = true;
  while (queue.length > 0) {
    const key = queue.shift();
    const [keyX, keyY] = key.split(",");
    if (grid[+keyX][+keyY] === "2") {
      targetKey = key;
      break;
    }
    const lastQueue = queue.slice()
    let direction = 0;
    while (direction <= 3) {
      const result = sprint(memory, pointer, direction);
      if (result.output === 0) continue;
      const [x, y] = distance[direction++];
      const [newX, newY] = [+keyX + +x, +keyY + +y];
      const newKey = `${newX},${newY}`;
      if (newKey in visitedNodes) continue;
      visitedNodes[newKey] = true;
      queue.push(newKey);
      parents[newKey] = key;
    }

    if (lastQueue.length === queue.length) {
      
    }
  }
  return recognizePath(parents, targetKey);
};

findMinPath(memory, "0,0");
