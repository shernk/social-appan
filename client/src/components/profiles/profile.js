import React from "react";
import PropTypes from "prop-types";

// utils
import ProfileSkeleton from "../../utils/profileSkeleton/profileskeleton";

// styles
import profileStyles from "./styles/profilestyles";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";

// Redux
import { connect } from "react-redux";
import signOutUserAction from "../../redux/actions/users/user-signout";
import uploadImageAction from "../../redux/actions/users/user-uploadimage";

// Profiles
import ExistsProfile from "./profile/exsistprofile/exists-profile";
import NoneProfile from "./profile/none-profile";

// handles
import useProfilesHandles from "./handles/profile";

const Profile = ({
  classes,
  user: { authenticated, loading, credentials },
  signOutUserAction,
  uploadImageAction,
}) => {
  const { handleEditPicture, handleImageChange, handleSignout } =
    useProfilesHandles(signOutUserAction, uploadImageAction);

  return !loading ? (
    authenticated ? (
      <ExistsProfile
        classes={classes}
        credentials={credentials}
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
)(withStyles(profileStyles)(Profile));
