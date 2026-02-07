import { drawAt } from "../../../utils/helper.js";

export const drawAline = (point1, point2) => {
  point1.x = +point1.x;
  point1.y = +point1.y;
  point2.x = +point2.x;
  point2.y = +point2.y;

  const deltaX = Math.abs(point1.x - point2.x);
  const deltaY = Math.abs(point1.y - point2.y);
  const steps = Math.max(deltaX, deltaY);

  const dx = (point1.x - point2.x) / steps;
  const dy = (point1.y - point2.y) / steps;
  let x = point2.x;
  let y = point2.y;
  for (let i = 0; i < steps; i++) {
    x += dx;
    y += dy;
    drawAt(Math.round(+x), Math.round(+y));
  }
};
