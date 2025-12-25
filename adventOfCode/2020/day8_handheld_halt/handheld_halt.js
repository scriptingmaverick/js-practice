const add = (result, destination) => {
  result.pointer += 1;
  result.accumulator += parseInt(destination);
};

const changePointer = (result, destination) =>
  (result.pointer += parseInt(destination));

const nOp = (result) => (result.pointer += 1);

const runComputer = (program, pointer = 0) => {
  const execute = {
    acc: add,
    nop: nOp,
    jmp: changePointer,
  };

  const result = {
    pointer,
    accumulator: 0,
    views: {},
    isEndAbruptly: false,
  };
  // console.log(program);
  // return
  // prompt();
  while (result.pointer < program.length) {
    const instruction = program[result.pointer];
    const key = instruction + " " + result.pointer;
    if (key in result.views) {
      result.isEndAbruptly = true;
      break;
    }
    // console.log(result.pointer);
    const [cmd, destination] = instruction.split(" ");
    execute[cmd](result, destination);
    result.views[key] = true;
  }

  return result;
};

const part1 = (program) => runComputer(program).accumulator;

const getCombinations = (program) => {
  const combinations = [];
  const newCmdOf = {
    jmp: ["nop", true],
    nop: ["jmp", true],
    acc: ["acc", false],
  };

  for (let i = 0; i < program.length; i++) {
    const [cmd, value] = program[i].split(" ");
    const [newCmd, canAddToProgram] = newCmdOf[cmd];
    if (canAddToProgram) {
      const newProg = program.slice();
      newProg[i] = newCmd + " " + value;
      combinations.push(newProg);
    }
  }

  return combinations;
};

const part2 = (program) => {
  const combinations = getCombinations(program);
  let result = runComputer(combinations.pop());
  while (result.isEndAbruptly) {
    result = runComputer(combinations.pop());
  }

  return result.accumulator;
};

const main = (fn = part1) => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`.split("\n");

  return fn(input);
};

console.log("acc -> ", main(part2));
