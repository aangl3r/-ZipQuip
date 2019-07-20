import { createMuiTheme } from "@material-ui/core/styles";


const theme = createMuiTheme({
    overrides: {
        MuiContainer: {
            root: {
                background: "#e8f5f5",
                height: "100%",
            },
        },
    },
});

export default theme;