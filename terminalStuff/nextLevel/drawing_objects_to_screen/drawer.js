import { drawCircle } from "./circles/algos/bresenhams_algo.js";
import { drawLine } from "./lines/algos/bresenhams_algo.js";
import { drawPoly } from "./polygon/algo/my_algo.js";
import { drawSquare } from "./square/algos/my_algo.js";

export class Drawer {
  constructor() {
    this.shapesWithFns = {
      circle: drawCircle,
      square: drawSquare,
      polygon: drawPoly,
      line: drawLine,
    };

    this.shape = "line";
    this.drawFn = this.shapesWithFns[this.shape];
  }

  changeShape(shape) {
    this.shape = shape;
    this.drawFn = this.shapesWithFns[this.shape];
  }

  draw(initialPos, lastPos, sides) {
    this.drawFn(initialPos, lastPos, +sides);
  }
}
