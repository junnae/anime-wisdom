import '../../style/Footer.scss'
import React from "react";

type FooterProps = {
    g?: string;
    q?: string;
}

const Footer: React.FC<FooterProps> = ({g, q}) => {
        return (
            <div className={"App-footer"}>
                <img src={"/giphy.gif"} alt={"Powered by giphy"}/>
                {g || q ?
                    <a href="/">r e s e t</a> : ""
                }
            </div>
        )
}

export default Footer
