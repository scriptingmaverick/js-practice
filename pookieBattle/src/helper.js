export const getPokieUrl = (pokeId) => {
  return `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
};

export const randomPair = () => {
  const num1 = Math.round((Math.random() * 500) + 1);
  const num2 = Math.round((Math.random() * 500) + 1);

  return [num1, num2];
};

export const fetchPokemon = async (url) => {
  const data = await fetch(url).then((x) => x.json());

  return data;
};

const decoder = new TextDecoder();
export const decode = (text) => decoder.decode(text);
const encoder = new TextEncoder();
export const encode = (text) => encoder.encode(text);
