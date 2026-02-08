import {
  changeShape,
  decode,
  disableMouseEvents,
  enableMouseEvents,
  removeRaw,
  setToRaw,
  encode,
} from "../utils/helper.js";

const drawAt = (x, y, screen, char) => {
  if (y >= 6 && x >= 0 && x < screen[0].length && y < screen.length)
    screen[y - 4][x - 1] = char;
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
      changeShape(+x, drawer);
      await disableMouseEvents();
      await removeRaw();
      return { canClose: false };
    }

    if (input.endsWith("M") && method === "32") {
      const newX = +x;
      const newY = +y;

      if (newY >= 6) {
        drawAt(newX, newY, drawer.states[drawer.i], char);
        const moveCursor = `\x1b[${newY};${newX}H${char}`;
        Deno.stdout.writeSync(encode(moveCursor));
      }
    }
  }
};
