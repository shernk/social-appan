import React, { useEffect, useState, useCallback } from "react";

const useScreamDialog = (screamId, openDialog, getScreamWithCommentsAction) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [oldPath, setOldPath] = useState("");
  // const [newPath, setNewPath] = useState("");

  console.log("useScreamDialog");
  console.log("openDialog");
  console.log(openDialog);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
    getScreamWithCommentsAction(screamId);
  }, [screamId, getScreamWithCommentsAction]);

  useEffect(() => {
    const componentDidMount = () => {
      if (openDialog) {
        handleOpen();
      }
    };

    componentDidMount();
  }, [openDialog, handleOpen]);

  

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, /* oldPath, newPath, */ handleOpen, handleClose };
};

export default useScreamDialog;
