const parse = (binaryPass) => {
  const rowRange = { min: 0, max: 127 };
  const seatRange = { min: 0, max: 7 };
  const goTo = {
    F: (range) => {
      range.max = Math.floor((range.min + range.max) / 2);
    },
    B: (range) => {
      range.min = Math.ceil((range.min + range.max) / 2);
    },
  };

  for (let i = 0; i < 7; i++) {
    goTo[binaryPass[i]](rowRange);
  }

  for (let i = 7; i < 10; i++) {
    goTo[binaryPass[i] === "L" ? "F" : "B"](seatRange);
  }

  return [rowRange.min, seatRange.min];
};

const highestSeatIdIn = (boardingPasses) => {
  let maxSeatId = 0;
  const seatIds = {};
  for (let i = 0; i < boardingPasses.length; i++) {
    const [row, seatNo] = parse(boardingPasses[i]);
    const seatId = row * 8 + seatNo;
    seatIds[seatId] = true;
    maxSeatId = seatId > maxSeatId ? seatId : maxSeatId;
  }

  for (let i = 28; i < 842; i++) {
    if (!(i in seatIds) && i - 1 in seatIds && i + 1 in seatIds) return i;
  }

  return maxSeatId;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = ["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL", "FBFBBFFRLR"];
  return highestSeatIdIn(input);
};

console.log(main());
