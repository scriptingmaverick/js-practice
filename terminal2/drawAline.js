const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encode = (text) => encoder.encode(text);
const decode = (text) => decoder.decode(text);

const sq = (x) => Math.pow(x, 2);
const round = (x) => Math.round(x);
const sqrt = (x) => round(Math.sqrt(x));

const getDistance = (p1, p2) => sqrt(sq(p2.x - p1.x) + sq(p2.y - p1.y));

function drawAt(x, y) {
  const moveCursor = `\x1b[${y};${x}H`;
  Deno.stdout.writeSync(encode(`${moveCursor}*`));
}

const drawAtPoints = (p1, p2) => {
  const connPoint = { x: p2.x, y: p1.y };
  const oppSide = getDistance(p2, connPoint);
  const adjSide = getDistance(connPoint, p1);
  const hypotenuse = sqrt(sq(oppSide) + sq(adjSide));

  let { x, y } = p1;
  console.log({ hypotenuse, adjSide, oppSide, p1, p2, connPoint });
  console.log(
    "adj side -> ",
    Math.cos(adjSide / hypotenuse),
    round(Math.cos(adjSide / hypotenuse)),
  );
  console.log(
    "opp side -> ",
    Math.sin(oppSide / hypotenuse),
    round(Math.sin(oppSide / hypotenuse)),
  );
  // while (x < p2.x && y < p2.y) {
  //   x += round(Math.cos(adjSide / hypotenuse) * 1);
  //   y += round(Math.sin(oppSide / hypotenuse) * 1);
  //   console.log({ x, y });
  //   drawAt(x, y);
  // }
};

Deno.stdin.setRaw(true);

await Deno.stdout.write(encode("\x1b[?1003h\x1b[?1006h"));

const buffer = new Uint8Array(100);
let isDragging = false;
let path = [];

while (true) {
  const n = await Deno.stdin.read(buffer);
  const input = decode(buffer.subarray(0, n));

  if (buffer[0] === 113) break;

  const data = input.slice(3, -1);
  const [btn, x, y] = data.split(";");

  if (btn === "0" && !isDragging) isDragging = true;
  else if (btn === "0" && isDragging) {
    drawAtPoints(path[0], path.at(-1));
    isDragging = false;
    path = [];
  }

  if (isDragging) path.push({ x, y });
}

await Deno.stdout.write(encode("\x1b[?1000l\x1b[?1006l"));
