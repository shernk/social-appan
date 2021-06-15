import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// MUIs
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";

// theme
import theme from "../../themes/theme";

//image
import AppIcon from "../../images/icon.png";

// custom hook
import useUserSignIn from "./handle/user-signin";

// redux
import { connect } from "react-redux";
import signInUserAction from "../../redux/actions/user-actions/user-signin";

const SignIn = ({ classes, UI: { loading } }) => {
  const {
    email,
    password,
    errors,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  } = useUserSignIn();

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          SignIn
        </Typography>
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            name="email"
            id="email"
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
            name="password"
            id="password"
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
            disable={loading}
          >
            SignIn
            {loading && (
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
  );
};

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
  signInUserAction: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  UI: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = { signInUserAction };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(theme.styles)(SignIn));
