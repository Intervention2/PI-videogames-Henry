import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import Home from "./components/Home";
import CreateVideogame from "./components/CreateVideogame";
import Details from "./components/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home/:id" component={Details} />
          <Route path="/home" component={Home} />
          <Route path="/videogames" component={CreateVideogame} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
