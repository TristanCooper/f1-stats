import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  toolBar: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
  },
  heading: {
    flex: 1,
  },
}));

const StyledToolbar = () => {
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar className={classes.toolBar}>
        <Typography variant="h5" className={classes.heading}>
          Formula 1 Stats
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default StyledToolbar;