import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// User Action
import signInUserAction from "../../../redux/actions/user-actions/user-signin";

const useUserSignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    componentWillReceiveProps(errors);
  }, [errors]);

  const handleSubmit = (event) => {
    event.preventDefault();

    setLoading(true);

    const userData = { email: email, password: password };
    signInUserAction(userData, history);
  };

  const handleChangeEmail = (event) => {
    setEmail(event.target.value)
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value)
  }

  //TODO: errors is undefined if only using nextProps.UI.errors
  const componentWillReceiveProps = (nextProps) => {
    if (nextProps.UI && nextProps.UI.errors) {
      setErrors({ errors: nextProps.UI.errors });
    }
  };

  return {
    email,
    password,
    errors,
    loading,
    handleSubmit,
    handleChangeEmail,
    handleChangePassword,
  };
};

export default useUserSignIn;
