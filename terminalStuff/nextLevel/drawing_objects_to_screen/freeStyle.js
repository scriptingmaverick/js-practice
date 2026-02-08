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
  const canvasY = y - 4;
  const canvasX = x - 1;

  if (screen[canvasY] && screen[canvasY][canvasX] !== undefined) {
    screen[canvasY][canvasX] = char;
  }
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
      // console.log({ x, y, char });
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
