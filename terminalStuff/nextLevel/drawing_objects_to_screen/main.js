import { encode, readDragData, sleep, readSides } from "../utils/helper.js";
import { blue, green, red } from "jsr:@std/fmt/colors";
import { Drawer } from "./drawer.js";

const shapes = ["Line", "Circle", "Square", "Polygon", "Undo", "Redo"];

const createBox = (container, text, chosen) => {
  const upperPart = "¯";
  const lowerPart = "_";
  const sidePart = "|";
  const boxSize = 25;
  const space = " ".repeat(5);
  const data = text == chosen ? blue(text) : text;

  const padStartSize = Math.round((boxSize - text.length) / 2) + data.length;

  container.head += space + sidePart + upperPart.repeat(boxSize - 2) + sidePart;
  container.body +=
    space +
    sidePart +
    data
      .padStart(padStartSize - 1)
      .padEnd(
        boxSize - 1 * (chosen === text ? -(data.length - text.length) + 2 : 2),
      ) +
    sidePart;

  container.footer +=
    space + sidePart + lowerPart.repeat(boxSize - 2) + sidePart;

  return container;
};

const displayShapes = async (chosen) => {
  const container = { head: "", body: "", footer: "" };
  shapes.forEach((x) => createBox(container, x, chosen));

  await Deno.stdout.write(
    encode(
      [container.head, container.body, container.footer].join("\n") + "\n",
    ),
  );
};

const main = async () => {
  const drawer = new Drawer();
  const { columns, rows } = Deno.consoleSize();
  const screen = Array.from({ length: rows - 6 }, (_) =>
    Array.from({ length: columns }, (_) => " "),
  );

  drawer.states.push(drawer.cloneScreen(screen));

  while (true) {
    console.clear();
    const chosen = await Deno.readTextFile("chosen.txt");
    displayShapes(chosen);

    drawer.printState();

    if (shapes.includes(chosen)) {
      let sides = 0;
      if (chosen === "Polygon") {
        sides = await readSides();
      }

      const { initialPos, lastPos, canClose } = await readDragData(drawer);
      if (canClose) break;

      if (initialPos && lastPos) {
        drawer.changeShape(chosen);
        drawer.states.splice(drawer.i + 1);
        drawer.draw(initialPos, lastPos, +sides);
        drawer.saveState();
      }

      console.log(drawer.states.length, drawer.i);
    }
  }
};

main();
