const executeIns = () => ({
  mask: (rest, result) => (result.currentMask = rest.at(-1)),
  mem: (rest, result) => {
    const [subScript, _, data] = rest[0].split(" ");
    const index = +subScript.match(/\d+/)[0];
    const maksedValue = Number(data).toString(2).padStart(36, "0").split("");
    const mask = result.currentMask;
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] !== "X") maksedValue[i] = mask[i];
    }

    result.memory[index] = parseInt(maksedValue.join(""), 2);
  },
});

const inititalize = (program) => {
  const result = {
    memory: [],
    currentMask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  };
  const execute = executeIns();

  program.forEach((instr) => {
    const [cmd, ...rest] =
      instr.indexOf(" ") === 4 ? instr.split(" ") : instr.split("[");
    // console.log(cmd, rest);
    execute[cmd](rest, result);
  });

  return result.memory.reduce((sum, ele) => {
    if (!ele) return sum;
    return sum + ele;
  }, 0);
};

// const

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split("\n");
  return inititalize(input);
};

console.log(main());
