import React from "react";
import "./LandingPage.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
        width: 600,
    },
    button: {
        margin: theme.spacing(2),
    },
    input: {
        display: 'none',
    },
}));

const AuthPrompt = props => {
    const classes = useStyles();

    return (
        <div className="paperStyle">
            <Paper className={classes.paper}>
                <h1>Connect, Discuss, Plan</h1>
                <Button variant="contained" color="primary" className={classes.button} align="center">
                    Sign Up
                </Button>
                <p>
                    Already have an account?  
                <Button href="#text-buttons" className={classes.button}>
                    Sign In
                </Button>
                </p>
                    <input
                    accept="image/*"
                    className={classes.input}
                    id="text-button-file"
                    multiple
                    type="file"
                    />
            </Paper>
        </div>
    );
};

export default AuthPrompt;