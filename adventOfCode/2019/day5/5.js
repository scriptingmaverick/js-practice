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
const storeInput = (input, arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1)[0];
  arr[index] = input;
  result.pointerPos += 2;
};
const showData = (arr, modes, result) => {
  const index = applyModes(modes, arr, result.pointerPos, 1);
  console.log(arr[index]);
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

const sprint = (corruptedMemory) => {
  const rawMemory = corruptedMemory.split(",");
  const execute = {
    1: (result, memory, modes) => perform(add, memory, modes, result),
    2: (result, memory, modes) => perform(mul, memory, modes, result),
    3: (result, memory, modes) => storeInput(5, memory, modes, result),
    4: (result, memory, modes) => showData(memory, modes, result),
    5: (result, memory, modes) => jmp(isNotZero, memory, modes, result),
    6: (result, memory, modes) => jmp(isZero, memory, modes, result),
    7: (result, memory, modes) => algebra(isLessThan, memory, modes, result),
    8: (result, memory, modes) => algebra(areEqual, memory, modes, result),
    9: (result) => (result.canContinue = false),
  };

  const memory = rawMemory.map((x) => parseInt(x));

  const result = {
    pointerPos: 0,
    canContinue: true,
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.at(-1)](result, memory, modes);
  }

  console.log(memory);
  return memory[0];
};

const input = Deno.readTextFileSync("input.txt");

sprint(input);
// sprint('3,9,8,9,10,9,4,9,99,-1,8')
// sprint('3,9,7,9,10,9,4,9,99,-1,8')
// sprint('3,3,1108,-1,8,3,4,3,99')
// sprint('3,3,1107,-1,8,3,4,3,99')

// sprint('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99')
