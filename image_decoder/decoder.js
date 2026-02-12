import { bgRgb24 } from "jsr:@std/fmt/colors";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const file = await Deno.open("ppm_640_426.ppm");

let header = "";
let headerBytes = 0;
const byte = new Uint8Array(1);

let ppm_method, width, height, maxVal;

while (true) {
  const n = await file.read(byte);
  if (n === null) throw new Error("EOF in header");

  header += decoder.decode(byte);
  headerBytes++;

  const clean = header.replace(/#.*\n/g, "");
  const parts = clean.trim().split(/\s+/);

  if (parts.length >= 4 && /\s$/.test(header)) {
    [ppm_method, width, height, maxVal] = parts;
    width = Number(width);
    height = Number(height);
    maxVal = Number(maxVal);
    break;
  }
}

if (ppm_method !== "P6") throw new Error("Not P6");

await file.seek(headerBytes, Deno.SeekMode.Start);

for (let i = 0; i < height; i++) {
  const line_buffer = new Uint8Array(width);
  let chInd = 0;
  await file.read(line_buffer);

  let line_str = "";

  while (chInd <= width) {

    line_str += bgRgb24(" ", {
      r: line_buffer[chInd],
      g: line_buffer[chInd + 1],
      b: line_buffer[chInd + 2],
    });
    
    chInd += 3;
  }

  console.log(line_str);
}
