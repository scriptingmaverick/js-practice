const chain = (adapters) => {
  const sortedAdapters = adapters.sort((a, b) => a - b);
  const diffrences = {
    1: 0,
    2: 0,
    3: 1,
  };

  let currentAdapter = 0;
  for (let i = 0; i < sortedAdapters.length; i++) {
    const differece = sortedAdapters[i] - currentAdapter;
    console.log(differece, currentAdapter, sortedAdapters[i]);
    diffrences[differece]++;
    currentAdapter = sortedAdapters[i];
  }

  return diffrences;
};

const tribonacciOf = (n) => {
  let firstTerm = 1;
  let secondTerm = 1;
  let thirdTerm = 2;
  for (let i = 0; i < n - 1; i++) {
    const newTerm = firstTerm + secondTerm + thirdTerm;
    firstTerm = secondTerm;
    secondTerm = thirdTerm;
    thirdTerm = newTerm;
  }

  return firstTerm;
};

const distictPaths = (adapters) => {
  const sortedAdapters = adapters.sort((a, b) => a - b);
  sortedAdapters.unshift(0);
  const buckets = [[1]];
  let currentAdapter = 0;
  let i = 0;
  while (i < sortedAdapters.length) {
    const differece = sortedAdapters[i] - currentAdapter;
    let k = 1;
    if (buckets.at(-1).at(-1) !== differece) {
      let newDifference = sortedAdapters[i + k] - sortedAdapters[i];
      k++;
      while (newDifference !== 1 && i + k < sortedAdapters.length) {
        newDifference = sortedAdapters[i + k] - sortedAdapters[i + k - 1];
        k++;
      }
      buckets.push([newDifference]);
    }
    buckets.at(-1).splice(-1, 0, sortedAdapters[i]);
    currentAdapter = sortedAdapters[i++];
  }
  const retunableData = buckets.map((x) => x);
  console.log(retunableData);
  return buckets
    .map((x) => x.length - 1)
    .map(tribonacciOf)
    .reduce((product, ele) => ele * product, 1);
};

const main = (fn = chain) => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n").map(Number);
  const example = `16\n10\n15\n5\n1\n11\n7\n19\n6\n12\n4`
    .split("\n")
    .map(Number);
  const ane =
    `28\n33\n18\n42\n31\n14\n46\n20\n48\n47\n24\n23\n49\n45\n19\n38\n39\n11\n1\n32\n25\n35\n8\n17\n7\n9\n4\n2\n34\n10\n3`
      .split("\n")
      .map(Number);
  return fn(input);
};

console.log(main(distictPaths));
