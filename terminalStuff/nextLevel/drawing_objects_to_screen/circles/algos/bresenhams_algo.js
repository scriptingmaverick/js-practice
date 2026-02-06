import { drawAt } from "../../../utils/helper.js";

const db = (x2, x1) => Math.pow(x2 - x1, 2);

const getDist = (x1, y1, x2, y2) => {
  return Math.round(Math.sqrt(db(x2, x1), db(y2, y1)));
};

export const drawCircle = (x1, y1, x2, y2) => {
  const r = getDist(x1, y1, x2, y2);
  let x = 0;
  let y = r;
  let d = 3 - (2 * r);

  plotPixels(x, y, x1, y1);
  console.log(x, y, x1, y1);

  while (x <= y) {
    if (d <= 0) d += (4 * x) + r;
    else {
      d += 4 * (x - y) + 10;
      y--;
    }

    x++;

    plotPixels(x, y, x1, y1);
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
