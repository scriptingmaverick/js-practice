import { blue, green, red } from "jsr:@std/fmt/colors";

function format(x, text) {
  if (x < 45) return red(text);
  if (x > 85) return green(text);
  return blue(text);
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

await Deno.stdout.write(encoder.encode("\x1b[?1003h\x1b[?1006h"));
Deno.stdin.setRaw(true, { cbreak: true });

const buffer = new Uint8Array(20);

while (true) {
  const n = await Deno.stdin.read(buffer);
  const input = decoder.decode(buffer.subarray(0, n));

  if (input.startsWith("\x1b[<")) {
    const data = input.slice(3, -1);
    const [_, x, y] = data.split(";");

    const formattedData = format(x, `Clicked at ${x}, ${y}`);
    console.log(formattedData);
  }
}
