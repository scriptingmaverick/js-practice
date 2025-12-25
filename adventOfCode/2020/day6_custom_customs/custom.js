const parse = (data) =>
  data.split("\r\n\r\n").map((x) => x.split("\r\n"));
  // data.split("\n\n").map((x) => x.split("\n"));

const SummategroupAnswers = (groupsData) => {
  const groups = parse(groupsData);
  let sum = 0;
  for (const group of groups) {
    const distictQuestions = {};
    for (const persons of group) {
      for (let i = 0; i < persons.length; i++) {
        distictQuestions[persons[i]] = true;
      }
    }
    // console.log(distictQuestions);
    sum += Object.keys(distictQuestions).length;
  }

  return sum;
};

const main = () => {
  const input = Deno.readTextFileSync("input.txt");
  const example = `abc

a
b
c

ab
ac

a
a
a
a

b`;

  return SummategroupAnswers(input);
};

console.log(main());
