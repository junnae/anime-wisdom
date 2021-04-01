const express = require('express');
const path = require('path');
const axios = require("axios");
const app = express();
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')));

let gifCache = []
let quoteCache = []

app.get('/animegif', function (req, res) {
    let randomNumber = Math.random() * 10;
    if(randomNumber < gifCache.length && randomNumber < 5){
        return res.send(gifCache[randomNumber.toFixed(0)])
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
        return res.send(url);
        }
    )
});

app.get('/advice', function(req, res) {
    let randomNumber = Math.random() * 100;
    if(randomNumber < quoteCache.length && randomNumber < 50){
        return res.send(quoteCache[randomNumber.toFixed(0)])
    }
    axios.get('https://api.adviceslip.com/advice').then((response) => {
        let quote = response.data["slip"]["advice"];
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

