import React from "react";
import "./LandingPage.css";
import ContainerMain from "../Container";
import LandingPageNav from "./LandingPageNav";
import AuthPrompt from "./authPrompt";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
}));

const LandingPage = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <LandingPageNav />
            <div className={classes.root}>
                <ContainerMain className={classes.root}>
                <div className={classes.root}>
                    <AuthPrompt>

                    </AuthPrompt>
                    </div>
                </ContainerMain>
            </div>
        </React.Fragment>
    );
}

export default LandingPage;