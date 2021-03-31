const express = require('express');
const path = require('path');
const axios = require("axios");
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.get('/animegif', function (req, res) {
    axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
            api_key: process.env.API_KEY,
            rating: 'pg',
            tag: 'anime'
        }
    }).then((response) => {
        return res.send(response.data["data"]["embed_url"]);
        }
    ).catch(
    )
    return res;
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

