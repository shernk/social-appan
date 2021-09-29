import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

// MUI
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

// Icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatIcon from "@material-ui/icons/Chat";

const notificationsMarkup = (notifications, handleClose) => {
  dayjs.extend(relativeTime);

  const NoNoti = (
    <MenuItem onClick={handleClose}>You have none notification</MenuItem>
  );

  const existedNoti = notifications.map((noti) => {
    const verb = noti.type === "like" ? "liked" : "commented on";
    const time = dayjs(noti.createdAt).fromNow();
    const iconColor = noti.read ? "primary" : "secondary";
    const iconType =
      noti.type === "like" ? (
        <FavoriteIcon color={iconColor} style={{ marginRight: 10 }} />
      ) : (
        <ChatIcon color={iconColor} style={{ marginRight: 10 }} />
      );

    return (
      <MenuItem key={noti.createdAt} onClick={handleClose}>
        {iconType}
        <Typography
          component={Link}
          color="default"
          variant="body1"
          to={`/${noti.recipient}/scream/${noti.screamId}`}
        >
          {noti.sender} {verb} your scream {time}
        </Typography>
      </MenuItem>
    );
  });

  const iconMarkup =
    notifications && notifications.length > 0 ? existedNoti : NoNoti;

  return iconMarkup;
};

export default notificationsMarkup;
