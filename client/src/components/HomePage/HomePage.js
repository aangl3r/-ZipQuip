import React from "react";
import "./HomePage.css";
import ContainerMain from "../Container"
import Nav from "../Nav"
import PostCard from "../PostCard"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 250,
    },
    sideBarGrid: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 600,
    }
}));

const HomePage = props => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Nav />
            <div className={classes.root}>
                <ContainerMain>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <PostCard>
                            </PostCard>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper className={classes.sideBarGrid}>Sidebar</Paper>
                        </Grid>
                        <Grid item xs={4}>
                        <Paper className={classes.paper}>Comment Section</Paper>
                        </Grid>
                        <Grid item xs={4}>
                        <Paper className={classes.paper}>Comment Section</Paper>
                        </Grid>
                    </Grid>
                </ContainerMain>
            </div>
        </React.Fragment>
    );
}

export default HomePage;