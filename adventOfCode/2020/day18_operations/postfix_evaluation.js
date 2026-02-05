const putIntoStack = (stack, char) => {
  const operators = { "+": true, "*": true, "(": true };
  const edgeChars = { "(": true, undefined: true };
  if (!(char in operators) && !(stack.at("-1") in edgeChars)) {
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
    let char = expression.shift();
    if (char === ")") {
      char = stack.pop();
      stack.pop();
    }
    putIntoStack(stack, char);
  }

  return stack;
};

const main = () => {
  const input = [
    "1 + 2 * 3 + 4 * 5 + 6",
    "1 + (2 * 3) + (4 * (5 + 6))",
    "5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))",
    "5 + (8 * 3 + 9 + 3 * 4 * 3)",
    "((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2",
    "2 * 3 + (4 * 5)",
    "(9 + (5 + 2 + 2 * 4) * (7 + 7 * 5 * 3) + 7) + 2 + 4 * 2 + 3 * (8 + 5)",
  ].map(
    (x) => x.replaceAll(" ", "").split(""),
  );

  // for (const expr of input) {
  //   const exp1 = expr.slice();
  //   const result = evaluate(expr);
  //   console.log({ exp1, result });
  // }
  const expressions = Deno.readTextFileSync("input.txt").split("\n");
  const result = [];

  for (const expression of expressions) {
    const expr = expression.replaceAll(" ", "").split("");
    result.push(evaluate(expr).at(-1));
  }

  console.log(result.reduce((acc, el) => acc + el, 0));
};

main();
