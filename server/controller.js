const albums = require("./db.json");

module.exports = {
  getAlbums: (req, res) => {
    res.status(200).send(albums);
  },
  addAlbum: (req, res) => {
    const { id, albumName, artistName, trackList } = req.body;
    let greatestId = -1;
    for (let i = 0; i < albums.length; i++) {
      if (albums[i].id > greatestId) {
        greatestId = albums[i].id;
      }
    }
    let nextId = greatestId + 1;

    let newAlbum = {
      id: nextId,
      albumName,
      artistName,
      trackList,
    };

    albums.push(newAlbum);
    res.status(200).send(albums);
  },
};
