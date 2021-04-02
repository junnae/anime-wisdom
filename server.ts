import {Cache} from "./server/cache";
import {fetchQuote, fetchRandomAnimeGif} from "./server/integration";

const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config()

app.use(express.static(path.join(__dirname, 'build')));

let gifCache = new Cache(100, true)
let quoteCache = new Cache()


//TODO - Basic Error Handling
app.get('/animegif', function (req: any, res: { send: (arg0: string | Promise<any>) => any; }) {
    let queryId: string | undefined = req.query.id;
    let fromCache = gifCache.maybeGetFromCache(queryId);
    if (fromCache !== undefined)
        return res.send(fromCache)
    return fetchRandomAnimeGif(gifCache, res, queryId === undefined)
});

app.get('/advice', function (req: any, res: { send: (arg0: string | void) => any; }) {
    let fromCache = quoteCache.maybeGetFromCache();
    if (fromCache !== undefined)
        return res.send(fromCache)
    return fetchQuote(quoteCache, res);
});


app.get('/', function (req: any, res: { sendFile: (arg0: any) => void; }) {
    res.sendFile(path.join(__dirname + '/index.html'));
});


app.get('/ping', function (req: any, res: { send: (arg0: string) => any; }) {
    return res.send('pong');
});


app.listen(8080, function () {
    console.log('Server started')
});
