import React from "react";
import PropTypes from "prop-types";

// utils
import MyButton from "../../../../../../../utils/mybutton";

// Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// redux
import { connect } from "react-redux";
import likeScreamAction from "../../../../../../../redux/actions/screams/scream-likescream";

const Like = ({ screamId, likeScreamAction }) => {
  const likescream = () => {
    likeScreamAction(screamId);
  };

  return (
    <MyButton tip="Like" onClick={likescream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
};

Like.propTypes = {
  likeScreamAction: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  likeScreamAction,
};

export default connect(null, mapDispatchToProps)(Like);
