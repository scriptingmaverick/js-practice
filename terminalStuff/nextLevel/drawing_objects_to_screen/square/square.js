import {
  disableMouseEvents,
  enableMouseEvents,
  readDragData,
  setToRaw,
} from "../../utils/helper.js";
import { drawLine } from "../lines/algos/bresenhams_algo.js";

setToRaw();
await enableMouseEvents();

const sqr = (x) => Math.pow(x, 2);

function distanceBetween(p1, p2) {
  const deltaX = p1.x - p2.x;
  const deltaY = p1.y - p2.y;
  return Math.sqrt(sqr(deltaX) + sqr(deltaY));
}

const main = async () => {
  console.clear();
  while (true) {
    const { initialPos: centrePos, lastPos: radii, canClose } =
      await readDragData();
    if (canClose) break;

    const r = distanceBetween(centrePos, radii);
    const [xOff, yOff] = [Math.round(r / 2), Math.round(r / 4.5)];

    const lTCorner = { x: +centrePos.x, y: +centrePos.y };
    const lBCorner = { x: +centrePos.x, y: +centrePos.y + 2 * yOff };
    const rTCorner = { x: +centrePos.x + 2 * xOff, y: +centrePos.y };
    const rBCorner = { x: +centrePos.x + 2 * xOff, y: +centrePos.y + 2 * yOff };

    drawLine(lTCorner.x, lTCorner.y, rTCorner.x, rTCorner.y);
    drawLine(lTCorner.x, lTCorner.y, lBCorner.x, lBCorner.y);
    drawLine(rTCorner.x, rTCorner.y, rBCorner.x, rBCorner.y);
    drawLine(lBCorner.x, lBCorner.y, rBCorner.x, rBCorner.y);
  }
};

await main();
await disableMouseEvents();
