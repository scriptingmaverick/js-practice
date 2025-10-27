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

function decode(benCode) {
  if (benCode[0] === 'i') {
    const numberEndIndex = benCode.indexOf('e');
    return parseInt(benCode.slice(1, numberEndIndex))
  }

  if (!isNaN(parseInt(benCode[0]))) {
    const numberEndIndex = benCode.indexOf(':');
    const lengthOfString = parseInt(benCode.slice(0, numberEndIndex));
    return benCode.slice(numberEndIndex + 1, numberEndIndex + 1 + lengthOfString);
  }

}

function createMessage(data, result, expected, isToEncode) {
  const description = createDesc(data, result, isToEncode);
  const isPassed = `[${result}]` === `[${expected}]`;
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

function testCipher(data, expected, isToEncode = false) {
  const result = isToEncode ? encode(data) : decode(data);
  const message = createMessage(data, result, expected, isToEncode);
  console.log("\n" + message);
}

function testAll() {
  console.log("\n\t--- Quantum Leap Initiative ( Cipherin' ) ---");
  testCipher(123, 'i123e', true);
  testCipher(0, 'i0e', true);
  testCipher(-21, 'i-21e', true);
  testCipher('-21', '3:-21', true);
  testCipher('hello wor;d', '11:hello wor;d', true);
  testCipher('special!@#$chars', '16:special!@#$chars', true);
  testCipher([], 'le', true);
  testCipher(["apple", 123, ["banana", -5]], 'l5:applei123el6:bananai-5eee', true);
  testCipher(["one", ["two", ["three"]]], 'l3:onel3:twol5:threeeee', true);
  testCipher(["", 0, []], "l0:i0elee", true);
  testCipher([0, "", ["test"]], "li0e0:l4:testee", true);
  
  testCipher('i123e', 123);
  testCipher('i0e', 0);
  testCipher('i-21e', -21);
  testCipher('3:-21', '-21');
  testCipher('11:hello wor;d', 'hello wor;d');
  testCipher('16:special!@#$chars', 'special!@#$chars');
}

testAll();
