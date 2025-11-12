const http = require('http');
const routes = require('./routes');
const express = require('express');

const app = express();

app.use('/',(req, res, next) => {
    console.log('this always runs');
    next();
});

app.use('/add-product',(req, res, next) => {
    console.log('In the middleware');
    next();
});

app.use('/',(req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
// const server = http.createServer(routes);

// server.listen(3000);