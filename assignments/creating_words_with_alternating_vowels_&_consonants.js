let newWord = '';
let mutableString = '';
let wordsString = '';
let remainingLetters = '';
let lastLetter = '';

function generateWords(string) {
  wordsString = '';
  mutableString = string;

  while (mutableString.length > 0) {
    generateNewWord();
  }

  return wordsString;
}

function generateNewWord() {
  newWord = mutableString[0];
  remainingLetters = '';
  lastLetter = isVowel(mutableString[0]) ? 'vowel' : 'consonant';
  createWord();
  wordsString += newWord + (remainingLetters.length > 0 ? ', ' : '');
  mutableString = remainingLetters;
}

function createWord() {
  for (let index = 1; index < mutableString.length; index++) {
    if (checkIsVowel(mutableString[index], lastLetter)) {
      newWord += mutableString[index];
      lastLetter = 'vowel';
    } else if (checkIsConsonant(mutableString[index], lastLetter)) {
      newWord += mutableString[index];
      lastLetter = 'consonant';
    } else {
      remainingLetters += mutableString[index];
    }
  }
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