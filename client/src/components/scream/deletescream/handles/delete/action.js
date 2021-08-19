import { useState } from "react";

const useDeleteHandle = (deleteScreamAction, screamId) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const deleteScream = () => {
    deleteScreamAction(screamId);
    setIsOpen(false);
  };

  return { isOpen, handleIsOpen, handleClose, deleteScream };
};

export default useDeleteHandle;
