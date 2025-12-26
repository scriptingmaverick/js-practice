const offSets = {
  0: [-1, -1],
  1: [0, -1],
  2: [1, -1],
  3: [-1, 0],
  4: [1, 0],
  5: [-1, 1],
  6: [0, 1],
  7: [1, 1],
};

const join = (layout) => layout.map((x) => x.join("")).join("");

const calculate = (seatsOccupied) => {
  return [...join(seatsOccupied).matchAll("#")].length;
};

const isOccupied = (seats, y, x) => {
  if (y < 0 || x < 0 || x >= seats[0].length || y >= seats.length) return false;
  return seats[y][x] === "#";
};

const adjacentsSeatsOccupied = (origY, origX, seats) => {
  let seatsOccupied = 0;
  for (let i = 0; i < 8; i++) {
    const [x, y] = offSets[i];
    seatsOccupied += isOccupied(seats, origY + y, origX + x) ? 1 : 0;
  }

  return seatsOccupied;
};

const adjSeatsOccUpto8Sqrs = (origY, origX, seats) => {
  let seatsOccupied = 0;
  for (let i = 0; i < 8; i++) {
    const [x, y] = offSets[i];
    let j;
    let [newX, newY] = [x + origX, y + origY];
    while (
      newX >= 0 &&
      newY >= 0 &&
      newX < seats[0].length &&
      newY < seats.length
    ) {
      if (seats[newY][newX] === "#") {
        seatsOccupied++;
        break;
      }

      if (seats[newY][newX] === "L") break;

      [newX, newY] = [x + newX, y + newY];
    }
  }

  return seatsOccupied;
};

const getSeatStatus = (adjacentSeats, seat, tolerateLimit = 5) => {
  const status = {
    L: (adjacentSeats) => (adjacentSeats === 0 ? "#" : "L"),
    "#": (adjacentSeats) => (adjacentSeats >= tolerateLimit ? "L" : "#"),
    ".": () => ".",
  };

  return status[seat](adjacentSeats);
};

const change = (seats, fn) => {
  const newArrangement = [];
  for (let i = 0; i < seats.length; i++) {
    newArrangement[i] = [];
    for (let j = 0; j < seats[0].length; j++) {
      const adjacentSeats = fn(i, j, seats);
      newArrangement[i].push(
        getSeatStatus(
          adjacentSeats,
          seats[i][j],
          fn === adjSeatsOccUpto8Sqrs ? 5 : 4
        )
      );
    }
  }

  return newArrangement;
};

const estimateArrangement = (seats, fn) => {
  const arrangements = {};
  let occupiedSeats = change(seats, fn);
  let arrangement = join(occupiedSeats);
  while (!(arrangement in arrangements)) {
    arrangements[arrangement] = true;
    occupiedSeats = change(occupiedSeats, fn);
    arrangement = join(occupiedSeats);
  }

  return calculate(occupiedSeats);
};

const main = (fn = adjacentsSeatsOccupied) => {
  const input = Deno.readTextFileSync("input.txt")
    .split("\r\n")
    .map((x) => x.split(""));
  const example = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`
    .split("\n")
    .map((x) => x.split(""));
  return estimateArrangement(input, fn);
};

console.log(main(adjSeatsOccUpto8Sqrs));
