const isOre = (x) => x[0].includes("ORE");
const isFuel = (x) => x[1].includes("FUEL");

const parse = (substance) =>
  substance.map((x) => x.split(" ")).map((x) => ({
    quantity: +x[0],
    name: x[1],
  }));

const parseReactions = (data) =>
  data.map((x) => ({ substance: x[1], reactions: x[0].split(", ") })).map(
    (x) => ({ substance: parse([x.substance]), reactions: parse(x.reactions) }),
  );

const parseMaterials = (rawMaterials) => {
  const parsedData = rawMaterials.split("\n").map((x) => x.split(" => "));
  const ores = parseReactions(parsedData.filter(isOre));
  const fuelRequirement = parseReactions(parsedData.filter(isFuel));
  const materials = parseReactions(
    parsedData.filter((x) => !isFuel(x) && !isOre(x)),
  );
  return { ores, materials, fuelRequirement };
};

const oresRequiredForFuel = (rawMaterials) => {
  const { ores, materials, fuelRequirement } = parseMaterials(rawMaterials);

  const reactionsWantedForOre = fuelRequirement.reactions.reduce((sum, reaction) => {
    
  })
  console.log(ores);
  console.log(materials);
  console.log(fuelRequirement);
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

console.log(oresRequiredForFuel(example1));
