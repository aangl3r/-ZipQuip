import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const styles = theme => ({
    container: {
        display: "flex",
        flexWrap: "wrap",
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: 550,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
});

class SubmitForm extends React.Component {
    state = {
        title: "",
        body: "",
        category: "",
        userId: "",
        location: "",
        name: "",
    };

    componentDidMount = () => {
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
                    console.log(result.data.user);
                    this.setState({
                        userId: result.data.user,
                        location: result.data.loc,
                        name: result.data.name,
                    });
                    console.log(this.state);
                },
                error => {
                    console.log(error);
                }
            );
    };


    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = () => {
        const newPost = {
            userId: this.props.id,
            title: this.state.title,
            content: this.state.body,
            location: this.props.location,
            name: this.props.name,
            category: this.state.category,
        };

        fetch("/api/posts", {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, cors, *same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            credentials: "include", // include, *same-origin, omit
            headers: {
                "Content-Type": "application/json",
                // "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(newPost), // body data type must match "Content-Type" header
        }).then(
            result => {
                //this.props.updatePosts();
            },

            error => {
                console.log(error);
            }
        );
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                    <TextField
                        id="title"
                        label="Title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleChange("title")}
                        margin="normal"
                        helperText="Title your Post"
                    />
                    <TextField
                        id="standard-multiline-flexible"
                        label="Post"
                        multiline
                        rowsMax="30"
                        className={classes.textField}
                        value={this.state.body}
                        onChange={this.handleChange("body")}
                        margin="normal"
                        helperText="Type to your Community here"
                    />
                </form>
                <label htmlFor="contained-button-file">
                    <Button
                        variant="outlined"
                        color="secondary"
                        onClick={this.props.closeModal}
                    >
                        Cancel
                        </Button>
                    <Button
                        color="primary"
                        variant="outlined"
                        component="span"
                        className={classes.button}
                        onClick={() => {
                            this.handleSubmit();
                            this.props.closeModal();
                          }}
                    >
                        Submit
                    </Button>
                </label>
            </div>
        )
    }

}

export default withStyles(styles)(SubmitForm);