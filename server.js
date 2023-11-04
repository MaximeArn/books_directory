const http = require("http");

const PORT = 3000;
const server = http.createServer((req, res) => {
  req.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  if (req.url === "/books") {
    res.end("books");
  } else {
    res.end("hello world !");
  }
});

server.listen(PORT, () => {
  console.log(`server is listening on port ${PORT}`);
});
