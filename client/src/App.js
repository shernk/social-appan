import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';

// theme
import theme from "./themes/theme";

// Redux
import { Provider } from "react-redux";
import store from "./redux/stores";

// Utils
import AuthRoute from "./utils/auth-route";
import authenticated from "./utils/authenticated";

// Components
import Navbar from "./components/layouts/navbar/navbar";

// Pages
import Home from "./pages/home/home";
import SignIn from "./pages/signin/signin";
import SignUp from "./pages/signup/signup";
import User from "./pages/user/user";

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={() => <Redirect to="/home" />} />
              <Route exact path={"/home"} component={Home} />
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
              <Route exact path="/:handle" component={User} />
              <Route exact path="/:handle/scream/:screamId" component={User} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
