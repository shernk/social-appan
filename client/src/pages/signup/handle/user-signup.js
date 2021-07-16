import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useUserSignUp = (signUpUserAction, UI) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleChangeHandle = (event) => {
    setHandle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      email,
      password,
      confirmPassword,
      handle,
    };
    signUpUserAction(newUserData, history);
  };

  useEffect(() => {
    const componentWillReceiveProps = (nextProps) => {
      if (nextProps.errors) {
        setErrors(nextProps.errors);
      }
    };

    componentWillReceiveProps(UI);
  }, [UI]);

  return {
    email,
    password,
    confirmPassword,
    handle,
    errors,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
    handleChangeConfirmPassword,
    handleChangeHandle,
  };
};

export default useUserSignUp;
