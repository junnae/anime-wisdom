const express = require('express');
const path = require('path');
const axios = require("axios");
const app = express();
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')));

let cache = []

app.get('/animegif', function (req, res) {
    let randomNumber = Math.random() * 10;
    if(randomNumber < cache.length && randomNumber < 5){
        return res.send(cache[randomNumber.toFixed(0)])
    }

    axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
            api_key: process.env.API_KEY,
            rating: 'pg',
            tag: 'anime'
        }
    }).then((response) => {
        const url = response.data["data"]["embed_url"];
        cache.push(url);
        return res.send(url);
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

