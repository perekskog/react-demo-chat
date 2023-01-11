import express from "express";
import path from "path";

const server = express();
server.use(express.static("dist"));

server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

server.listen(4242, () => console.log("Server is running..."));