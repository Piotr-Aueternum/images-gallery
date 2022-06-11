import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';
import express from 'express'
import cacheService from "express-api-cache";
import { createApi } from 'unsplash-js';
import dotenv from 'dotenv'

global.fetch = fetch;
dotenv.config()

const unsplash = createApi({
  accessKey: process.env.ACCESS_KEY,
  secret: process.env.SECRET,
  timeout: 500,
});

const cache = cacheService.cache;
const app = express()
const port = 8000

app.use(express.json())
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/api/list-collections', cache("10 minutes"), function (req, res) {
  unsplash.collections.list({ page: 1, perPage: 10 })
    .then(({ response, type }) => {
      if (type === 'success') {
        res.send({ reply: response.results })
      }
    });
});

app.post('/api/collections', cache("10 minutes"), function (req, res) {
  const {
    id,
    orderBy,
    pageNo,
  } = req.body.request;
  unsplash.collections.getPhotos({ collectionId: id })
    .then(({ response, type }) => {
      if (type === "success") {
        res.send({ reply: response.results })
      }
    });
});

app.post('/api/photo', cache("10 minutes"), function (req, res) {
  unsplash.photos.get({ photoId: req.body.request.id })
    .then(({ response, type }) => {
      if (type === "success") {
        res.send({ reply: response })
      }
    })
})

app.use(express.static('public'))

app.get('*', function (req, res) {
  res.redirect('/');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))