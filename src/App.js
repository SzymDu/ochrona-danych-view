import './App.css';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import MonoDecryptComponent from "./Components/MonoDecryptComponent";
import CezarComponent from "./Components/CezarComponent";
import VigenereComponent from "./Components/VigenereComponent";
import PlayfairComponent from "./Components/PlayfairComponent";


function App() {
    return (
        <Router>
            <div>
                <ul>
                    <li>
                        <Link to="/zad1">Zad1</Link>
                    </li>
                    <li>
                        <Link to="/zad3">Zad3</Link>
                    </li>
                    <li>
                        <Link to="/zad4">Zad4</Link>
                    </li>
                    <li>
                        <Link to="/zad5">Zad5</Link>
                    </li>
                </ul>
                <hr/>
                <Switch>
                    <Route exact path="/zad1">
                        <MonoDecryptComponent/>
                    </Route>
                    <Route path="/zad3">
                        <CezarComponent/>
                    </Route>
                    <Route path="/zad4">
                       <VigenereComponent/>
                    </Route>
                    <Route path="/zad5">
                        <PlayfairComponent/>
                    </Route>
                </Switch>
            </div>
</Router>
)
    ;
}

export default App;
