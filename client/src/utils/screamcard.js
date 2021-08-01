import React from "react";
import Scream from "../components/scream/scream";

const ScreamCard = ({ scream, openDialog }) => {
  return (
    <Scream
      key={scream.screamId}
      scream={scream}
      openDialog={openDialog}
    ></Scream>
  );
};

export default ScreamCard