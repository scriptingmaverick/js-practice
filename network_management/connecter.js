import { handleReply, handleSend, initiateConnector } from "./helper.js";

const main = async () => {
  const connector = initiateConnector();

  for await (const packet of connector) {
    await handleReply(connector);
    await handleSend(connector);
  }
};

main();
