import { readDragData } from "../../utils/helper.js";
import { drawLine } from "./algos/bresenhams_algo.js";

const main = async () => {
  console.clear();
  while (true) {
    const { initialPos, lastPos, canClose } = await readDragData();
    if (canClose) break;
    
    drawLine(initialPos,lastPos);
  }
};

await main();
