import { useState, useEffect } from "react";

const usePostScream = (UI, postScreamAction, clearErrorsAction) => {
  const [isOpen, setIsOpen] = useState(false);
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const componentWillReceiveProps = (UI) => {
      if (UI.errors) {
        setErrors(UI.errors);
      }
      if (!UI.errors && !UI.loading) {
        setIsOpen(false);
        setBody("");
        setErrors({});
      }
    };

    componentWillReceiveProps(UI);
  }, [UI]);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    clearErrorsAction();
    setIsOpen(false);
    setErrors({});
  };

  const handleChange = (event) => {
    setBody({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    postScreamAction({ body: body });
  };

  return {
    isOpen,
    errors,
    handleOpen,
    handleClose,
    handleChange,
    handleSubmit,
  };
};

export default usePostScream;
