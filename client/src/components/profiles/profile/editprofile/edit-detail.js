import React, { Fragment} from "react";
import PropTypes from "prop-types";

// util
import MyButton from "../../../../utils/mybutton";

// redux
import { connect } from "react-redux";
import editUserDetailsAction from "../../../../redux/actions/users/user-editprofile";

// MUIs
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import useEditProfileHandle from "./handle/editprofilehandle";

const EditDetails = ({ classes, credentials, editUserDetailsAction }) => {
  const {
    open,
    bio,
    website,
    location,
    handleSubmit,
    handleChangeBio,
    handleChangeLocation,
    handleChangeWebsite,
    handleOpen,
    handleClose,
  } = useEditProfileHandle(credentials, editUserDetailsAction);

  return (
    <Fragment>
      <MyButton
        tip="Edit profile"
        onClick={handleOpen}
        btnClassName={classes.button}
      >
        <EditIcon color="primary" />
      </MyButton>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Edit profile</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              name="bio"
              type="text"
              label="Bio"
              rows="3"
              placeholder="Bio"
              className={classes.textField}
              value={bio}
              onChange={handleChangeBio}
              fullWidth
            />
            <TextField
              name="website"
              tpye="text"
              label="Website"
              placeholder="Your personal website"
              className={classes.textField}
              value={website}
              onChange={handleChangeWebsite}
              fullWidth
            />
            <TextField
              name="location"
              tpye="text"
              label="Location"
              placeholder="Where do you live?"
              className={classes.textField}
              value={location}
              onChange={handleChangeLocation}
              fullWidth
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
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

export default connect(mapStateToProps, mapDispatchToProps)(EditDetails);
