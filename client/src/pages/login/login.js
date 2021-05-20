import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CircularProgress from "@material-ui/core/CircularProgress";
import loginStyles from "./styles/loginStyles";
import AppIcon from "../../images/icon.png";
import handleSubmit from "./handle/handleSubmit";
import HandleChange from "./handle/handleChange";

function Login({ classes, loading }) {
  const [errors, setErrors] = React.useState({ email: "", password: "" });

  return (
    <Grid container className={classes.form}>
      <Grid item sm />
      <Grid item sm>
        <img src={AppIcon} alt="monkey" className={classes.image} />
        <Typography variant="h2" className={classes.pageTitle}>
          Login
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
            value={classes.email}
            onChange={HandleChange}
            fullWidth
          />
          <TextField
            id="password"
            name="password"
            type="password"
            label="password"
            className={classes.textField}
            helperText={errors.password}
            error={errors.password ? true : false}
            value={classes.password}
            onChange={HandleChange}
            fullWidth
          />
          {errors.general && (
            <Typography variant="body2" className={classes.loginErrors}>
              {errors.general}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
            disable={loading}
          >
            Login
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
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(loginStyles)(Login);
