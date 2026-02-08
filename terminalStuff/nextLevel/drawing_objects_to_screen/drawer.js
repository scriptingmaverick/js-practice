import { drawCircle } from "./circles/algos/bresenhams_algo.js";
import { drawLine } from "./lines/algos/bresenhams_algo.js";
import { drawPoly } from "./polygon/algo/my_algo.js";
import { drawSquare } from "./square/algos/my_algo.js";

export class Drawer {
  constructor() {
    this.shapesWithFns = {
      Circle: drawCircle,
      Square: drawSquare,
      Polygon: drawPoly,
      Line: drawLine,
    };

    this.shape = "Line";
    this.drawFn = this.shapesWithFns[this.shape];
    this.i = 0;
    this.states = [];
  }

  changeShape(shape) {
    this.shape = shape;
    this.drawFn = this.shapesWithFns[this.shape];
  }

  draw(initialPos, lastPos, noOfSides) {
    this.drawFn(initialPos, lastPos, this.states[this.i], noOfSides);
  }

  saveState() {
    this.states.push(this.cloneScreen(this.states[this.i]));
    this.i++;
  }

  printState() {
    console.log(this.states[this.i].map((x) => x.join("")).join("\n"));
  }

  cloneScreen(screen) {
    return screen.map((row) => [...row]);
  }
}
