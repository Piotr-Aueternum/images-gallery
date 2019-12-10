require('dotenv').config()
const fetch = require('node-fetch');
global.fetch = fetch;

const fs = require('fs');
const path = require('path');
const Unsplash = require('unsplash-js').default;

const mocking = JSON.parse(process.env.MOCKING);

const unsplash = new Unsplash({
    accessKey: process.env.ACCESS_KEY,
    secret: process.env.SECRET,
    timeout: 500,
});

//   unsplash.collections.listCollections(1, 10, "popular")
//     .then(res => res.json())
//     .then(json => {
//       const result = JSON.stringify(json, null, 2);
//       fs.writeFileSync("mocks/list-collections.json", result)
//     });
  // unsplash.collections.getCollectionPhotos(209138, 1, 10, "popular")
  //   .then(res => res.json())
  //   .then(json => {
  //     const result = JSON.stringify(json, null, 2);
  //     fs.writeFileSync("mocks/collections-209138.json", result)
  //   });

  // unsplash.photos.getPhoto("IJ25m7fXqtk")
  //   .then(res => res.json())
  //   .then(json => {
  //     const result = JSON.stringify(json, null, 2);
  //     fs.writeFileSync("mocks/photo-IJ25m7fXqtk.json", result)
  //   })

const express = require('express')
const app = express()
const port = 8000

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

const parseMock = mockPath => {
  return { reply: JSON.parse(fs.readFileSync(`mocks/${mockPath}.json`).toString('utf8')) }
}

app.post('/list-collections', function(req, res) {
  res.send(parseMock('list-collections'))
});

app.post('/collections', function(req, res) {
  res.send(parseMock('collections-209138'))
});

app.post('/photo', function(req, res) {
  res.send(parseMock('photo-IJ25m7fXqtk'))
})

app.use(express.static('public'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))