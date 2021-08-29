import React from "react";
import PropTypes from "prop-types";

// Themes
import theme from "../../themes/theme";

// Utils
import ProfileSkeleton from "../../utils/profileskeleton";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";

//Redux
import { connect } from "react-redux";
import signOutUserAction from "../../redux/actions/user-actions/user-signout";
import uploadImageAction from "../../redux/actions/user-actions/user-uploadimage";

// Profiles
import ExistsProfile from "./profile/exists-profile";
import NoneProfile from "./profile/none-profile";

const Profile = ({
  classes,
  user: {
    authenticated,
    loading,
    credentials: { handle, createdAt, userImageUrl, bio, website, location },
  },
  signOutUserAction,
  uploadImageAction,
}) => {
  const credential = { handle, createdAt, userImageUrl, bio, website, location };

  console.log("credential");
  console.log(credential);
  
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    uploadImageAction(formData);
  };

  const handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };

  const handleSignout = () => {
    signOutUserAction();
  };

  return !loading ? (
    authenticated ? (
      <ExistsProfile
        classes={classes}
        credentials={credential}
        handleImageChange={handleImageChange}
        handleEditPicture={handleEditPicture}
        handleSignout={handleSignout}
      />
    ) : (
      <NoneProfile classes={classes} />
    )
  ) : (
    <ProfileSkeleton classes={classes} />
  );
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  uploadImageAction: PropTypes.func.isRequired,
  signOutUserAction: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = { signOutUserAction, uploadImageAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(theme.styles)(Profile));
