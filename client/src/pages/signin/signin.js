import React from "react";
import PropTypes from "prop-types";

// NavBar
import NavBar from "../../components/layouts/navbar";

// MUIs
import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

// theme
import theme from "../../themes/theme";

// image
import AppIcon from "../../images/icon.png";

// custom hook
import useUserSignIn from "./handle/user-signin";

// redux
import { connect } from "react-redux";
import signInUserAction from "../../redux/actions/user-actions/user-signin";

const SignIn = ({ classes, UI }) => {
  const {
    email,
    password,
    err,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  } = useUserSignIn(UI);

  return (
    <>
      <NavBar>
        <Button component={Link} to="/home">
          signout
        </Button>
      </NavBar>
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <img src={AppIcon} alt="monkey" className={classes.image} />
          <Typography variant="h2" className={classes.pageTitle}>
            SignIn
          </Typography>
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              className={classes.textField}
              helperText={err.email}
              error={err.email ? true : false}
              value={email}
              onChange={handleChangeEmail}
              fullWidth
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              className={classes.textField}
              helperText={err.password}
              error={err.password ? true : false}
              value={password}
              onChange={handleChangePassword}
              fullWidth
            />
            {console.log("222222222222222")}
            {console.log(err.error)}
            {console.log(err.email)}
            {console.log(err.password)}
            {err.error && (
              <Typography variant="body2" className={classes.customError}>
                {err.error}
              </Typography>
            )}
            {console.log("2321312")}
            {console.log(UI.loading)}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disable={UI.loading}
            >
              SignIn
              {UI.loading && (
                <CircularProgress className={classes.progress} size={30} />
              )}
            </Button>
            <br />
            <small>
              Don't have an account? Sign Up <Link to="/signUp">here</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    </>
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  signInUserAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    user: state.user,
    UI: state.UI,
  };
};

const mapDispatchToProps = { signInUserAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(theme.styles)(SignIn));
