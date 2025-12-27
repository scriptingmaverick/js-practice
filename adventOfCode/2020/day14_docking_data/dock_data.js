const inititalizeMask = (data) => data.toString(2).padStart(36, "0").split("");

const parse = (rest) => {
  const [subScript, _, data] = rest[0].split(" ");
  const index = +subScript.match(/\d+/)[0];
  return [index, +data];
};

const getCombinations = (maskedValue) => {
  let combinations = [""];
  for (let i = 0; i < maskedValue.length; i++) {
    if (maskedValue[i] === "X") {
      combinations = combinations.flatMap((combination) => [
        combination + "0",
        combination + "1",
      ]);
      continue;
    }
    combinations = combinations.flatMap(
      (combination) => combination + maskedValue[i]
    );
  }

  return combinations.map((x) => parseInt(x, 2));
};

const generateAddresses = (address, mask) => {
  const floatingMask = address.slice();
  for (let i = 0; i < mask.length; i++) {
    if (mask[i] !== "0") floatingMask[i] = mask[i];
  }

  return getCombinations(floatingMask);
};

const executeIns = (canMaskIndex) => ({
  mask: (rest, result) => (result.currentMask = rest.at(-1)),
  mem: (rest, result) => {
    const [index, data] = parse(rest);
    const mask = result.currentMask;
    if (canMaskIndex) {
      const maskedValue = inititalizeMask(index);
      const addresses = generateAddresses(maskedValue, mask);
      for (let i = 0; i < addresses.length; i++)
        result.memory[addresses[i]] = data;

      return;
    }
    const maskedValue = inititalizeMask(data);
    for (let i = 0; i < mask.length; i++) {
      if (mask[i] !== "X") maskedValue[i] = mask[i];
    }

    result.memory[index] = parseInt(maskedValue.join(""), 2);
  },
});

const inititalize = (program, canMaskIndex = false) => {
  const result = {
    memory: {},
    currentMask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  };

  const execute = executeIns(canMaskIndex);
  program.forEach((instr) => {
    const [cmd, ...rest] =
      instr.indexOf(" ") === 4 ? instr.split(" ") : instr.split("[");
    execute[cmd](rest, result);
  });

  console.log(result);
  return Object.values(result.memory).reduce((sum, ele) => {
    if (!ele) return sum;
    return sum + ele;
  }, 0);
};

const decoderV2 = (program) => inititalize(program, true);

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X
mem[8] = 11
mem[7] = 101
mem[8] = 0`.split("\n");
  const example2 = `mask = 000000000000000000000000000000X1001X
mem[42] = 100
mask = 00000000000000000000000000000000X0XX
mem[26] = 1`.split("\n");
  return decoderV2(input);
};

console.log(main());
