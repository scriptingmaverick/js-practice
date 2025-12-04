const DIGITS = "01234";

const randomIndex = (arr) => Math.floor(Math.random() * arr.length);

const createPermutaion = (digits) => {
  let remainingDigits = digits;
  const permutation = [];
  for (let i = 0; i < digits.length; i++) {
    const index = randomIndex(remainingDigits);
    permutation.push(remainingDigits[index]);
    remainingDigits = remainingDigits.replace(remainingDigits[index], "");
  }
  return permutation.join("");
};

const getPermutation = (digits, permutations) => {
  const permutation = createPermutaion(digits);
  if (permutations.includes(permutation)) {
    return getPermutation(digits, permutations);
  }
  return permutation;
};

const generateCombos = (digits) => {
  const permutations = [];
  for (let i = 0; i < 120; i++) {
    permutations.push(getPermutation(digits, permutations));
  }
  return permutations;
};

const savePermutations = () => {
  const data = [...generateCombos(DIGITS)].join('\n');
  Deno.writeTextFileSync("permutations.txt", data);
};

savePermutations();
