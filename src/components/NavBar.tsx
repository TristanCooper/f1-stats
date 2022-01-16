import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";
import { Link, useMatch } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  toolBar: {
    top: 'auto',
    bottom: 0,
    textAlign: 'center',
    display: 'flex',
  },
  heading: {
    flex: 1,
  },
  navButton: {
    flex: 1,
    gap: theme.spacing(1),
  }
}));

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <Typography variant="h5" className={classes.heading}>
          Formula 1 Stats
        </Typography>
        <Button variant="outlined" className={classes.navButton} component={Link} to="/">Drivers</Button>
        <Button variant="outlined" className={classes.navButton} component={Link} to="/teams">Teams</Button>
        <Button variant="outlined" className={classes.navButton} component={Link} to="/tracks">Tracks</Button>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;