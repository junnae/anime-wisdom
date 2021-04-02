const axios =  require("axios");

function fetchRandomAnimeGif(cache, res, shouldUpdateTimedCache) {
    return axios.get('https://api.giphy.com/v1/gifs/random', {
        params: {
            api_key: process.env.API_KEY,
            rating: 'pg',
            tag: 'anime'
        }
    }).then((response) => {
            const id = response.data["data"]["id"];
            cache.add(id, shouldUpdateTimedCache);
            return res.send(id)
        }
    )
}

function fetchQuote(cache, res) {
    axios.get('https://api.adviceslip.com/advice').then((response) => {
            let quote = response.data["slip"]["advice"];
            cache.add(quote, false)
            return res.send(quote)
        }
    )
}

module.exports = { fetchRandomAnimeGif, fetchQuote}
