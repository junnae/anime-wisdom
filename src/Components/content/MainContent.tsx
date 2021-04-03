import React from "react";
import '../../style/Content.scss'
import Quote from "./Quote";
import AnimeGif from "./AnimeGif";

type MainProps = {
    q?: string;
    g?: string;
}

const MainContent: React.FC<MainProps> = ( {q, g}) => {
    return (
        <div className={"content"}>
            <Quote q={q}/>
            <AnimeGif g={g}/>
        </div>
    )
}

export default MainContent
