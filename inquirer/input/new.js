Deno.stdin.setRaw(true, { cbreak: true });
const reader = Deno.stdin.readable.getReader();
const writer = Deno.stdout.writable.getWriter();
const decoder = new TextDecoder();
const encoder = new TextEncoder();

await writer.write(encoder.encode("\x1b[?1002h"));
await writer.write(encoder.encode("\x1b[?1006h"));
let text = "";
let drawing;

while (true) {
  const { value, done } = await reader.read();
  
  if (done) break;
  if (value[0] === 4) break;

  text = decoder.decode(value);
  const regex = /\x1b\[<(\d+);(\d+);(\d+)([mM])/g;

  for (const match of text.matchAll(regex)) {
    const [seq, cb, cx, cy, type] = match;

    const col = Number(cx);
    const row = Number(cy);

    if (type === "M") drawing = true;
    if (type === "m") drawing = false;

    if (drawing) {
      await writer.write(
        encoder.encode(`\x1b[${row};${col}H\x1b[41m \x1b[0m`),
      );
    }
  }
}

await writer.write(encoder.encode("\x1b[?1002l"));
await writer.write(encoder.encode("\x1b[?1006l"));
Deno.stdin.setRaw(false);