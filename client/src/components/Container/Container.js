import React from "react";
import "./Container.css";
import Container from '@material-ui/core/Container';

const ContainerMain = props =>
    <Container maxWidth="sm">
        {props.children}
    </Container>

export default ContainerMain;