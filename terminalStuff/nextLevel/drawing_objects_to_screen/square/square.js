import { readDragData } from "../../utils/helper.js";
import { drawSquare } from "./algos/my_algo.js";

const main = async () => {
  console.clear();
  while (true) {
    const { initialPos, lastPos, canClose } = await readDragData();

    if (canClose) break;

    drawSquare(initialPos, lastPos);
  }
};

await main();
