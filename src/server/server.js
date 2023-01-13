import express from "express";
import path from "path";

const server = express();
server.use(express.static("dist"));
server.use(express.json());

server.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
});

server.get("/app.css", (req, res) => {
  res.sendFile(path.resolve(__dirname, 'app.css'))
});

server.get("/message", (req, res) => {
  console.log("/message")
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    messageOfTheDay: "TBD..."
  }))
})

server.post("/detectIntent", (req, res) => {
  console.log(JSON.stringify(req.body))
  const messageText = req.body.text
  console.log(`/detectIntent ${messageText}`)
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({
    fullfilment: `TBD: Dialogflow fullfilment of "${messageText}"`
  }))
})

server.listen(10000, "localhost", () => console.log("Server is running..."));