import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

const AnimeGif: React.FC = () => {
    const [gif , setGif] = useState<string>('Loading..');
    useEffect(() => {
        axios.get('/animegif', {
            timeout: 2000
        }).then((response: AxiosResponse) => {
                setGif(response.data)
            }
        )
    }, [])

    return (
        <iframe title={"anime-gif"} className="gif" src={gif}/>
    )
}

export default AnimeGif
