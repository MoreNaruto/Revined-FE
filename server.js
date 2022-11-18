const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware }= require('http-proxy-middleware');

const baseApiUrl = process.env.BASE_API_URL;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(
    '/api',
    createProxyMiddleware({
        target: "https://re10shon-backend.herokuapp.com",
        changeOrigin: true,
        logLevel: "debug",
        onError: function onError(err, req, res) {
            console.log("Something went wrong with the proxy middleware.", err);
            res.end();
        }
    })
)
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function () {
    console.log('listening on port ', server.address().port);
});