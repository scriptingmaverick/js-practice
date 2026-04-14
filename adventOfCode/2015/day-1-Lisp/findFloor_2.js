const INDICATORS = {
  "(": 1,
  ")": -1,
};

const input = Deno.readTextFileSync("input.txt");
// const input = "()())";
let floor = 0, i = 0;
while (floor !== -1) {
  floor += INDICATORS[input[i++]];
}

console.log( i);
