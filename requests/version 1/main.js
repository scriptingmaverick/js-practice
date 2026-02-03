import { handleRequest } from "./src/utils/request.js";
import { serve } from "./src/utils/server.js";

const main = () => {
  serve(8000, handleRequest);
};

main();
