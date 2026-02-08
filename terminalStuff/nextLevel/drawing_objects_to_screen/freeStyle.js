import {
  changeShape,
  decode,
  disableMouseEvents,
  enableMouseEvents,
  removeRaw,
  setToRaw,
  sleep,
} from "../utils/helper.js";

const drawAt = (x, y, screen, char) => {
  if (y >= 6 && x >= 0 && x < screen[0].length && y < screen.length)
    screen[y - 6][x] = char;
};

export const drawFree = async (drawer, char) => {
  await setToRaw();
  await enableMouseEvents();
  const buffer = new Uint8Array(20);

  while (true) {
    const n = await Deno.stdin.read(buffer);

    const input = decode(buffer.subarray(0, n));

    if (buffer[0] === 113) {
      await disableMouseEvents();
      await removeRaw();
      return { canClose: true };
    }

    const data = input.slice(3, -1);
    const [method, x, y] = data.split(";");

    if (input.slice(-1) === "M" && method === "0" && +y < 6) {
      await changeShape(+x, drawer);
      await disableMouseEvents();
      await removeRaw();
      return { canClose: false };
    }

    if (input.slice(-1) === "M" && method === "32") {
      drawAt(+x, +y, drawer.states[drawer.i], char);
      // console.clear();
      const chosen = await Deno.readTextFile("chosen.txt");
      drawer.printState(chosen);
    }
  }
};
