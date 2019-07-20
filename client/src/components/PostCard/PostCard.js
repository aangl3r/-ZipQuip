import React from 'react';
import "./PostCard.css";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles(theme => ({
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
}));

const PostCard = props => {
    const classes = useStyles();

    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);
  
    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    return (
        <div className="PostCard">
            <Button onClick={handleOpen} align="justify" color="primary" variant="outlined" >
                Add Post
          </Button>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={open}
                onClose={handleClose}
            >
                <div style={modalStyle} className={classes.paper}>
                    <Typography align="center" variant="h4">
                        Post
                    </Typography>
                    <SubmitForm
                    closeModal={handleClose}
                    //updatePosts={this.props.updatePosts}
                    //id={this.props.id}
                    //name={this.props.name}
                    //location={this.props.location}
                    />
                </div>
            </Modal>
        </div>
    )

};


export default PostCard;