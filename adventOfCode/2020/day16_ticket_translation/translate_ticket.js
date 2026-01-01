import { permutations } from "jsr:/@std/collections/permutations";
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
    const [type, ranges] = x.split(": ");
    const [min, max] = ranges.split(" or ");
    return { type: type, range: getRange(min, max) };
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

const calculateErrorRate = (range, tickets, canReturnValidTickets = false) => {
  const invalidTickets = tickets
    .map((x) => x.filter((y) => !(y in range)))
    .filter((x) => x.length > 0)
    .flat();
  const validTickets = tickets.filter((x) => !x.some((y) => !(y in range)));

  console.log(tickets.length);
  return canReturnValidTickets
    ? validTickets
    : invalidTickets.reduce((sum, err) => sum + err, 0);
};

const translateTicket = (document, canReturnTicketsSum = true) => {
  const [rules, myTicket, neighbourTickets] = parseDoc(document);
  const ruleSet = parseRules(rules.split("\n"));
  const range = makeRangeOn(ruleSet);
  const nearByTickets = parseTicketsOf(neighbourTickets);

  return canReturnTicketsSum
    ? calculateErrorRate(range, nearByTickets)
    : [
        ruleSet,
        myTicket.split(":\n")[1].split(",").map(Number),
        calculateErrorRate(range, nearByTickets, !canReturnTicketsSum),
      ];
};

const findDepartureFields = (document) => {
  const [ruleSet, myTicket, validTickets] = translateTicket(document, false);
  const numCols = myTicket.length;

  // 1. Build a list of possible Rule Indices for each Column
  let possibilities = [];
  for (let col = 0; col < numCols; col++) {
    let colOptions = [];

    for (let r = 0; r < ruleSet.length; r++) {
      const [[min1, max1], [min2, max2]] = ruleSet[r].range;

      // Check if every valid ticket satisfies this specific rule index
      const fits = validTickets.every((ticket) => {
        const val = ticket[col];
        return (val >= min1 && val <= max1) || (val >= min2 && val <= max2);
      });

      if (fits) colOptions.push(r);
    }
    possibilities[col] = colOptions;
  }

  // 2. Narrow down the possibilities (Elimination)
  const finalMapping = new Array(numCols).fill(-1);
  const usedRuleIndices = new Set();

  // We solve columns with the fewest options first
  const sortedColIndices = [...Array(numCols).keys()].sort(
    (a, b) => possibilities[a].length - possibilities[b].length
  );

  for (const colIdx of sortedColIndices) {
    const ruleIdx = possibilities[colIdx].find(
      (idx) => !usedRuleIndices.has(idx)
    );
    finalMapping[colIdx] = ruleIdx;
    usedRuleIndices.add(ruleIdx);
  }

  // 3. Final Calculation
  // We need to know which rule indices (0-19) correspond to "departure"
  // In your original input, the first 6 rules are usually the "departure" ones.
  let result = BigInt(1);

  finalMapping.forEach((ruleIdx, colIdx) => {
    // If your first 6 rules are the 'departure' ones:
    if (ruleIdx >= 0 && ruleIdx <= 5) {
      console.log(
        `Rule ${ruleIdx} is at Column ${colIdx}. Value: ${myTicket[colIdx]}`
      );
      result *= BigInt(myTicket[colIdx]);
    }
  });

  return result.toString();
};

export const main = (fn = translateTicket) => {
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
  return fn(input);
};

console.log(main(findDepartureFields));
