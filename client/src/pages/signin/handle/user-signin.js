import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// User Action
import signInUserAction from "../../../redux/actions/user-actions/user-signin";

const useUserSignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = { email: email, password: password };
    signInUserAction(userData, history);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  useEffect(() => {
    return () => {
      setErrors(errors);
    };
  }, [errors]);

  return {
    email,
    password,
    errors,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  };
};

export default useUserSignIn;
