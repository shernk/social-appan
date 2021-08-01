import React from "react";
import { Link } from "react-router-dom";

// utils
import MyButton from "../../../../../../../utils/mybutton";

// Icons
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Unauthenticated = () => {
  return (
    <Link to="/signIn">
      <MyButton tip="Like">
        <FavoriteBorder color="primary" />
      </MyButton>
    </Link>
  );
};

export default Unauthenticated;
