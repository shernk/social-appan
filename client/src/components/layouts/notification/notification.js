import React, { Fragment } from "react";

import PropTypes from "prop-types";

// MUI
import Menu from "@material-ui/core/Menu";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";

// Redux
import { connect } from "react-redux";
import { markNotificationsRead } from "../../../redux/actions/user-actions/user-markNotificationsRead";

// handle
import useNotificationHandle from "./handle/handle";
import notificationsIcon from "./handle/notificationsIcon";
import notificationsMarkup from "./handle/notificationsMarkup";

const Notifications = ({ notifications, markNotificationsRead }) => {
  const { anchorEl, handleOpen, handleClose, onMenuOpened } =
    useNotificationHandle(notifications, markNotificationsRead);

  return (
    <Fragment>
      <Tooltip placement="top" title="Notifications">
        <IconButton
          aria-owns={anchorEl ? "simple-menu" : undefined}
          aria-haspopup="true"
          onClick={handleOpen}
        >
          {notificationsIcon(notifications)}
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onEntered={onMenuOpened}
      >
        {notificationsMarkup(notifications, handleClose)}
      </Menu>
    </Fragment>
  );
};

Notifications.propTypes = {
  notifications: PropTypes.array.isRequired,
  markNotificationsRead: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  notifications: state.user.notifications,
});

export default connect(mapStateToProps, { markNotificationsRead })(
  Notifications
);
