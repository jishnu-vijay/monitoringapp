import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, Form } from '../components/UseForm';
import Controls from "../components/controls/Controls";
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
    padding: theme.spacing(6, 6, 0),
  }
}));
const initialFValues = {
    url: '',
    responseTime: '',
}

const DashBoard = props => {
  const classes = useStyles();
  const { history } = props;

  useEffect(() => {

    var loginUser = localStorage.getItem("userInfo");
    if(loginUser==null) 
    {
        history.push("/login")
    }

    }, []);

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('responseTime' in fieldValues)
            temp.responseTime = fieldValues.responseTime ? "" : "Response Time is required."
        if ('url' in fieldValues)
            temp.url = fieldValues.url ? "" : "Url is required."
        setErrors({
            ...temp
    })

    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
    }
    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

    const handleSubmit = e => {
        if (validate()) {
            console.log(values)

            const url = values.url;
            const responseTime = values.responseTime;

            const loginUser = localStorage.getItem("userInfo");
            const parsedloginuser = JSON.parse(loginUser)
            const userId = parsedloginuser._id

            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${parsedloginuser.token}`,
                },
            }
            axios.post('http://localhost:5000/api/url/addurl', { 
                url,responseTime,userId               
                }, config)
                .then(response => {
                    console.log(response.data);
                    alert('Url added')
                    history.push('/dashboard')
                })
        }
    }    
  return (
    <React.Fragment>
      <CssBaseline />
      <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Add URL
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
    <div className={classes.myContent}>
    <Button color="inherit" onClick={() => history.push("/dashboard")}>Go Back</Button><br></br><br></br><br></br>   
        <Form onSubmit={handleSubmit}>
            <Grid container>
                <Grid item xs={12} sm={12} md={6}>
                    <Controls.Input
                        name="url"
                        label="URL"
                        value={values.url}
                        onChange={handleInputChange}
                        error={errors.url}
                    /> 
                </Grid>         
                <Grid item xs={12} sm={12} md={6}>
                    <Grid item xs={5}>
                        <Controls.Input
                            name="responseTime"
                            label="Response Time(ms)"
                            value={values.responseTime}
                            onChange={handleInputChange}
                            error={errors.responseTime}
                        />
                    </Grid>                    
                </Grid>                   
            </Grid> 

            <div>
                <Controls.Button
                    type="submit"
                    text="Add" />
            </div>  
        </Form>             
    </div>
    
    </React.Fragment>
  );
}
export default DashBoard;