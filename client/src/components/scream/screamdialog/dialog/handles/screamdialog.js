import React, { useEffect, useState, useCallback } from "react";

const useScreamDialog = (
  screamId,
  userHandle,
  openDialog,
  authenticated,
  getScreamWithCommentsAction,
  clearErrorsAction
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPath, setOldPath] = useState("");

  const handleOpen = useCallback(() => {
    let oldUrl = window.location.pathname;
    const newUrl = `/${userHandle}/scream/${screamId}`;

    if (oldUrl === newUrl) {
      oldUrl = `/${userHandle}`;
    }

    window.history.pushState(null, null, newUrl);

    setIsOpen(true);
    setOldPath(oldUrl);

    getScreamWithCommentsAction(screamId);
  }, [screamId, userHandle, getScreamWithCommentsAction]);

  useEffect(() => {
    const componentDidMount = () => {
      if (openDialog && !authenticated) {
        handleOpen();
      }
    };

    componentDidMount();
  }, [openDialog, authenticated, handleOpen]);

  const handleClose = () => {
    window.history.pushState(null, null, oldPath);
    setIsOpen(false);
    clearErrorsAction();
  };

  return { isOpen, handleOpen, handleClose };
};

export default useScreamDialog;
