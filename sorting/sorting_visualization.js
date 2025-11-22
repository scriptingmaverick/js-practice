let FORMATTED_DATA = [];
let PEAK_IN_DATA = 0;

const black = (text) => "\x1B[30m" + text + "\x1B[0m";
const red = (text) => "\x1B[31m" + text + "\x1B[0m";
const green = (text) => "\x1B[32m" + text + "\x1B[0m";
const yellow = (text) => "\x1B[33m" + text + "\x1B[0m";
const blue = (text) => "\x1B[34m" + text + "\x1B[0m";
const magenta = (text) => "\x1B[35m" + text + "\x1B[0m";
const cyan = (text) => "\x1B[36m" + text + "\x1B[0m";
const white = (text) => "\x1B[37m" + text + "\x1B[0m";

const repeat = (length, char = "_", color = white) =>
  color(char.repeat(length));
const spaceLine = (length) => repeat(length, " ");
const hollowLine = (length, color = white) => {
  const line = color("|") + repeat(length - 2, " ") + color("|");
  return line;
};

const lessThan = (data, range) => data <= range;
const greaterThan = (data, range) => !lessThan(data, range);
const divide = (divisor, dividend) => Math.ceil(divisor / dividend);
const min = (arr) => Math.min(...arr);
const max = (arr) => Math.max(...arr);
const pad = (string, length) => {
  const remainValue = length - string.length;
  const start = Math.ceil(remainValue / 2);
  return string.padStart(start + string.length).padEnd(length);
};

const delay = (number = 1) => {
  for (let i = 0; i < 2200000000 * number; i++) {}
};

const stepsForNumbers = (numbers) => {
  const smallestNum = min(numbers);
  const maxNum = max(numbers);
  let stepValue = 5;

  for (let i = 2; i <= 10; i++) {
    if (divide((smallestNum - maxNum) / i) <= 5) {
      stepValue = i;
      break;
    }
  }

  return numbers.map((elem) => [
    elem,
    divide(elem, stepValue < 5 ? 5 : stepValue),
  ]);
};

const createNumRect = (steps, number, color = white) => {
  const rectangle = [];
  number = "" + number;
  let numLength = number.length >= 3 ? number.length + 2 : 4;
  for (let i = PEAK_IN_DATA; i > steps; i--) {
    rectangle.push(spaceLine(numLength));
  }
  rectangle.push(pad(number, numLength));
  rectangle.push(" " + repeat(numLength - 2, "_", color));
  for (let i = steps - 1; i > 0; i--) {
    rectangle.push(hollowLine(numLength, color));
  }

  return rectangle;
};

const stepsForNumber = (number) =>
  FORMATTED_DATA.filter((elem) => elem[0] === number)[0][1];

const showData = (
  data,
  [i, j, k] = [],
  sortedInd = -1,
  sortChecker = lessThan,
  canClear = true
) => {
  const rectangles = data.map((elem, index) => {
    if (index === k) {
      return createNumRect(stepsForNumber(elem), elem, red);
    }

    if (index === i || index === j) {
      return createNumRect(stepsForNumber(elem), elem, yellow);
    }

    if (sortChecker(index, sortedInd)) {
      return createNumRect(stepsForNumber(elem), elem, green);
    }

    return createNumRect(stepsForNumber(elem), elem);
  });

  if (canClear) {
    console.clear();
  }

  let tile = "";
  for (let i = 0; i < PEAK_IN_DATA; i++) {
    tile = rectangles.reduce((res, elem) => (res += elem[i] + "\t"), " ");
    console.log(tile);
  }
  const repeatLength = tile.length;
  console.log(repeat(repeatLength - 10, "-"));
  delay();
};

function bubbleSort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data.length - i - 1; j++) {
      if (sortedData[j] > sortedData[j + 1]) {
        showData(sortedData, [j, j + 1], data.length - i - 1, greaterThan);
      //   const temp = sortedData[j];
      //   sortedData[j] = sortedData[j + 1];
      //   sortedData[j + 1] = temp;
      [sortedData[j], sortedData[j + 1]] = [sortedData[j+1], sortedData[j]]
    }
      showData(sortedData, [j, j + 1], data.length - i - 1, greaterThan);
    }
  }
  showData(sortedData, [], -1, greaterThan);
  return sortedData;
}

function selectionSort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (sortedData[j] < sortedData[i]) {
        showData(sortedData, [i, j], i);
        const temp = sortedData[i];
        sortedData[i] = sortedData[j];
        sortedData[j] = temp;
      }
      showData(sortedData, [i, j], i);
    }
  }
  showData(sortedData, [], data.length - 1);
  return sortedData;
}

function insertionSort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length - 1; i++) {
    showData(sortedData, [i, i + 1], i - 1);
    if (sortedData[i] > sortedData[i + 1]) {
      let prev_index = i + 1;
      while (
        prev_index > 0 &&
        sortedData[prev_index] < sortedData[prev_index - 1]
      ) {
        showData(sortedData, [-1, prev_index - 1, prev_index], i - 1);
        const temp = sortedData[prev_index];
        sortedData[prev_index] = sortedData[prev_index - 1];
        sortedData[prev_index - 1] = temp;
        prev_index--;
        showData(sortedData, [-1, prev_index + 1, prev_index], i - 1);
      }
    }
  }
  showData(sortedData, [], data.length - 1);
  return sortedData;
}

const merge = (data, lowerBound, mid, upperBound) => {
  let i = lowerBound;
  let j = mid;
  let k = lowerBound;
  const sortedData = [];
  while (i < mid && j < upperBound) {
    showData(data, [i, j], -1, lessThan, false);
    if (data[i] < data[j]) {
      sortedData[k++] = data[i++];
    } else {
      sortedData[k++] = data[j++];
    }
    showData(data, [i, j], -1, lessThan, false);
    showData(sortedData.slice(lowerBound), [-1, -1, k], sortedData.length);
  }

  while (j < upperBound) {
    showData(data, [i, j], -1, lessThan, false);
    sortedData[k++] = data[j++];
    showData(sortedData.slice(lowerBound), [-1, -1, k], sortedData.length);
  }

  while (i < mid) {
    showData(data, [i, j], -1, lessThan, false);
    sortedData[k++] = data[i++];
    showData(sortedData.slice(lowerBound), [-1, -1, k], sortedData.length);
  }

  for (let i = lowerBound; i < upperBound; i++) {
    data[i] = sortedData[i];
  }
};

const divideArrays = (data, start, end) => {
  const mid = Math.floor((end + start) / 2);
  if (mid > start) {
    divideArrays(data, start, mid);
    divideArrays(data, mid, end);
    merge(data, start, mid, end);
  }
};

const mergeSort = (data) => {
  divideArrays(data, 0, data.length);
  showData(data, [], data.length);
};

function randomElement(upper, lower) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

function randomData(noOfElements) {
  const data = [];
  for (let i = 0; i < noOfElements; i++) {
    data.push(randomElement(10, 100));
  }

  return data;
}

function print(message, data) {
  console.log(`\n${message} : ${data}`);
}

function heading(text) {
  console.log(`\n\t\t${text}\n\t\t${"-".repeat(text.length)}`);
}

function testSort(noOfElements) {
  FORMATTED_DATA = [];
  PEAK_IN_DATA = 0;
  const data = randomData(noOfElements);
  // const data = [12, 67, 34, 89, 21];
  PEAK_IN_DATA = max(data);
  FORMATTED_DATA = stepsForNumbers(data);
  const sortChoice = prompt(
    "1. Bubble Sort \n 2. Selection Sort \n 3. Insertion Sort\n 4. Merge Sort\n 5. Quick Sort\n 6. Tim Sort"
  );
  switch (parseInt(sortChoice)) {
    case 1:
      return bubbleSort(data);
    case 2:
      return selectionSort(data);
    case 3:
      return insertionSort(data);
    case 4:
      return mergeSort(data);
    case 5:
      return quickSort(data);
    default:
      return timSort(data);
  }
}

testSort(5);
