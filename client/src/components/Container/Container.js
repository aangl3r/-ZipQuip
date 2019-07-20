import React from "react";
import "./Container.css";
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

const ContainerMain = props =>
    <Container maxWidth="xl">
        <Typography component="div" />
        {props.children}
    </Container>

export default (ContainerMain);