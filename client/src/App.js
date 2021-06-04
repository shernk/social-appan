import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import theme from './theme';
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// Components
import NavBar from "./components/layout/navbar";

// Pages
import Home from "./pages/home/home";
import SignIn from "./pages/login/signin1";
import SignOut from "./pages/signout/signout";
import SignUp from "./pages/signup/signup";
import User from "./pages/user/user";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <NavBar />
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/" component={SignOut} />
            <Route exact path="/user" component={User} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
