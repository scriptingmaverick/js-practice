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
  // result.outputs.push(String.fromCharCode(memory[index]));
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

  // return result.outputs.join("");
  return result.outputs.at(-1);
};

const format = (sequence) => sequence.split("").flatMap((x) => x.charCodeAt(0));

const runRoutines = (program) => {
  const sequences = `NOT A J
NOT B T
OR T J
NOT C T
OR T J
AND D J
AND E T
OR H T
AND T J
RUN
`;

  const routines = format(sequences);
  const result = sprint(program, routines);
  console.log(result);
};

const input = Deno.readTextFileSync("input.txt");
// console.log(visualize(input));
// console.log(findInterSections(input));
// console.log(getRouteMap(input));

runRoutines(input);
