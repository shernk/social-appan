import { useState } from "react";

const useNotificationHandle = (notifications, markNotificationsRead) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    console.log("event.target");
    console.log(event.target);
    setAnchorEl(event.target);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onMenuOpened = () => {
    const unreadNotificationsIds = notifications
      .filter((notification) => !notification.read)
      .map((notification) => notification.notificationId);

    markNotificationsRead(unreadNotificationsIds);
  };

  return { anchorEl, handleOpen, handleClose, onMenuOpened };
};

export default useNotificationHandle;
