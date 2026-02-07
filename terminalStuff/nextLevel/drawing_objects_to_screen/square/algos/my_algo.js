import { distBtw } from "../../../utils/helper.js";
import { drawLine } from "../../lines/algos/bresenhams_algo.js";

export const drawSquare = (centrePos, radii) => {
  const r = distBtw(centrePos, radii);
  const [xOff, yOff] = [Math.round(r / 2), Math.round(r / 4.5)];

  const lTCorner = { x: +centrePos.x, y: +centrePos.y };
  const lBCorner = { x: +centrePos.x, y: +centrePos.y + 2 * yOff };
  const rTCorner = { x: +centrePos.x + 2 * xOff, y: +centrePos.y };
  const rBCorner = { x: +centrePos.x + 2 * xOff, y: +centrePos.y + 2 * yOff };

  drawLine(lTCorner, rTCorner);
  drawLine(lTCorner, lBCorner);
  drawLine(rTCorner, rBCorner);
  drawLine(lBCorner, rBCorner);
};
