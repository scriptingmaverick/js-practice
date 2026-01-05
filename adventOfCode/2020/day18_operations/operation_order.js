const perform = (operator, operands) => {
  const [op1, op2] = operands.splice(0, 2);
  operands.splice(0, 0, eval(`${op1}${operator}${op2}`));
};

const evaluate = (operators, operands) => {
  for (const operator of operators) {
    perform(operator, operands);
  }

  return operands;
};

const execute = (expression) => {
  console.log("exp -> ", expression);
  const stack = [];
  let top = 0;
  const operands = [];
  const operators = { "+": true, "*": true, "(": true };
  while (expression.length > 0) {
    const elem = expression.shift();
    if (elem in operators) {
      stack.push(elem);
      continue;
    }
    if (elem === ")") {
      let lastOperator = stack.at(-1);
      while (lastOperator !== "(") {
        console.log("before -> ", operands);
        perform(lastOperator, operands.reverse());
        operands.reverse();
        console.log("after -> ", operands);
        stack.pop();
        top--;
        lastOperator = stack.at(-1);
      }
      stack.pop();
      top--;
      continue;
    }

    operands.push(elem);
  }

  console.log("stack -> ", stack);
  console.log("operands -> ", operands);
  return evaluate(stack, operands);
};

const exmp1 = "1 + 2 * 3 + 4 * 5 + 6";
const exmp2 = "1 + (2 * (3 + 4) * 5) + 6";

const parse = (exp) =>
  exp
    .split(/[\(\)]/)
    .map((x) => x.split(" ").filter((x) => x !== ""))
    .filter((x) => x.length > 0);

const accurateParse = (exp) =>
  exp
    .split("(")
    .map((x) => x.split(")"))
    .map((x) => x.flatMap((y) => y.split(" ").filter((x) => x !== "")));

console.log(execute(exmp2.split("").filter((x) => x !== " ")));

// console.log("res -> ", evaluate(accurateParse(exmp1)[0]));
