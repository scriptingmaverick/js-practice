import { drawCircle } from "./algos/bresenhams_algo.js";

const main = async () => {
  console.clear();
  while (true) {
    const { initialPos, lastPos, canClose } = await readDragData();
    if (canClose) break;

    drawCircle(initialPos, lastPos);
  }
};

await main();
