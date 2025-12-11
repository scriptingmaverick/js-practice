function* chunker(data, chunkSize = 1, threshold = 0) {
  let i = 0;
  while (i < data.length) {
    yield data.slice(i, i + chunkSize);
    if (i + chunkSize >= data.length) return;
    i += chunkSize - threshold;
  }
}

const chunkWith1 = chunker([1, 2, 3, 4, 5, 6, 7]);
const chunkWith2 = chunker([1, 2, 3, 4, 5, 6, 7], 2);
const chunkWith3 = chunker([1, 2, 3, 4, 5, 6, 7], 3);

console.log([...chunkWith1]);
console.log([...chunkWith2]);
console.log([...chunkWith3]);

const chunkWithThreshold1Of2 = chunker([1, 2, 3, 4, 5, 6, 7, 8], 2, 1);
const chunkWithThreshold2Of3 = chunker([1, 2, 3, 4, 5, 6, 7], 3, 2);
const chunkWithThreshold3Of5 = chunker([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5, 3);

console.log([...chunkWithThreshold1Of2]);
console.log([...chunkWithThreshold2Of3]);
console.log([...chunkWithThreshold3Of5]);
