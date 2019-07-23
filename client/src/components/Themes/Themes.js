import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
    overrides: {
        MuiContainer: {
            root: {
                height: "100%",
            },
        },
    }
});

export default theme;