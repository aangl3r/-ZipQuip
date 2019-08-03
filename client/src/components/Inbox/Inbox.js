import React, { Component } from "react";
import Mail from "./Mail";
import Nav from "../Nav/Nav";
import ContainerMain from "../Container/Container";

class Inbox extends Component {
    state = {};

    render() {
        return (
            <React.Fragment>
                <Nav />
                <ContainerMain>
                    <Mail>

                    </Mail>
                </ContainerMain>
            </React.Fragment>

        );
    }
}

export default Inbox;
