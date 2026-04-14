// const input = "2x3x4\n1x1x10";
// const input = "2x3x4";
// const input = "1x1x10";
const input = Deno.readTextFileSync("input.txt");

const result = input.split("\n").reduce((sum, present) => {
  const [l, w, h] = present.split("x").map(Number);
  const side1 = l * w;
  const side2 = h * w;
  const side3 = l * h;

  const smallSide = side1 <= side2 ? (side1 <= side3 ? side1 : side3) : side2;

  sum += (2 * side1) + (2 * side2) + (2 * side3) + smallSide;

  console.log(smallSide);
  return sum;
}, 0);

console.log(result);
