import React from "react";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
//CSS
import "../styles/App.css";
//Components
import Header from "./Header.js";
import Ads from "./Ads.js";
import About from "./About.js";
import Contact from "./Contact.js";
import Chat from "./Chat.js";
import Favorites from "./Favorites.js";

//legger inn browserRouter for å kunne navigere mellom ulike "sider"
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav className="navbar navbar-dark bg-dark justify-content-center">
          <Link className="nav-link active" to="/">
            Home
          </Link>
          <Link className="nav-link active" to="/Favorites">
            Favorites
          </Link>
          <Link className="nav-link active" to="/About">
            About
          </Link>
          <Link className="nav-link active" to="/Contact">
            Contact
          </Link>
          <Link className="nav-link active" to="/Chat">
            Chat
          </Link>
        </nav>
        <Header />
        <Switch>
          <Route exact path="/" component={Ads} />
          <Route path="/About" component={About} />
          <Route path="/Contact" component={Contact} />
          <Route path="/Chat" component={Chat} />
          <Route path="/Favorites" component={Favorites} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
