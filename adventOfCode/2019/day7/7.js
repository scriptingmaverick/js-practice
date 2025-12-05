let inputsIndex = 0;
const applyModes = (modes, arr, pointer, threshold) => {
  const indices = [];
  for (let i = 1; i <= threshold; i++) {
    indices.push(+modes[i - 1] === 0 ? arr[pointer + i] : pointer + i);
  }
  return indices;
};

const add = (addend, augend) => addend + augend;

const mul = (multiplier, multiplicand) => multiplier * multiplicand;

const isZero = (value) => value === 0;

const isNotZero = (value) => !isZero(value);

const areEqual = (number1, number2) => number1 === number2;

const isLessThan = (number1, number2) => number1 < number2;

const storeInput = (arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1)[0];
  arr[index] = result.inputs[inputsIndex++];
  result.pointerPos += 2;
};

const showData = (arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1);
  result.storage = arr[index];
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

export const sprint = (corruptedMemory, inputs) => {
  const storage = [];
  const rawMemory = corruptedMemory.split(",");
  const execute = {
    1: (result, memory, modes) => perform(add, memory, modes, result),
    2: (result, memory, modes) => perform(mul, memory, modes, result),
    3: (result, memory, modes) => storeInput(memory, modes, result),
    4: (result, memory, modes) => showData(memory, modes, result),
    5: (result, memory, modes) => jmp(isNotZero, memory, modes, result),
    6: (result, memory, modes) => jmp(isZero, memory, modes, result),
    7: (result, memory, modes) => algebra(isLessThan, memory, modes, result),
    8: (result, memory, modes) => algebra(areEqual, memory, modes, result),
    9: (result) => (result.canContinue = false),
  };

  const memory = rawMemory.map((x) => parseInt(x));

  // console.log("mem : ", memory, "\ninp :", inputs, "\nstorage : ", storage);
  const result = {
    pointerPos: 0,
    canContinue: true,
    inputs,
    storage,
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.at(-1)](result, memory, modes);
  }
  inputsIndex = 0;
  return result.storage;
};

const amplify = (memory, signal, prevResult) => {
  for (let i = 0; i < signal.length; i++) {
    const mem = memory.slice();
    const inputs = [+signal[i], prevResult];
    prevResult = sprint(mem, inputs);
  }

  return prevResult;
};

const ampliyCircuit = (rawMemory) => {
  const signals = Deno.readTextFileSync("permutations.txt").split("\n")
    .map((x) => x.split(""));
  const thrusterOutputs = [];
  for (let i = 0; i < signals.length; i++) {
    thrusterOutputs.push(amplify(rawMemory, signals[i], 0));
  }

  console.log(thrusterOutputs, Math.max(...thrusterOutputs));
};

const input = Deno.readTextFileSync("input.txt");
// console.log(input )
ampliyCircuit(input);

// ampliyCircuit(
//   "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
// );

// ampliyCircuit(
//   "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
// );

// ampliyCircuit(
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
// );

// console.log(amplify(
//   "3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0",
//   ["0", "1", "2", "3", "4"],
//   0,
// ));

// console.log(amplify(
//   "3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0",
//   ["4", "3", "2", "1", "0"],
//   0,
// ));

// console.log(amplify(
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
//   ["1", "0", "4", "3", "2"],
//   0,
// ));
