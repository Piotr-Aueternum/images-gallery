require('dotenv').config()
const fetch = require('node-fetch');
global.fetch = fetch;

const fs = require('fs');
const path = require('path');
const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({
    accessKey: process.env.ACCESS_KEY,
    secret: process.env.SECRET,
    timeout: 500,
});

const express = require('express')
const app = express()
const port = 8000

app.use(express.json())
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/api/list-collections', function(req, res) {
  unsplash.collections.listCollections(1, 10, "popular")
    .then(res => res.json())
    .then(json => {
      res.send({ reply: json })
    });
});

app.post('/api/collections', function(req, res) {
  const {
    id,
    orderBy,
    pageNo,
  } = req.body.request;
  unsplash.collections.getCollectionPhotos(id, pageNo, 12, orderBy)
    .then(res => res.json())
    .then(json => {
      res.send({ reply: json })
    });
});

app.post('/api/photo', function(req, res) {
  unsplash.photos.getPhoto(req.body.request.id)
    .then(res => res.json())
    .then(json => {
      res.send({ reply: json })
    })
})

app.use(express.static('public'))

app.get('*', function(req, res) {
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))