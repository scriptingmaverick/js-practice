import {
  disableMouseEvents,
  enableMouseEvents,
  readDragData,
  setToRaw,
} from "../../utils/helper.js";
import { drawLine } from "./algos/bresenhams_algo.js";

setToRaw();
await enableMouseEvents();

const main = async () => {
  console.clear();
  while (true) {
    const { initialPos, lastPos, canClose } = await readDragData();
    if (canClose) break;

    const { x: x1, y: y1 } = initialPos;
    const { x: x2, y: y2 } = lastPos;
    drawLine(+x1, +y1, +x2, +y2);
  }
};

await main();
await disableMouseEvents();
