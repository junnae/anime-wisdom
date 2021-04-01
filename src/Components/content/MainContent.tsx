import React from "react";
import '../../style/Content.scss'
import Quote from "./Quote";
import AnimeGif from "./AnimeGif";

const MainContent: React.FC = () => {
    return (
        <div className={"content"}>
            <Quote/>
            <AnimeGif/>
        </div>
    )
}

export default MainContent
