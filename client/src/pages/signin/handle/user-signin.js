import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const useUserSignIn = (handle, signInUserAction, UI) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = { email, password };
    signInUserAction(userData, handle, history);
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
    errors,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  };
};

export default useUserSignIn;
