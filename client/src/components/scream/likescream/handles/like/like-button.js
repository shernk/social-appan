import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

/* // like handle
import likeHandle from "./handle/likehandle";

// like handle actions
import Unauthenticated from "./handle/actions/unauthenticated";
import Like from "./handle/actions/like";
import Unlike from "./handle/actions/unlike"; */

import MyButton from "../../../../../utils/mybutton";

// Redux
import { connect } from "react-redux";
import likeScreamAction from "../../../../../redux/actions/scream-actions/scream-likescream";
import unlikeScreamAction from "../../../../../redux/actions/scream-actions/scream-unlikescream";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const LikeScream = ({
  screamId,
  user: { authenticated , likes },
  likeScreamAction,
  unlikeScreamAction,
}) => {
  // const { likeScream, unlikeScream, likedScream } = likeHandle(
  //   screamId,
  //   likes,
  //   likeScreamAction,
  //   unlikeScreamAction
  // );

  const likedScream = () => {
    if (likes && likes.find((like) => like.screamId === screamId))
      return true;
    else return false;
  };

  console.log('222222222222222');
  console.log(authenticated);
  console.log(likes);
  // console.log(likedScream());

  const likeScream = () => {
    likeScreamAction(screamId);
  };

  // console.log(likeScream());

  const unlikeScream = () => {
    unlikeScreamAction(screamId);
  };

  // console.log(unlikeScream());

  /*  const likedOrUnliked = likedScream ? (
    <Unlike screamId={screamId} />
  ) : (
    <Like screamId={screamId} />
  );
  return !authenticated ? <Unauthenticated /> : likedOrUnliked; */
  return !authenticated ? (
    <Link to="/signIn">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  ) : likedScream() ? (
    <MyButton tip="Undo like" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  ) : (
    <MyButton tip="Like" onClick={likeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
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

const mapDispatchToProps = {
  likeScreamAction,
  unlikeScreamAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(LikeScream);
