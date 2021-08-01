import { useState, useEffect } from "react";
import axios from "axios";

const UserHandle = (props) => {
  const [screamIdParam, setScreamIdParam] = useState(null);

  const [profile, setPofile] = useState(null);

  useEffect(() => {
    getProfile(props);
  });

  const getProfile = (props) => {
    const { handle, screamId } = props.match.params;

    if (screamId) {
      setScreamIdParam(screamId);
    }

    props.getUserDataHandleAction(handle);

    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setPofile(res.data.user);
      })
      .catch((err) => console.log(err));
  };

  return { screamIdParam, profile };
};

export default UserHandle;
