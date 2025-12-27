const runGame = (initialSet, limit = 2020) => {
  const numbers = new Int32Array(limit).fill(0);
  let currTurn = 1;
  for (let i = 0; i < initialSet.length - 1; i++) {
    numbers[initialSet[i]] = i + 1;
    currTurn++;
  }

  let lastNum = initialSet.at(-1);
  while (currTurn < limit) {
    const prevSeenTurn = numbers[lastNum];
    numbers[lastNum] = currTurn;
    const nextNum = prevSeenTurn === 0 ? 0 : currTurn - prevSeenTurn;
    lastNum = nextNum;
    currTurn++;
  }

  return lastNum;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split(",").map(Number);
  const examples = [
    [0, 3, 6],
    [1, 3, 2],
    [2, 1, 3],
    [1, 2, 3],
    [2, 3, 1],
    [3, 2, 1],
    [3, 1, 2],
  ];

  return runGame(input, 30000000);
};

console.log(main());

//p-1 -> 421
// p-2 -> 436
