function romanToNumber(romanNum) {
  return findNumeralValue(romanNum, 2, 1, numericalValue(romanNum.at(-1)));
}

function numericalValue(char) {
  switch (char) {
    case 'I':
      return 1;
    case 'V':
      return 5;
    case 'X':
      return 10;
    case 'L':
      return 50;
    case 'C':
      return 100;
    case 'D':
      return 500;
    case 'M':
      return 1000;
    default:
      return 0;
  }
}

function findNumeralValue(romanNum, index, prev, numeralValue) {
  if (index > romanNum.length) {
    return numeralValue;
  }

  if(numericalValue(romanNum.at(-prev)) <= numericalValue(romanNum.at(-index))){
    numeralValue += numericalValue(romanNum.at(-index));
  }else{
    numeralValue -= numericalValue(romanNum.at(-index));
  }

  return findNumeralValue(romanNum,index+1,prev+1,numeralValue)
}

function createMessage(input, expected, result, desc) {
  const isPassed = result === expected;
  const emoji = isPassed ? `✅  ` : `❌  `;
  const inputFormat = `\n\n\t |  input : [${input}]  |\n`;
  const expectedFormat = `\t |  expected : ${expected}  |\n`;
  const outputFormat = `\t |  actual : ${result}  |`;
  const description = desc + inputFormat + expectedFormat + outputFormat;
  const message = emoji + (isPassed ? desc : description);

  return message;
}

function testRomanConversion(input, expected, desc) {
  const result = romanToNumber(input);
  const message = createMessage(input, expected, result, desc);
  console.log(message);
}

function testAll() {
  console.log("\n------- Roman To Number  ---------\n");
  // Basic Roman Numerals
  testRomanConversion('I', 1, 'Testing basic numeral I');
  testRomanConversion('V', 5, 'Testing basic numeral V');
  testRomanConversion('X', 10, 'Testing basic numeral X');
  testRomanConversion('L', 50, 'Testing basic numeral L');
  testRomanConversion('C', 100, 'Testing basic numeral C');
  testRomanConversion('D', 500, 'Testing basic numeral D');
  testRomanConversion('M', 1000, 'Testing basic numeral M');

  // Simple Addition
  testRomanConversion('III', 3, 'Adding identical numerals');
  testRomanConversion('VII', 7, 'Adding a smaller numeral after a larger one');
  testRomanConversion('LVIII', 58, 'Combination of several additions');

  // Basic Subtraction
  testRomanConversion('IV', 4, 'Subtraction: I from V');
  testRomanConversion('IX', 9, 'Subtraction: I from X');
  testRomanConversion('XL', 40, 'Subtraction: X from L');
  testRomanConversion('XC', 90, 'Subtraction: X from C');
  testRomanConversion('CD', 400, 'Subtraction: C from D');
  testRomanConversion('CM', 900, 'Subtraction: C from M');

  // Combinations of Addition and Subtraction
  testRomanConversion('XXIV', 24, 'Combination for a small number');
  testRomanConversion('CDLXXXIX', 489, 'Combination for a larger number');
  testRomanConversion('MCMXCIV', 1994, 'Complex combination from example');

  // Edge Cases
  testRomanConversion('', 0, 'An empty string should return 0');
}

testAll();
