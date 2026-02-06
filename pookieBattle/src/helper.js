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

export const clearAgentScreen = async (conn) =>
  await conn.write(encode("\x1b[2J\x1b[H"));

export const jsonToStr = (json) => JSON.stringify(json);
export const textToJson = (text) => JSON.parse(text);
