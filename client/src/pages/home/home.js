import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// MUIs
import { Grid } from "@material-ui/core";

// Components
import Scream from "../../components/scream/scream";
import Profile from "../../components/profiles/profile/profile";

// Redux
import { connect } from "react-redux";
import getScreamsAction from "../../redux/actions/data-actions/data-getscream";

function Home() {
  const [screams, setScreams] = useState([]);

  useEffect(() => {
    async function getScreams() {
      const url = await "/screams";
      axios.get(url).then((res) => {
        setScreams(res.data);
      });
    }

    getScreams();
  }, [screams]);

  let recentScream = screams ? (
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
  getScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getScreamsAction })(Home);
