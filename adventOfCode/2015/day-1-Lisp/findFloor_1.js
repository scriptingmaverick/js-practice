const INDICATORS = {
  "(": 1,
  ")": -1,
};

const input = Deno.readTextFileSync("input.txt");

const result = input.split("").reduce(
  (floor, indicator) => floor + INDICATORS[indicator],
  0,
);

console.log(result);
