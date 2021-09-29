import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useUserHandle = (getUserDataAction) => {
  const [screamIdParam, setScreamIdParam] = useState(null);
  const [profile, setPofile] = useState(null);
  const params = useParams();

  useEffect(() => {
    const { screamId, handle } = params;
    console.log("user handle");
    console.log(screamId);
    console.log(handle);
    if (screamId) {
      setScreamIdParam(screamId);
    }

    getUserDataAction(handle);

    axios
      .get(`/${handle}`)
      .then((res) => {
        setPofile(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [params, getUserDataAction]);

  return { screamIdParam, profile };
};

export default useUserHandle;
