const incrementalShuffle = (threshold, deck) => {
  const shuffledDeck = [];
  let shuffleIndex = 0;
  const deckLength = deck.length;
  for (let i = 0; i < deckLength; i++) {
    shuffledDeck[shuffleIndex] = deck[i];
    shuffleIndex = (shuffleIndex + threshold) % deckLength;
  }

  return shuffledDeck;
};

const cuttingShuffle = (threshold, deck) => {
  let shuffeledDeck = [];
  if (threshold === Math.abs(threshold)) {
    shuffeledDeck = deck.slice(threshold).concat(
      deck.slice(0, threshold),
    );
  } else {
    shuffeledDeck = deck.slice(threshold).concat(
      deck.slice(0, deck.length + threshold),
    );
  }

  return shuffeledDeck;
};

const reverseDeck = (deck) => deck.reverse();

const getShufflingFunc = (technique) => {
  const [threshold, techniqueName] = technique.split(" ").reverse().slice(0, 2);
  const techniques = {
    "increment": incrementalShuffle.bind(null, +threshold),
    "cut": cuttingShuffle.bind(null, +threshold),
    "new": reverseDeck,
  };

  return techniques[techniqueName];
};

const shuffleWith = (techniqueList, deckLength) => {
  let deck = Array.from({ length: deckLength }).map((_, i) => i);
  let index = 0;
  while (index < techniqueList.length) {
    const shuffleFunc = getShufflingFunc(techniqueList[index++]);
    deck = shuffleFunc(deck);
  }

  return deck.indexOf(2019);
};

const mod = (elem, modulo) => ((elem % modulo) + modulo) % modulo;

const modularExponentiation = (base, exp, modulo) => {
  let result = 1n;
  base = mod(base, modulo);
  while (exp > 0n) {
    if (exp % 2n) result = mod(result * base, modulo);
    base = mod(base * base, modulo);
    exp /= 2n;
  }

  return result;
};

const modularInverse = (elem, exp) =>
  modularExponentiation(elem, exp - 2n, exp);

const largeDeckShuffle = (shuffles) => {
  const deckSize = 119315717514047n;
  const noOfShuffles = 101741582076661n;
  const pos = 2020n;

  const storage = { a: 1n, b: 0n };
  const techniques = {
    "increment": (storage, threshold) => {
      storage.a = mod(storage.a * threshold, deckSize);
      storage.b = mod(storage.b * threshold, deckSize);
    },
    "new": (storage) => {
      storage.a = mod(-storage.a, deckSize);
      storage.b = mod(-storage.b - 1n, deckSize);
    },
    "cut": (storage, threshold) => {
      storage.b = mod(storage.b - threshold, deckSize);
    },
  };

  for (const line of shuffles) {
    const [rawParam, techniqueName] = line.split(" ").reverse().slice(0, 2);
    const threshold = !isNaN(Number(rawParam)) ? BigInt(rawParam) : 0n;
    techniques[techniqueName](
      storage,
      threshold,
    );
  }

  // multiple shuffles
  const aK = modularExponentiation(storage.a, noOfShuffles, deckSize);
  const bK = mod(
    storage.b * (aK - 1n) * modularInverse(storage.a - 1n, deckSize),
    deckSize,
  );

  // result => pos = (ax + b) mod M
  const result = mod((pos - bK) * modularInverse(aK, deckSize), deckSize);
  return result.toString();
};

const main = (listOfTechniques, fn = shuffleWith, deckLength = 10007) => {
  const techniques = listOfTechniques.split("\r\n");
  return fn(techniques, deckLength);
};

const input = Deno.readTextFileSync("input.txt");

const example = `deal with increment 7
deal with increment 9
cut -2`;

const example2 = `cut 6
deal with increment 7
deal into new stack`;

console.log(main(input, largeDeckShuffle));
