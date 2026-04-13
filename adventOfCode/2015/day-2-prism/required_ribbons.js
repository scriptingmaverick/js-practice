const input = Deno.readTextFileSync("input.txt")

const presents = input.split("\n");

const rubbersRequired = presents.reduce((quantity, present) => {
  const [d1, d2, d3] = present
    .split("x")
    .map(Number)
    .sort((a, b) => a - b);

  const netQuantity = 2 * (d1 + d2) + d1 * d2 * d3;

  return quantity + netQuantity;
}, 0);

console.log(rubbersRequired);
