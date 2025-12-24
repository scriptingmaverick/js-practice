const checkPassword = (firstIndex, lastIndex, policychar, password) => {
  return (
    (password[firstIndex - 1] === policychar &&
      password[lastIndex - 1] !== policychar) ||
    (password[firstIndex - 1] !== policychar &&
      password[lastIndex - 1] === policychar)
  );
};

const passwordPolicyCheck = (list) => {
  let validPasswords = 0;
  for (let i = 0; i < list.length; i++) {
    const [range, char, password] = list[i].split(" ");
    const [first, last] = range.split("-").map(Number);
    const policyChar = char.split(":")[0];
    validPasswords += checkPassword(first, last, policyChar, password) ? 1 : 0;
  }

  return validPasswords;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt").split("\r\n");
  // console.log(input)
  // return passwordPolicyCheck(['1-3 a: abcde','1-3 b: cdefg','2-9 c: ccccccccc'])
  return passwordPolicyCheck(input);
};

console.log(main());
