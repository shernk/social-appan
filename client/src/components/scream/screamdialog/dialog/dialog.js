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
  return loading && !authenticated ? (
    <div>
      <NoneProfile classes={classes} />
    </div>
  ) : (
    <DialogContent className={classes.dialogContent}>
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
        <CommentForm screamId={screamId} />
        <Comment comments={comments} />
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
