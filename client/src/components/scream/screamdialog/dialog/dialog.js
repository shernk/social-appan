import dayjs from "dayjs";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// redux
import { connect } from "react-redux";

// MUI
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ChatIcon from "@material-ui/icons/Chat";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";

// styles
import screamDialogStyles from "../styles/screamdialogstyles";

// utils
import MyButton from "../../../../utils/mybutton";

// component
import LikeScream from "../../likescream/like-button";
import Comment from "../../comment/comment";
import CommentForm from "../../comment/comment-form";
import NoneProfile from "../../../profiles/profile/none-profile";

const DialogMarkup = ({
  classes,
  screamId,
  userHandle,
  authenticated,
  UI: { loading },
  scream: {
    body,
    createdAt,
    likeScreamCount,
    commentScreamCount,
    userImageUrl,
    comments,
  },
}) => {
  return loading ? (
    !authenticated ? (
      <div>
        <NoneProfile classes={classes} />
      </div>
    ) : (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} thickness={2} />
      </div>
    )
  ) : (
    <DialogContent className={classes.dialogContent}>
      <Grid container spacing={1}>
        <Grid item sm={5}>
          <img
            src={userImageUrl}
            alt="Profile"
            className={classes.profileImage}
          />
        </Grid>
        <Grid item sm={7}>
          <div>
            <Typography
              component={Link}
              color="primary"
              variant="h5"
              to={`/${userHandle}`}
            >
              @{userHandle}
            </Typography>
          </div>

          <hr className={classes.invisibleSeparator} />

          <div>
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format("h:mm a MMMM DD YYYY")}
            </Typography>
          </div>

          <hr className={classes.invisibleSeparator} />

          <div>
            <Typography variant="body1">{body}</Typography>
          </div>

          <div className={classes.inline}>
            <div>
              <LikeScream screamId={screamId} />
              {likeScreamCount <= 1 ? (
                <span>{likeScreamCount} Like</span>
              ) : (
                <span>{likeScreamCount} Likes</span>
              )}
            </div>
            <div>
              <MyButton tip="comments">
                <ChatIcon color="primary" />
              </MyButton>
              {commentScreamCount <= 1 ? (
                <span>{commentScreamCount} Comment</span>
              ) : (
                <span>{commentScreamCount} Comments</span>
              )}
            </div>
          </div>
        </Grid>

        <hr className={classes.visibleSeparator} />

        {authenticated && (
          <>
            <CommentForm screamId={screamId} />
            <Comment comments={comments} />
          </>
        )}
      </Grid>
    </DialogContent>
  );
};

DialogMarkup.protoTypes = {
  classes: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
});

export default connect(mapStateToProps)(
  withStyles(screamDialogStyles)(DialogMarkup)
);
