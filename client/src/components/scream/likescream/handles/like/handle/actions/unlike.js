import React from "react";

// utils
import MyButton from "../../../../../../../utils/mybutton";

// Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

// Redux
import unlikeScreamAction from "../../../../../../../redux/actions/scream-actions/scream-unlikescream";

const Unlike = ({ screamId }) => {
  const unlikeScream = () => {
    unlikeScreamAction(screamId);
  };

  return (
    <MyButton tip="Undo Like" onClick={unlikeScream}>
      <FavoriteBorder color="primary" />
    </MyButton>
  );
};

export default Unlike;
