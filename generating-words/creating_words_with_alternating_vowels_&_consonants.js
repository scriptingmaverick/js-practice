function generateWords(string) {
  let mutableString = string;
  let answerString = '';

  while (mutableString.length > 0) {
    let newWord = mutableString[0];
    let lastLetter = isVowel(mutableString[0]) ? 'vowel' : 'consonant';
    let remainingString = '';

    for (let index = 1; index < mutableString.length; index++) {
      if (checkIsVowel(mutableString[index], lastLetter)) {
        newWord += mutableString[index];
        lastLetter = 'vowel';
      } else if (checkIsConsonant(mutableString[index], lastLetter)) {
        newWord += mutableString[index];
        lastLetter = 'consonant';
      } else {
        remainingString += mutableString[index];
      }
    }

    answerString += newWord + (remainingString.length > 0 ? ', ' : '');
    mutableString = remainingString;
  }

  return answerString;
}

function checkIsVowel(character, lastLetter) {
  return isVowel(character) && lastLetter === 'consonant';
}
function checkIsConsonant(character, lastLetter) {
  return !isVowel(character) && lastLetter === 'vowel';
}

function isVowel(char) {
  if (char === 'a' || char === 'e' || char === 'i') return true;

  if (char === 'o' || char === 'u') return true;

  return false;
}

function createMessage(string, expected, result) {
  const isSatisfied = result === expected ? '😎' : '☠️';
  const inputFormat = "  |  [ " + string + " ] ";
  const expectedFormat = " |  expected : [ " + expected + " ] ";
  const outputFormat = " |  output : [ " + result + " ]";
  const message = isSatisfied + inputFormat + expectedFormat + outputFormat;

  return message;
}

function testGenerating(string, expected) {
  const result = generateWords(string);
  const message = createMessage(string, expected, result);
  console.log("\n" + message);
}

function main() {
  testGenerating("apple", "ape, p, l");
  testGenerating("there", "tere, h");
  testGenerating("hello", "helo, l");
  testGenerating("abyss", "ab, y, s, s");
  testGenerating("this", "tis, h");
  testGenerating("command", "coman, m, d");
  testGenerating("structure", "sucure, t, r, t");
  testGenerating("thoughtworks", "togor, huh, t, w, k, s")
}

main();
