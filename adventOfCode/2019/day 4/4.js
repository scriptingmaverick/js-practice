// You arrive at the Venus fuel depot only to discover it's protected by a password. The Elves had written the password on a sticky note, but someone threw it out.
// However, they do remember a few key facts about the password:
// It is a six-digit number.
// The value is within the range given in your puzzle input.
// Two adjacent digits are the same (like 22 in 122345).
// Going from left to right, the digits never decrease; they only ever increase or stay the same (like 111123 or 135679).
// Other than the range rule, the following are true:
// 111111 meets these criteria (double 11, never decreases).
// 223450 does not meet these criteria (decreasing pair of digits 50).
// 123789 does not meet these criteria (no double).
// How many different passwords within the range given in your puzzle input meet these criteria?

const isValidCode = (code) => {
  code = code.toString();
  if (code.length > 6 || code.length < 6) return;
  let isAdjacentsFound = false;
  for (let i = 0; i < code.length - 1; i++) {
    if (+code[i] > +code[i + 1]) return;
    if (+code[i] === +code[i + 1]) isAdjacentsFound = true;
  }

  if (!isAdjacentsFound) return;
  return code;
};

const part_1 = (range) => {
  const [start, end] = range.split("-");
  const result = [];
  for (let i = +start; i < +end; i++) {
    const code = isValidCode(i);
    if (code) result.push(code);
  }

  return result.length;
};

// console.log(part_1('183564-657474'))

// An Elf just remembered one more important detail: the two adjacent matching digits are not part of a larger group of matching digits.
// Given this additional criterion, but still ignoring the range rule, the following are now true:
// 112233 meets these criteria because the digits never decrease and all repeated digits are exactly two digits long.
// 123444 no longer meets the criteria (the repeated 44 is part of a larger group of 444).
// 111122 meets the criteria (even though 1 is repeated more than twice, it still contains a double 22).
// How many different passwords within the range given in your puzzle input meet all of the criteria?

const isValidcodeForpart2 = (code) => {
  code = code.toString();
  if (code.length > 6 || code.length < 6) return;
  const adjacentValues = {};
  let i = 0;
  while (i < code.length - 1) {
    if (+code[i] > +code[i + 1]) return;
    if (+code[i] === +code[i + 1]) {
      adjacentValues[+code[i]] = (adjacentValues[+code[i]] || 1) + 1;
    }
    i++;
  }
  console.log(adjacentValues);
  const repetitions = Object.values(adjacentValues);
  if (repetitions.length < 1) return;
  if (repetitions.indexOf(2) !== -1) return code;
};

const part_2 = (range) => {
  const [start, end] = range.split("-");
  const result = [];
  for (let i = +start; i <= +end; i++) {
    const code = isValidcodeForpart2(i);
    if (code) result.push(code);
  }

  return result.length;
};

// console.log(part_2('112233-112234'));
// console.log(part_2('123444-123444'));
// console.log(part_2('111122-111123'));

console.log(part_2("183564-657474"));
