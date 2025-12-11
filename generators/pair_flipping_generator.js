function* pairFlipper(data) {
  let i = 0;
  while (i < data.length) {
    yield data.slice(i, i + 2).reverse();
    i += 2;
  }
}

const flippedPairs = pairFlipper([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

console.log([...flippedPairs.flatMap((x) => x)]);
