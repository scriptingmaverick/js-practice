const fn = (exp) => {
  let [res, op1] = [0, 0];
  while (exp.length > 0) {
    const elem = exp.shift();
    console.log(elem, op1, res, exp);
    if (elem === "+" || elem === "*") {
      op1 = eval(`${op1}${elem}${+exp.shift()}`);
      res = op1;
      continue;
    }
    op1 = +elem;
    console.log("changed -> ", op1, res);
  }

  return res;
};

const exmp = "1 + 2 * 3 + 4 * 5 + 6";

console.log("res -> ", fn(exmp.split(/ /)));
