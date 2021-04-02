const express = require('express');
const {fetchRandomAnimeGif, fetchQuote} = require("./server/Integration");
const {QuoteCache} = require('./server/QuoteCache');
const {GifCache} = require('./server/GifCache');

const path = require('path');
const {connect, getQuoteById} = require("./server/Database");
const app = express();
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')));

let gifCache = new GifCache(1000, true)
let quoteCache = new QuoteCache(1000, false)

//TODO - Basic Error Handling
app.get('/animegif', function (req, res) {
    let queryId = req.query.id;
    let fromCache = gifCache.maybeGetFromCache(queryId);
    if (fromCache !== undefined)
        return res.send(fromCache)
    return fetchRandomAnimeGif(gifCache, res, queryId === undefined)
});

app.get('/advice', function (req, res) {
    let queryId = req.query.id;
    if(queryId !== undefined){
        getQuoteById(queryId, function(err, result){
            if(err) console.log(err)
            else if(result !== undefined) return res.send(result)
        });
    }
    let fromCache = quoteCache.maybeGetFromCache();
    if (fromCache !== undefined)
        return res.send(fromCache)
    return fetchQuote(quoteCache, res);
});


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/ping', function (req, res) {
    return res.send('pong');
});

app.listen(8080, function () {
    console.log('Server started')
    connect()
});
