const putIntoStack = (stack, char) => {
  const operators = { "+": true, "*": true, "(": true };
  if (!(char in operators) && stack.at("-1") === "+") {
    const operator = stack.pop();
    const operand2 = stack.pop();

    // console.log({ stack, operand2, char, operator });
    stack.push(eval(`${char}${operator}${operand2}`));
    return;
  }

  stack.push(char);
};

const evaluate = (expression) => {
  const stack = [];
  while (expression.length > 0) {
    putIntoStack(stack, expression.shift());
  }

  return eval(stack.join(""));
};

const assess = (expression) => {
  let l = 0;
  while (expression.indexOf("(") > -1) {
    l = l || expression.indexOf("(");
    let r = l;
    while (true) {
      r++;
      if (expression[r] === "(") {
        l = r;
        break;
      }

      if (expression[r] === ")") {
        const subExpression = expression.slice(l + 1, r);
        const result = evaluate(subExpression);
        expression.splice(l, r - l + 1, result);
        l = 0;
        break;
      }
    }
  }

  return evaluate(expression);
};

const main = () => {
  // const input = [
  //   "1 + 2 * 3 + 4 * 5 + 6",
  //   "1 + (2 * 3) + (4 * (5 + 6))",
  //   "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))",
  //   "5 + (8 * 3 + 9 + 3 * 4 * 3)",
  //   "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2",
  //   "2 * 3 + (4 * 5)",
  //   "(9 + (5 + 2 + 2 * 4) * (7 + 7 * 5 * 3) + 7) + 2 + 4 * 2 + 3 * (8 + 5)",
  // ].map((x) => x.replaceAll(" ", "").split(""));

  // for (const expr of input) {
  //   const expression = expr.slice();
  //   const result = assess(expression);
  //   console.log({ expression: expr.join(""), result });
  // }

  const expressions = Deno.readTextFileSync("input.txt").split("\n");
  const result = [];

  for (const expression of expressions) {
    const expr = expression.replaceAll(" ", "").split("");
    result.push(assess(expr));
  }

  console.log(result.reduce((acc, el) => acc + el, 0));
};

main();
