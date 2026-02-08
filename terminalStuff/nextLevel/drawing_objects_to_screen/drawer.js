import { createBox, freeStyles, shapes } from "../utils/helper.js";
import { drawCircle } from "./circles/algos/bresenhams_algo.js";
import { drawFree } from "./freeStyle.js";
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

    this.shape = "Free style";
    this.drawFn = this.shapesWithFns[this.shape];
    this.i = 0;
    this.states = [];
  }

  changeShape(shape) {
    this.shape = shape;
    this.drawFn = this.shapesWithFns[this.shape];
  }

  drawShape(initialPos, lastPos, noOfSides) {
    this.states.splice(this.i + 1);
    this.drawFn(initialPos, lastPos, this.states[this.i], noOfSides);
  }

  async drawFree(drawer) {
    if (drawer.shape !== "Erase") {
      return await drawFree(drawer, "o");
    }

    return await drawFree(drawer, " ");
  }

  saveState() {
    this.states.push(this.cloneScreen(this.states[this.i]));
    this.i++;
  }

  getUIString(chosen) {
    const allShapes = [freeStyles[0], ...shapes, freeStyles[1]];
    const container = { head: "", body: "", footer: "" };
    allShapes.forEach((x) => createBox(container, x, chosen));
    return [container.head, container.body, container.footer].join("\n");
  }

  printState(chosen) {
    // Move cursor to 0,0 instead of clearing screen to prevent flicker
    let output = "\x1b[H";

    // 1. Get the UI Header (the boxes)
    output += this.getUIString(chosen) + "\n";

    // 2. Get the Canvas
    output += this.states[this.i].map((x) => x.join("")).join("\n");

    // 3. Single Write
    Deno.stdout.writeSync(new TextEncoder().encode(output));
  }
  cloneScreen(screen) {
    return screen.map((row) => [...row]);
  }
}
