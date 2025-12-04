const add = (i, j, k, instructions) =>
  instructions[k] = instructions[i] + instructions[j];
const mul = (i, j, k, instructions) =>
  instructions[k] = instructions[i] * instructions[j];
// const getInput = (i, instructions) => instructions[i] = 1;
const getInput = (i, instructions) => instructions[i] = 5;
const printOutput = (i, instructions) => console.log(instructions[i]);

export const executeInstructions = (instructions) => {
  let i = 0;
  while (i < instructions.length) {
    const [mode3, mode2, mode1, ...opcodes] = (instructions[i] + "").padStart(
      5,
      "0",
    ).split("").map((x) => +x);
    console.log(mode1,mode2,mode3,opcodes,i)
    let i1, i2, i3;
    const opcode = +opcodes.join("");
    switch (opcode) {
      case 1:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        add(i1, i2, i3, instructions);
        i += 4;
        break;
      case 2:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        mul(i1, i2, i3, instructions);
        i += 4;
        break;
      case 3:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        getInput(i1, instructions);
        i += 2;
        break;
      case 4:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        printOutput(i1, instructions);
        i += 2;
        break;
      case 5:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i = instructions[i1] !== 0 ? instructions[i2] : i + 3;
        break;
      case 6:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i = instructions[i1] === 0 ? instructions[i2] : i + 3;
        break;
      case 7:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        instructions[i3] = instructions[i1] < instructions[i2] ? 1 : 0;
        i += 4;
        break;
      case 8:
        i1 = mode1 === 0 ? instructions[i + 1] : i + 1;
        i2 = mode2 === 0 ? instructions[i + 2] : i + 2;
        i3 = mode3 === 0 ? instructions[i + 3] : i + 3;
        instructions[i3] = instructions[i1] === instructions[i2] ? 1 : 0;
        i += 4;
        break;
      case 99:
        return instructions;
    }
  }
  return instructions;
};

const main = () => {
  const instructions = Deno.readTextFileSync("input.txt").split(",").map((x) =>
    +x
  );
  executeInstructions(instructions);
};

main();
