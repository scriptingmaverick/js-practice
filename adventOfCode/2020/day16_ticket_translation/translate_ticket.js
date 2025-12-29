const parseDoc = (document) =>
  document
    .map((x) => (x === "" ? "->" : x))
    .join("\n")
    .split("\n->\n");

const getRange = (min, max) => {
  const minRange = min.split("-").map(Number);
  const maxRange = max.split("-").map(Number);
  return [minRange, maxRange];
};

const parseRules = (rules) =>
  rules.map((x) => {
    const [type, min, _, max] = x.split(" ");
    return { type: type.slice(0, -1), range: getRange(min, max) };
  });

const assignValues = ([min, max], range) => {
  for (let i = min[0]; i <= min[1]; i++) {
    range[i] = true;
  }

  for (let i = max[0]; i <= max[1]; i++) {
    range[i] = true;
  }
};

const makeRangeOn = (ruleSet) => {
  const range = {};
  ruleSet.forEach((ele) => {
    assignValues(ele.range, range);
  });

  return range;
};

const parseTicketsOf = (neighbours) =>
  neighbours
    .split("\n")
    .slice(1)
    .map((x) => x.split(",").map(Number));

const calculateErrorRate = (range, tickets) => {
  const invalidTickets = tickets
    .map((x) => x.filter((y) => !(y in range)))
    .filter((x) => x.length > 0)
    .flat();
  return invalidTickets.reduce((sum, err) => sum + err, 0);
};

const translateTicket = (document) => {
  const [rules, myTicket, neighbourTickets] = parseDoc(document);
  const ruleSet = parseRules(rules.split("\n"));
  const range = makeRangeOn(ruleSet);
  const nearByTickets = parseTicketsOf(neighbourTickets);

  return calculateErrorRate(range, nearByTickets);
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  const example = `class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`.split("\n");
  return translateTicket(input);
};

console.log(main());
