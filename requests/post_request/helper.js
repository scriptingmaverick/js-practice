const decoder = new TextDecoder();
const encoder = new TextEncoder();

export const decode = (text) => decoder.decode(text);
export const encode = (text) => encoder.encode(text);

const data = await fetch("https://pokeapi.co/api/v2/pokemon/bulbasaur").then(
  (x) => x.json(),
);

// const pokeData = {};

// const mapper = (data) =>
//   data.results.forEach(({ name, url }) => pokeData[name] = url);
// mapper(data);

await Deno.writeFile("bulbData.json", encode(JSON.stringify(data, null, 2)));
