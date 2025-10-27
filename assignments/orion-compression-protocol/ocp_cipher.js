function addCharsToMsg(char, countOfChar, result) {
  if (countOfChar <= 1) {
    return result + char;
  }

  return result + countOfChar + '[' + char + ']';
}

function encodeMessage(data, currentIndex, startIndex, countOfChar, result) {
  if (currentIndex === data.length) {
    if (startIndex === currentIndex - 1) {
      return result;
    }
    return addCharsToMsg(data[currentIndex - 1], countOfChar, result);
  }

  if (data[currentIndex] !== data[currentIndex + 1]) {
    result = addCharsToMsg(data[currentIndex], countOfChar, result);
    return encodeMessage(data, currentIndex + 1, currentIndex, 1, result);
  }

  return encodeMessage(data, currentIndex + 1, startIndex, countOfChar + 1, result);
}

// function encodeMessage(data, index, startIndex, repeatValue, result) {
//   if(data[index] === ']'){
//     return result.repeat(repeatValue);
//   }
// }

function encode(data) {
  if (data.length === 1) {
    return data;
  }

  return encodeMessage(data, 0, 0, 1, '');
}

// function decodeMessage(data, index, result) {
//   if (index >= data.length) {
//     return result;
//   }

//   const numbers = '0123456789';
//   if (numbers.includes(data[index])) {
//     const endIndex = data.slice(index).indexOf('[');
//     const countOfChar = parseInt(data.slice(index, index + endIndex));
//     result = result + data[index + endIndex + 1].repeat(countOfChar);
//     return decodeMessage(data, index + endIndex + 3, result);
//   }

//   return decodeMessage(data, index + 1, result + data[index]);
// }

function decodeMessage(data, index, repeatValue, result) {
  console.log(`data = ${data} , -> index = ${index}, -> data in index = ${data[index]} , -> repeatValue = ${repeatValue} , -> result = ${result}`)
  if (data[index] === ']' || index >= data.length) {
    return result.repeat(repeatValue);
  }

  const numbers = '0123456789';
  if (numbers.includes(data[index])) {
    const numberEndIndex = data.indexOf('[');
    const newRepeatValue = parseInt(data.slice(index, numberEndIndex));
    const slicedData = data.slice(numberEndIndex + 1);
    index = data.indexOf(']');
    result += decodeMessage(slicedData, 0, newRepeatValue, '');
    return decodeMessage(data, index + 1, repeatValue, result);
  }

  return decodeMessage(data, index + 1, repeatValue, result + data[index]);
}

function decode(encodedData) {
  if (encodedData.length <= 1) {
    return encodedData;
  }

  return decodeMessage(encodedData, 0, 0, '');
}

function checkIndex(array1, array2, index) {
  return index === array1.length && index === array2.length;
}

function hasInnerArray(array1, array2) {
  return typeof array1 === 'object' && typeof array2 === 'object';
}

function compareArrays(array1, array2, index) {
  if (checkIndex(array1, array2, index)) {
    return true;
  }

  if (hasInnerArray(array1[index], array2[index])) {
    return compareArrays(array1[index], array2[index], 0);
  }

  if (array1[index] !== array2[index]) {
    return false;
  }
  return compareArrays(array1, array2, index + 1);
}

function areDeepEqual(array1, array2) {
  if (!hasInnerArray(array1, array2) || array1.length !== array2.length) {
    return false;
  }
  return compareArrays(array1, array2, 0);
}

function createMessage(data, result, expected, isToEncode) {
  const description = createDesc(data, result, isToEncode);
  const isPassed = areDeepEqual([expected], [result]);
  const emoji = isPassed ? `〈⌃⌄⌃〉  ` : `〈⌃⍘⌃〉  `;
  const suffix = isPassed ? ' (\x1b[32mpassed\x1b[0m)'
    : ' (\x1b[31mfailed\x1b[0m)';
  const inputFormat = `\n\n\t |  input : ${data}  |\n`;
  const expectedFormat = `\t |  expected : ${expected}  |\n`;
  const outputFormat = `\t |  actual : ${result}  |`;
  let failedMsg = description + inputFormat + expectedFormat;
  failedMsg += outputFormat + suffix;
  const passedMsg = description + suffix;
  return emoji + (isPassed ? passedMsg : failedMsg);
}

function createDesc(data, result, isToEncode) {
  const serilizationType = isToEncode ? 'encode' : 'decode';
  return `${data} ${serilizationType}d to => ${result}`;
}

function testOCP(data, expected, isToEncode = true) {
  const result = isToEncode ? encode(data) : decode(expected);
  const msgData = isToEncode ? data : expected;
  const msgExpected = isToEncode ? expected : data;
  const message = createMessage(msgData, result, msgExpected, isToEncode);
  console.log("\n" + message);
  return !isToEncode ? console.log('\n') : testOCP(data, expected, false);
}

function testAll() {
  console.clear();
  console.log("\n\t--- Orion Compression Protocol ( Cipherin' ) ---");
  testOCP("aaaabbc", "4[a]2[b]c");
  testOCP("xxxxxxxxxx", "10[x]");
  testOCP("abbbbcccaa", "a4[b]3[c]2[a]");
}

// testAll();

// console.log(decode("2[ab3[c]]"));
// console.log(decode("3[a2[bc]]"));
