/* eslint-disable react-hooks/exhaustive-deps */


import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";
import {setG} from "../../App";

const baseUrl = 'https://giphy.com/embed/';

type GifProps = {
    g?: string;
}

const AnimeGif: React.FC<GifProps> = ({g}) => {
    const [gifId, setGif] = useState<string>('...');
    const [loading, setLoading] = useState<boolean>(false);
    const [initialized, setInitialized] = useState<boolean>(false);

    useEffect(() => {
        updateGif();
    }, [])

    function wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function updateGif() {
        if (g) {
            if(initialized) return
            setLoading(true)
            wait(200).then(() =>{
                setGif(g)
                setG(g)
                setLoading(false)
                setInitialized(true)
            })
            return
        }
        if (loading) return
        setLoading(true)
        axios.get('/animegif', {
            timeout: 2000,
            params: {
                id: initialized ? gifId : undefined
            },
        }).then((response: AxiosResponse) => {
                setGif(response.data)
                setG(response.data)
                setLoading(false);
                setInitialized(true)
            }
        )
    }

    return (
        loading ? <p className={"gif"}>Loading..</p> :
            <div className={"gif"} onClick={updateGif}>
                <iframe title={"anime-gif"} className="gif" src={baseUrl + gifId} frameBorder="0"/>
            </div>
    )
}
export default AnimeGif
