const isOre = (x) => x[0].includes("ORE");
const isFuel = (x) => x[1].includes("FUEL");
const sum = (sum, e) => sum + e;

const parse = (substance) => substance.map((x) => x.split(" "));

const parseReactions = (data) =>
  data.reduce((obj, x) => (obj[x[1]] = x[0].split(", ")) && obj, {});

const parseMaterials = (rawMaterials) => {
  const parsedData = rawMaterials.split("\n").map((x) => x.split(" => "));
  const normalizedData = parseReactions(parsedData);
  const ores = parseReactions(parsedData.filter(isOre));
  const fuelRequirement = parseReactions(parsedData.filter(isFuel));
  const rest = parseReactions(
    parsedData.filter((x) => !isFuel(x) && !isOre(x)),
  );
  const materials = Object.keys(normalizedData).reduce((obj, x) => {
    const key = parse([x])[0];
    const value = parse(normalizedData[x]);
    obj[key[1]] = value.map((x) => x[1]);
    return obj;
  }, {});

  return { ores, rest, fuelRequirement, materials };
};

const extractOres = (ores) =>
  ores.reduce((result, currentOre, i) => {
    if (currentOre.dividend === ores[i + 1]?.dividend) {
      result.similar[result.i].push(currentOre.divisor);
      return result;
    }

    result.similar[result.i].push(currentOre.divisor);
    result.similar[result.i].push(currentOre.dividend);
    result.similar[result.i++].push(currentOre.ores);
    result.similar[result.i] = [];
    return result;
  }, { similar: [[]], i: 0 }).similar.slice(0, -1);

const oresRequiredForFuel = (rawMaterials) => {
  const materialsAvailable = parseMaterials(rawMaterials);
  // console.log(materialsAvailable)
  const fuelValues = Object.values(materialsAvailable.fuelRequirement)[0];
  // console.log(fuelValues)
  const ores = getOres(materialsAvailable, fuelValues);
  const result = extractOres(ores).map((x) => {
    const summation = x.slice(0, -2).reduce(sum);
    return Math.ceil(summation / x.at(-2)) * x.at(-1);
  });

  return result.reduce(sum);
};

const getOres = (materialsAvailable, reactions, result = []) => {
  // console.log(materialsAvailable,reactions)
  result.push(reactions.reduce((ores, x) => {
    const [divisor, key] = parse([x])[0];
    console.log("start of reduce -> ", divisor, key);
    if (materialsAvailable.materials[key][0] === "ORE") {
      const requiredKey = Object.keys(materialsAvailable.ores).filter((e) =>
        e.includes(key)
      );

      const oresRequired = +parse(materialsAvailable.ores[requiredKey])[0][0];
      const dividend = +parse(requiredKey)[0][0];
      ores.push({ dividend, divisor: +divisor, ores: oresRequired });
      return ores;
    }

    const requiredKey = Object.keys(materialsAvailable.rest).filter((e) =>
      e.includes(key)
    );
    const newReactions = materialsAvailable.rest[requiredKey].map((x) => {
      const [dividend, key] = parse([x])[0];
      return (+dividend * +divisor) + " " + key;
    });
    console.log("else -> ", newReactions);
    ores.push(getOres(materialsAvailable, newReactions));
    return ores.flat();
  }, []));

  return result.flat();
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

console.log(oresRequiredForFuel(example2));
