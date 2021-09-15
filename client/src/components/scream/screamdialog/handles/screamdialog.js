import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

import MyButton from "../../../../utils/mybutton";

const useScreamDialog = (
  screamId,
  openDialog,
  authenticated,
  getScreamWithCommentsAction,
  clearErrorsAction
) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [oldPath, setOldPath] = useState("");
  // const [newPath, setNewPath] = useState("");

  console.log("useScreamDialog");
  console.log(authenticated);
  console.log(openDialog);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    getScreamWithCommentsAction(screamId);
  }, [screamId, getScreamWithCommentsAction]);

  useEffect(() => {
    const componentDidMount = () => {
      if (openDialog && !authenticated) {
        handleOpen();
      }
    };

    componentDidMount();
  }, [openDialog, authenticated, handleOpen]);

  const handleClose = () => {
    setIsOpen(false);
    clearErrorsAction();
  };

  return { isOpen, /* oldPath, newPath, */ handleOpen, handleClose };
};

export default useScreamDialog;
