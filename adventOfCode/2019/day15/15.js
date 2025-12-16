const applyModes = (result, modes, memory, pointer, threshold) => {
  const indices = [];
  const modeIndex = {
    0: (i) => memory[pointer + i],
    1: (i) => pointer + i,
    2: (i) => result.base + memory[pointer + i],
  };
  for (let i = 1; i <= threshold; i++) {
    indices.push(modeIndex[modes[i - 1]](i));
  }
  for (let i = 0; i < indices.length; i++) {
    if (!memory[indices[i]]) memory[indices[i]] = 0;
  }
  return indices;
};

const add = (addend, augend) => addend + augend;
const mul = (multiplier, multiplicand) => multiplier * multiplicand;
const isZero = (value) => value === 0;
const isNotZero = (value) => !isZero(value);
const areEqual = (number1, number2) => number1 === number2;
const isLessThan = (number1, number2) => number1 < number2;

const storeInput = (input, result, memory, modes) => {
  const index = applyModes(result, modes, memory, result.pointerPos, 1)[0];
  memory[index] = input;
  result.pointerPos += 2;
};
const showData = (result, memory, modes) => {
  const index = applyModes(result, modes, memory, result.pointerPos, 1)[0];
  result.output = memory[index];
  result.pointerPos += 2;
};
const jmp = (func, result, memory, modes) => {
  const indices = applyModes(result, modes, memory, result.pointerPos, 2);
  result.pointerPos = func(memory[indices[0]])
    ? memory[indices[1]]
    : result.pointerPos + 3;
};
const algebra = (func, result, memory, modes) => {
  const indices = applyModes(result, modes, memory, result.pointerPos, 3);
  memory[indices[2]] = func(memory[indices[0]], memory[indices[1]]) ? 1 : 0;
  result.pointerPos += 4;
};

const perform = (func, result, memory, modes) => {
  const indices = applyModes(result, modes, memory, result.pointerPos, 3);
  memory[indices[2]] = func(memory[indices[0]], memory[indices[1]]);
  result.pointerPos += 4;
};

const changeBase = (result, memory, modes) => {
  const index = applyModes(result, modes, memory, result.pointerPos, 1)[0];
  result.base = result.base + memory[index];
  result.pointerPos += 2;
};

export const sprint = (corruptedMemory, pointer = 0, input = 0, base = 0) => {
  const execute = {
    "01": perform.bind(null, add),
    "02": perform.bind(null, mul),
    "03": storeInput.bind(null, input),
    "04": showData,
    "05": jmp.bind(null, isNotZero),
    "06": jmp.bind(null, isZero),
    "07": algebra.bind(null, isLessThan),
    "08": algebra.bind(null, areEqual),
    "09": changeBase,
    99: (result) => (result.canContinue = false),
  };

  const memory = corruptedMemory.split(",").map((x) => parseInt(x));
  const result = {
    pointerPos: pointer,
    canContinue: true,
    output: "",
    base,
  };

  while (result.pointerPos < memory.length && result.canContinue) {
    const cmd = memory[result.pointerPos].toString().padStart(5, "0");
    const modes = cmd.slice(0, 3).split("").reverse();
    execute[cmd.slice(3)](result, memory, modes);
    if (cmd.slice(3) === "04") {
      return {
        output: result.output,
        program: memory.join(","),
        pointer: result.pointerPos,
        base: result.base,
      };
    }
  }

  return "halted";
};

const distance = {
  1: [0, 1], // North
  2: [0, -1], // South
  3: [-1, 0], // West
  4: [1, 0], // East
};

const recognizePath = (parents, targetKey) => {
  const path = [];
  while (targetKey !== null) {
    path.push(targetKey);
    targetKey = parents[targetKey];
  }
  return path.reverse();
};

const getPath = (initialMemoryString, canReturn = [false, 0]) => {
  const initialMemory = initialMemoryString.split(",").map(Number).join(",");
  const queue = [{
    pos: "0,0",
    memory: initialMemory,
    pointer: 0,
    base: 0,
  }];

  const visited = { "0,0": true };
  const parents = { "0,0": null };
  let oxygenKey = "";
  while (queue.length > 0) {
    const { pos, memory, pointer, base } = queue.shift();
    for (let d = 1; d <= 4; d++) {
      const result = sprint(memory, pointer, d, base);
      if (result.output === 0) continue;
      const [dx, dy] = distance[d];
      const [x, y] = pos.split(",").map(Number);
      const newKey = `${x + dx},${y + dy}`;
      if (!(newKey in visited)) {
        visited[newKey] = true;
        parents[newKey] = pos;

        queue.push({
          pos: newKey,
          memory: result.program,
          pointer: result.pointer,
          base: result.base,
        });

        if (result.output === 2) {
          oxygenKey = newKey;
          if (!canReturn[0]) return [parents, newKey, visited];
        }
      }
    }
  }

  return [parents, oxygenKey, visited];
};

const findMinPath = (program) => {
  const [parents, oxygenKey] = getPath(program);
  const path = recognizePath(parents, oxygenKey);
  console.log("Oxygen System Found!");
  console.log("Shortest Path Length:", path.length - 1);
  return path;
};

const printMaze = (fullMap, oxygenKey) => {
  const coords = Object.keys(fullMap).map(k => k.split(',').map(Number));
  
  const minX = Math.min(...coords.map(c => c[0]));
  const maxX = Math.max(...coords.map(c => c[0]));
  const minY = Math.min(...coords.map(c => c[1]));
  const maxY = Math.max(...coords.map(c => c[1]));

  console.log(`Grid: X(${minX} to ${maxX}), Y(${minY} to ${maxY})`);

  for (let y = maxY; y >= minY; y--) {
    let row = "";
    for (let x = minX; x <= maxX; x++) {
      const key = `${x},${y}`;
      
      if (key === oxygenKey) {
        row += "O"; // High priority: Oxygen System
      } else if (key === "0,0") {
        row += "S"; // Starting position
      } else if (fullMap[key]) {
        row += "."; // Reachable floor
      } else {
        row += "#"; // Wall or Unreachable
      }
    }
    console.log(row);
  }
};

const calculateMinsToSpreadOxygen = (program) => {
  const [parents, oxygenKey, visited] = getPath(program);
  const queue = [{ pos: oxygenKey, minute: 0 }];
  delete visited[oxygenKey];
  let maxMin = 0;
  while (queue.length > 0) {
    printMaze(visited, oxygenKey);
    const parent = queue.shift();
    if (parent.minute > maxMin) maxMin = parent.minute;
    const [keyX, keyY] = parent.pos.split(",");
    for (let d = 1; d <= 4; d++) {
      const [x, y] = distance[d];
      const neighbour = `${+keyX + x},${+keyY + y}`;
      if (neighbour in visited) {
        delete visited[neighbour];
        const newMin = parent.minute + 1;
        queue.push({ pos: neighbour, minute: newMin });
      }
    }
    for (let i = 0; i < 100000000; i++);
    console.clear();
  }

  return maxMin;
};

const input = Deno.readTextFileSync("input.txt"); //op :286
// findMinPath(input);
console.log(calculateMinsToSpreadOxygen(input));
