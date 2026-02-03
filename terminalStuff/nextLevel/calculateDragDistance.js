Deno.stdin.setRaw(true, { cbreak: true });

const encoder = new TextEncoder();
const decoder = new TextDecoder();

await Deno.stdout.write(encoder.encode("\x1b[?1003h\x1b[?1006h"));

const buffer = new Uint8Array(100);

let isDragStarted = false;

const calculateDist = (path) => {
  const { x: x1, y: y1 } = path[0];
  const { x: x2, y: y2 } = path.at(-1);

  const distance = Math.round(
    Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)),
  );

  return distance;
};

let path = [];

while (true) {
  const n = await Deno.stdin.read(buffer);
  const input = decoder.decode(buffer.subarray(0, n));

  if (input.startsWith("\x1b[<")) {
    const data = input.slice(3, -1);
    const [button, x, y] = data.split(";");

    if (button === "0" && !isDragStarted) {
      isDragStarted = true;
    } else if (button === "0" && isDragStarted) {
      if (path.length < 1) continue;
      const distance = calculateDist(path);

      console.log("distance :", { distance });

      isDragStarted = false;
      path = [];
    }

    if (isDragStarted) path.push({ x, y });
  }
}
