/* eslint-disable react-hooks/exhaustive-deps */


import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

const baseUrl = 'https://giphy.com/embed/';

const AnimeGif: React.FC = () => {
    const [gifId, setGif] = useState<string>('...');
    const [loading, setLoading] = useState<boolean>(false);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        updateGif();
    }, [])

    function updateGif() {
        if (loading) return
        setLoading(true)
        axios.get('/animegif', {
            timeout: 2000,
            params: {
                id: initialized ? gifId : undefined
            },
        }).then((response: AxiosResponse) => {
                setGif(response.data)
                setLoading(false);
                setInitialized(true)
            }
        )
    }

    return (
        loading ? <p className={"gif"}>Loading..</p> :
            <div className={"gif"} onClick={updateGif}><iframe title={"anime-gif"} className="gif" src={baseUrl + gifId} frameBorder="0"/></div>
    )
}

export default AnimeGif
