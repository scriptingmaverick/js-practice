import { blue, green, red } from "jsr:@std/fmt/colors";

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
  const char = format(x, ` `);
  Deno.stdout.write(
    new TextEncoder().encode(`\x1b[s\x1b[${y};${x}H${char}\x1b[u`),
  );
};

Deno.stdin.setRaw(true, { cbreak: true });

const encoder = new TextEncoder();
const decoder = new TextDecoder();
let isDragging = false;

await Deno.stdout.write(encoder.encode("\x1b[?1003h\x1b[?1006h"));

while (true) {
  const n = await Deno.stdin.read(buffer);

  const input = decoder.decode(buffer.subarray(0, n));

  if (buffer[0] === 113) break;
  const data = input.slice(3, -1);

  const [method, x, y] = data.split(";");
  // console.log(method);
  if (method === "32") drawAt(x, y);
}

await Deno.stdout.write(encoder.encode("\x1b[?1003l"));
