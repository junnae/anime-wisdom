import '../../style/Header.scss'
import React from 'react';
import {getG, getQ} from "../../App";

const Header: React.FC = () => {

    console.log(getQ())
    console.log(getG())
    function copyLinkToClipboard(){
        navigator.clipboard.writeText("https://advice.moe/"+getQ()+"/"+getG())
    }
        return (
            <div className={"App-header"} onClick={copyLinkToClipboard}>
                <h1>★☆★ w i s d o m ✧ﾟ</h1>
            </div>
        )
}

export default Header
