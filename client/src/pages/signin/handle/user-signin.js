import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// User Action
import signInUserAction from "../../../redux/actions/user-actions/user-signin";

const useUserSignIn = (UI) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErrors] = useState({});

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    console.log("handleSubmit");
    event.preventDefault();

    const userData = { email, password };
    signInUserAction(userData, history);
  };

  useEffect(() => {
    console.log("useEffect");
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
    err,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  };
};

export default useUserSignIn;
