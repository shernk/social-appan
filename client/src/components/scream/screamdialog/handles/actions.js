import React, { useEffect, useState } from "react";

const useScreamDialog = (screamId, openDialog, getScreamWithCommentsAction) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [oldPath, setOldPath] = useState("");
  // const [newPath, setNewPath] = useState("");

  console.log("useScreamDialog");
  console.log("openDialog");
  console.log(openDialog);

  useEffect(() => {
    const componentDidMount = () => {
      if (openDialog) {
        handleOpen();
      }
    };

    componentDidMount();
  });

  const handleOpen = () => {
    setIsOpen(true);
    getScreamWithCommentsAction(screamId);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, /* oldPath, newPath, */ handleOpen, handleClose };
};

export default useScreamDialog;
