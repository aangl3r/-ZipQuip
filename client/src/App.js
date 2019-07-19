import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import HomePage from "./components/HomePage/HomePage";
import ErrorPush from "./components/ErrorPush/ErrorPush"

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#e8f5f5",
      main: "#69c9c9",
    },
    secondary: {
      light: "#dbdbdb",
      main: "#69c9c9",
      dark: "#ababab",
    },
  },
});

class App extends Component {

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Router>
            <div>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route component={ErrorPush} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
