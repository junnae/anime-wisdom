import './style/App.scss'
import Header from "./Components/layout/Header";
import MainContent from "./Components/content/MainContent";
import Footer from "./Components/layout/Footer";
import {useParams} from "react-router-dom";

let __G__: string;
__G__ = "";
let __Q__: string
__Q__ = ""
export function getG(): string { return __G__ }
export function getQ(): string { return __Q__}
export function setG(g: string) { __G__ = g}
export function setQ(q: string) { __Q__ = q}

function App() {
    const {q, g} = useParams();

    return (
        <div className="App">
            <Header/>
            <MainContent q={q} g={g}/>
            <Footer g={g} q={q}/>
        </div>
    );
}

export default App
