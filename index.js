// backend TBSHB taxi bisim Banovan Hamedan
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const mime = require('mime-types');
const serveStatic = require('serve-static');
const path = require('path');
require('dotenv').config();

const router = require('./router');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/University', { useCreateIndex: true, useNewUrlParser: true });
/*mongoose.connect(`mongodb://${process.env.DU_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
  useNewUrlParser: true
});*/

const app = express();

// const headerSet = (res, path) => {
//   console.log(path);
//   res.setHeader('Content-Type', 'amir');
// }
// // app.use(morgan('combined'));
// app.use('/pic', express.static('pic', {
//   setHeaders: headerSet
// }));

const setHeader = (res, path) => {
  // console.log(mime.lookup(path));
  // res.setHeader('Content-Type', mime.lookup(path))
  // res.setHeader('Content-Disposition', contentDisposition(path))
  res.setHeader('Cache-Control', 'public,max-age=664417163,immutable')
}

app.use('/pic', serveStatic(path.join(__dirname, 'pic'), {
  maxAge: '1d',
  setHeaders: setHeader
}))

// function setCustomCacheControl (res, path) {
//   res.setHeader('Content-Type', 'image/jpeg')
//   console.log(mime.lookup(path));
// }

app.use(cors());

const port = process.env.PORT || 1375;
const server = http.createServer(app);

router(app);

module.exports = app;

server.listen(port);
console.log('Server roye in port ejra shod : ', port);
