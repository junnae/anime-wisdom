/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

const Quote: React.FC = () => {
    const [advice, setAdvice] = useState<string>('...');
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        updateQuote();
    }, [])

    function updateQuote() {
        axios.get('https://api.adviceslip.com/advice').then((response: AxiosResponse) => {
                if (response.data["slip"]["advice"] === advice) {
                    setLoading(true)
                    wait(1000).then(() =>
                        updateQuote())
                } else {
                    setLoading(false)
                    setAdvice(response.data["slip"]["advice"])
                }
            }
        )
    }

    function wait(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return (
        <p className="advice" onClick={updateQuote}>
            {loading ? "..." : advice}
        </p>
    )


}

export default Quote
