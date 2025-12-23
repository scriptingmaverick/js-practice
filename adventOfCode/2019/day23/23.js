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
  program[index] = result.inputs.pop();
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
  };

  while (!result.isHalted) {
    const cmd = program[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    const opCode = cmd.slice(3);
    // console.log("result -> ", result);
    // console.log("cmd -> ", opCode, modes);
    // prompt();
    if (opCode.at(-1) === "3" && result.inputs.length === 0) {
      return {
        pointer: result.pointerPos,
        program,
        rb,
        inputs,
        outputs: result.outputs,
      };
    }
    execute[opCode](result, program, modes);
    if (opCode.at(-1) === "4") {
      return {
        pointer: result.pointerPos,
        program,
        rb,
        inputs,
        outputs: result.outputs,
      };
    }
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
  let isPacketFound = false;
  let result, i = 0;
  while (!isPacketFound) {
    const { program, inputs, outputs, rb, pointer } =
      computers[i % networkSize];
    result = sprint(
      program,
      inputs,
      outputs,
      pointer,
      rb,
    );

    console.log("came back result  -> ", result);
    prompt()
    if (result.outputs.length === 3 && result.outputs[0] === 255) {
      isPacketFound = true;
    }

    computers[i] = {
      program: result.program,
      inputs: result.inputs.length > 0 ? result.inputs : [-1],
      outputs: result.outputs,
      rb: result.rb,
      pointer: result.pointer,
    };

    i++;
  }

  return result.outputs[2];
};

const main = () => {
  const program = Deno.readTextFileSync("input.txt");
  // console.log(program )
  return runNetwork(program);
};

console.log(main());
