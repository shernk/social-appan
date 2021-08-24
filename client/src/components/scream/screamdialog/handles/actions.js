import { useEffect, useState } from "react";

const useScreamDialog = (screamId, openDialog, getScreamAction) => {
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
    getScreamAction(screamId);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return { isOpen, /* oldPath, newPath, */ handleOpen, handleClose };
};

export default useScreamDialog;
