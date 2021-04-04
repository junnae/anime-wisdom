import '../../style/Header.scss'
import React, {useState} from 'react';
import {getG, getQ} from "../../App";
import {isMobile} from 'react-device-detect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt} from "@fortawesome/free-solid-svg-icons";

const Header: React.FC = () => {

    const wisdom = "★☆★ w i s d o m ✧ﾟ";
    const clickToCopy = "Click to share! "
    const copied = "Copied link!";

    const [text, setText] = useState<string>(wisdom);
    const [hovering, setHovering] = useState<boolean>(false);
    const [copyText, setCopytext] = useState<boolean>(false);

    function copyLinkToClipboard() {
        if(!navigator.share || !isMobile) {
            navigator.clipboard.writeText("https://advice.moe/" + getQ() + "/" + getG())
            setText(copied)
            setCopytext(true)
            wait(2000).then(() => {
                setText(wisdom);
                setCopytext(false)
            })
        } else {
            navigator.share({
                url: "https://advice.moe/" + getQ() + "/" + getG(),
                title: "Share widsom ",
                text: "You should see this"
            })
        }
    }

    function wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function onLeave(){
        if(hovering && !copyText){
            setText(wisdom)
        }
        setHovering(false)
    }

    function onMouseEnter(){
        setHovering(true)
        if(!copyText){
            setText(clickToCopy)
        }
    }

    return (
        <div className={"App-header"} onClick={copyLinkToClipboard} onMouseEnter={onMouseEnter} onMouseLeave={onLeave}>
            <h1>{text}
                {!copyText? <FontAwesomeIcon icon={faShareAlt}/> : "" }
            </h1>
        </div>
    )
}

export default Header
