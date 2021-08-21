import React, { Fragment } from "react";
import PropTypes from "prop-types";

// theme
import screamStyles from "../styles/screamStyles";

// utils
import MyButton from "../../../utils/mybutton";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

// Redux
import { connect } from "react-redux";
import postScreamAction from "../../../redux/actions/scream-actions/scream-postscream";
import clearErrorsAction from "../../../redux/actions/scream-actions/scream-clearerror";
import usePostScream from "./handles/action";

const PostScream = ({ classes, UI, postScreamAction, clearErrorsAction }) => {
  const {
    isOpen,
    errors,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  } = usePostScream(UI, postScreamAction, clearErrorsAction);

  return (
    <Fragment>
      <MyButton tip="Post a Scream!" onClick={handleOpen}>
        <AddIcon />
      </MyButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogTitle>Post a new scream</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <TextField
              name="body"
              type="text"
              label="SCREAM!"
              multiline
              rows="3"
              placeholder="Scream at your fellow apes"
              error={errors.body ? true : false}
              helperText={errors.body}
              className={classes.textField}
              onChange={handleChange}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submitButton}
              disabled={UI.loading}
            >
              Submit
              {UI.loading && (
                <CircularProgress
                  size={30}
                  className={classes.progressSpinner}
                />
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

PostScream.propTypes = {
  UI: PropTypes.object.isRequired,
  postScreamAction: PropTypes.func.isRequired,
  clearErrorsAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapDispatchToProps = { postScreamAction, clearErrorsAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(screamStyles.postScream))(PostScream);
