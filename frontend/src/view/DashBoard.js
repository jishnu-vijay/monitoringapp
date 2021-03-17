import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  addButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  myContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6, 0, 0),
  }
}));


const DashBoard = props => {
  const classes = useStyles();
  const { history } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
      <main>
        {/* Hero unit */}
        <div className={classes.myContent}>
          <Button className={classes.addButton} variant="outlined" color="primary" onClick={() => history.push("/addurl")}>
            Add URL
          </Button>
        </div>
        
      </main>
      
    </React.Fragment>
  );
}
export default DashBoard;