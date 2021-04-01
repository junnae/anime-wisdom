import './style/App.scss'
import Header from "./Components/layout/Header";
import MainContent from "./Components/content/MainContent";
import Footer from "./Components/layout/Footer";

function App() {
    return (
        <div className="App">
        <Header/>
        <MainContent/>
        <Footer/>
        </div>
    );
}

export default App;
