import React from "react";

// utils
import MyButton from "../../../../../../../utils/mybutton";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";

// redux
import likeScreamAction from "../../../../../../../redux/actions/scream-actions/scream-likescream";

const Like = ({ screamId }) => {
  const likescream = () => {
    likeScreamAction(screamId);
  };

  return (
    <MyButton tip="Like" onClick={likescream}>
      <FavoriteIcon color="primary" />
    </MyButton>
  );
};

export default Like;
