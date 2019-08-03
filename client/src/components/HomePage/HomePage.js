import React, { Component } from "react";
import "./HomePage.css";
import ContainerMain from "../Container";
import Nav from "../Nav";
import PostCard from "../PostCard";
import { withStyles } from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PostGen from "../PostCard/PostGen"
import { Typography } from "@material-ui/core";
import Weather from "../Weather"
import MessageConfirm from "./MessageConfirm"
import Modal from "@material-ui/core/Modal";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

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
    },
    paper2: {
        position: "absolute",
        width: "40%",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none",
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


    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    sendMessage = () => {
        const message = {
            senderId: this.state.id,
            senderName: this.state.name,
            recipientId: this.state.recipientId,
            recipientName: this.state.recipientName,
            subject: this.state.replySubject,
            content: this.state.replyContent,
        };

        // Send a message to another user through the api
        fetch("/api/messages", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "same-origin", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "client", // no-referrer, *client
            body: JSON.stringify(message),
        }).then(
            result => {
                if (result.ok) {
                    this.openSnackBar();
                }
            },
            error => {
                console.log(error);
            }
        );
    };

    updateReply = (name, id) => {
        this.setState({
            recipientName: name,
            recipientId: id,
        });
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    openSnackBar = () => {
        this.setState({ snackBar: true });
      };
    
      closeSnackBar = (event, reason) => {
        if (reason === "clickaway") {
          return;
        }
    
        this.setState({ snackBar: false });
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
                        <Modal
                            aria-labelledby="simple-modal-title"
                            aria-describedby="simple-modal-description"
                            open={this.state.open}
                            onClose={this.handleClose}
                        >
                            <div style={getModalStyle()} className={classes.paper2}>
                                <Typography gutterBottom variant="h5" id="modal-title">
                                    Message
                                </Typography>
                                <Divider variant="fullWidth" />
                                <Typography variant="subtitle1" id="modal-title">
                                    <b>To:</b> {this.state.recipientName}
                                </Typography>
                                <TextField
                                    id="standard-name"
                                    label="Subject"
                                    name="replySubject"
                                    className={classes.textField}
                                    value={this.state.replySubject}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <TextField
                                    id="standard-multiline-flexible"
                                    multiline
                                    rowsMax="6"
                                    label="Message"
                                    className={classes.textField}
                                    name="replyContent"
                                    value={this.state.replyContent}
                                    onChange={this.handleInputChange}
                                    margin="normal"
                                    variant="outlined"
                                />
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={this.handleClose}
                                >
                                    Cancel
                                    </Button>

                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={this.sendMessage}
                                >
                                    Send
                                    </Button>
                            </div>
                        </Modal>
                        <MessageConfirm
                            open={this.state.snackBar}
                            openSnackBar={this.openSnackBar}
                            closeSnackBar={this.closeSnackBar}
                        />
                    </ContainerMain>
                </div>
            </React.Fragment>
        );
    }


}

export default withStyles(styles)(HomePage);
