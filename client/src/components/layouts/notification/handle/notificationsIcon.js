// MUI
import { Badge } from "@material-ui/core";

// Icons
import NotificationsIcon from "@material-ui/icons/Notifications";

const notificationsIcon = (notifications) => {
  let notiIcon;

  const notiNum = notifications.filter((noti) => noti.read === false).length;

  if (notifications && notifications.length > 0) {
    notifications.filter((noti) => noti.read === false).length > 0
      ? (notiIcon = (
          <Badge badgeContent={notiNum} color="secondary">
            <NotificationsIcon />
          </Badge>
        ))
      : (notiIcon = <NotificationsIcon />);
  } else {
    notiIcon = <NotificationsIcon />;
  }

  return notiIcon;
};

export default notificationsIcon;
