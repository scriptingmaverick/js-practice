const createGrid = (rowSize) => Array.from({ length: rowSize });

const grid = createGrid(10);

grid[0] = "hello everhsdb".split("");
grid[1] = "hey! there".split("");
grid[2] = "          ".split("");
grid[3] = "          ".split("");
grid[4] = "jai jai ja".split("");
grid[5] = "          ".split("");
grid[6] = "ratsasan  ".split("");
grid[7] = "          ".split("");
grid[8] = "Dhurandhar".split("");
grid[9] = "          ".split("");

const printGrid = () => {
  console.clear();
  console.log(grid.map((x) => x.join("")).join("\n"));
};

const sleep = (t) => new Promise((r) => setTimeout(r, t));

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const encode = (text) => encoder.encode(text);
const decode = (text) => decoder.decode(text);

Deno.stdin.setRaw(true);

await Deno.stdout.write(encode("\x1b[?1000h\x1b[?1006h"));

const buffer = new Uint8Array(100);

while (true) {
  printGrid();
  const n = await Deno.stdin.read(buffer);
  const input = decode(buffer.subarray(0, n));

  if (buffer[0] === 113) break;

  const data = input.slice(3, -1);
  const [btn, x, y] = data.split(";");
  if (btn === "0" && input.at(-1) === "M") {
    try {
      console.log({ x: x - 1, y: y - 1, input, char: grid[y - 1][x - 1] });
      const char = grid[y - 1][x - 1];
      await Deno.stdout.write(encode(`you clicked on -> [ ${char} ]`));
    } catch {
      console.log({ x: x - 1, y: y - 1, input });
      await Deno.stdout.write(encode("Empty Space"));
    }
  }

  await sleep(1500);
}

await Deno.stdout.write(encode("\x1b[?1000l\x1b[?1006l"));
