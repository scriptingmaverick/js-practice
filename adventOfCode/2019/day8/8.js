import { chunk } from "jsr:@std/collections";

const decodeMsg = (imageData, wide, length) => {
  const layerSize = wide * length;
  const layers = chunk(imageData, layerSize).map(x => x.join(''));
  const minLayerZeroes = layers[0];
  
  console.log(layerSize, layers);
};

decodeMsg('123456789012',2,2)