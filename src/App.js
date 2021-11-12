import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import MonoDecryptComponent from "./Components/MonoDecryptComponent";
import NavigationComponent from "./Components/NavigationComponent";
import CezarComponent from "./Components/CezarComponent";


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
                        <Link to="/dashboard">Dashboard</Link>
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
                    <Route path="/dashboard">
                        {/*<Dashboard/>*/}
                    </Route>
                </Switch>
            </div>
</Router>
)
    ;
}

export default App;
