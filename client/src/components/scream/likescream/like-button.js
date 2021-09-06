import React from "react";
import PropTypes from "prop-types";

// Redux
import { connect } from "react-redux";

// handles
import Unauthenticated from "./handles/likeactions/handles/actions/unauthenticated";
import Like from "./handles/likeactions/handles/actions/like";
import Unlike from "./handles/likeactions/handles/actions/unlike";

const LikeScream = ({ screamId, user: { authenticated, likes } }) => {
  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId)) return true;
    else return false;
  };

  return !authenticated ? (
    <Unauthenticated />
  ) : likedScream() ? (
    <Unlike screamId={screamId} />
  ) : (
    <Like screamId={screamId} />
  );
};

LikeScream.propTypes = {
  user: PropTypes.object.isRequired,
  screamId: PropTypes.string.isRequired,
  likeScreamAction: PropTypes.func.isRequired,
  unlikeScreamAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(LikeScream);
