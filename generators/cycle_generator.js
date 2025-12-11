function* cycler(data) {
  let canCycle = true;
  while (true) {
    yield canCycle ? data : data.toReversed();
    canCycle = !canCycle;
  }
}

const cycle1to5 = cycler([1, 2, 3, 4, 5]);

const cyclesWanted = 5;

console.log([...cycle1to5.take(cyclesWanted).flatMap((x) => x)]);
