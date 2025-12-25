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
  const bagWithHoldings = {};
  const bagsWithHolders = {};
  for (let i = 0; i < bags.length; i++) {
    const [bag, holds] = bags[i].split(" contain ");
    const [shade, color, _] = bag.split(" ");
    const holdingBags = parseHoldings(holds);
    for (let i = 0; i < holdingBags.length; i++) {
      const obj = bagsWithHolders[holdingBags[i].color] || { parents: [] };
      const parentObj = bagWithHoldings[shade + " " + color] || { childs: [] };
      obj.parents = obj.parents || [];
      parentObj.childs = parentObj.childs || [];
      obj.parents.push([shade + " " + color, +holdingBags[i].quantity || 0]);
      parentObj.childs.push([
        holdingBags[i].color,
        +holdingBags[i].quantity || 0,
      ]);
      bagWithHoldings[shade + " " + color] = parentObj;
      bagsWithHolders[holdingBags[i].color] = obj;
    }
  }
  console.log(bagWithHoldings);
  return [bagsWithHolders, bagWithHoldings];
};

const calcNoOfBagHolders = (bag, quantity, bagsWithHolders, holders = {}) => {
  if (!(bag in bagsWithHolders)) return "";
  for (const [parentBag, pq] of bagsWithHolders[bag].parents) {
    if (quantity <= pq) holders[parentBag] = true;
    calcNoOfBagHolders(parentBag, 1, bagsWithHolders, holders);
  }

  return Object.keys(holders).length;
};

const bagsCanHold = (bag, bags, quantity = 1) =>
  calcNoOfBagHolders(bag, quantity, parse(bags)[0]);

const calcNoOfBagsHolding = (bag, bagsHolding) => {
  if (!(bag in bagsHolding)) return 0;
  let total = 0;
  for (const [childBag, cq] of bagsHolding[bag].childs) {
    total += cq;
    total += cq * calcNoOfBagsHolding(childBag, bagsHolding);
  }

  return total;
};

const bagsHolding = (bag, bags) => calcNoOfBagsHolding(bag, parse(bags)[1]);

const main = (fn = bagsCanHold) => {
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

  const example2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`.split("\n");

  return fn("shiny gold", input);
};

console.log(main(bagsHolding));
