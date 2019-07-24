import React from "react";
import "./LandingPage.css";
import { makeStyles } from '@material-ui/core/styles';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import SignIn from "./SignIn"
import SignUp from "./SignUp"

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

    const [open, setOpen] = React.useState(false);
    const [signUpOpen, setSignUpOpen] = React.useState(false);
    const [email, setEmail] = React.useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const signUpHandleOpen = () => {
        setSignUpOpen(true);
    };

    const signUpHandleClose = () => {
        setSignUpOpen(false);
    };

    const saveEmail = data => {
        setEmail(data);
    };

    return (

        <div className="paperStyle">
            <Paper className={classes.paper}>
                <h1>Connect, Discuss, Plan</h1>
                <Button onClick={signUpHandleOpen} variant="contained" color="primary" className={classes.button} align="center">
                    Sign Up
                </Button>
                <p>
                    Already have an account?
                    <Button onClick={handleOpen}>
                        Sign In
                    </Button>
                </p>
                <SignIn
                    open={open}
                    email={saveEmail}
                    onClose={handleClose}
                />
                <input
                    accept="image/*"
                    className={classes.input}
                    id="text-button-file"
                    multiple
                    type="file"
                />
                <SignUp
                    SUOpen={signUpOpen}
                    setEmail={email}
                    saveEmail={saveEmail}
                    SUClose={signUpHandleClose}
                />
            </Paper>
        </div>
    );
};

export default AuthPrompt;