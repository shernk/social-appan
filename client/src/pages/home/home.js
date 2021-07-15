import { useEffect } from "react";
import PropTypes from "prop-types";

// MUIs
import { Grid } from "@material-ui/core";

// Components
import Scream from "../../components/scream/scream";
import Profile from "../../components/profiles/profile/profile";

// Redux
import { connect } from "react-redux";
import getScreamsAction from "../../redux/actions/scream-actions/scream-getscreams";

const Home = ({ getScreamsAction, data: { screams, loading } }) => {
  useEffect(() => {
    getScreamsAction();
  }, [getScreamsAction]);

  let recentScream = !loading ? (
    screams.map((scream) => <Scream key={scream.screamId} screams={scream} />)
  ) : (
    <p>Loading...</p>
  );

  return (
    <Grid container spacing={16}>
      <Grid item sm={8} xs={12}>
        <div>{recentScream}</div>
      </Grid>
      <Grid item sm={4} xs={12}>
        <Profile />
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  getScreamsAction: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = { getScreamsAction };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
