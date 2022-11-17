const express = require('express');
const path = require('path');
const http = require('http');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3000);

http.createServer(function (req, res) {
    res.setHeader("access-control-allow-origin", "*");
}).listen(process.env.PORT || 3000);
