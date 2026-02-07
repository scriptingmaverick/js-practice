import { encode, readDragData, sleep, readSides } from "../utils/helper.js";
import { blue, green, red } from "jsr:@std/fmt/colors";
import { Drawer } from "./drawer.js";

const createBox = (container, text, chosen) => {
  const upperPart = "¯";
  const lowerPart = "_";
  const sidePart = "|";
  const boxSize = 30;
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
  const shapes = ["line", "circle", "square", "polygon"];
  const container = { head: "", body: "", footer: "" };
  shapes.forEach((x) => createBox(container, x, chosen));

  await Deno.stdout.write(
    encode([container.head, container.body, container.footer].join("\n")),
  );
};

const main = async () => {
  const drawer = new Drawer();
  const { columns, rows } = Deno.consoleSize();
  console.log({columns, rows});
  const screen = Array.from({ length: rows - 5 }, (_) =>
    Array.from({ length: columns }, (x) => "\x1b \x1b[0m"),
  );

  while (true) {
    console.clear();
    const chosen = await Deno.readTextFile("chosen.txt");
    displayShapes(chosen);

    console.log(screen.map((x) => x.join("")).join("\n"));

    let sides = 0;

    if (chosen === "polygon") {
      sides = await readSides();
    }

    const { initialPos, lastPos, canClose } = await readDragData();
    if (canClose) break;

    if (initialPos && lastPos) {
      drawer.changeShape(chosen);
      drawer.drawFn(initialPos, lastPos, screen, sides);
    }

    await sleep(1000);
  }
};

main();
