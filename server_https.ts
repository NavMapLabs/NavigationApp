#!/usr/bin/env node
// @ts-ignore, ignore the warning of duplicate define
// only one server file will be ran
const path = require('path');
const { createRequestHandler } = require('@expo/server/adapter/express');
const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const fs = require('fs');
const https = require('https');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).argv;

const CLIENT_BUILD_DIR = path.join(process.cwd(), 'dist');

const app = express();

app.use(compression());

// Disable 'x-powered-by' header for security reasons
app.disable('x-powered-by');

// Set environment to production
process.env.NODE_ENV = 'production';

/*********** Serves requests to script file ***********/
app.use('/NavigationApp',
  express.static(CLIENT_BUILD_DIR, {
    maxAge: '1h',
    extensions: ['html'],
  })
);

/*********** Serves requests to index.html ***********/
// @ts-ignore, needed to ignore the missing type definition of (_req, res)
// having type definition breaks something behind the scene that's pure js
app.get('/', (_req, res) => {
  res.sendFile(path.join(CLIENT_BUILD_DIR, 'index.html'));
});

// Logging HTTP requests
app.use(morgan('tiny'));

// Define port (HTTPS typically uses port 443)
const port = process.env.PORT || 443;

// Define paths to SSL certificate and key files
const sslOptions = {
  key: fs.readFileSync(argv.keyPath || process.env.SSL_KEY_PATH),
  cert: fs.readFileSync(argv.certPath || process.env.SSL_CERT_PATH),
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(port, () => {
  console.log(`HTTPS server running on port ${port}`);
});

// // Optionally redirect HTTP to HTTPS if needed
// const http = require('http');
// const httpPort = process.env.HTTP_PORT || 80;

// http.createServer((req, res) => {
//   // Redirect to HTTPS
//   res.writeHead(301, { "Location": `https://${req.headers.host}${req.url}` });
//   res.end();
// }).listen(httpPort, () => {
//   console.log(`HTTP server running on port ${httpPort} and redirecting to HTTPS`);
// });
