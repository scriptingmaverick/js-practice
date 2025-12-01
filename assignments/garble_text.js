const ALLCHARS = 'zaqw"sxcd~e`-rfvb+>gt=yh}nmjuik,lop;/|][{<'

const garbeledWord = (range) => {
  let garbeledChars = "";
  for (let i = 0; i < range; i++) {
    garbeledChars += ALLCHARS[randomElement(ALLCHARS.length-3)];
  }

  return garbeledChars;
};

const randomElement = (range = 5) => {
  return Math.floor(Math.random() * range) + 3;
};

const garbleText = (text) => {
  let current_index = 0;
  let prev_index = 0;
  const normalizedText = [];
  while (current_index < text.length) {
    prev_index = current_index;
    current_index += randomElement();
    normalizedText.push(text.slice(prev_index, current_index));
  }

  for (let i = 0; i < normalizedText.length; i++) {
    normalizedText[i] = garbeledWord(10)+" "+(i + 1) + "," + normalizedText[i] + "_ " +
      garbeledWord(10)
  }

  return randomizeArray(normalizedText);
};

const randomizeArray = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const randomIndex = randomElement(arr.length - 3);
    const temp = arr[randomIndex];
    arr[randomIndex] = arr[i];
    arr[i] = temp;
  }

  return arr.join("");
};

const text =
  "this is a text. which i want to scramble and make it as a garbeled text.";

console.log(garbleText(text));


const cmdToDecode = `grep -o ' \d\+[^_]*' 2nd.txt | sort -t',' -nk1 | cut -d',' -f2- | tr '\n' '\0'`
