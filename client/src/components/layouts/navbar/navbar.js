import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

// utils
import MyButton from "../../../utils/mybutton";

// components
import PostScream from "../../../components/scream/postscream/post-scream";
import Notifications from "../../../components/layouts/notification/notification";

// MUI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

// Icons
import HomeIcon from "@material-ui/icons/Home";

const Navbar = ({ authenticated }) => {
  return (
    <AppBar>
      <ToolBar className="nav-container">
        {authenticated ? (
          <Fragment>
            <PostScream />
            <Link to="/home">
              <MyButton tip="Home">
                <HomeIcon />
              </MyButton>
            </Link>
            <Notifications />
          </Fragment>
        ) : (
          <Fragment>
            <Button component={Link} to="/home">
              home
            </Button>
            <Button component={Link} to="/signin">
              signin
            </Button>
            <Button component={Link} to="/signup">
              signup
            </Button>
          </Fragment>
        )}
      </ToolBar>
    </AppBar>
  );
};

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
