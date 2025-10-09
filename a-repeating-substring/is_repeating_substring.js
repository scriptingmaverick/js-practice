function getNewStr(subStr, strLength) {
  return subStr.repeat(strLength / subStr.length);
}

function checkSubstrings(string, startIndex, endIndex) {
  if (endIndex > Math.floor(string.length / 2)) {
    return false;
  }

  let repeatedSubStr = string.slice(startIndex, endIndex);
  repeatedSubStr = getNewStr(repeatedSubStr, string.length);

  if (repeatedSubStr === string) {
    return true;
  }

  return checkSubstrings(string, startIndex, endIndex + 1);
}

function isARepeatedSubstr(string) {
  return checkSubstrings(string, 0, 1);
}

function createMessage(array, result, expected) {
  const description = createDesc(array, result);
  const isPassed = `[${result}]` === `[${expected}]`;
  const emoji = isPassed ? `〈⌃⌄⌃〉  ` : `〈⌃⍘⌃〉  `;
  const suffix = isPassed ? ' (\x1b[32mpassed\x1b[0m)'
    : ' (\x1b[31mfailed\x1b[0m)';
  const failedMsg = `${description}\t${suffix}
  \n\t |  input : ${array}  |
  \t |  expected : ${expected}  |
  \t |  actual : ${result}  |`;
  const passedMsg = description + suffix;
  return emoji + (isPassed ? passedMsg : failedMsg);
}

function createDesc(array, result) {
  return `[${array}]  =>   ${result}`;
}

function testIsARepeatedSubstr(sentence, expected) {
  const result = isARepeatedSubstr(sentence);
  const message = createMessage(sentence, result, expected);
  console.log("\n" + message);
}

function testAll() {
  console.log("\n\t-- is OG string constructed by repeating substrings --");
  testIsARepeatedSubstr('abab', true);
  testIsARepeatedSubstr('aba', false);
  testIsARepeatedSubstr('abcabc', true);
  testIsARepeatedSubstr('abcabcabcabc', true);
  testIsARepeatedSubstr('aaa', true);
  testIsARepeatedSubstr('acab', false);
}

testAll();
