const cdList = document.querySelector("#album-container");
const albumList = document.querySelector("#albumList");
const trackList = document.querySelector("#trackList");
cdForm = document.querySelector("#cd-form");
const form = document.querySelector("form");
const addBtn = document.querySelector("#addBtn");
const saveBtn = document.querySelector("#saveBtn");

const baseURL = "http://localhost:4004/api/albums";

const albumsCallback = (res) => {
  displayAlbums(res.data);
  console.log(res.data);
};
const errCallback = (err) => {
  console.log(err);
};

const getAlbums = () => {
  axios.get(baseURL).then(albumsCallback).catch(errCallback);
};
const addAlbum = (album) => {
  axios.post(baseURL, album).then(albumsCallback).catch(errCallback);
};

function submitHandler(e) {
  e.preventDefault();

  let albumName = document.querySelector("#albumName").value;
  let artistName = document.querySelector("#artistName").value;
  let trackList = document.querySelector("#trackList").value.split(/\s*,\s*/);

  let bodyObj = {
    albumName: albumName,
    artistName: artistName,
    trackList: trackList,
  };

  addAlbum(bodyObj);

  form.reset();
}

function createAlbumCard(album) {
  const albumCard = document.createElement("div");
  albumCard.classList.add("album-card");
  let trackContainer = (albumCard.innerHTML = `
  <div id="album-card">
  <br>
  <p>--------------------------------</p>
    <h2> ${album.albumName}</h2>
    <h3>${album.artistName}</h3>
    </div>
    `);

  cdList.appendChild(albumCard);
}

function displayAlbums(arr) {
  cdList.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    createAlbumCard(arr[i]);
    arr[i].trackList.forEach((track) => {
      const trackList = document.createElement("section");

      trackList.textContent = track;
      cdList.appendChild(trackList);
    });
  }
}

function changeOpacity() {
  cdForm.style.opacity = "1";
  addBtn.style.display = "none";
}

form.addEventListener("submit", submitHandler);
addBtn.addEventListener("click", changeOpacity);

getAlbums();
