import { useState, useEffect } from "react";

const useEditProfileHandle = (credentials, editUserDetailsAction) => {
  const [open, setOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials]);

  const mapUserDetailsToState = (credentials) => {
    setBio(credentials.bio ? credentials.bio : "");
    setWebsite(credentials.website ? credentials.website : "");
    setLocation(credentials.location ? credentials.location : "");
  };

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeBio = (event) => {
    setBio(event.target.value);
  };
  const handleChangeWebsite = (event) => {
    setWebsite(event.target.value);
  };
  const handleChangeLocation = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userDetails = {
      bio,
      website,
      location,
    };

    editUserDetailsAction(userDetails);
    handleClose();
  };

  return {
    open,
    bio,
    website,
    location,
    handleSubmit,
    handleChangeBio,
    handleChangeLocation,
    handleChangeWebsite,
    handleOpen,
    handleClose,
  };
};

export default useEditProfileHandle;
