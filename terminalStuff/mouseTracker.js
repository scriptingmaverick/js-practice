Deno.stdin.setRaw(true);
// Enable SGR Mouse mode (?1006h)
await Deno.stdout.write(new TextEncoder().encode("\x1b[?1003h\x1b[?1006h"));

const buffer = new Uint8Array(100);

while (true) {
  const n = await Deno.stdin.read(buffer);
  if (buffer[0] === 113) break;
  if (!n) break;

  const rawString = new TextDecoder().decode(buffer.subarray(0, n));
  // Check if it starts with the SGR sequence: \x1b[<
  if (rawString.startsWith("\x1b[<")) {
    // Remove the prefix and the trailing 'M' or 'm'
    const data = rawString.slice(3, -1);
    // Split by the semicolon (59)
    const [button, x, y] = data.split(";");

    console.log(`Mouse Event -> Button: ${button}, X: ${x}, Y: ${y}`);
  }
}
