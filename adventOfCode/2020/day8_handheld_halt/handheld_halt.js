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
  };

  while (true) {
    const instruction = program[result.pointer];
    const key = instruction + " " + result.pointer;
    if (key in result.views) break;
    const [cmd, destination] = instruction.split(" ");
    execute[cmd](result, destination);
    result.views[key] = true;

    // console.log(result.pointer);
    // prompt();
  }

  return result.accumulator;
};

const main = () => {
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
  return runComputer(input);
};

console.log(main());
