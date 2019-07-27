import React from 'react';
import "./PostCard.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import SubmitForm from "./submitForm";

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
    paper: {
        position: "absolute",
        width: 600,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4),
        outline: "none",
    },
    button: {
        margin: theme.spacing(1),
    },
});

class PostCard extends React.Component {
    state = {
        open: false,
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <div className="PostCard" >
                    <Button onClick={this.handleOpen} fullWidth={true} align="justify" color="primary" variant="outline" >
                        Add Post
                    </Button>
                </div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.open}
                    onClose={this.handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <Typography align="center" variant="h4">
                            Post
                        </Typography>
                        <SubmitForm
                            closeModal={this.handleClose}
                            updatePosts={this.props.updatePosts}
                            id={this.props.id}
                            name={this.props.name}
                            location={this.props.location}
                        />
                    </div>
                </Modal>
            </div>
        )
    }



};



export default withStyles(styles)(PostCard);