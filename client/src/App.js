import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import theme from "./themes/theme";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";

// Redux
import { Provider } from "react-redux";
import store from "./redux/stores";

// Utils
import AuthRoute from "./utils/auth-route";
import authenticated from "./utils/authenticated";

// Components
import NavBar from "./components/layouts/navbar/navbar";

// Pages
import Home from "./pages/home/home";
import SignIn from "./pages/signin/signin";
import SignOut from "./pages/signout/signout";
import SignUp from "./pages/signup/signup";
import User from "./pages/user/user";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <NavBar />
          <div className="container">
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <AuthRoute
                exact
                path="/signin"
                component={SignIn}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={SignUp}
                authenticated={authenticated}
              />
              {/* <Route exact path="/home" component={SignOut} /> */}
              <Route exact path="/user/:handle" component={User} />
              <Route
                exact
                path="/user/:handle/scream/:screamId"
                component={User}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
