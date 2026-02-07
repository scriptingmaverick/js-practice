import { distBtw } from "../../../utils/helper.js";
import { drawLine } from "../../lines/algos/bresenhams_algo.js";

export const drawPoly = (initialPos, lastPos, screen, noOfSides) => {
  const r = distBtw(initialPos, lastPos);
  const angleStep = (2 * Math.PI) / noOfSides;
  const cx = +initialPos.x;
  const cy = +initialPos.y;

  // first vertex
  const first = {
    x: Math.round(cx + Math.cos(0) * r),
    y: Math.round(cy + Math.sin(0) * r),
  };

  const prev = { x: first.x, y: first.y };

  for (let i = 1; i < noOfSides; i++) {
    const x = Math.round(cx + Math.cos(i * angleStep) * r);
    const y = Math.round(cy + Math.sin(i * angleStep) * r);
    const present = { x, y };

    drawLine(prev, present, screen);
    prev.x = x;
    prev.y = y;
  }

  // close the polygon
  drawLine(prev, first, screen);
};
