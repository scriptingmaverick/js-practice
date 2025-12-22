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

function power(base, exp, mod) {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    base = (base * base) % mod;
    exp = exp / 2n;
  }
  return res;
}

function getModularInverse(a, n) {
  return power(a, n - 2n, n);
}

const largeDeck = (techniqueList, deck) => {
  let n = BigInt(deckSize);
  const change = {
    "increment": (exp, threshold) => {
      exp.a = (exp.a * threshold) % deckLength;
      exp.b = (exp.b * threshold) % deckLength;
    },
    "cut": (exp, threshold) => exp.b = (exp.b - threshold) % deckLength,
    "new": (exp) => {
      exp.a = (-exp.a) % deckLength;
      exp.b = (-exp.b - 1) % deckLength;
    },
  };

  const exp = { a: 1, b: 0 };
  let index = 0;
  while (index < techniqueList.length) {
    const [threshold, techniqueName] = techniqueList[index++].split(" ")
      .reverse().slice(0, 2);

    change[techniqueName](exp, threshold);
  }
};

const main = (listOfTechniques, fn = shuffleWith, deckLength = 10007) => {
  const techniques = listOfTechniques.split("\n");
  return fn(techniques, deckLength);
};

const input = Deno.readTextFileSync("input.txt");

const example = `deal with increment 7
deal with increment 9
cut -2`;

const example2 = `cut 6
deal with increment 7
deal into new stack`;

console.log(main(input, largeDeck));
