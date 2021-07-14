import React, { Fragment, useState, useEffect } from "react";
import PropTypes from "prop-types";

// util
import MyButton from "../../utils/mybutton";

// redux
import { connect } from "react-redux";
import { default as editUserDetailsAction } from "../../redux/actions/user-actions/user-editdetails";

// MUIs
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";

// theme
import theme from "../../themes/theme";

const EditDetails = ({ classes, credentials }) => {
  const [states, setStates] = useState({ bio: "", website: "", location: "" });
  const [open, setOpen] = useState(false);

  function mapUserDetailsToState(credentials) {
    const bio = credentials.bio ? credentials.bio : "";
    const website = credentials.website ? credentials.website : "";
    const location = credentials.location ? credentials.location : "";

    return () => {
      setStates((states) => ({
        ...states,
        bio: bio,
        website: website,
        location: location,
      }));
    };
  }

  const handleOpen = () => {
    setOpen(true);
    mapUserDetailsToState(credentials);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setStates({ [event.target.name]: event.target.value });
  };

  const handleSubmit = () => {
    const userDetails = {
      bio: states.bio,
      website: states.website,
      location: states.location,
    };

    editUserDetailsAction(userDetails);
    handleClose();
  };

  useEffect(() => {
    mapUserDetailsToState(credentials);
  }, [credentials, open]);

  return (
    <Fragment>
      <MyButton onClick={handleOpen} btnClassName={classes.button}>
        <EditIcon color="primary" />
      </MyButton>
      <Dialog>
        <DialogTitle>Edit your details</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              multiline
              rows="3"
              placeholder="A short bio about yourself"
              className={classes.textField}
              value={states.bio}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal/professinal website"
              className={classes.textField}
              value={states.website}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where you live"
              className={classes.textField}
              value={states.location}
              onChange={handleChange}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

EditDetails.propTypes = {
  editUserDetailsAction: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  credentials: state.user.credentials,
});

const mapDispatchToProps = { editUserDetailsAction };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(theme.styles)(EditDetails));
