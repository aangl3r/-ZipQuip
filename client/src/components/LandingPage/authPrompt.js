import React, { Component } from "react";
import "./LandingPage.css";
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import SignIn from "./SignIn"
import SignUp from "./SignUp"

const styles = theme => ({
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
})

/* const useStyles = makeStyles(theme => ({
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
 */

class AuthPrompt extends Component {
    state = {
        SIopen: false,
        SUOpen: false,
        email: "",
    };

    handleOpen = () => {
        this.setState({ SIopen: true });
    };

    handleClose = () => {
        this.setState({ SIopen: false });
    };

    SUOpen = () => {
        this.setState({ SUOpen: true });
    };

    SUClose = () => {
        this.setState({ SUOpen: false });
    };

    changeSISU = () => {
        this.setState({
            SUOpen: false,
            SIopen: true,
        });
    };

    saveEmail = data => {
        this.setState({
            email: data,
        });
    };

    /* 
    
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
    
         const changeToSignIn = () => {
            signUpHandleClose(true),
            handleOpen(true)
        };
     
    
         */
    render() {
        const { classes } = this.props;

        return (
            <div className="paperStyle">
                <Paper className={classes.paper}>
                    <h1>Connect, Discuss, Plan</h1>
                    <Button SUOpen={this.SUOpen} variant="contained" color="primary" className={classes.button} align="center" onClick={this.SUOpen}>
                        Sign Up
                    </Button>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                    />
                    <p>
                        Already have an account?
                        <Button onClick={this.handleOpen}>
                            Sign In
                        </Button>
                    </p>
                    <SignIn
                        open={this.state.SIopen}
                        email={this.state.email}
                        onClose={this.handleClose}
                    />
                    <SignUp
                        SUOpen={this.state.SUOpen}
                        changeSISU={this.changeSISU}
                        email={this.state.email}
                        SUClose={this.SUClose}
                        saveEmail={this.saveEmail}
                    />
                </Paper>
            </div>
        );
    }

};

export default withStyles(styles)(AuthPrompt);