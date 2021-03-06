import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import theme from './theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

// Components
import NavBar from "./components/layout/navbar";

// Pages
import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Logout from "./pages/logout/logout";
import User from "./pages/user/user";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/user" component={User} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
