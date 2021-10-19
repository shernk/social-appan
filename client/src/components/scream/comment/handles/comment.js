import { useState, useEffect } from "react";

const useCommentHandle = (screamId, submitCommentAction, UI) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const componentWillRecieveProp = (UI) => {
      if (UI.errors) {
        setErrors(UI.errors);
      }
      if (!UI.errors && !UI.loading) {
        setBody("");
      }
    };

    componentWillRecieveProp(UI);
  }, [UI]);

  const handleChange = (event) => {
    setBody(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitCommentAction(screamId, body);
  };

  return { body, errors, handleChange, handleSubmit };
};

export default useCommentHandle;
