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

const fft = (data, phaseThreshold = 100) => {
  let result = data.split("").map(Number);
  for (let i = 0; i < phaseThreshold; i++) {
    result = phaseOf(result);
  }

  return result;
};

const decodeSignal = (data) => {
  const changedData = repeat(data, 10000);
  const length = +data.slice(0, 7);
  return fft(changedData).slice(length, length + 8);
};

const input = Deno.readTextFileSync("input.txt");

const example1 = "12345678";
const example2 = "80871224585914546619083218645595";
const example3 = "19617804207202209144916044189917";
const example4 = "69317163492948606335995924319873";

const ex1 = "03036732577212944063491565474664"; // 84462026.
const ex2 = "02935109699940807407585447034323"; // 78725270.
const ex3 = "03081770884921959731165446850517"; // 53553731.
console.log(fft(example4).slice(0, 8));

// console.log(decodeSignal(ex1));
