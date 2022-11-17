const express = require('express');
const path = require('path');
const http = require('http');
const request = require('request');
const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 3000);

http.createServer(function (req, res) {
    if(req.url.match(/path=(.*)/)) {
        res.setHeader("access-control-allow-origin", "*");
        request.get(req.url.match(/path=(.*)/)[1]).pipe(res);
    }else{
        res.statusCode = 404;

        res.end("More info at https://github.com/cDima/cors");
    }
}).listen(process.env.PORT || 3000);
