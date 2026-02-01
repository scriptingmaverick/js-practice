const putIntoBackground = (r, g, b) => `\x1b[48;2;${r};${g};${b}m `;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// const file = await Deno.open("SD-720-480.ppm");
// const file = await Deno.open("1024-image.ppm");
const file = await Deno.open("ppm_640_426.ppm");

/* ---------- HEADER ---------- */
let header = "";
let headerBytes = 0;
const byte = new Uint8Array(1);

let magic, width, height, maxVal;

while (true) {
  const n = await file.read(byte);
  if (n === null) throw new Error("EOF in header");

  header += decoder.decode(byte);
  headerBytes++;

  const clean = header.replace(/#.*\n/g, "");
  const parts = clean.trim().split(/\s+/);

  if (parts.length >= 4 && /\s$/.test(header)) {
    [magic, width, height, maxVal] = parts;
    width = Number(width);
    height = Number(height);
    maxVal = Number(maxVal);
    break;
  }
}

if (magic !== "P6") throw new Error("Not P6");

/* ---------- SEEK TO PIXELS ---------- */
await file.seek(headerBytes, Deno.SeekMode.Start);

/* ---------- TERMINAL SCALING ---------- */
const TERM_COLS = 300; // your terminal width
const scaleX = Math.ceil(width / TERM_COLS);
const scaleY = 2; // optional vertical scaling

/* ---------- RENDER ---------- */
const rowSize = width * 3;
const buffer = new Uint8Array(rowSize);

for (let row = 0; row < height; row++) {
  // vertical downscale
  if (row % scaleY !== 0) {
    await file.read(buffer);
    continue;
  }

  let filled = 0;
  while (filled < rowSize) {
    const n = await file.read(buffer.subarray(filled));
    if (n === null) throw new Error("EOF in pixels");
    filled += n;
  }

  let line = "";
  for (let col = 0; col < width; col += scaleX) {
    const i = col * 3;

    const r = Math.round((buffer[i] * 255) / maxVal);
    const g = Math.round((buffer[i + 1] * 255) / maxVal);
    const b = Math.round((buffer[i + 2] * 255) / maxVal);

    line += putIntoBackground(r, g, b);
  }

  await Deno.stdout.write(encoder.encode(line + "\x1b[0m\n"));
}

file.close();
