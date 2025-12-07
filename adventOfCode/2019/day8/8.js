import { chunk } from "jsr:@std/collections";

const noOfValues = (sequence, value = 0) => {
  const count = {};
  count[value] = 0;
  return sequence.reduce((count, current) => {
    count[value] += value === +current ? 1 : 0;
    return count;
  }, count)[value];
};

const separeIntoLayers = (imageData, pixelsHeight, pixelsWidth) => {
  const layerSize = pixelsWidth * pixelsHeight;
  return chunk(imageData, layerSize);
};

const decodeMsg = (imageData, pixelsWidth, pixelsHeight) => {
  const layers = separeIntoLayers(imageData, pixelsHeight, pixelsWidth);
  let minZeroLayer = layers[0];
  let minZeroes = noOfValues(minZeroLayer);
  for (let i = 1; i < layers.length; i++) {
    const zeroesInLayer = noOfValues(layers[i]);
    if (zeroesInLayer < minZeroes) {
      minZeroes = zeroesInLayer;
      minZeroLayer = layers[i];
    }
  }

  return noOfValues(minZeroLayer, 1) *
    noOfValues(minZeroLayer, 2);
};

const part2 = (imageData, pixelsWidth, pixelsHeight) => {
  const layers = separeIntoLayers(imageData, pixelsHeight, pixelsWidth);
  const imageMap = [];
  for (let i = 0; i < layers[0].length; i++) {
    let j = 0;
    while (layers[j][i] === "2") {
      j++;
    }
    imageMap.push(layers[j][i]);
  }

  const image = chunk(imageMap, pixelsWidth);

  console.log(
    image.map((x) => x.map((y) => +y ? "🟥" : "💚").join("")).join("\n"),
  );
};

// const input = Deno.readTextFileSync("input.txt");
const input = Deno.readTextFileSync("inp.txt");
// console.log(decodeMsg(input, 25, 6));
// console.log(part2(input, 25, 6));
console.log(part2(input, 25, 6));
