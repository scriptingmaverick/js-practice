const initializeAmplifiers = (rawMemory, phase) => [{
  memory: rawMemory.slice(),
  result: 0,
  pointer: 0,
  inputs: [phase[0], 0],
  inputInd: 0,
}, {
  memory: rawMemory.slice(),
  result: 0,
  inputInd: 0,
  pointer: 0,
  inputs: [phase[1], 0],
}, {
  memory: rawMemory.slice(),
  result: 0,
  inputInd: 0,
  pointer: 0,
  inputs: [phase[2], 0],
}, {
  memory: rawMemory.slice(),
  result: 0,
  inputInd: 0,
  pointer: 0,
  inputs: [phase[3], 0],
}, {
  memory: rawMemory.slice(),
  inputInd: 0,
  result: 0,
  pointer: 0,
  inputs: [phase[4], 0],
}];

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
  arr[index] = result.inputs[result.inputInd++];
  result.pointerPos += 2;
};

const showData = (arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1);
  console.log("storing : ", arr[index]);
  result.storage[0] = arr[index];
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

export const sprint = (corruptedMemory, inputs, pointer = 0, inputInd) => {
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

  const result = {
    pointerPos: pointer,
    canContinue: true,
    inputs,
    storage: [],
    inputInd,
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.at(-1)](result, memory, modes);
    if (cmd.at(-1) === "4") {
      return [{
        result: +result.storage[0],
        pointer: +result.pointerPos,
        memory: memory.join(","),
        inputs,
        inputInd: 1,
      }, false];
    }
  }

  return [{
    result: +result.storage[0],
    pointer: +result.pointerPos,
    memory: memory.join(","),
    inputs,
    inputInd: 1,
  }, true];
};

const amplify = (rawMemory, phase) => {
  const amplifiers = initializeAmplifiers(rawMemory, phase);
  let i = 0;
  while (i < phase.length) {
    const prevObj = i > 0 ? amplifiers[i - 1] : amplifiers[4];
    const prevResult = isNaN(prevObj.result)
      ? prevObj.inputs[1]
      : prevObj.result;
    const result = sprint(
      amplifiers[i].memory,
      [+amplifiers[i].inputs[0], prevResult],
      amplifiers[i].pointer,
      amplifiers[i].inputInd,
    );
    amplifiers[i] = result[0];

    if (!result[1]) {
      i++;
      i = i % 5;
      continue;
    } else if (i === 4) break;
    i++;
  }

  return amplifiers.at(-1).inputs[1];
};

const amplifyCircuit = (rawMemory) => {
  const signals = Deno.readTextFileSync("permutations.txt").split("\n")
    .map((x) => x.split(""));
  const thrusterOutputs = [];
  for (let i = 0; i < signals.length; i++) {
    thrusterOutputs.push(amplify(rawMemory, signals[i]));
  }

  console.log(thrusterOutputs, Math.max(...thrusterOutputs));
};

const input = Deno.readTextFileSync("input.txt");
amplifyCircuit(input);

// amplifyCircuit(
//   "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10"
// );

// amplifyCircuit(
//   "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
// );

// console.log(
//   amplify(
//     "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
//     ["9", "8", "7", "6", "5"],
//   ),
// );

// console.log(
//   amplify(
//     "3,52,1001,52,-5,52,3,53,1,52,56,54,1007,54,5,55,1005,55,26,1001,54,-5,54,1105,1,12,1,53,54,53,1008,54,0,55,1001,55,1,55,2,53,55,53,4,53,1001,56,-1,56,1005,56,6,99,0,0,0,0,10",
//     ["9", "7", "8", "5", "6"],
//   ),
// );

// console.log(
//   sprint(
//     "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5",
//     [9, 0],
//     0,
//     0,
//   ),
// );
