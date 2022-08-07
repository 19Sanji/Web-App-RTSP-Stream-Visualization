const express = require("express");
const cors = require("cors");
const router = require("./routes/index");
const sio = require("./socket");

const app = express();

app.use(cors());
app.use(express.json()); // Необходимый парсер! Нужен для корректного получения POST
app.use("/", router);

const server = app.listen(3001, () => {
  console.log("Сервер запущен!");
});
sio.init(server);

module.exports = app;
