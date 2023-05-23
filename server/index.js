const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const { getAlbums, addAlbum } = require("./controller.js");

// ENDPOINTS

app.get("/api/albums", getAlbums);
app.post("/api/albums", addAlbum);

// SERVER LISTENING

app.listen(4004, () => {
  console.log("Up on 4004!");
});
