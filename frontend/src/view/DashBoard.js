import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Form,Table, TableBody, TableRow, TableCell } from '@material-ui/core';
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
  const [list, setList] = useState([]);
  const [monitorCheck, setMonitor] = useState(0);
  useEffect(() => {

    var loginUser = localStorage.getItem("userInfo");
    if(loginUser==null) 
    {
        history.push("/login")
    }

    }, []);

    useEffect(() => {

    try {

        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        }
        axios.get('http://localhost:5000/api/url/geturl', config)
            .then(response => {
                console.log(response.data);
                setList(response.data)
            })
        } catch (error) {
            console.log(error)
        }

    }, []);

    useEffect(() => {
      const interval = setInterval(() => {
      axios.get('http://localhost:5000/api/url/monitor')
      .then(response => {
          setMonitor(1)
          window.location.reload(); 
      })

      }, 5000);
      return () => clearInterval(interval);
    }, []);
    function deleteHandle(uid)
    {
        var loginUser = localStorage.getItem("userInfo");
        var parsedloginuser = JSON. parse(loginUser)
  
        const config = {
          headers: {
            Authorization: `Bearer ${parsedloginuser.token}`,
          },
        }
  
        axios.get(`http://localhost:5000/api/url/${uid}`,config)
        window.location.reload(); 

    }

    function handleLogout()
    {
      localStorage.removeItem('userInfo')
    
      document.location.href = '/login'
    }

  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Dashboard
          </Typography>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
      <main>
        {/* Hero unit */}
        <div className={classes.myContent}>
          <Button className={classes.addButton} variant="outlined" color="primary" onClick={() => history.push("/addurl")}>
            Add URL
          </Button>
          <br></br><br></br>
            <Grid item  xs={12} sm={12} md={8}>
         
              <Table>
                <TableRow>
                  <TableCell>
                    
                  </TableCell>
                  <TableCell><b>Url</b></TableCell>
                  <TableCell><b>Response limit(ms)</b></TableCell>       
                  {monitorCheck==1 ? (
                  <TableCell><b>Moretime than limit</b></TableCell>
                    ) : ""}                      
                </TableRow>               
                <TableBody>
                  {list.map(urldata => (
                      <TableRow>
                        <TableCell>
                          <Button variant="contained" color="secondary" onClick={e => deleteHandle(urldata._id)}>
                            Delete
                          </Button>
                        </TableCell>
                          <TableCell >{urldata.url}</TableCell>
                          <TableCell >{urldata.responseTime}</TableCell>
                          {monitorCheck==1 ? (<TableCell >{urldata.moreThan}</TableCell>): "" }
                      </TableRow>
                  ))}  
                </TableBody>
              </Table>
            </Grid>      
        </div>
        
      </main>
      
    </React.Fragment>
  );
}
export default DashBoard;