const authors = ["arthur", "morgan", "jordan", "juliee", "ben parker", "peter"];
const genres = [
  "sci-fi",
  "fantasy",
  "comedy",
  "horror",
  "action",
  "drama",
  "thriller",
  "anime",
  "biography",
];
const bookNames = [
  "spiderman",
  "joker",
  "once upon a time",
  "a family story",
  "time machine",
  "next love",
  "nuclear family",
];

function randomElement(lower, upper) {
  return lower + Math.floor(Math.random() * (upper - lower));
}

function randomData(array, noOfElements) {
  const data = [];
  for (let i = 0; i < noOfElements; i++) {
    data.push(array[randomElement(0, array.length)]);
  }

  return data;
}

const removeDupes = (result, element) => {
  if (!result.includes(element)) {
    result.push(element);
  }
  return result;
};

const books = [];
for (let i = 0; i < 10; i++) {
  books.push({
    title: bookNames[randomElement(0, bookNames.length)],
    authors: authors[randomElement(0, authors.length)],
    genres: randomData(genres, 5).reduce(removeDupes,[]),
    pageCount: randomElement(1, 200),
  });
}

console.log(books);
