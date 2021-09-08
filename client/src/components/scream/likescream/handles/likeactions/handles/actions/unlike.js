import React from "react";
import PropTypes from "prop-types";

// utils
import MyButton from "../../../../../../../utils/mybutton";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";

// Redux
import { connect } from "react-redux";
import unlikeScreamAction from "../../../../../../../redux/actions/screams/scream-unlikescream";

const Unlike = ({ screamId, unlikeScreamAction }) => {
  const unlikeScream = () => {
    unlikeScreamAction(screamId);
  };

  return (
    <MyButton tip="Undo Like" onClick={unlikeScream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  );
};

Unlike.propTypes = {
  unlikeScreamAction: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  unlikeScreamAction,
};

export default connect(null, mapDispatchToProps)(Unlike);
