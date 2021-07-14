import React from "react";
import {Link} from "react-router-dom";
import screamStyles from "./styles/screamStyles";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

function Scream({
  classes,
  screams: { userImageUrl, userHandle, createdAt, body },
}) {
  return (
    <Card className={classes.card}>
      <CardMedia
        image={userImageUrl}
        title="Profile image"
        className={classes.image}
      />
      <CardContent className={classes.content}>
        <Typography
          variant="h5"
          color="primary"
          component={Link}
          to={`/user/${userHandle}`}
        >
          {userHandle}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {createdAt}
        </Typography>
        <Typography variant="body1">{body}</Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(screamStyles)(Scream);
