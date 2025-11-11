const createDesc = function (input, result, message) {
  let helpingVerb = "are";
  if (!isObject(result)) {
    helpingVerb = "is";
  }

  const problem = isPassed
    ? " (\x1b[32mpassed\x1b[0m)"
    : " (\x1b[31mfailed\x1b[0m)";

  return `${message} [ ${input} ] ${helpingVerb} [${result}] ${problem}`;
};

const createMessage = function (input, result, expected, msg) {
  const isPassed = isObject(result)
    ? areDeepEqual(result, expected)
    : result === expected;
  const desc = createDesc(input, result, msg, isPassed);
  const emoji = isPassed ? `〈⌃⌄⌃〉  ` : `〈⌃⍘⌃〉  `;
  const description = `${desc} \n\n\t |  input : [${input}]  |
  \t |  expected : ${expected}  |
  \t |  actual : ${result}  |`;
  const message = emoji + (isPassed ? desc : description);
  return message;
};

const testFunctions = function ({ operation, input, expected, msg }) {
  let message = "";
  let result = "";
  if (!Array.isArray(input)) {
    message = createMessage(input, result, expected, msg);
    console.log("\n" + message);
    return;
  }

  result = operation(input);
  message = createMessage(input, result, expected, msg);
  console.log("\n" + message);
};

testFunctions({
  operation: add,
  input: [1, 2],
  expected: 5,
  msg: "addition of ",
});