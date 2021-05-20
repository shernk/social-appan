import React from "react";
import axios from "axios";

function User(userData, history) {
  const [loading, setLoading] = React.useState();

  axios
    .post("/login", userData)
    .then((res) => {
      console.log(res.data);
      setLoading({ loading: false });
      history.push("/");

      return loading;
    })
    .catch((err) => {
      setLoading({ error: err.response.data, loading: false });
    });
}

export default User;
