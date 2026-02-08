import { readDragData, sleep, readSides, freeStyles } from "../utils/helper.js";
import { blue, green, red } from "jsr:@std/fmt/colors";
import { Drawer } from "./drawer.js";

const main = async () => {
  const drawer = new Drawer();
  const { columns, rows } = Deno.consoleSize();
  const screen = Array.from({ length: rows - 7 }, (_) =>
    Array.from({ length: columns }, (_) => " "),
  );

  drawer.states.push(drawer.cloneScreen(screen));
  console.clear();

  while (true) {
    const chosen = drawer.shape;
    drawer.printState();

    if (!freeStyles.includes(chosen)) {
      let sides = 0;
      if (chosen === "Polygon") {
        sides = await readSides();
      }

      const { initialPos, lastPos, canClose } = await readDragData(drawer);
      if (canClose) break;

      if (initialPos && lastPos) {
        drawer.changeShape(chosen);
        drawer.drawShape(initialPos, lastPos, +sides);
        drawer.saveState();
      }

      continue;
    }

    drawer.changeShape(chosen);
    const result = await drawer.drawFree(drawer);
    if (result && result.canClose) break;
    drawer.saveState();
  }
};

main();
