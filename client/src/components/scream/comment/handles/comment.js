import { useState, useEffect } from "react";

const useCommentHandle = (screamId, submitCommentAction, UI) => {
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const componentWillRecieveProp = (UI) => {
      if (UI.errors) {
        console.log("UI.errors", UI.errors);
        setErrors(UI.errors);
      }
    };

    componentWillRecieveProp(UI);
  }, [UI]);

  const handleChange = (event) => {
    setBody({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitCommentAction(screamId, body);

    // after submit reset error and comment
    setErrors("");
    setBody("")
  };

  const clearInput = () => {
    document.getElementById('input').value='';
  }

  return { body, errors, handleChange, handleSubmit, clearInput };
};

export default useCommentHandle;
