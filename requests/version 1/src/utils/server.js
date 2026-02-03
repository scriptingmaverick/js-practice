const handleConnections = async (server, handleRequest) => {
  for await (const conn of server) {
    handleRequest(conn);
  }
};

export const serve = (port, handleRequest) => {
  const server = Deno.listen({ port });

  handleConnections(server, handleRequest);
};
