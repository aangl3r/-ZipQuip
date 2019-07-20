import React, { Component } from 'react';
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Edit";
import Typography from "@material-ui/core/Typography";
import "./Profile.css";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Nav from "../Nav";
import ContainerMain from "../Container";
import Grid from '@material-ui/core/Grid';

const NameForm = props => {
    return (
        <div>
            <Typography className="formTitle">Edit your display name here</Typography>
            <FormControl margin="normal">
                <InputLabel className="nameInput" htmlFor="name">
                    {props.name}
                </InputLabel>
                <Input
                    disabled={props.nameDisabled}
                    onChange={props.handleChange}
                    name="oldName"
                    id="name"
                    autoComplete="name"
                    defaultValue={props.name}
                    style={{ width: "120%" }}
                />
            </FormControl>
            <Button
                className="nameButton"
                onClick={() => props.handleClick("name")}
                style={{ margin: "0 40px" }}
            >
                <EditIcon />
            </Button>
        </div>

    );

};

const ZipForm = props => {
    return (
        <div>
            <Typography className="formTitle">Edit your zipcode here</Typography>
            <FormControl margin="normal" className="formInput">
                <InputLabel className="locationInput" htmlFor="zipcode" width="100">
                    {props.zip}
                </InputLabel>
                <Input
                    disabled={props.nameDisabled}
                    onChange={props.handleChange}
                    name="location"
                    id="zipcode"
                    defaultValue={props.zip}
                />
            </FormControl>
            <Button
                className="nameButton"
                onClick={() => props.handleClick("location")}
            >
                <EditIcon />
            </Button>
        </div>
    )
}

class Profile extends Component {
    state = {
        oldName: "",
        id: "",
        location: "",
        email: "",
        password: "",
        nameDisabled: true,
        locationDisabled: true,
        passDisabled: true,
        emailDisabled: true,
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
                    this.setState({
                        id: result.data.user,
                        prevLocation: result.data.loc,
                        prevoldName: result.data.name,
                        email: result.data.email,
                    });
                },
                error => {
                    console.log(error);
                }
            );
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
        });
    };

    handleClick = name => {
        this.setState({
            [name + "Disabled"]: !this.state[name + "Disabled"],
        });
        console.log(this.state[name + "Disabled"]);
    };

    updateProfile = event => {
        event.preventDefault();
        let name = this.state.oldName;
        if (!name) {
            name = this.state.prevoldName;
        }
        let location = this.state.location
        if (!location) {
            location = this.state.prevLocation;
        }
        console.log(name)
        console.log(location)
    };

    render() {
        return (
            <React.Fragment>
                <Nav />
                <ContainerMain>
                <div style={{ marginTop: "5%" }} />
                    <Card>
                        <CardContent>
                            <Typography component="h1" variant="h5" align="center">
                                Update your account information
                            </Typography>
                            <Grid container spacing={8}>
                                <Grid item xl={10}>
                                    <form className="formGrid" onSubmit={this.updateProfile}>
                                        <NameForm
                                            name={this.state.prevoldName}
                                            nameDisabled={this.state.nameDisabled}
                                            handleClick={this.handleClick}
                                            handleChange={this.handleChange}
                                            className="nameForm"
                                        />
                                        <ZipForm
                                            zip={this.state.prevLocation}
                                            nameDisabled={this.state.locationDisabled}
                                            handleClick={this.handleClick}
                                            handleChange={this.handleChange}
                                            className="zipInput"
                                        />
                                        <CardActions>
                                                <Button
                                                    className="submitButton"
                                                    type="submit"
                                                    fullWidth
                                                    variant="outlined"
                                                    color="primary"
                                                >
                                                    Submit
                                                </Button>
                                        </CardActions>
                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </ContainerMain>
                
            </React.Fragment>
        );
    }
}

export default Profile;