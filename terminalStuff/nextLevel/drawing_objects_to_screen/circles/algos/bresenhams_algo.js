import { distBtw, drawAt } from "../../../utils/helper.js";

export const drawCircle = (initialPos, lastPos) => {
  const r = distBtw(initialPos, lastPos);
  let x = 0;
  let y = r;
  let d = 3 - 2 * r;
  const { x: cx, y: cy } = initialPos;

  plotPixels(x, y, +cx, +cy);

  while (x <= y) {
    if (d <= 0) d += 4 * x + r;
    else {
      d += 4 * (x - y) + 10;
      y--;
    }

    x++;

    plotPixels(x, y, +cx, +cy);
  }
};

const plotPixels = (x, y, xc, yc) => {
  drawAt(xc + x * 2, yc + y);
  drawAt(xc + y * 2, yc + x);

  drawAt(xc - x * 2, yc + y);
  drawAt(xc + y * 2, yc - x);

  drawAt(xc - x * 2, yc - y);
  drawAt(xc - y * 2, yc - x);

  drawAt(xc + x * 2, yc - y);
  drawAt(xc - y * 2, yc + x);
};
