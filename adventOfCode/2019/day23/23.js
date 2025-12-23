const applyModes = (modes, program, result, threshold) => {
  const indices = [];
  const modeIndex = {
    0: (i) => program[result.pointerPos + i],
    1: (i) => result.pointerPos + i,
    2: (i) => result.rb + program[result.pointerPos + i],
  };
  for (let i = 1; i <= threshold; i++) {
    indices.push(modeIndex[modes[i - 1]](i));
  }
  for (let i = 0; i < indices.length; i++) {
    if (program[indices[i]] === undefined) program[indices[i]] = 0;
  }
  return indices;
};

const add = (addend, augend) => addend + augend;
const mul = (multiplier, multiplicand) => multiplier * multiplicand;
const isZero = (value) => value === 0;
const isNotZero = (value) => !isZero(value);
const areEqual = (number1, number2) => number1 === number2;
const isLessThan = (number1, number2) => number1 < number2;

const storeInput = (result, program, modes) => {
  const index = applyModes(modes, program, result, 1)[0];
  if (result.inputs.length > 0) {
    program[index] = result.inputs.shift();
  } else {
    program[index] = -1;
    result.isIdle = true;
  }

  result.pointerPos += 2;
};

const showData = (result, program, modes) => {
  const index = applyModes(modes, program, result, 1)[0];
  result.outputs.push(program[index]);
  result.pointerPos += 2;
};

const jmp = (func, result, program, modes) => {
  const indices = applyModes(modes, program, result, 2);
  result.pointerPos = func(program[indices[0]])
    ? program[indices[1]]
    : result.pointerPos + 3;
};

const algebra = (func, result, program, modes) => {
  const indices = applyModes(modes, program, result, 3);
  program[indices[2]] = func(program[indices[0]], program[indices[1]]) ? 1 : 0;
  result.pointerPos += 4;
};

const perform = (func, result, program, modes) => {
  const indices = applyModes(modes, program, result, 3);
  program[indices[2]] = func(program[indices[0]], program[indices[1]]);
  result.pointerPos += 4;
};

const changeBase = (result, program, modes) => {
  const index = applyModes(modes, program, result, 1)[0];
  result.rb = result.rb + program[index];
  result.pointerPos += 2;
};

export const sprint = (program, inputs, outputs, pointer = 0, rb = 0) => {
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
    "99": (result) => (result.isHalted = true),
  };

  const result = {
    pointerPos: pointer,
    isHalted: false,
    inputs,
    outputs,
    rb,
    isIdle: false,
  };

  while (!result.isHalted) {
    const cmd = program[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    const opCode = cmd.slice(3);
    if (opCode.at(-1) === "3" && result.isIdle) {
      return {
        pointer: result.pointerPos,
        program,
        rb,
        inputs,
        outputs: result.outputs,
        isIdle: true,
      };
    }

    execute[opCode](result, program, modes);
  }

  return "halted";
};

const input = Deno.readTextFileSync("input.txt");

const iniatializeComputers = (size, program) => {
  const computers = [];
  for (let i = 0; i < size; i++) {
    computers[i] = {
      inputs: [i],
      program: program.split(",").map((x) => parseInt(x)),
      outputs: [],
      rb: 0,
      pointer: 0,
    };
  }

  return computers;
};

const runNetwork = (program, networkSize = 50) => {
  const computers = iniatializeComputers(networkSize, program);
  let lastNatX = null;
  let lastNatY = null;
  let lastYSentToZero = null;
  while (true) {
    let globalIdle = true;
    for (let currentIndex = 0; currentIndex < networkSize; currentIndex++) {
      const comp = computers[currentIndex];

      if (comp.inputs.length > 0) globalIdle = false;
      const result = sprint(
        comp.program,
        comp.inputs,
        comp.outputs,
        comp.pointer,
        comp.rb,
      );

      comp.pointer = result.pointer;
      comp.rb = result.rb;
      if (result.outputs.length > 0) globalIdle = false;

      while (comp.outputs.length >= 3) {
        const dest = comp.outputs.shift();
        const x = comp.outputs.shift();
        const y = comp.outputs.shift();

        if (dest === 255) {
          lastNatX = x;
          lastNatY = y;
        } else {
          computers[dest].inputs.push(x, y);
        }
      }
    }

    if (globalIdle && lastNatY !== null) {
      if (lastNatY === lastYSentToZero) return lastNatY;

      computers[0].inputs.push(lastNatX, lastNatY);
      lastYSentToZero = lastNatY;
    }
  }
};

const main = () => {
  const program = Deno.readTextFileSync("input.txt");
  // console.log(program )
  return runNetwork(program);
};

console.log(main());
