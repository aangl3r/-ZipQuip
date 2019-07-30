import React, { Component } from "react";
import "./HomePage.css";
import ContainerMain from "../Container";
import Nav from "../Nav";
import PostCard from "../PostCard";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PostGen from "../PostCard/PostGen"
import MapContainer from "../MapItem/MapItem2"
import { Typography } from "@material-ui/core";
import Weather from "../Weather"

const styles = theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    sideBarGrid: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    title: {
    fontSize: 17,
    }
});

class HomePage extends Component {
    state = {
        posts: [],
        id: "",
        location: "",
        name: "",
        snackBar: false,
        open: false,
        recipientName: "",
        recipientId: "",
        replyContent: "",
        replySubject: "",
    };

    componentDidMount() {
        fetch("/api/session", {
            method: "Get", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "client", // no-referrer, *client
        })
            .then(res => res.json())
            .then(
                result => {
                    const { user, loc, name } = result.data;
                    console.log(result);
                    this.setState({
                        id: user,
                        location: loc,
                        name: name,
                    });
                    this.updatePosts();
                    
                },
                error => {
                    console.log(error);
                }
            );
    }


    updatePosts = () => {
        fetch(`/api/posts/50/${this.state.location}`, {
            method: "Get", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "client", // no-referrer, *client
        })
            .then(res => res.json())
            .then(
                result => {
                    console.log(result);
                    this.setState({
                        posts: result,
                    });
                },
                error => {
                    console.log(error);
                }
            );
    };

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Nav />
                <div className={classes.root}>
                    <ContainerMain>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <PostCard
                                updatePosts={this.updatePosts}>
                                </PostCard>
                            </Grid>
                            <Grid item xs={4}>
                                <Paper className={classes.sideBarGrid}>Sidebar
                                <div>
                                    <Typography
                                        className={classes.title}
                                        color="inherit"
                                        variant="h3">
                                        Hello {this.state.name}
                                    </Typography>
                                    <Weather />
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={8}>
                                <Paper className={classes.paper}>Comment Section
                                    <div>
                                        <PostGen
                                            posts={this.state.posts}
                                            updatePosts={this.updatePosts}
                                            updateReply={this.updateReply}
                                            openModal={this.handleOpen}>
                                        </PostGen>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </ContainerMain>
                </div>
            </React.Fragment>
        );
    }


}

export default withStyles(styles)(HomePage);
