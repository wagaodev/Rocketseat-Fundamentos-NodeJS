import http from "node:http";
import "dotenv/config";

const users = [];

const server = http.createServer((req, res) => {
  const { method, url } = req;

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "Wagner",
      email: "wcfx.dev@gmail.com",
    });

    return res.writeHead(201).end();
  }

  return res.writeHead(404).end();
});

server.listen(process.env.PORT, () => {
  console.log("Está rodando na porta", process.env.PORT);
});
