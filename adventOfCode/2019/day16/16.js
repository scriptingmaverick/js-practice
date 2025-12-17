const repeatSeries = (length, series = [0, 1, 0, -1]) =>
  series.flatMap((x) =>
    (x + ",").repeat(length).split(",").filter((x) => x.trim() !== "").map(
      Number,
    )
  );

const repeat = (series, length) => series.repeat(length);

const phaseOf = (data) => {
  const resultingNums = [];
  for (let i = 0; i < data.length; i++) {
    const series = repeatSeries(i + 1);
    const result = data.reduce(
      (sum, currNum, index) => {
        const seriesNum = series[(index + 1) % series.length];
        sum += currNum * seriesNum;
        return sum;
      },
      0,
    );

    resultingNums.push(Math.abs(result % 10));
  }

  return resultingNums;
};

const fft = (data, func = phaseOf, phaseThreshold = 100) => {
  let result = data.split("").map(Number);
  for (let i = 0; i < phaseThreshold; i++) {
    result = func(result);
  }

  return result.slice(0, 8);
};

const decodeSignal = (data) => {
  const changedData = repeat(data, 10000);
  const length = +data.slice(0, 7);
  const polishedData = changedData.slice(length);
  return fft(polishedData, PhaseForPart2);
};

const PhaseForPart2 = (data) => {
  const resultingNums = [];
  let offset = 8;
  let addend = 0;
  for (let i = data.length - 2; i >= -1; i--) {
    const answer = (offset + addend) % 10;
    resultingNums[i + 1] = answer;
    addend = data[i];
    offset = resultingNums[i + 1];
  }

  return resultingNums;
};

const input = Deno.readTextFileSync("input.txt");

const example1 = "12345678";
const example2 = "80871224585914546619083218645595";
const example3 = "19617804207202209144916044189917";
const example4 = "69317163492948606335995924319873";

const ex1 = "03036732577212944063491565474664"; // 84462026.
const ex2 = "02935109699940807407585447034323"; // 78725270.
const ex3 = "03081770884921959731165446850517"; // 53553731.

// console.log(fft(input));
console.log(decodeSignal(input));
