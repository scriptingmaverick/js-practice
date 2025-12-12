import { identity, isEven } from "./general_data.js";

function* partitioner(data, predicate) {
  let i = 1;
  let bucketIndex = 0;
  while (i < data.length) {
    const prev_elem_state = predicate(data[i - 1]);
    const curr_elem_state = predicate(data[i]);
    if (prev_elem_state === curr_elem_state) {
      buckets[bucketIndex].push(data[i++]);
      continue;
    }
    yield buckets[bucketIndex++];
    buckets[bucketIndex] = [data[i++]];
  }

  yield buckets[bucketIndex];
}

const evenPartitioner = partitioner(
  [1, 2, 3, 1, 1, 1, 2, 3, 34, 4, 5, 3, 2],
  isEven
);

console.log([...evenPartitioner]);

const identityPartitioner = partitioner(
  [1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 3, 3, 3],
  identity
);

console.log([...identityPartitioner]);
