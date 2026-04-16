const input: string[] = Deno.readTextFileSync("input.txt").split("\n");

const isNiceString = (str: string): boolean => {
  let adjCharsPresent = false;
  let dblCharsPresent = false;
  const vowels = str.match(/[aeiou]/g) as string[];
  const disAllowedAdjChars: string[] = ["ab", "cd", "pq", "xy"];

  for (let i = 0; i < str.length - 1; i++) {
    const c1 = str[i];
    const c2 = str[i + 1];
    if (c1 === c2) dblCharsPresent = true;

    if (disAllowedAdjChars.includes(`${c1}${c2}`)) {
      adjCharsPresent = true;
    }
  }

  return !adjCharsPresent && dblCharsPresent && vowels?.length >= 3;
};

// const input: string[] = [
//   "ugknbfddgicrmopn",
//   "aaa",
//   "jchzalrnumimnmhp",
//   "haegwjzuvuyypxyu",
//   "dvszwmarrgswjxmb",
// ];

const niceStrings: string[] = input.filter(isNiceString);

console.log(niceStrings, niceStrings.length);
