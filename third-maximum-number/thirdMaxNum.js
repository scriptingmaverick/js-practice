function thirdMaxNum(array) {
  return findThirdMaxNum(array.sort(), 0, array.length - 1, 0);
}

function findThirdMaxNum(array, maxNum, index, counter) {
  if (index === -1 || counter === 3) {
    return counter === 3 ? [maxNum, true] : [array.at(-1), false];
  }

  const newMax = array[index];
  let newIndex = index;
  while (array[newIndex] === newMax) {
    newIndex--;
  }

  return findThirdMaxNum(array, newMax, newIndex, counter + 1);
}

function createMessage(dimensions, result, expected) {
  const description = createDesc(result);
  const isPassed = `${result[0]}` === `${expected}`;
  const emoji = isPassed ? `〈⌃⌄⌃〉  ` : `〈⌃⍘⌃〉  `;
  const suffix = isPassed ? ' (\x1b[32mpassed\x1b[0m)'
    : ' (\x1b[31mfailed\x1b[0m)';
  const failedMsg = `${description}\t${suffix}
  \n\t |  input : ${description} , [${dimensions}]  |
  \t |  expected : ${expected}  |
  \t |  actual : ${result[0]}  |`;
  const passedMsg = `${description}  ${suffix}`;
  return emoji + (isPassed ? passedMsg : failedMsg);
}

function createDesc(result) {
  return result[0] + ' is the ' + (result[1] ? '3rd ' : '') + 'max number';
}

function testMaxNum(array, expected) {
  const result = thirdMaxNum(array);
  const message = createMessage(array, result, expected);
  console.log("\n" + message);
}

function underlinedText(text) {
  return '\n\t\t\t\t' + text + ' \n\t\t\t\t' + '_'.repeat(text.length) + '\n';
}

function testAll() {
  console.log(underlinedText('third maximum number'));
  testMaxNum([3, 4, 5, 2], 3);
  testMaxNum([1, 4, 5, 1], 1);
  testMaxNum([1, 4, 1], 4);
  testMaxNum([5, 4, 5], 5);
  testMaxNum([7, 9], 7);
}

testAll();
