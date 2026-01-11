const file = await Deno.open("example.txt", { read: true });
const buffer = new Uint8Array(10); // We only want to read 10 bytes at a time

// read() returns the number of bytes actually read
const bytesRead = await file.read(buffer);

console.log(`Read ${bytesRead} bytes:`, new TextDecoder().decode(buffer));

// Close the resource when done!
file.close();
