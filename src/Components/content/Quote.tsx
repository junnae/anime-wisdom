/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from "react";
import axios, {AxiosResponse} from "axios";

type QuoteProps = {
    q?: string;
}

const Quote: React.FC<QuoteProps> = ({q}) => {
    const [advice, setAdvice] = useState<string>('...');
    const [loading, setLoading] = useState<boolean>(false);
    const [disabled, setDisabled] = useState<boolean>(false);

    useEffect(() => {
        updateQuote();
    }, [])

    function updateQuote() {
        if (loading || disabled) return
        setLoading(true)
        if (q) {
            axios.get('/advice?id={q}').then((response: AxiosResponse) => {
                setAdvice(response.data)
                setLoading(false)
                setDisabled(true)
            });
        }
        axios.get('/advice').then((response: AxiosResponse) => {
                if (response.data === advice) {
                    wait(1000).then(() =>
                        updateQuote())
                } else {
                    setLoading(false)
                    setAdvice(response.data)
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
