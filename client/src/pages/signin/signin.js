import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUIs
import { Grid } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// styles
import signInStyles from "./styles/signinstyles";

// image
import AppIcon from "../../images/icon.png";

// custom hook
import useUserSignIn from "./handle/user-signin";

// redux
import { connect } from "react-redux";
import signInUserAction from "../../redux/actions/users/user-signin";

const SignIn = ({
  classes,
  user: {
    credentials: { handle },
  },
  signInUserAction,
  UI,
}) => {
  const {
    email,
    password,
    errors,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  } = useUserSignIn(handle, signInUserAction, UI);

  return (
    <>
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
              helperText={errors.email}
              error={errors.email ? true : false}
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
              helperText={errors.password}
              error={errors.password ? true : false}
              value={password}
              onChange={handleChangePassword}
              fullWidth
            />

            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                {errors.error}
              </Typography>
            )}

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
              Don't have an account? Sign Up <Link to="/signup">here</Link>
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

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapDispatchToProps = { signInUserAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(signInStyles)(SignIn));
