import { distBtw, drawAt } from "../../../utils/helper.js";

export const drawCircle = (initialPos, lastPos, screen) => {
  console.log('src => ',screen.length)
  const r = distBtw(initialPos, lastPos);
  let x = 0;
  let y = r;
  let d = 3 - 2 * r;
  const { x: cx, y: cy } = initialPos;

  plotPixels(x, y, +cx, +cy, screen);

  while (x <= y) {
    if (d <= 0) d += 4 * x + r;
    else {
      d += 4 * (x - y) + 10;
      y--;
    }

    x++;

    plotPixels(x, y, +cx, +cy, screen);
  }
};

const plotPixels = (x, y, xc, yc, screen) => {
  drawAt(xc + x * 2, yc + y, screen);
  drawAt(xc + y * 2, yc + x, screen);

  drawAt(xc - x * 2, yc + y, screen);
  drawAt(xc + y * 2, yc - x, screen);

  drawAt(xc - x * 2, yc - y, screen);
  drawAt(xc - y * 2, yc - x, screen);

  drawAt(xc + x * 2, yc - y, screen);
  drawAt(xc - y * 2, yc + x, screen);
};
