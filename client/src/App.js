import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from "./components/Themes/Themes"
import HomePage from "./components/HomePage/HomePage";
import Profile from "./components/Profile/Profile";
import ErrorPush from "./components/ErrorPush/ErrorPush";
import LandingPage from "./components/LandingPage/LandingPage";
import Inbox from "./components/Inbox/Inbox";
import View from "./components/CommentPage/View"

class App extends Component {
  state = {
    user: "",
    location: "",
    name: "",
  };
  componentDidUpdate() {
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
        },
        error => {
          console.log(error);
        }
      );
  }

  updateAuth = user => {
    this.setState({
      user: user,
    });
  };

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <MuiThemeProvider theme={theme}>
          <div className="bgImage">
            <Router>
              <div>
                <Switch>
                  <Route exact path="/" component={LandingPage} />
                  <Route exact path="/Home" component={HomePage} />
                  <Route exact path="/profile" component={Profile} />
                  <Route exact path="/inbox" component={Inbox} />
                  <Route exact path="/view" component={View} />
                  <Route component={ErrorPush} />
                </Switch>
              </div>
            </Router>
          </div>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
