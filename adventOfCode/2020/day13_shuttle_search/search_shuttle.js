const getBusesAt = (time, busIds) => {
  const validBuses = busIds
    .split(",")
    .filter((x) => x !== "x")
    .map(Number);

  return validBuses.reduce(
    (buses, busId) =>
      (buses[busId] = [
        Math.floor(time / busId) * busId,
        Math.ceil(time / busId) * busId,
      ]) && buses,
    {}
  );
};

const searchNextBus = (shuttleData) => {
  const [time, busIds] = shuttleData;
  const nextBus = { minWT: Infinity, busId: 0 };
  const busesAtSpecifiedTime = getBusesAt(+time, busIds);
  for (const bus in busesAtSpecifiedTime) {
    const [first, last] = busesAtSpecifiedTime[bus];
    const prevTime = nextBus.minWT;
    if (time > first)
      nextBus.minWT = nextBus.minWT > last - time ? last - time : nextBus.minWT;
    else if (time === first) nextBus.minWT = 0;
    if (nextBus.minWT === prevTime) continue;
    nextBus.busId = bus;
    console.log(nextBus);
  }

  return nextBus.minWT * +nextBus.busId;
};

const calcEarliestTimeStamp = (busIds) => {
  const buses = busIds
    .split(",")
    .map((x, i) => [x, i])
    .filter((x) => x[0] !== "x")
    .map((x) => [+x[0], x[1]]);

  let step = buses[0][0];
  let meetTime = 0;
  for (let i = 1; i < buses.length; i++) {
    while ((meetTime + buses[i][1]) % buses[i][0] !== 0) {
      console.log("hiii");
      meetTime += step;
    }
    step *= buses[i][0];
  }

  console.log(buses, meetTime);
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `939
7,13,x,x,59,x,31,19`.split("\n");
  return calcEarliestTimeStamp(input[1]);
};

console.log(main());
