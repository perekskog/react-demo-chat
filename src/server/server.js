import express from "express";
import path from "path";

const server = express();
server.use(express.static("dist"));

server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

server.get("/message", (req, res) => {
  console.log("/message")
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    messageOfTheDay: "Today!"
  }))
})

server.listen(4242, () => console.log("Server is running..."));