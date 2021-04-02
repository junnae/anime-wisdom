import axios from "axios";
import {Cache} from "./cache"

export function fetchRandomAnimeGif(cache: Cache, res: { send: (arg0: (string | Promise<any>)) => any }, shouldUpdateTimedCache: boolean) {
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

export function fetchQuote(cache: Cache, res: { send: (arg0: (string | void)) => any }) {
    axios.get('https://api.adviceslip.com/advice').then((response) => {
            let quote = response.data["slip"]["advice"];
            cache.add(quote, false)
        return res.send(quote)
        }
    )
}
