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

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `939
7,13,x,x,59,x,31,19`.split("\n");
  return searchNextBus(input);
};

console.log(main());
