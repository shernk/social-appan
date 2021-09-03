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

// handles
import useProfilesHandles from "./handles/handles";

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
)(withStyles(theme.styles)(Profile));
