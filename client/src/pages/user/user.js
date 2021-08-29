import React from "react";
import PropTypes from "prop-types";

// component
import Scream from "../../components/scream/scream";

// profile
import StaticProfile from "../../components/profiles/profile/static-profile";

// MUI
import Grid from "@material-ui/core/Grid";

// utils
import ScreamSkeleton from "../../utils/screamskeleton";
import ProfileSkeleton from "../../utils/profileskeleton";

// redux
import { connect } from "react-redux";
import getUserDataHandleAction from "../../redux/actions/user-actions/user-getdatauserhandle";
import useUserHandle from "./handle/user-handle";

const User = ({ data: { loading, screams }, getUserDataHandleAction }) => {
  const { screamIdParam, profile } = useUserHandle(
    getUserDataHandleAction
  );

  console.log(screamIdParam);
  console.log(profile);

  const exsistedScream = !screamIdParam
    ? screams.map((scream) => (
        <Scream key={scream.screamId} scream={scream}></Scream>
      ))
    : screams.map((scream) => {
        if (scream.screamId !== screamIdParam) {
          return <Scream key={scream.screamId} scream={scream}></Scream>;
        } else {
          return (
            <Scream key={scream.screamId} scream={scream} openDialog></Scream>
          );
        }
      });

  const noScream = <p>No scream from this user</p>;

  const screamsMarkup = loading ? (
    <ScreamSkeleton />
  ) : screams === null ? (
    noScream
  ) : (
    exsistedScream
  );

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        {screamsMarkup}
      </Grid>
      <Grid item sm={4} xs={12}>
        {profile === null ? (
          <ProfileSkeleton />
        ) : (
          <StaticProfile profile={profile} />
        )}
      </Grid>
    </Grid>
  );
};

User.propTypes = {
  getUserDataHandleAction: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = { getUserDataHandleAction };

export default connect(mapStateToProps, mapDispatchToProps)(User);
