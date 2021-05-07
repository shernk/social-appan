import React from 'react';
import Link from "react-router-dom/Link";

import AppBar from "@material-ui/core/AppBar";
import ToolBar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

function NavBar() {
  return (
    <AppBar>
      <ToolBar className="nav-container">
        <Button component={Link} to='/'>home</Button>
        <Button component={Link} to='/login'>login</Button>
        <Button component={Link} to='/logout'>logout</Button>
      </ToolBar>
    </AppBar>
  );
}

export default NavBar;
