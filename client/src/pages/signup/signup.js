import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// styles
import signUpStyles from "./styles/signupstyles";

//image
import AppIcon from "../../images/icon.png";

// custom hook
import useUserSignUp from "./handle/user-signup";

// redux
import { connect } from "react-redux";
import signUpUserAction from "../../redux/actions/users/user-signup";

const SignUp = ({ signUpUserAction, classes, UI }) => {
  const {
    email,
    password,
    confirmPassword,
    handle,
    errors,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleChangeHandle,
  } = useUserSignUp(signUpUserAction, UI);

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          SignUp
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
          <TextField
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            label="Confirm Password"
            className={classes.textField}
            helperText={errors.confirmPassword}
            error={errors.confirmPassword ? true : false}
            value={confirmPassword}
            onChange={handleChangeConfirmPassword}
            fullWidth
          />
          <TextField
            id="handle"
            name="handle"
            type="text"
            label="Handle"
            className={classes.textField}
            helperText={errors.handle}
            error={errors.handle ? true : false}
            value={handle}
            onChange={handleChangeHandle}
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
            disabled={UI.loading}
          >
            SignUp
            {UI.loading && (
              <CircularProgress size={30} className={classes.progress} />
            )}
          </Button>
          <br />
          <small>
            Already have an account? Sign in <Link to="/signin">here</Link>
          </small>
        </form>
      </Grid>
      <Grid item sm />
    </Grid>
  );
};

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
  signUpUserAction: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = { signUpUserAction };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(signUpStyles)(SignUp));
