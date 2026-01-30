import {
  clear,
  handleReply,
  handleSend,
  initializeInterval,
  initiateListener,
  instantiateSession,
  printToConsole,
} from "./helper.js";

const main = async () => {
  const listener = initiateListener();

  let intervalId = initializeInterval();

  for await (const conn of listener) {
    clear(intervalId);
    await instantiateSession();

    await handleConvoOn(conn);

    await handleClose(conn);

    intervalId = initializeInterval();
  }
};

const handleConvoOn = async (conn) => {
  while (true) {
    await handleSend(conn);
    const response = await handleReply(conn);

    if (response.isClosed) {
      await printToConsole("ok bye!!");
      break;
    }

    await printToConsole(response.data);
  }
};

main();
