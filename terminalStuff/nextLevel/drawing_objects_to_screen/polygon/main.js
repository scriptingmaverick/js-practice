import { readDragData, readSides } from "../../utils/helper.js";
import { drawPoly } from "./algo/my_algo.js";

const main = async () => {
  console.clear();
  while (true) {
    const sides = await readSides();
    const { initialPos, lastPos, canClose } = await readDragData();
    if (canClose) break;

    drawPoly(initialPos, lastPos, +sides);
  }
};

await main();
