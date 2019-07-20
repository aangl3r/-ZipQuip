import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
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
}));

const SubmitForm = props => {
    const classes = useStyles();

    const [state, setState] = React.useState({
        title: "",
        body: "",
        userId: "",
        location: "",
        name: "",
    });

    const submit = (title, content, location, name) => {
        setState({
            ...state,
            title: state.title,
            content: state.body,
            location: props.location,
            name: props.name,
        });
    }

    return (
        <div>
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    margin="normal"
                    helperText="Title your Post"
                />
                <TextField
                    id="standard-multiline-flexible"
                    label="Post"
                    multiline
                    rowsMax="30"
                    className={classes.textField}
                    margin="normal"
                    helperText="Type to your Community here"
                />
            </form>
            <label htmlFor="contained-button-file">
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={props.closeModal}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="outlined"
                    component="span"
                    className={classes.button}
                    onClick={() => {
                        submit();
                        props.closeModal();
                    }}
                >
                    Submit
                </Button>
            </label>
        </div>
    )
}

export default SubmitForm;