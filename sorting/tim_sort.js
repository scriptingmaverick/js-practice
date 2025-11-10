const insertionSort = (data) => {
  const sortedData = data;
  for (let i = 0; i < data.length; i++) {
    if (sortedData[i] > sortedData[i + 1]) {
      let prev_index = i + 1;
      while (
        prev_index > 0 &&
        sortedData[prev_index] < sortedData[prev_index - 1]
      ) {
        const temp = sortedData[prev_index];
        sortedData[prev_index] = sortedData[prev_index - 1];
        sortedData[prev_index - 1] = temp;
        prev_index--;
      }
    }
  }
};

const seperateRuns = (runs, elem, index, array) => {
  if (runs.length >= 1) {
    const runsLength = runs.length - 1;
    if (runs[runsLength][1] === "asc") {
      console.log(runsLength, runs);
      const ascArr = runs[runsLength][0];
      if (elem > ascArr[ascArr.length - 1]) {
        ascArr.push(elem);
      } else {
        runs.push([[elem], elem > array[index + 1] ? "desc" : "asc"]);
      }
      return runs;
    }

    const descArr = runs[runsLength][0];
    if (elem < descArr[descArr.length - 1]) {
      descArr.push(elem);
      if (index === array.length - 1) insertionSort(descArr);
    } else {
      insertionSort(descArr);
      runs.push([[elem], elem > array[index + 1] ? "desc" : "asc"]);
    }
    return runs;
  }

  runs.push([[elem], elem > array[index + 1] ? "desc" : "asc"]);
  return runs;
};

const timSort = (array) => {
  // if (array.length < 32) {
  //  insertionSort(array);
  // }
  const runs = array.reduce(seperateRuns, []).map((x) => [x[0]]);
  console.log(runs);
};

const randomElement = (upper, lower) =>
  lower + Math.floor(Math.random() * (upper - lower));

const randomData = (noOfElements) => {
  const data = [];
  for (let i = 0; i < noOfElements; i++) {
    data.push(randomElement(1, 100));
  }

  return data;
};
const arr = randomData(randomElement(0, 10));
console.log(arr);
timSort([12, 56, 87, 98, 23, 46, 34, 18, 34, 12]);
// console.log(arr);
