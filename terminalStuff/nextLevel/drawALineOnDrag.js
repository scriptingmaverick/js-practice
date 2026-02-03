const buffer = new Uint8Array(100);

function format(x, text) {
  if (x < 45) return `\x1b[48;2;255;0;0;m${text}\x1b[0m`;
  if (x > 85) return `\x1b[48;2;0;255;0;m${text}\x1b[0m`;
  return `\x1b[48;2;0;0;255;m${text}\x1b[0m`;
}

const drawAt = (x, y) => {
  // \x1b[s saves cursor position
  // \x1b[y;xH moves cursor
  // \x1b[u restores cursor position
  const moveCursor = `\x1b[${y};${x}H`;
  Deno.stdout.write(new TextEncoder().encode(format(x, `${moveCursor} `)));
};

const subSq = (c1, c2) => Math.pow(c2 - c1, 2);

const distBtw = (p1, p2) => {
  const xOff = subSq(p2.x, p1.x);
  const yOff = subSq(p2.y, p1.y);

  return Math.round(Math.sqrt(xOff + yOff));
};

const drawAline = (point1, point2) => {
  const connPoint = { y: point1.y, x: point2.x };
  const oppSideLength = distBtw(point2, connPoint);
  const adjSideLength = distBtw(connPoint, point1);
  const hypotenuse = Math.round(
    Math.sqrt(Math.pow(oppSideLength, 2) + Math.pow(adjSideLength, 2)),
  );

  let { x, y } = point1;
  console.log({ point1, x, y, point2, hypotenuse });
  while (x < point2.x - 1 && y < point2.y - 1) {
    const sinTheta = Math.round(adjSideLength / hypotenuse);
    const cosTheta = Math.round(oppSideLength / hypotenuse);
    x += Math.round(Math.cos(cosTheta)) * 1;
    y += Math.round(Math.sin(sinTheta)) * 1;
    // drawAt(x, y);
    console.log({ x, y });
  }
};

Deno.stdin.setRaw(true, { cbreak: true });

const encoder = new TextEncoder();
const decoder = new TextDecoder();
let isDragging = false;

await Deno.stdout.write(encoder.encode("\x1b[?1003h\x1b[?1006h"));
let path = [];

while (true) {
  const n = await Deno.stdin.read(buffer);

  const input = decoder.decode(buffer.subarray(0, n));
  if (buffer[0] === 113) break;

  const data = input.slice(3, -1);

  const [btn, x, y] = data.split(";");

  if (btn === "0" && !isDragging) isDragging = true;
  else if (btn === "0" && isDragging) {
    // console.log(path);
    drawAline(path[0], path.at(-1));
    isDragging = false;
    path = [];
  }

  if (isDragging) path.push({ x, y });
}

await Deno.stdout.write(encoder.encode("\x1b[?1003l"));
