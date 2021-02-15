import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Results from "./components/Results";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/results/:cityID">
          <Results />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
