import './style/App.scss'
import Header from "./Components/layout/Header";
import MainContent from "./Components/content/MainContent";
import Footer from "./Components/layout/Footer";
import {useParams} from "react-router-dom";


function App() {

    const {q, g} = useParams();

    return (
        <div className="App">
            <Header/>
            <MainContent q={q} g={g}/>
            <Footer/>
        </div>
    );
}

export default App;
