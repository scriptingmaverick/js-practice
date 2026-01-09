const stream = new ReadableStream({
  start(controller) {
    let i = 0;
    const intervalId = setInterval(() => {
      controller.enqueue(`Tick ${i}`);
      if (i++ === 5) {
        clearInterval(intervalId);
        controller.close();
      }
    }, 500);
  },
});

for await (const tick of stream) {
  console.log(tick);
}
