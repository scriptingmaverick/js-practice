import { drawAt } from "../../../utils/helper.js";

const buffer = new Uint8Array(100);

function format(x, text) {
  if (x < 45) return `\x1b[48;2;255;0;0;m${text}\x1b[0m`;
  if (x > 85) return `\x1b[48;2;0;255;0;m${text}\x1b[0m`;
  return `\x1b[48;2;0;0;255;m${text}\x1b[0m`;
}

const subSq = (c1, c2) => Math.pow(c2 - c1, 2);

const distBtw = (p1, p2) => {
  const xOff = subSq(p2.x, p1.x);
  const yOff = subSq(p2.y, p1.y);

  return Math.round(Math.sqrt(xOff + yOff));
};

const drawAline = (point1, point2) => {
  point1.x = +(point1.x);
  point1.y = +(point1.y);
  point2.x = +(point2.x);
  point2.y = +(point2.y);

  const deltaX = Math.abs(point1.x - point2.x);
  const deltaY = Math.abs(point1.y - point2.y);
  const steps = Math.max(deltaX, deltaY);

  const dx = (point1.x - point2.x) / steps;
  const dy = (point1.y - point2.y) / steps;
  let x = point2.x;
  let y = point2.y;
  for (let i = 0; i < steps; i++) {
    x += dx;
    y += dy;
    drawAt(Math.round(+x), Math.round(+y));
  }

  // const [topPoint, lowerPoint] = point1.y > point2.y
  //   ? [point1, point2]
  //   : [point2, point1];

  // const connPoint = { y: lowerPoint.y, x: topPoint.x };

  // const oppSideLength = distBtw(topPoint, connPoint);
  // const adjSideLength = distBtw(connPoint, lowerPoint);

  // const hypotenuse = Math.round(
  //   Math.sqrt(Math.pow(oppSideLength, 2) + Math.pow(adjSideLength, 2)),
  // );

  // let { x, y } = lowerPoint;
  // y = +y;
  // x = +x;
  // while (+y < +(topPoint.y)) {
  //   const sinTheta = adjSideLength / hypotenuse;
  //   const cosTheta = oppSideLength / hypotenuse;

  //   x += sinTheta;
  //   y += cosTheta;

  //   drawAt(Math.round(+x), Math.round(+y));
  // }
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

  if (btn === "0" && input.at(-1) === "M" && !isDragging) isDragging = true;
  else if (btn === "0" && input.at(-1) === "m" && isDragging) {
    // console.log(path);
    drawAline(path[0], path.at(-1));
    isDragging = false;
    path = [];
  }

  if (isDragging) path.push({ x, y });
}

await Deno.stdout.write(encoder.encode("\x1b[?1003l"));
