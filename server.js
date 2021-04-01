const express = require('express');
const path = require('path');
const axios = require("axios");
const app = express();
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')));

let gifCache = []
let timerGif = Date.UTC(1970,1,1);
let currentGif = null;
let quoteCache = []

function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

app.get('/animegif', function (req, res) {
    if(currentGif != null && Date.now() < timerGif ) return res.send(currentGif)
    if(gifCache.length > 0 && randomIntFromInterval(1,10) %2 === 0){
        let cachedGif = gifCache[randomIntFromInterval(0, gifCache.length - 1)];
        currentGif = cachedGif;
        timerGif = new Date(Date.now() + 10000)
        return res.send(cachedGif)
    }

    axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
            api_key: process.env.API_KEY,
            rating: 'pg',
            tag: 'anime'
        }
    }).then((response) => {
        const url = response.data["data"]["embed_url"];
        gifCache.push(url);
        if(gifCache.length > 100) gifCache.shift()
        currentGif = url;
        timerGif = new Date(Date.now() + 10000)
        return res.send(url);
        }
    )
});

app.get('/advice', function(req, res) {
    if(quoteCache.length > 0 && randomIntFromInterval(1,10) %2 === 0){
        return res.send(quoteCache[randomIntFromInterval(0, quoteCache.length - 1)])
    }
    axios.get('https://api.adviceslip.com/advice').then((response) => {
        let quote = response.data["slip"]["advice"];
        if(quoteCache.length > 100) quoteCache.shift()
        quoteCache.push(quote)
        return res.send(quote)
        }
    )
});


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/ping', function (req, res) {
    return res.send('pong');
});


app.listen(8080, function(){
    console.log('Server started')
});

