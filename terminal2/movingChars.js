const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encode = (text) => encoder.encode(text);
const decode = (text) => decoder.decode(text);

Deno.stdin.setRaw(true);

await Deno.stdout.write(encode("\x1b[?1003h\x1b[?1006h"));

const buffer = new Uint8Array(100);
let isDragging = false;

while (true) {
  const n = await Deno.stdin.read(buffer);
  const input = decode(buffer.subarray(0, n));

  if (buffer[0] === 113) break;

  const data = input.slice(3, -1);
  const [btn, x, y] = data.split(";");
  if (btn === "0" && !isDragging) {
    charToMove = await Deno.stdin.read();
  }
}

await Deno.stdout.write(encode("\x1b[?1003l\x1b[?1006l"));
