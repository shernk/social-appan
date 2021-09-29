import React, { Fragment } from "react";
import PropTypes from "prop-types";

// utils
import MyButton from "../../../utils/mybutton";

// styles
import screamDialogStyles from "./styles/screamdialogstyles";

// handles
import useScreamDialog from "./dialog/handles/screamdialog";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";

// Redux
import { connect } from "react-redux";
import getScreamWithCommentsAction from "../../../redux/actions/screams/scream-getscreamwithcomments";
import clearErrorsAction from "../../../redux/actions/screams/scream-clearerror";

// component
import DialogMarkup from "./dialog/dialog";

const ScreamDialog = ({
  classes,
  screamId,
  userHandle,
  openDialog,
  authenticated,
  getScreamWithCommentsAction,
  clearErrorsAction,
}) => {
  const { isOpen, handleOpen, handleClose } = useScreamDialog(
    screamId,
    userHandle,
    openDialog,
    authenticated,
    getScreamWithCommentsAction,
    clearErrorsAction
  );

  return (
    <Fragment>
      <MyButton
        onClick={handleOpen}
        tip="Expand scream"
        tipClassName={classes.expandButton}
      >
        <UnfoldMore color="primary" />
      </MyButton>

      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <MyButton
          tip="Close"
          onClick={handleClose}
          tipClassName={classes.closeButton}
        >
          <CloseIcon />
        </MyButton>
        <DialogMarkup
          screamId={screamId}
          userHandle={userHandle}
          authenticated={authenticated}
        />
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  clearErrorsAction: PropTypes.func.isRequired,
  getScreamWithCommentsAction: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired,
  openDialog: PropTypes.bool.isRequired,
};

const mapActionsToProps = {
  getScreamWithCommentsAction,
  clearErrorsAction,
};

export default connect(
  null,
  mapActionsToProps
)(withStyles(screamDialogStyles)(ScreamDialog));
