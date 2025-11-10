let FORMATTED_DATA = [];
let PEAK_IN_DATA = 0;

const red = text => "\x1B[31m" + text + "\x1B[0m";
const green = text => "\x1B[32m" + text + "\x1B[0m";
const yellow = text => "\x1B[33m" + text + "\x1B[0m";
const blue = text => "\x1B[34m" + text + "\x1B[0m";
const magenta = text => "\x1B[35m" + text + "\x1B[0m";
const cyan = text => "\x1B[36m" + text + "\x1B[0m";

const divide = (divisor, dividend) => Math.ceil(divisor / dividend);
const minOf2 = (num1, num2) => num1 < num2 ? num1 : num2;
const min = (numbers) => numbers.reduce((result, currElem) => { result = minOf2(result, currElem); return result }, numbers[0]);

const stepsForNumbers = (numbers) => {
  const smallestNum = min(numbers);
  let stepValue = 5;
  for (let i = 2; i <= 10; i++) {
    if (Math.abs(smallestNum * i - PEAK_IN_DATA) <= 15) {
      stepValue = i;
    }
  }

  return numbers.map(elem => [elem, divide(elem, stepValue < 5 ? 5 : stepValue)]);
}

const maxOf2 = (num1, num2) => num1 > num2 ? num1 : num2;
const max = (numbers) => numbers.reduce((result, currElem) => { result = maxOf2(result, currElem); return result }, numbers[0]);

const repeat = (length, char = '_', canAddColor) => canAddColor ? yellow(char.repeat(length)) : char.repeat(length);
const spaceLine = (length) => repeat(length, ' ');
const hollowLine = (length, canAddColor) => {
  const line = '|' + repeat(length - 2, ' ') + '|';
  return canAddColor ? yellow(line) : line;
};

const pad = (string, length) => {
  const remainValue = length - string.length;
  const start = Math.ceil(remainValue / 2);
  return green(string.padStart(start + string.length).padEnd(length));
}

const createNumRect = (steps, number, canAddColor = false) => {
  const rectangle = [];
  number = ('' + number);
  let numLength = number.length >= 3 ? number.length + 2 : 4;
  for (let i = PEAK_IN_DATA; i > steps; i--) {
    rectangle.push(spaceLine(numLength, canAddColor));
  }
  rectangle.push(pad(number, numLength));
  rectangle.push(' ' + repeat(numLength - 2, '_', canAddColor));
  for (let i = steps - 1; i > 0; i--) {
    rectangle.push(hollowLine(numLength, canAddColor));
  }

  return rectangle;
}

const stepsForNumber = (number) => FORMATTED_DATA.filter((elem) => elem[0] === number)[0][1];

const delay = (number = 1) => { for (let i = 0; i < 2200000000 * number; i++) { } };

const showData = (data, i, j, msg = 'last') => {
  const rectangles = data.map(elem => {
    if (elem === data[i] || elem === data[j]) {
      return createNumRect(stepsForNumber(elem), elem, true);
    }
    return createNumRect(stepsForNumber(elem), elem)
  })
  console.clear();
  let tile = '';
  for (let i = 0; i < PEAK_IN_DATA; i++) {
    tile = rectangles.reduce((res, elem) => res += elem[i] + '\t', ' ');
    console.log(tile);
  }
  const repeatLength = tile.length + (tile.includes('\x1B[3') ? -4 : tile.length / 2) - 2;
  console.log(repeat(repeatLength, '-'));
  delay();
}

function bubbleSort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      if (sortedData[j] < sortedData[i]) {
        showData(sortedData, i, j, 'change');
        const temp = sortedData[i];
        sortedData[i] = sortedData[j];
        sortedData[j] = temp;
      }
      showData(sortedData, i, j, 'new');
    }
  }
  showData(sortedData, -1, -1, 'last');
  return sortedData;
}

function selectionSort(data) {
  const sortedData = data.slice();
  for (let i = 0; i < data.length; i++) {
    let swapIndex = i;
    for (let j = i + 1; j < data.length; j++) {
      if (sortedData[j] < sortedData[swapIndex]) {
        swapIndex = j;
      }
      showData(sortedData, swapIndex, j, 'change');
    }
    if (swapIndex !== i) {
      const temp = sortedData[i];
      sortedData[i] = sortedData[swapIndex];
      sortedData[swapIndex] = temp;
    }
    showData(sortedData, i, swapIndex, 'new');
  }

  showData(sortedData, -1, 0, 'last');
  return sortedData;
}

function insertionSort(data) {

}

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
  console.log(`\n\t\t${text}\n\t\t${'-'.repeat(text.length)}`);
}

function testSort(noOfElements) {
  FORMATTED_DATA = [];
  PEAK_IN_DATA = 0;
  const data = randomData(noOfElements);
  PEAK_IN_DATA = max(data);
  FORMATTED_DATA = stepsForNumbers(data);
  const sortChoice = prompt('1. bubble sort \n 2. selection sort \n 3. insertion sort');
  switch (parseInt(sortChoice)) {
    case 1: return bubbleSort(data);
    case 2: return selectionSort(data);
    default: return insertionSort(data);
  }
}

testSort(5);