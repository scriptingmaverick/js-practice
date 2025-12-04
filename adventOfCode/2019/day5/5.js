const getValueForRef = (code, arr, pointerPos, index) => {
  if (+code[index - 1] === 0) {
    return arr[pointerPos + index];
  }
  return pointerPos + index;
};

const sprint = (rawCommands) => {
  const commands = rawCommands.split(",");
  const dfa = {
    1: (result, arr, instruction) => {
      instruction = instruction.padStart(5, "0").split("").slice(0, 3)
        .reverse();
      arr[getValueForRef(instruction, arr, result.pointerPos, 3)] =
        arr[getValueForRef(instruction, arr, result.pointerPos, 1)] +
        arr[getValueForRef(instruction, arr, result.pointerPos, 2)];
      result.pointerPos += 4;
    },
    2: (result, arr, instruction) => {
      instruction = instruction.padStart(5, "0").split("").slice(0, 3)
        .reverse();
      arr[getValueForRef(instruction, arr, result.pointerPos, 3)] =
        arr[getValueForRef(instruction, arr, result.pointerPos, 1)] *
        arr[getValueForRef(instruction, arr, result.pointerPos, 2)];
      result.pointerPos += 4;
    },
    3: (result, arr, instruction) => {
      instruction = instruction.padStart(3, "0").slice(0, 1).split("");
      arr[getValueForRef(instruction, arr, result.pointerPos, 1)] = 5;
      result.pointerPos += 2;
    },
    4: (result, arr, instruction) => {
      instruction = instruction.padStart(3, "0").slice(0, 1).split("");
      console.log(arr[getValueForRef(instruction, arr, result.pointerPos, 1)]);
      result.pointerPos += 2;
    },
    5: (result, arr, instruction) => {
      instruction = instruction.padStart(3, "0").split("").slice(0, 2)
        .reverse();
      if (arr[getValueForRef(instruction, arr, result.pointerPos, 1)] !== 0) {
        result.pointerPos =
          arr[getValueForRef(instruction, arr, result.pointerPos, 2)];
        return;
      }

      result.pointerPos += 3;
    },
    6: (result, arr, instruction) => {
      instruction = instruction.padStart(3, "0").split("").slice(0, 2)
        .reverse();
      if (arr[getValueForRef(instruction, arr, result.pointerPos, 1)] === 0) {
        result.pointerPos =
          arr[getValueForRef(instruction, arr, result.pointerPos, 2)];
        return;
      }

      result.pointerPos += 3;
    },
    7: (result, arr, instruction) => {
      instruction = instruction.padStart(5, "0").split("").slice(0, 3)
        .reverse();
      arr[getValueForRef(instruction, arr, result.pointerPos, 3)] = (
          arr[getValueForRef(instruction, arr, result.pointerPos, 1)] <
            arr[getValueForRef(instruction, arr, result.pointerPos, 2)]
        )
        ? 1
        : 0;

      result.pointerPos += 4;
    },
    8: (result, arr, instruction) => {
      instruction = instruction.padStart(5, "0").split("").slice(0, 3)
        .reverse();
      arr[getValueForRef(instruction, arr, result.pointerPos, 3)] = (
          arr[getValueForRef(instruction, arr, result.pointerPos, 1)] ===
            arr[getValueForRef(instruction, arr, result.pointerPos, 2)]
        )
        ? 1
        : 0;

      result.pointerPos += 4;
    },
    9: (result) => result.canContinue = false,
  };

  const mutablecmds = commands.slice().map((x) => +x);

  const result = {
    pointerPos: 0,
    canContinue: true,
  };

  while (result.pointerPos < mutablecmds.length && result.canContinue) {
    const cmd = mutablecmds[result.pointerPos].toString();
    console.log("cmd -> ", cmd);
    console.log("result -> ", result);
    dfa[cmd.at(-1)](
      result,
      mutablecmds,
      cmd,
    );
  }

  console.log(mutablecmds);
};

const input = Deno.readTextFileSync("input.txt");

// console.log(sprint("3,0,4,0,99"));
// console.log(sprint("1002,4,3,4,33"));
// console.log(sprint("1101,100,-1,4,0"));
sprint(input);

// sprint("3,9,8,9,10,9,4,9,99,-1,8");
// sprint("3,9,7,9,10,9,4,9,99,-1,8");
// sprint("3,3,1108,-1,8,3,4,3,99");
// sprint("3,3,1107,-1,8,3,4,3,99");
// sprint(
//   "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99",
// );

//op - 1409363
