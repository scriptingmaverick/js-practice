const parseBags = (holds) =>
  holds
    .split(/[,.]|s[,.]/)
    .map((x) => x.trim())
    .filter((x) => x !== "");

const parseHoldings = (holds) => {
  const holdings = parseBags(holds);
  const holdingsWithQuantity = [];
  for (let i = 0; i < holdings.length; i++) {
    const [quantity, shade, color, _] = holdings[i].split(" ");
    const key = shade + " " + color;
    const bag = { color: key, quantity };
    holdingsWithQuantity.push(bag);
  }

  return holdingsWithQuantity;
};

const parse = (bags) => {
  const bagsWithHolders = {};
  for (let i = 0; i < bags.length; i++) {
    const [bag, holds] = bags[i].split(" contain ");
    const [shade, color, _] = bag.split(" ");
    const holdingBags = parseHoldings(holds);
    for (let i = 0; i < holdingBags.length; i++) {
      const obj = bagsWithHolders[holdingBags[i].color] || { parents: [] };

      obj.parents = obj["parents"] || [];
      obj.parents.push([shade + " " + color, +holdingBags[i].quantity || 0]);

      bagsWithHolders[holdingBags[i].color] = obj;
    }
  }

  return bagsWithHolders;
};

const calcNoOfBagHolders = (
  bagColor,
  quantity,
  bagsWithHolders,
  holders = {}
) => {
  if (!(bagColor in bagsWithHolders)) return "";
  for (const [parentBag, pq] of bagsWithHolders[bagColor].parents) {
    if (quantity <= pq) holders[parentBag] = true;
    calcNoOfBagHolders(parentBag, 1, bagsWithHolders, holders);
  }

  return Object.keys(holders).length;
};

const bagsCanHold = (bagColor, bags, quantity = 1) =>
  calcNoOfBagHolders(bagColor, quantity, parse(bags));

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example =
    `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`.split("\n");

  return bagsCanHold("shiny gold", input);
};

console.log(main());
