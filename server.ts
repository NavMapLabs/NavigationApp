#!/usr/bin/env node
const path = require('path');
const { createRequestHandler } = require('@expo/server/adapter/express');

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');

const CLIENT_BUILD_DIR = path.join(process.cwd(), 'dist');

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

process.env.NODE_ENV = 'production';


/*********** Serves quested to script file ***********/
app.use('/NavigationApp',
  express.static(CLIENT_BUILD_DIR, {
    maxAge: '1h',
    extensions: ['html'],
  })
);

/*********** Serves quested to index.html ***********/
// @ts-ignore, needed to ignore the missing type definition of (_req, res)
// having type definition breaks something behind the scene that's pure js
app.get('/', (_req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_DIR, 'index.html'));
});


app.use(morgan('tiny'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server running on port ${port}`);
});
