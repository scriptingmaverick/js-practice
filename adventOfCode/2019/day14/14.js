const parseRawMaterials = (rawMaterials) =>
  // rawMaterials.split("\n").map((x) => x.split(" => "));
  rawMaterials.split("\r\n").map((x) => x.split(" => "));

const parse = (substance) => substance.map((x) => x.split(" "));

const parseReactions = (data) =>
  data.reduce((obj, x) => {
    const output = parse([x[1]])[0];
    const inputs = x[0].split(", ").map((i) => parse([i])[0]);
    obj[output[1]] = { outQty: +output[0], inputs };
    return obj;
  }, {});

const parseMaterials = (rawMaterials) =>
  parseReactions(parseRawMaterials(rawMaterials));

const calculateORE = (reactions, fuelCount = 1) => {
  const need = { FUEL: fuelCount };
  const leftovers = {};
  while (true) {
    const chemical = Object.keys(need).find((x) => x !== "ORE");
    if (!chemical) break;

    let qtyNeeded = need[chemical];
    delete need[chemical];

    const leftover = leftovers[chemical] || 0;
    const usage = Math.min(leftover, qtyNeeded);

    leftovers[chemical] = leftover - usage;
    qtyNeeded -= usage;

    if (qtyNeeded === 0) continue;

    const reaction = reactions[chemical];
    const batches = Math.ceil(qtyNeeded / reaction.outQty);

    const produced = batches * reaction.outQty;
    leftovers[chemical] = (leftovers[chemical] || 0) + (produced - qtyNeeded);

    for (const [inputQty, inputName] of reaction.inputs.map((x) => [
      +x[0],
      x[1],
    ])) {
      need[inputName] = (need[inputName] || 0) + inputQty * batches;
    }
  }

  return need.ORE;
};

const oresRequiredForFuel = (rawMaterials) => {
  const reactions = parseMaterials(rawMaterials);
  return calculateORE(reactions, 1);
};

const example1 = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`;

const example2 = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;

const example3 = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
7 DCFZ, 7 PSHF => 2 XJWVT
165 ORE => 2 GPVTF
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT`;

const example4 = `2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
17 NVRVD, 3 JNWZP => 8 VPVL
53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL
22 VJHF, 37 MNCFX => 5 FWMGM
139 ORE => 4 NVRVD
144 ORE => 7 JNWZP
5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
145 ORE => 6 MNCFX
1 NVRVD => 8 CXFTF
1 VJHF, 6 MNCFX => 4 RFSQX
176 ORE => 6 VJHF`;

const example5 = `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRP    VC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`;

const fileInput = Deno.readTextFileSync("input.txt");

const largestFuelToBeProduced = (rawMaterials) => {
  const oreSource = 1000000000000;
  const reactions = parseMaterials(rawMaterials);
  let [min, max] = [1, 100];
  let [minOres, maxOres] = [0, 0];
  while (min < max) {
    minOres = calculateORE(reactions, min);
    maxOres = calculateORE(reactions, max);
    if (maxOres < oreSource) {
      [min, max] = [max, max * 100];
    } else {
      max = Math.floor((min + max) / 2);
    }
  }
  return max;
};

console.log(oresRequiredForFuel(fileInput));
console.log(largestFuelToBeProduced(fileInput));
