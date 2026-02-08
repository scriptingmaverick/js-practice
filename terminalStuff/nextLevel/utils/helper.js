import { blue, green, red } from "jsr:@std/fmt/colors";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

export const encode = (text) => encoder.encode(text);
export const decode = (text) => decoder.decode(text);

function format(x, text) {
  if (+x < 45) return red(text);
  if (+x > 85) return green(text);
  return blue(text);
}

export const drawAt = async (x, y, screen) => {
  if (!screen) {
    const moveCursor = `\x1b[${y};${x}H`;
    const char = format(x, `${moveCursor}o`);

    const packet = `\x1b[s${char}\x1b[u`;
    await Deno.stdout.write(encode(packet));
  }

  if (y >= 6 && x >= 0 && x < screen[0].length && y < screen.length) {
    screen[y - 6][x] = "o";
  }

  // console.log({ y, x, sc: screen[y - 5] });
  await sleep(0);
};

export const setToRaw = () => Deno.stdin.setRaw(true);
export const removeRaw = () => Deno.stdin.setRaw(false);

export const enableMouseEvents = async () =>
  await Deno.stdout.write(encode("\x1b[?1003h\x1b[?1006h"));

export const disableMouseEvents = async () =>
  await Deno.stdout.write(encode("\x1b[?1003l\x1b[?1006l"));

export const readAndStoreInput = async (mover, state) => {
  const bytesRead = await Deno.stdin.read(mover.buffer);
  const input = mover.buffer.subarray(0, bytesRead);

  if (mover.buffer[0] === 113) return { isDone: true, canClose: true };

  const data = decode(input);

  const [method, x, y] = data.slice(3, -1).split(";");

  if (data.at(-1) === "M" && method === "0") {
    if (+y < 6) {
      console.log({ x, y });
      if (+x < 30) {
        await Deno.writeTextFile("chosen.txt", "Line");
      } else if (+x < 60) {
        await Deno.writeTextFile("chosen.txt", "Circle");
      } else if (+x < 90) {
        await Deno.writeTextFile("chosen.txt", "Square");
      } else if (+x < 120) {
        await Deno.writeTextFile("chosen.txt", "Polygon");
      } else if (+x < 150 && state.states.length > 1 && state.i >= 1) state.i--;
      else if (state.i < state.states.length - 1) state.i++;

      return { isDone: true };
    }
  }

  if (data.at(-1) === "M" && method === "32") {
    mover.path.push({ x, y });
  } else if (data.at(-1) === "m" && method === "0") {
    if (mover.path.length > 1) {
      const result = {
        isDone: true,
        initialPos: mover.path[0],
        lastPos: mover.path.at(-1),
      };

      return result;
    }

    mover.isDragging = false;
    mover.path = [];
  }

  return { isDone: false };
};

export const readDragData = async (state) => {
  await setToRaw();
  await enableMouseEvents();
  const mover = {
    path: [],
    buffer: new Uint8Array(100),
  };

  while (true) {
    const result = await readAndStoreInput(mover, state);

    if (result.isDone) {
      await disableMouseEvents();
      await removeRaw();
      return result;
    }
  }
};

export const subSq = (c1, c2) => Math.pow(c2 - c1, 2);

export const distBtw = (p1, p2) => {
  const xOff = subSq(+p2.x, +p1.x);
  const yOff = subSq(+p2.y, +p1.y);

  return Math.round(Math.sqrt(xOff + yOff));
};

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const readSides = async () => {
  const buffer = new Uint8Array(10);
  await Deno.stdout.write(encode("\nEnter No.of sides of polygon : "));
  const n = await Deno.stdin.read(buffer);

  return decode(buffer.subarray(0, n));
};
