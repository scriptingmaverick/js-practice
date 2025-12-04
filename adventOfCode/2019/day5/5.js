let indexOfInput = 0;
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
const storeInput = (inputs, arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1)[0];
  arr[index] = inputs[indexOfInput++];
  result.pointerPos += 2;
};
const showData = (arr, modes, result, storage) => {
  const index = applyModes(modes, arr, result.pointerPos, 1);
  if (typeof storage === "object") {
    storage[0] = arr[index];
  } else {
    console.log(arr[index]);
  }
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

export const sprint = (corruptedMemory, inputs = [5], storage = 0) => {
  const rawMemory = corruptedMemory.split(",");
  const execute = {
    1: (result, memory, modes) => perform(add, memory, modes, result),
    2: (result, memory, modes) => perform(mul, memory, modes, result),
    3: (result, memory, modes) => storeInput(inputs, memory, modes, result),
    4: (result, memory, modes, storage) =>
      showData(memory, modes, result, storage),
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
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.at(-1)](result, memory, modes, storage);
  }

  indexOfInput = 0;
  // console.log("mem : ", memory, "\ninp :", inputs, "\nstorage : ", storage);
  return storage[0];
};

const input = Deno.readTextFileSync("input.txt");
// sprint(input);

// sprint('3,9,8,9,10,9,4,9,99,-1,8')
// sprint('3,9,7,9,10,9,4,9,99,-1,8')
// sprint('3,3,1108,-1,8,3,4,3,99')
// sprint('3,3,1107,-1,8,3,4,3,99')
// sprint('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')

// const r1 = [];
// sprint(
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
//   [1, 0],
//   r1,
// );
// console.log('r1 : ',r1)
// sprint(
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
//   [0, r1[0]],
//   r1,
// );
// console.log('r1 : ',r1)
// sprint(
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
//   [4, r1[0]],
//   r1,
// );
// console.log('r1 : ',r1)
// sprint(
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
//   [3, r1[0]],
//   r1,
// );
// console.log('r1 : ',r1)
// // console.log('r1 : ',r1)
// sprint(
//   "3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0",
//   [2, r1[0]],
//   r1,
// );

// console.log('r1 : ',r1);
