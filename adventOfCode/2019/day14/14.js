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
    parsedData.filter((x) => !isFuel(x) && !isOre(x))
  );
  const materials = Object.keys(normalizedData).reduce((obj, x) => {
    const key = parse([x])[0];
    const value = parse(normalizedData[x]);
    obj[key[1]] = value.map((x) => x[1]);
    return obj;
  }, {});

  return { ores, rest, fuelRequirement, materials };
};

const sort = (data) => {
  const sortedData = {};
  let i = 0;
  while (i < data.length) {
    const key = data[i++].dividend[1];
    if (key in sortedData) continue;
    sortedData[key] = data
      .filter((x) => x.dividend[1] === key)
      .reduce(
        (result, e) => ({
          dividend: e.dividend,
          divisor: e.divisor + result.divisor,
          ores: e.ores,
        }),
        { divisor: 0 }
      );
  }
  return Object.values(sortedData);
};

const oresRequiredForFuel = (rawMaterials) => {
  const materialsAvailable = parseMaterials(rawMaterials);
  const fuelValues = Object.values(materialsAvailable.fuelRequirement)[0];
  const ores = getOres(materialsAvailable, fuelValues);
  console.log(ores);
  const sortedOres = sort(ores);
  console.log(sortedOres);
  const result = sortedOres.map((x) => {
    return Math.ceil(x.divisor / x.dividend[0]) * x.ores;
  });

  return result.reduce(sum);
};

const getOres = (materialsAvailable, reactions, result = []) => {
  result.push(
    reactions.reduce((ores, x) => {
      const [divisor, key] = parse([x])[0];
      if (materialsAvailable.materials[key][0] === "ORE") {
        const requiredKey = Object.keys(materialsAvailable.ores).filter((e) =>
          e.includes(key)
        );

        const oresRequired = +parse(materialsAvailable.ores[requiredKey])[0][0];
        const [dividend, keyName] = parse(requiredKey)[0];
        ores.push({
          dividend: [+dividend, keyName],
          divisor: +divisor,
          ores: oresRequired,
        });
        return ores;
      }

      const requiredKey = Object.keys(materialsAvailable.rest).filter((e) =>
        e.includes(key)
      );
      const threshold = parse(requiredKey)[0][0];
      const newReactions = materialsAvailable.rest[requiredKey].map((x) => {
        const [dividend, key] = parse([x])[0];
        return +dividend * Math.ceil(+divisor / threshold) + " " + key;
      });
      ores.push(getOres(materialsAvailable, newReactions));
      return ores.flat();
    }, [])
  );

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

console.log(oresRequiredForFuel(example1));
