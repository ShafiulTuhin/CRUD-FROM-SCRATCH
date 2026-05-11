import {
  createServer,
  IncomingMessage,
  Server,
  ServerResponse,
} from "node:http";
import { routeHandler } from "./routes/route";

const server: Server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log(req.url);

    routeHandler(req, res);
  },
);

server.listen(5000, () => {
  console.log("Server is listening from port 5000");
});
