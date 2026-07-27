const mapRules = (rules) => {
  const ruleMap = new Map();
  for (const rule of rules) {
    const [id, definition] = rule.split(": ");
    ruleMap.set(id, definition);
  }

  console.log("Rule Map:", ruleMap);
  return ruleMap;
};

const evaluate = (rules, id) => {
  const res = id
    .split(" | ")
    .map((subId) =>
      subId
        .split(" ")
        .filter((subId) => subId !== "")
        .map((subId) => {
          // console.log(`Evaluating subId: ${subId} for rule ${id}`);
          if (rules.get(subId) === '"a"' || rules.get(subId) === '"b"')
            return rules.get(subId).replace(/"/g, "");

          if (typeof rules.get(subId) === "object") {
            return rules.get(subId);
          }

          const res = evaluate(rules, rules.get(subId));
          rules.set(subId, res);

          return res;
        }),
    )
    .map((res) => {
      console.log(`Result for rule ${id}:`, res);
      const arrDataId = res.findIndex((item) => typeof item === "object");
      if (typeof res === "object" && arrDataId !== -1) {
        const restData = res.filter((_, index) => index !== arrDataId);
        return res[arrDataId]
          .map((sub) => {
            restData.splice(arrDataId, 0, sub);

            return restData.join("|");
          })
          .join("--");
      }
      return res.join(" ");
    });

  return res;
};

const input = [
  "0: 4 1 5",
  "1: 2 3 | 3 2",
  "2: 4 4 | 5 5",
  "3: 4 5 | 5 4",
  '4: "a"',
  '5: "b"',
];

const rules = mapRules(input);

console.log(evaluate(rules, "0"));

console.log("Final Rules Map:", rules);
