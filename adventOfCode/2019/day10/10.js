import { distinctBy } from "jsr:@std/collections";

const asteroidsPositions = (asteroidMap) => {
  return asteroidMap.reduce(
    (result, row, rowIndex) => (row.split("").map((col, colIndex) => {
      const char = row[colIndex];
      if (char === "#") {
        result.push({ x: colIndex, y: rowIndex });
      }
    }) && result),
    [],
  );
};

const gcdOf = (a, b) => {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    const remainder = a % b;
    a = b;
    b = remainder;
  }

  return a;
};

const getVisibilityRange = (mainAsteroid, asteriod) => {
  const dx = asteriod.x - mainAsteroid.x;
  const dy = asteriod.y - mainAsteroid.y;
  let d1x = dx;
  let d1y = dy;
  const gcd = gcdOf(dx, dy);
  if (gcd !== 0) {
    d1x = dx / gcd;
    d1y = dy / gcd;
  }

  return `${d1x},${d1y}`;
};

const lengthOf = (func, asteriod, asteroids) => {
  return Object.keys(
    func(asteriod, asteroids).reduce(
      (unique, asteroid) => unique[asteroid] = true && unique,
      {},
    ),
  ).length - 1;
};

const maxAsteroidsCover = (asteroid, asteroids) => {
  const visibleAsteroids = [];
  for (let i = 0; i < asteroids.length; i++) {
    const visibilityRange = getVisibilityRange(asteroid, asteroids[i]);
    visibleAsteroids.push(visibilityRange);
  }

  // console.log("visible asteroids : ", visibleAsteroids);
  return visibleAsteroids;
};

const buildMonitoringSystem = (asteroidMap) => {
  const asteroids = asteroidsPositions(asteroidMap.split("\n"));
  let asteriodWithMaxView = asteroids[0];
  let maxStationsCover = lengthOf(maxAsteroidsCover, asteroids[0], asteroids);
  for (let i = 1; i < asteroids.length; i++) {
    const newStationsCover = lengthOf(
      maxAsteroidsCover,
      asteroids[i],
      asteroids,
    );
    if (newStationsCover > maxStationsCover) {
      maxStationsCover = newStationsCover;
      asteriodWithMaxView = asteroids[i];
    }
  }

  console.log(maxStationsCover);
  return asteriodWithMaxView;
};

// const input = `.#..#
// .....
// #####
// ....#
// ...##`;

// const input1 = `......#.#.
// #..#.#....
// ..#######.
// .#.#.###..
// .#..#.....
// ..#....#.#
// #..#....#.
// .##.#..###
// ##...#..#.
// .#....####`

const getAngle = (origin, point) => {
  const dx = point.x - origin.x;
  const dy = point.y - origin.y;
  const angle = Math.atan2(dx, -dy);

  return angle < 0 ? angle + 360 : angle;
};

const getDistance = (station, asteroidPos) => {
  const dx = asteroidPos.x - station.x;
  const dy = asteroidPos.y - station.y;
  const distace = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  return distace;
};

const addAnglesToAstroeids = (station, asteroids) => {
  const asteroidsWithAngles = [];
  for (let i = 0; i < asteroids.length; i++) {
    const angle = getAngle(station, asteroids[i]);
    asteroidsWithAngles.push({
      x: asteroids[i].x,
      y: asteroids[i].y,
      angle,
      distace: getDistance(station, asteroids[i]),
    });
  }

  return asteroidsWithAngles;
};

const popelementsInOrder = (similarElements) => {
  const storage = [];
  let i = 0;
  while (similarElements.length > 0) {
    storage.push(similarElements[i++].shift());
    if (i === similarElements.length) {
      i = 0;
      similarElements = similarElements.filter((e) => e.length > 0);
      continue;
    }
  }

  return storage;
};

const shootAsteroids = (asteroidMap, index) => {
  const station = buildMonitoringSystem(asteroidMap);
  const asteroidPositions = asteroidsPositions(asteroidMap.split("\n"));
  const asteroidsWithAngles = addAnglesToAstroeids(station, asteroidPositions);
  const distinctAsteroids = distinctBy(asteroidsWithAngles, (e) => e.angle)
    .sort((a, b) => a.angle - b.angle);
  const similarAsteroids = [];
  distinctAsteroids.forEach((asteroid) => {
    similarAsteroids.push(
      asteroidsWithAngles.filter((e) => e.angle === asteroid.angle).sort((
        a,
        b,
      ) => a.distace - b.distace),
    );
  });

  const poppedElements = popelementsInOrder(similarAsteroids.slice());

  const asteroid = poppedElements[index];
  console.log(asteroid);
  return asteroid.x * 100 + asteroid.y;
};

// const input = `.#....#####...#..
// ##...##.#####..##
// ##...#...#.#####.
// ..#.....#...###..
// ..#.#.....#....##`;
// const inp = `.#..##.###...#######
// ##.############..##.
// .#.######.########.#
// .###.#######.####.#.
// #####.##.#.##.###.##
// ..#####..#.#########
// ####################
// #.####....###.#.#.##
// ##.#################
// #####.##.###..####..
// ..######..##.#######
// ####.##.####...##..#
// .#####..#.######.###
// ##...#.##########...
// #.##########.#######
// .####.#.###.###.#.##
// ....##.##.###..#####
// .#.#.###########.###
// #.#.#.#####.####.###
// ###.##.####.##.#..##`;

// The 1st asteroid to be vaporized is at 11,12.
// The 2nd asteroid to be vaporized is at 12,1.
// The 3rd asteroid to be vaporized is at 12,2.
// The 10th asteroid to be vaporized is at 12,8.
// The 20th asteroid to be vaporized is at 16,0.
// The 50th asteroid to be vaporized is at 16,9.
// The 100th asteroid to be vaporized is at 10,16.
// The 199th asteroid to be vaporized is at 9,6.
// The 200th asteroid to be vaporized is at 8,2.
// The 201st asteroid to be vaporized is at 10,9.
// The 299th and final asteroid to be vaporized is at 11,1.

const fileInput = Deno.readTextFileSync("input.txt");
console.log(buildMonitoringSystem(fileInput));
console.log(shootAsteroids(fileInput, 199));
