import React from "react";
import PropTypes from "prop-types";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

// theme
import theme from "../../../themes/theme";

// handle
import useCommentHandle from "./handles/comment";

// Redux
import { connect } from "react-redux";
import submitCommentAction from "../../../redux/actions/screams/scream-submitcomment";

const CommentForm = ({
  classes,
  authenticated,
  screamId,
  UI,
  submitCommentAction,
}) => {
  const { body, errors, handleChange, handleSubmit } = useCommentHandle(
    screamId,
    submitCommentAction,
    UI
  );

  return authenticated ? (
    <Grid item sm={12} style={{ textAlign: "center" }}>
      <form id="e" onSubmit={handleSubmit}>
        <TextField
          name="body"
          type="text"
          label="Comment on scream"
          error={errors.comment ? true : false}
          helperText={errors.comment}
          value={body}
          onChange={handleChange}
          fullWidth
          className={classes.textField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <hr className={classes.visibleSeparator} />
    </Grid>
  ) : null;
};

CommentForm.propTypes = {
  submitCommentAction: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = {
  submitCommentAction,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(theme.styles)(CommentForm));
