const express = require('express');
const path = require('path');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config()

const baseApiUrl = process.env.BASE_API_URL;

app.use(express.static(path.join(__dirname, 'dist')));
app.use(
    '/',
    createProxyMiddleware({
        target: baseApiUrl ?? "https://revined-be.herokuapp.com",
        changeOrigin: true,
        logLevel: "debug",
        headers: {
            "Connection": "keep-alive"
        }
    })
)
app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), function () {
    console.log('listening on port ', server.address().port);
});