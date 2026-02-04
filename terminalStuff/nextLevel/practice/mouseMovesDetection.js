Deno.stdin.setRaw(true);

const encoder = new TextEncoder();
const decoder = new TextDecoder();

await Deno.stdout.write(encoder.encode("\x1b[?1003h\x1b[?1006h"));

const buffer = new Uint8Array(100);

while (true) {
  const n = await Deno.stdin.read(buffer);
  if (buffer[0] === 113) break;

  const input = decoder.decode(buffer.subarray(0, n));
  if (input.startsWith("\x1b[<")) {
    const data = input.slice(3, -1);

    const [button] = data.split(";");

    const obj = {
      0: `left button clicked`,
      35: "moving pointer",
      2: "right button clicked",
      34: "dragging with right pointer",
      32: "dragging with left pointer",
    };

    console.log(obj[button]);
  }
}
