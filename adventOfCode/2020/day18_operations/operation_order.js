const perform = (operator, operands) => {
  const [op1, op2] = operands.splice(0, 2);
  console.log(op1, operator, op2);
  operands.splice(0, 0, eval(`${op1}${operator}${op2}`));
  console.log("operands after ope ->", operands);
};

const handleOpenParenthesis = (expression, operands) => {
  let openCount = 1;
  let i = 0;
  while (openCount !== 0) {
    const elem = expression[i++];
    if (elem === "(") openCount++;
    if (elem === ")") openCount--;
  }

  return execute(expression.splice(0, i));
};

const execute = (expression) => {
  console.log("func called with exp -> ", expression);

  const stack = [];
  const operands = [];
  const operators = { "+": true, "*": true };
  let result = 0;
  while (expression.length > 0) {
    const elem = expression.shift();
    if (elem === "(") {
      console.log("handling ( -> ", elem);
      result = handleOpenParenthesis(expression, operands);
      console.log("cursor backed with ", result);
      continue;
    }

    if (elem === ")") {
      console.log("handling ) ", result);
      operands.push(result);
      continue;
    }

    if (elem in operators) {
      console.log("handling +,* ope ", elem);
      stack.push(elem);
      continue;
    }

    console.log("handling operands ", elem);
    operands.push(elem);
  }

  console.log("stack -> ", stack);
  console.log("operands -> ", operands);
  while (operands.length > 1) {
    perform(stack.shift(), operands);
  }

  return operands[0];
};

const exmp1 = "1 + 2 * 3 + 4 * 5 + 6";
const exmp2 = "1 + (2 * (3 + 4) * 5) + 6";
const ex = [
  "2 * 3 + (4 * 5)", // 26.
  "5 + (8 * 3 + 9 + 3 * 4 * 3)", // 437.
  "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))", // 12240.
  "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2", // 13632.
];

console.log(execute(ex[3].split("").filter((x) => x !== " ")));

// console.log("res -> ", evaluate(accurateParse(exmp1)[0]));
