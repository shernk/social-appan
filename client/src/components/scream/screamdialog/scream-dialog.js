import React, { Fragment } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// utils
import MyButton from "../../../utils/mybutton";

// styles
import screamStyles from "../styles/screamStyles";

// handle
import useScreamDialog from "./handles/actions";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";

// Redux
import { connect } from "react-redux";
import getScreamAction from "../../../redux/actions/scream-actions/scream-getscream";
import clearErrorsAction from "../../../redux/actions/scream-actions/scream-clearerror";

// component
import LikeScream from "../likescream/like-button";

const ScreamDialog = ({
  classes,
  openDialog,
  UI: { loading },
  scream: {
    screamId,
    body,
    createdAt,
    likeScreamCount,
    commentScreamCount,
    userImageUrl,
    userHandle,
    // comments,
  },
  getScreamAction,
  clearErrorsAction,
}) => {
  const { isOpen, /*  oldPath, newPath, */ handleOpen, handleClose } =
    useScreamDialog(screamId, openDialog, getScreamAction);

  const dialogMarkup = loading ? (
    <div className={classes.spinnerDiv}>
      <CircularProgress size={200} thickness={2} />
    </div>
  ) : (
    <Grid container spacing={16}>
      <Grid item sm={5}>
        <img
          src={userImageUrl}
          alt="Profile"
          className={classes.profileImage}
        />
      </Grid>
      <Grid item sm={7}>
        <Typography
          component={Link}
          color="primary"
          variant="h5"
          to={`/users/${userHandle}`}
        >
          @{userHandle}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body2" color="textSecondary">
          {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
        </Typography>
        <hr className={classes.invisibleSeparator} />
        <Typography variant="body1">{body}</Typography>
        <LikeScream screamId={screamId} />
        <span>{likeScreamCount} likes</span>
        <MyButton tip="comments">
          <ChatIcon color="primary" />
        </MyButton>
        <span>{commentScreamCount} comments</span>
      </Grid>
      <hr className={classes.visibleSeparator} />
      {/* <CommentForm screamId={screamId} />
      <Comments comments={comments} /> */}
    </Grid>
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
        <DialogContent className={classes.dialogContent}>
          {dialogMarkup}
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

ScreamDialog.propTypes = {
  clearErrorsAction: PropTypes.func.isRequired,
  getScreamAction: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

const mapActionsToProps = {
  getScreamAction,
  clearErrorsAction,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(screamStyles.screamDialog)(ScreamDialog));
