import { Fragment } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

// Utils
import MyButton from "../../../../utils/mybutton";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import MuiLink from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";

// Icons
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

// Profiles
import EditDetails from "../editprofile/edit-detail";

// styles
import exsistProfileStyles from "./styles/exsistprofilestyles";

const ExistsProfile = ({
  classes,
  credentials,
  handleImageChange,
  handleEditPicture,
  handleSignout,
}) => {
  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img
            src={credentials.imageUrl}
            alt="profile"
            className="profile-image"
          />
          <input
            type="file"
            id="imageInput"
            hidden="hidden"
            onChange={handleImageChange}
          />
          <MyButton
            tip="Edit picture"
            onClick={handleEditPicture}
            btnClassName="button"
          >
            <EditIcon color="primary" />
          </MyButton>
        </div>
        <hr />
        <div className="profile-details">
          <MuiLink
            component={Link}
            to={`/${credentials.handle}`}
            color="primary"
            variant="h5"
          >
            @{credentials.handle}
          </MuiLink>
          <hr />
          {credentials.bio && (
            <Typography variant="body2">{credentials.bio}</Typography>
          )}
          <hr />
          {credentials.location && (
            <Fragment>
              <LocationOn color="primary" /> <span>{credentials.location}</span>
              <hr />
            </Fragment>
          )}
          {credentials.website && (
            <Fragment>
              <LinkIcon color="primary" />
              <a
                href={credentials.website}
                target="_blank"
                rel="noopener noreferrer"
              >
                {" "}
                {credentials.website}
              </a>
              <hr />
            </Fragment>
          )}
          <CalendarToday color="primary" />{" "}
          <span>Joined {dayjs(credentials.createdAt).format("MMM YYYY")}</span>
        </div>
        <div>
          <MyButton tip="Sign out" onClick={handleSignout}>
            <KeyboardReturn color="primary" />
          </MyButton>
          <EditDetails classes={classes} credentials={credentials} />
        </div>
      </div>
    </Paper>
  );
};

export default withStyles(exsistProfileStyles)(ExistsProfile);
