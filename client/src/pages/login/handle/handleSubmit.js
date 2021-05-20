import User from "./user";

const handleSubmit = (event, { email, passWord, history }) => {
  event.preventDefault();
  const userData = {
    email: email,
    password: passWord,
  };

  User(userData, history);
};

export default handleSubmit;
