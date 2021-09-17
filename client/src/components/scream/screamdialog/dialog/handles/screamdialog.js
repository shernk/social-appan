import React, { useEffect, useState, useCallback } from "react";

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
