import React from 'react';
import {Link} from "react-router-dom";

// MUI
import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

function NavBar() {
  return (
    <AppBar>
      <ToolBar 
      className="nav-container">
        <Button component={Link} to='/'>home</Button>
        <Button component={Link} to='/signin'>signin</Button>
        <Button component={Link} to='/signup'>signup</Button>
      </ToolBar>
    </AppBar>
  );
}

export default NavBar;
