import React, { Fragment } from "react";
import PropTypes from "prop-types";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

// utils
import MyButton from "../../../utils/mybutton";

// styles
import deleteScreamStyles from "./styles/deletescreamstyles";

// redux
import { connect } from "react-redux";
import deleteScreamsAction from "../../../redux/actions/screams/scream-deletescream";
import useDeleteHandle from "./handles/delete/actions";

const DeleteScream = ({ classes, screamId, deleteScreamsAction }) => {
  const { isOpen, handleIsOpen, handleClose, deleteScream } = useDeleteHandle(
    deleteScreamsAction,
    screamId
  );

  return (
    <Fragment>
      <MyButton
        tip="Delete Scream"
        onClick={handleIsOpen}
        btnClassName={classes.deleteButton}
      >
        <DeleteOutline color="secondary" />
      </MyButton>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <div>
          <DialogTitle>
            Are you sure you want to delete this scream?
          </DialogTitle>
          <DialogActions>
            <div>
              <Button onClick={handleClose} color="primary">
                {" "}
                Cancel
              </Button>
              <Button onClick={deleteScream} color="secondary">
                Delete
              </Button>
            </div>
          </DialogActions>
        </div>
      </Dialog>
    </Fragment>
  );
};

DeleteScream.propTypes = {
  classes: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  deleteScreamsAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = { deleteScreamsAction };

export default connect(
  null,
  mapDispatchToProps
)(withStyles(deleteScreamStyles)(DeleteScream));
