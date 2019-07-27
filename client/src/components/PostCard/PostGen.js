import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import PostComment from "./PostComment"

const styles = {
    card: {
        minWidth: 275,
        width: "100%",
        backgroundColor: "#81c5c7",
        borderRadius: "10px",
    },
    bullet: {
        display: "inline-block",
        margin: "0 2px",
        transform: "scale(0.8)",
    },
    pos: {
        marginBottom: 12,
    },
};

class PostGen extends Component {
    renderCards = () => {
        const posts = this.props.posts;
        return posts
            .slice(0, 9)
            .map((post, index) => {
                return (
                    <PostComment
                        key={index}
                        id={post.userId}
                        name={post.name}
                        title={post.title}
                        content={post.content}
                        updateReply={this.props.updateReply}
                        openModal={this.props.openModal}
                    />
                );
            });
    };

    render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card} square>
                <CardContent>
                </CardContent>
                {this.renderCards()}
                <CardActions />
            </Card>
        );
    }
}

PostGen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PostGen);
