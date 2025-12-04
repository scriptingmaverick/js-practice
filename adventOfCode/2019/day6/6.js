const totalOrbits = (rawMap) => {
  const map = rawMap.split("\n");
  const orbits = {};
  for (let i = 0; i < map.length; i++) {
    const [orbit, directOrbit] = map[i].split(")");
    orbits[directOrbit] = orbit;
  }

  const orbitSum = {};
  for (const key in orbits) {
    let indirectOrbits = 0;
    let orbit = key;
    let indirectOrbit = orbits[orbit];
    while (indirectOrbit !== undefined) {
      indirectOrbits++;
      orbit = indirectOrbit;
      indirectOrbit = orbits[orbit];
    }
    orbitSum[key] = indirectOrbits;
  }
  const sum = Object.values(orbitSum).reduce((sum, orbit) => orbit + sum, 0);
  console.log(sum);
};

const minOrbitsToReachSanta = (rawMap) => {
  const map = rawMap.split("\r\n");
  const orbits = {};
  for (let i = 0; i < map.length; i++) {
    const [orbit, directOrbit] = map[i].split(")");
    orbits[directOrbit] = orbit;
  }

  const orbitDistances = {};
  for (const key of ["SAN", "YOU"]) {
    let orbit = key;
    let indirectOrbit = orbits[orbit];
    orbitDistances[key] = [];
    while (indirectOrbit !== undefined) {
      orbit = indirectOrbit;
      indirectOrbit = orbits[orbit];
      orbitDistances[key].push(orbit);
    }
  }

  let minPath = 0;
  for (let i = 0; i < orbitDistances["YOU"].length; i++) {
    const index = orbitDistances["SAN"].indexOf(orbitDistances["YOU"][i]);
    if (index !== -1) {
      minPath = index + i;
      break;
    }
  }
  console.log(minPath);
};

const input = Deno.readTextFileSync("input.txt");

// console.log(totalOrbits(`COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L`));

// minOrbitsToReachSanta(`COM)B
// B)C
// C)D
// D)E
// E)F
// B)G
// G)H
// D)I
// E)J
// J)K
// K)L
// K)YOU
// I)SAN`);

totalOrbits(input);
minOrbitsToReachSanta(input);
