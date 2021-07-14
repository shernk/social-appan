import { Link } from "react-router-dom";

// MUIs
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const NoneProfile = ({ classes }) => {
  return (
    <Paper className={classes.paper}>
      <Typography variant="body2" align="center">
        No profile found, please signin again
      </Typography>
      <div className={classes.buttons}>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/signIn"
        >
          SignIn
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component={Link}
          to="/signUp"
        >
          SignUp
        </Button>
      </div>
    </Paper>
  );
};

export default NoneProfile;
