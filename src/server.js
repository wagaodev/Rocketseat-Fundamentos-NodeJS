import http from "node:http";
import "dotenv/config";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find(
    (route) => route.method === method && route.path === url
  );

  if (route) {
    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

server.listen(process.env.PORT, () => {
  console.log("Está rodando na porta =>", process.env.PORT);
});
