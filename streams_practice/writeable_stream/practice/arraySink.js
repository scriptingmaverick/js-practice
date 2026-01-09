const storage = [];

const stream = new WritableStream({
  // Use the controller to handle errors
  write(data, controller) {
    if (data < 0) {
      controller.error("Negative numbers can't be given.");
      return; 
    }

    storage.push(data);
    console.log("Current storage:", storage);
  },

  close() {
    console.log("Stream closed successfully.");
  },

  abort(reason) {
    console.error("Stream aborted! Reason:", reason);
  }
});

const writer = stream.getWriter();

// Example usage with a loop
while (true) {
  let input = prompt("Enter a +ve number (or 'stop' to finish):");
  
  if (input === "stop" || input === null) {
    await writer.close();
    break;
  }

  let num = parseInt(input);
  
  try {
    await writer.write(num);
  } catch (e) {
    console.log("Caught stream error:", e);
    break; // Stop the loop if the stream is errored
  }
}