import React, {useEffect, useState} from "react";
import {AxiosResponse} from "axios";
import './style/Anime.css'

const axios = require('axios').default;


const AnimeGif: React.FC = () => {
    const [advice, setAdvice] = useState<string>('Wait for it..');
    const [gif , setGif] = useState<string>('Loading..');
    useEffect(() => {
        axios.get('https://api.adviceslip.com/advice').then((response: AxiosResponse) => {
                setAdvice(response.data["slip"]["advice"])
            }
        )
        axios.get('/animegif', {
        }).then((response: AxiosResponse) => {
                setGif(response.data)
            }
        )
    }, [])


    return (
        <div className={"Anime-gif"}>
            <p className ="advice">
                {advice}
            </p>
            <iframe className="gif" src={gif}/>
        </div>
    )


}

export default AnimeGif
