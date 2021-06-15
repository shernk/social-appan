import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// User Action
import signUpUserAction from "../../../redux/actions/user-actions/user-signup";

const useUserSignUp = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("user");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    componentWillReceiveProps(errors);
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle,
    };
    signUpUserAction(newUserData, history);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  
  const handleChangeConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  //TODO: if default value of handle was user that has already exists, then change(useEffect to change)
  const handleChangeHandle = (event) => {
    setHandle(event.target.value);
  };

  //TODO: errors is undefined if only using nextProps.UI.errors
  const componentWillReceiveProps = (nextProps) => {
    if (nextProps.UI && nextProps.UI.errors) {
      setErrors({ errors: nextProps.UI.errors });
    }
  };

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
