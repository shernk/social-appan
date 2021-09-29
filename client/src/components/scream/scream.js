import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// theme
import screamStyles from "./styles/screamStyles";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

// Icons
import ChatIcon from "@material-ui/icons/Chat";

// redux
import { connect } from "react-redux";

// utils
import MyButton from "../../utils/mybutton";

// component
import LikeScream from "./likescream/like-button";
import DeleteScream from "./deletescream/delete-scream";
import ScreamDialog from "./screamdialog/scream-dialog";

const Scream = ({
  classes,
  openDialog,
  scream: {
    screamId,
    body,
    createdAt,
    userImageUrl,
    userHandle,
    likeScreamCount,
    commentScreamCount,
  },
  user: {
    authenticated,
    credentials: { handle },
  },
}) => {
  // calculate time
  dayjs.extend(relativeTime);

  const deleteButton =
    authenticated && userHandle === handle ? (
      <DeleteScream screamId={screamId} />
    ) : null;

  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImageUrl}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <div>
          <Typography
            variant="h5"
            color="primary"
            component={Link}
            to={`/${userHandle}`}
          >
            {userHandle}
          </Typography>
          {deleteButton}
        </div>
        <div>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).format("h:mm a MMMM DD YYYY")}
          </Typography>
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
          <div>
            <ScreamDialog
              screamId={screamId}
              userHandle={userHandle}
              openDialog={openDialog}
              authenticated={authenticated}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

Scream.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(screamStyles)(Scream));
