import { drawAt } from "../../../utils/helper.js";

export const drawLine = (initialPos, lastPos) => {
  let { x: x1, y: y1 } = initialPos;
  let { x: x2, y: y2 } = lastPos;

  [x1, x2, y1, y2] = [+x1, +x2, +y1, +y2];

  const dx = Math.abs(x2 - x1);
  const dy = Math.abs(y2 - y1);

  const sx = x1 < x2 ? 1 : -1;
  const sy = y1 < y2 ? 1 : -1;

  let err = dx - dy;

  let x = x1;
  let y = y1;

  while (true) {
    drawAt(x, y);

    if (x === x2 && y === y2) break;

    const e2 = 2 * err;
    if (e2 > -dy) {
      err -= dy;
      x += sx;
    }

    if (e2 < dx) {
      err += dx;
      y += sy;
    }
  }
};
