const changeFrequency = (result, element) => {
  if (!(element in result)) return result;

  result[element]++;
  return result;
};

const countVowels = (string) => {
  console.log(string);
  const emptyVowelObj = { a: 0, e: 0, i: 0, o: 0, u: 0 };
  string.split("").reduce(changeFrequency, emptyVowelObj);
  return emptyVowelObj;
};

console.log(countVowels("this is something not nothing"));
console.log(countVowels("exploring objects in js"));
console.log(countVowels("made 2 programs in js objects"));
