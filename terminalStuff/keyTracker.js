// 1. Turn on Raw Mode
Deno.stdin.setRaw(true);

console.log("Press any key (Press 'Esc' to quit)...");

// 2. Create a buffer to hold the key data
while (true) {
  const buffer = new Uint8Array(3);

  // 3. Read the input
  const n = await Deno.stdin.read(buffer);
  if (buffer[0] === 27) {
    console.log("program terminated");
    break;
  }

  const keyPressed = new TextDecoder().decode(buffer.subarray(0, n));

  console.log(buffer, `You pressed: ${keyPressed}`);
}

// 4. Always turn off Raw Mode before exiting!
Deno.stdin.setRaw(false);
