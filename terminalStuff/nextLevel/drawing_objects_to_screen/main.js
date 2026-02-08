import { encode, readDragData, sleep, readSides } from "../utils/helper.js";
import { blue, green, red } from "jsr:@std/fmt/colors";
import { Drawer } from "./drawer.js";

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
  const shapes = ["Line", "Circle", "Square", "Polygon", "Undo", "Redo"];
  const container = { head: "", body: "", footer: "" };
  shapes.forEach((x) => createBox(container, x, chosen));

  await Deno.stdout.write(
    encode(
      [container.head, container.body, container.footer].join("\n") + "\n",
    ),
  );
};

const print = (state) =>
  state.states[state.i].map((x) => x.join("")).join("\n");

const cloneScreen = (scr) => scr.map((row) => [...row]);

const main = async () => {
  const drawer = new Drawer();
  const state = { states: [], i: 0 };
  const { columns, rows } = Deno.consoleSize();
  const screen = Array.from({ length: rows - 6 }, (_) =>
    Array.from({ length: columns }, (_) => " "),
  );

  state.states.push(cloneScreen(screen));

  while (true) {
    console.clear();
    const chosen = await Deno.readTextFile("chosen.txt");
    displayShapes(chosen);

    console.log(print(state));

    let sides = 0;
    if (chosen === "Polygon") {
      sides = await readSides();
    }

    const { initialPos, lastPos, canClose } = await readDragData(state);
    if (canClose) break;

    if (initialPos && lastPos) {
      drawer.changeShape(chosen);
      state.states.splice(state.i + 1);
      drawer.drawFn(initialPos, lastPos, state.states[state.i], sides);
      state.states.push(cloneScreen(state.states[state.i]));
      state.i++;
    }

    console.log(state.states.length, state.i);
  }
};

main();
