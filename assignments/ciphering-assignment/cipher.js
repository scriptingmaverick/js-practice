function encodeObject(array, index, result) {
  if (index === array.length) {
    return result + 'e';
  }

  return encodeObject(array, index + 1, result + encode(array[index]))
}

function encode(jsData) {
  switch (typeof jsData) {
    case 'number':
      return `i${jsData}e`;
    case 'string':
      return `${jsData.length}:${jsData}`;
    case 'object':
      return encodeObject(jsData, 0, 'l');
  }
}

function decodeObject(benCode, index, result) {
  if (index === benCode.length - 1) {
    return [result, index];
  }

  if (benCode[index] === 'e') {
    return decodeObject(benCode, index + 1, result)
  }

  const decodedText = decode(benCode.slice(index), true);
  result.push(decodedText[0])
  return decodeObject(benCode, index + decodedText[1], result);
}

function formatData(data, askForIndex) {
  if (askForIndex) {
    return [data[0], data[1]];
  }
  return data[0];
}

function decode(benCode, askForIndex = false) {
  if (benCode[0] === 'i') {
    const stringEndIndex = benCode.indexOf('e');
    const data = parseInt(benCode.slice(1, stringEndIndex));
    return formatData([data, stringEndIndex], askForIndex);
  }

  if (!isNaN(parseInt(benCode[0]))) {
    const numberEndIndex = benCode.indexOf(':');
    const lengthOfString = parseInt(benCode.slice(0, numberEndIndex));
    const stringEndIndex = numberEndIndex + 1 + lengthOfString;
    const data = benCode.slice(numberEndIndex + 1, stringEndIndex);
    return formatData([data, stringEndIndex], askForIndex);
  }

  if (benCode[0] === 'l') {
    return formatData(decodeObject(benCode, 1, []), askForIndex);
  }
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

function testCipher(data, expected, isToEncode = true) {
  const result = isToEncode ? encode(expected) : decode(data);
  const msgData = isToEncode ? expected : data;
  const msgExpected = isToEncode ? data : expected;
  const message = createMessage(msgData, result, msgExpected, isToEncode);
  console.log("\n" + message);
  return !isToEncode ? '' : testCipher(data, expected, false);
}

function testAll() {
  console.log("\n\t--- Quantum Leap Initiative ( Cipherin' ) ---");
  testCipher('i123e', 123);
  testCipher('i0e', 0);
  testCipher('i-21e', -21);
  testCipher('3:-21', '-21');
  testCipher('0:', '');
  testCipher('16:special!@#$chars', 'special!@#$chars');
  testCipher('le', []);
  testCipher('li123ee', [123]);
  testCipher('li123ei231e4:haiee', [123, 231, 'haie']);
  testCipher("l5:applei123el6:bananai-5eee", ["apple", 123, ["banana", -5]]);
  testCipher("l3:onel3:twol5:threeeee", ["one", ["two", ["three"]]]);
  testCipher("l0:i0elee", ['', 0, []]);
}

testAll();
