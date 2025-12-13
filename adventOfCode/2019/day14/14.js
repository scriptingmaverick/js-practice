const isOre = (x) => x[0].includes("ORE");
const isFuel = (x) => x[1].includes("FUEL");
const sum = (sum, e) => sum + e;

const parseRawMaterials = (rawMaterials) =>
  rawMaterials.split("\n").map((x) => x.split(" => "));

const getRestOfTheReacions = (parsedData) =>
  parsedData.filter((x) => !isFuel(x) && !isOre(x));

const parse = (substance) => substance.map((x) => x.split(" "));

const parseReactions = (data) =>
  data.reduce((obj, x) => (obj[x[1]] = x[0].split(", ")) && obj, {});

const parseMaterials = (rawMaterials) => {
  const parsedData = parseRawMaterials(rawMaterials);
  const ores = parseReactions(parsedData.filter(isOre));
  const fuelRequirement = parseReactions(parsedData.filter(isFuel));
  const rest = parseReactions(getRestOfTheReacions(parsedData));
  return { ores, rest, fuelRequirement };
};

const findReactionSource = (reaction, materialsAvailable) => {
  const [dividend, reactor] = parse([reaction])[0];
  const oreKey = Object.keys(materialsAvailable.ores).filter((key) =>
    key.includes(reactor)
  );

  if (oreKey.length > 0) {
    return [reaction];
  }

  const key = Object.keys(materialsAvailable.rest).filter((x) =>
    x.includes(reactor)
  );
  const divisor = parse(key)[0][0];
  const newReactions = materialsAvailable.rest[key].map((reaction) => {
    const [multiplier, reactorName] = parse([reaction])[0];
    return Math.ceil(+dividend / +divisor) * +multiplier + " " + reactorName;
  });

  return newReactions;
};

const normalize = (reactions) =>
  Object.entries(
    reactions.reduce((sums, reaction) => {
      const [quantity, name] = parse([reaction])[0];
      sums[name] = (sums[name] || 0) + +quantity;
      return sums;
    }, {})
  ).map((x) => `${x[1]} ${x[0]}`);

const trenchDownReactions = (reactions, materialsAvailable) => {
  const oreKeys = Object.keys(materialsAvailable.ores).map(
    (x) => parse([x])[0][1]
  );

  while (!reactions.every((x) => oreKeys.includes(parse([x])[0][1]))) {
    let combinedRections = [];
    let i = 0;

    while (i < reactions.length) {
      const source = findReactionSource(reactions[i++], materialsAvailable);
      combinedRections = combinedRections.concat(source);
    }
    reactions = normalize(combinedRections);
  }

  return reactions.map((x) => parse([x])[0]);
};

const turnToOres = (reactions, ores) =>
  reactions.reduce((sum, reaction) => {
    const oreKey = Object.keys(ores).filter((x) => x.includes(reaction[1]));
    const divisor = +parse(oreKey)[0][0];
    const multiplicand = +parse(ores[oreKey])[0][0];
    console.log(ores[oreKey], oreKey, divisor, multiplicand, reaction);
    sum += Math.ceil(reaction[0] / divisor) * multiplicand;
    return sum;
  }, 0);

const oresRequiredForFuel = (rawMaterials) => {
  const materialsAvailable = parseMaterials(rawMaterials);
  const fuelReactions = Object.values(materialsAvailable.fuelRequirement)[0];
  const fuelSources = trenchDownReactions(fuelReactions, materialsAvailable);
  const oresRequiredForFuel = turnToOres(fuelSources, materialsAvailable.ores);
  return oresRequiredForFuel;
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
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`;

console.log(oresRequiredForFuel(example5));
